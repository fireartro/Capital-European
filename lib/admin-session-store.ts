import "server-only";

import { neon } from "@neondatabase/serverless";
import { createHash, randomBytes } from "node:crypto";

type SessionRecord = {
  expiresAt: number;
  lastSeenAt: number;
};

type AdminSessionStatus = {
  expiresAt: string;
};

const localSessions = new Map<string, SessionRecord>();
const localLoginAttempts = new Map<string, { count: number; resetAt: number }>();

function databaseUrl() {
  return process.env.DATABASE_URL?.trim() || process.env.POSTGRES_URL?.trim() || "";
}

function tokenHash(token: string) {
  return createHash("sha256").update(token).digest("hex");
}

function database() {
  const url = databaseUrl();
  if (!url) throw new Error("DATABASE_URL nu este configurat pentru sesiunile de administrare.");
  return neon(url);
}

async function ensureSessionTable() {
  const sql = database();
  await sql`
    CREATE TABLE IF NOT EXISTS capital_european_admin_sessions (
      token_hash TEXT PRIMARY KEY,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      expires_at TIMESTAMPTZ NOT NULL,
      last_seen_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      revoked_at TIMESTAMPTZ
    )
  `;
  return sql;
}

async function ensureLoginAttemptTable() {
  const sql = database();
  await sql`
    CREATE TABLE IF NOT EXISTS capital_european_admin_login_attempts (
      attempt_key TEXT PRIMARY KEY,
      attempt_count INTEGER NOT NULL DEFAULT 0,
      reset_at TIMESTAMPTZ NOT NULL,
      updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `;
  return sql;
}

function pruneLocalSessions(now: number) {
  for (const [hash, session] of localSessions) {
    if (session.expiresAt <= now) localSessions.delete(hash);
  }
}

export function hasPersistentAdminSessionStorage() {
  return Boolean(databaseUrl());
}

export async function createAdminSessionRecord(durationSeconds: number) {
  const token = randomBytes(32).toString("base64url");
  const hash = tokenHash(token);
  const now = Date.now();
  const expiresAt = new Date(now + durationSeconds * 1000);

  if (hasPersistentAdminSessionStorage()) {
    const sql = await ensureSessionTable();
    await sql`
      DELETE FROM capital_european_admin_sessions
      WHERE expires_at <= NOW() OR revoked_at IS NOT NULL
    `;
    await sql`
      INSERT INTO capital_european_admin_sessions (token_hash, expires_at, last_seen_at)
      VALUES (${hash}, ${expiresAt.toISOString()}, NOW())
    `;
  } else if (process.env.NODE_ENV !== "production") {
    pruneLocalSessions(now);
    localSessions.set(hash, { expiresAt: expiresAt.getTime(), lastSeenAt: now });
  } else {
    throw new Error("Stocarea persistentă a sesiunilor admin nu este configurată.");
  }

  return { token, expiresAt: expiresAt.toISOString() };
}

export async function verifyAdminSessionRecord(token: string | undefined, idleTimeoutSeconds: number): Promise<AdminSessionStatus | null> {
  if (!token || token.length < 32 || token.length > 128) return null;
  const hash = tokenHash(token);
  const now = Date.now();
  const idleCutoff = new Date(now - idleTimeoutSeconds * 1000);

  if (hasPersistentAdminSessionStorage()) {
    const sql = await ensureSessionTable();
    const rows = await sql`
      SELECT expires_at, last_seen_at
      FROM capital_european_admin_sessions
      WHERE token_hash = ${hash}
        AND revoked_at IS NULL
        AND expires_at > NOW()
        AND last_seen_at > ${idleCutoff.toISOString()}
      LIMIT 1
    `;
    const row = rows[0];
    if (!row) return null;

    await sql`
      UPDATE capital_european_admin_sessions
      SET last_seen_at = NOW()
      WHERE token_hash = ${hash} AND revoked_at IS NULL
    `;
    return { expiresAt: new Date(String(row.expires_at)).toISOString() };
  }

  if (process.env.NODE_ENV === "production") return null;
  pruneLocalSessions(now);
  const session = localSessions.get(hash);
  if (!session || session.expiresAt <= now || session.lastSeenAt <= idleCutoff.getTime()) {
    localSessions.delete(hash);
    return null;
  }
  session.lastSeenAt = now;
  return { expiresAt: new Date(session.expiresAt).toISOString() };
}

export async function revokeAdminSessionRecord(token: string | undefined) {
  if (!token) return;
  const hash = tokenHash(token);
  if (hasPersistentAdminSessionStorage()) {
    const sql = await ensureSessionTable();
    await sql`
      UPDATE capital_european_admin_sessions
      SET revoked_at = NOW()
      WHERE token_hash = ${hash} AND revoked_at IS NULL
    `;
    return;
  }
  localSessions.delete(hash);
}

export async function consumeAdminLoginAttempt(key: string, maximumAttempts: number, windowSeconds: number) {
  const now = Date.now();
  const resetAt = new Date(now + windowSeconds * 1000);

  if (hasPersistentAdminSessionStorage()) {
    const sql = await ensureLoginAttemptTable();
    const rows = await sql`
      INSERT INTO capital_european_admin_login_attempts (attempt_key, attempt_count, reset_at, updated_at)
      VALUES (${key}, 1, ${resetAt.toISOString()}, NOW())
      ON CONFLICT (attempt_key)
      DO UPDATE SET
        attempt_count = CASE
          WHEN capital_european_admin_login_attempts.reset_at <= NOW() THEN 1
          ELSE capital_european_admin_login_attempts.attempt_count + 1
        END,
        reset_at = CASE
          WHEN capital_european_admin_login_attempts.reset_at <= NOW() THEN EXCLUDED.reset_at
          ELSE capital_european_admin_login_attempts.reset_at
        END,
        updated_at = NOW()
      RETURNING attempt_count
    `;
    return Number(rows[0]?.attempt_count || 0) > maximumAttempts;
  }

  const current = localLoginAttempts.get(key);
  if (!current || current.resetAt <= now) {
    localLoginAttempts.set(key, { count: 1, resetAt: resetAt.getTime() });
    return false;
  }
  current.count += 1;
  return current.count > maximumAttempts;
}

export async function clearAdminLoginAttempts(key: string) {
  if (hasPersistentAdminSessionStorage()) {
    const sql = await ensureLoginAttemptTable();
    await sql`
      DELETE FROM capital_european_admin_login_attempts
      WHERE attempt_key = ${key}
    `;
    return;
  }
  localLoginAttempts.delete(key);
}
