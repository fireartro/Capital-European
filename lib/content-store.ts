import "server-only";

import { neon } from "@neondatabase/serverless";
import { promises as fs } from "node:fs";
import path from "node:path";
import managedContentSeed from "@/content/managed-content.seed.json";
import { createDefaultManagedContent, managedContentSchema, type ManagedContent } from "@/lib/managed-content";

const CONTENT_ROW_ID = "primary";
const LOCAL_DATA_PATH = path.join(process.cwd(), ".data", "managed-content.json");
const LEGACY_PLACEHOLDER_PROGRAM_IDS = new Set([
  "investitii-productive",
  "eficienta-energetica",
  "digitalizare-automatizare",
  "startup-antreprenoriat",
  "ong-impact-local"
]);

export type ContentStorage = {
  mode: "postgres" | "local-file" | "read-only-default";
  label: string;
  writable: boolean;
  mediaWritable: boolean;
};

function databaseUrl() {
  return process.env.DATABASE_URL?.trim() || process.env.POSTGRES_URL?.trim() || "";
}

function hasDatabaseConfiguration() {
  return Boolean(databaseUrl());
}

function hasBlobConfiguration() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim() || process.env.BLOB_STORE_ID?.trim());
}

export function getContentStorage(): ContentStorage {
  if (hasDatabaseConfiguration()) {
    return { mode: "postgres", label: "Bază de date PostgreSQL", writable: true, mediaWritable: hasBlobConfiguration() };
  }

  if (process.env.NODE_ENV !== "production") {
    return { mode: "local-file", label: "Fișier local de dezvoltare", writable: true, mediaWritable: hasBlobConfiguration() };
  }

  return { mode: "read-only-default", label: "Conținut implicit (doar citire)", writable: false, mediaWritable: hasBlobConfiguration() };
}

function database() {
  const url = databaseUrl();
  if (!url) throw new Error("DATABASE_URL nu este configurat.");
  return neon(url);
}

async function ensureContentTable() {
  const sql = database();
  await sql`
    CREATE TABLE IF NOT EXISTS capital_european_managed_content (
      id TEXT PRIMARY KEY,
      content JSONB NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  return sql;
}

async function readDatabaseContent() {
  const sql = await ensureContentTable();
  const rows = await sql`
    SELECT content
    FROM capital_european_managed_content
    WHERE id = ${CONTENT_ROW_ID}
    LIMIT 1
  `;
  return rows[0]?.content ?? null;
}

async function readLocalContent() {
  try {
    return JSON.parse(await fs.readFile(LOCAL_DATA_PATH, "utf8")) as unknown;
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return null;
    throw error;
  }
}

async function readSeedContent(): Promise<ManagedContent> {
  const parsed = managedContentSchema.safeParse(managedContentSeed);
  if (parsed.success) return parsed.data;
  console.error("Managed content seed validation failed", parsed.error.flatten());
  return createDefaultManagedContent();
}

async function writeDatabaseContent(content: ManagedContent) {
  const sql = await ensureContentTable();
  const serialized = JSON.stringify(content);
  await sql`
    INSERT INTO capital_european_managed_content (id, content, updated_at)
    VALUES (${CONTENT_ROW_ID}, CAST(${serialized} AS JSONB), NOW())
    ON CONFLICT (id)
    DO UPDATE SET content = EXCLUDED.content, updated_at = NOW()
  `;
}

async function writeLocalContent(content: ManagedContent) {
  await fs.mkdir(path.dirname(LOCAL_DATA_PATH), { recursive: true });
  const temporaryPath = `${LOCAL_DATA_PATH}.${process.pid}.tmp`;
  await fs.writeFile(temporaryPath, JSON.stringify(content, null, 2), "utf8");
  await fs.rename(temporaryPath, LOCAL_DATA_PATH);
}

async function persistContent(content: ManagedContent, storage: ContentStorage) {
  if (storage.mode === "postgres") {
    await writeDatabaseContent(content);
  } else if (storage.mode === "local-file") {
    await writeLocalContent(content);
  }
}

export async function getManagedContent(): Promise<ManagedContent> {
  const storage = getContentStorage();
  try {
    const stored = storage.mode === "postgres"
      ? await readDatabaseContent()
      : storage.mode === "local-file"
        ? await readLocalContent()
        : null;
    if (!stored) {
      const seed = await readSeedContent();
      if (storage.mode === "postgres") await writeDatabaseContent(seed);
      return seed;
    }

    const parsed = managedContentSchema.safeParse(stored);
    if (!parsed.success) {
      const seed = await readSeedContent();
      if (storage.mode === "postgres") await writeDatabaseContent(seed);
      return seed;
    }

    const seed = await readSeedContent();
    const hasNoPrograms = parsed.data.fundingPrograms.length === 0;
    const containsOnlyLegacyPlaceholders = parsed.data.fundingPrograms.length > 0
      && parsed.data.fundingPrograms.every((program) => LEGACY_PLACEHOLDER_PROGRAM_IDS.has(program.id));

    if (hasNoPrograms || containsOnlyLegacyPlaceholders) {
      if (Date.parse(parsed.data.updatedAt) < Date.parse(seed.updatedAt)) {
        const migrated = { ...seed, announcements: parsed.data.announcements, updatedAt: new Date().toISOString() };
        await persistContent(migrated, storage);
        return migrated;
      }
    }

    if (parsed.data.seedVersion < seed.seedVersion) {
      const existingIds = new Set(parsed.data.fundingPrograms.map((program) => program.id));
      const migrated: ManagedContent = {
        ...parsed.data,
        seedVersion: seed.seedVersion,
        updatedAt: new Date().toISOString(),
        fundingPrograms: [
          ...parsed.data.fundingPrograms,
          ...seed.fundingPrograms.filter((program) => !existingIds.has(program.id))
        ]
      };
      await persistContent(migrated, storage);
      return migrated;
    }

    return parsed.data;
  } catch (error) {
    console.error("Managed content read failed", error);
    return readSeedContent();
  }
}

export async function getManagedContentSnapshot() {
  return {
    content: await getManagedContent(),
    storage: getContentStorage()
  };
}

export async function saveManagedContent(input: unknown): Promise<ManagedContent> {
  const storage = getContentStorage();
  if (!storage.writable) {
    throw new Error("Conectează o bază de date PostgreSQL înainte de a publica modificările.");
  }

  const parsed = managedContentSchema.parse(input);
  const content: ManagedContent = { ...parsed, updatedAt: new Date().toISOString() };

  if (storage.mode === "postgres") {
    await writeDatabaseContent(content);
  } else {
    await writeLocalContent(content);
  }

  return content;
}
