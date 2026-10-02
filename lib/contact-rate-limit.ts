import "server-only";

import { neon } from "@neondatabase/serverless";
import { createHash } from "node:crypto";

const localAttempts = new Map<string, { count: number; resetAt: number }>();

export async function consumeContactAttempt(clientIp: string, maximumAttempts: number, windowSeconds: number) {
  const key = createHash("sha256").update(clientIp).digest("hex");
  const databaseUrl = process.env.DATABASE_URL?.trim() || process.env.POSTGRES_URL?.trim();

  if (databaseUrl) {
    const sql = neon(databaseUrl);
    await sql`
      CREATE TABLE IF NOT EXISTS capital_european_contact_attempts (
        attempt_key TEXT PRIMARY KEY,
        attempt_count INTEGER NOT NULL,
        reset_at TIMESTAMPTZ NOT NULL
      )
    `;
    await sql`DELETE FROM capital_european_contact_attempts WHERE reset_at <= NOW()`;
    const rows = await sql`
      INSERT INTO capital_european_contact_attempts (attempt_key, attempt_count, reset_at)
      VALUES (${key}, 1, NOW() + ${windowSeconds} * INTERVAL '1 second')
      ON CONFLICT (attempt_key)
      DO UPDATE SET
        attempt_count = CASE
          WHEN capital_european_contact_attempts.reset_at <= NOW() THEN 1
          ELSE LEAST(capital_european_contact_attempts.attempt_count + 1, ${maximumAttempts + 1})
        END,
        reset_at = CASE
          WHEN capital_european_contact_attempts.reset_at <= NOW() THEN EXCLUDED.reset_at
          ELSE capital_european_contact_attempts.reset_at
        END
      RETURNING attempt_count
    `;
    const count = Number(rows[0]?.attempt_count);
    if (!Number.isInteger(count) || count < 1) throw new Error("Contact rate limit unavailable.");
    return count > maximumAttempts;
  }

  // A process-local counter is only suitable for development, never production.
  if (process.env.NODE_ENV === "production") throw new Error("Persistent contact rate limit is not configured.");

  const now = Date.now();
  for (const [attemptKey, attempt] of localAttempts) {
    if (attempt.resetAt <= now) localAttempts.delete(attemptKey);
  }
  const current = localAttempts.get(key);
  if (!current) {
    localAttempts.set(key, { count: 1, resetAt: now + windowSeconds * 1000 });
    return false;
  }
  current.count = Math.min(current.count + 1, maximumAttempts + 1);
  return current.count > maximumAttempts;
}
