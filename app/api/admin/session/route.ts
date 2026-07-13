import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  adminCookieOptions,
  createAdminSessionToken,
  hasValidAdminOrigin,
  isAdminAuthenticated,
  isAdminConfigured,
  verifyAdminCredentials
} from "@/lib/admin-auth";

export const runtime = "nodejs";

const WINDOW_MS = 15 * 60 * 1000;
const MAX_ATTEMPTS = 6;
const attempts = new Map<string, { count: number; resetAt: number }>();

function response(body: unknown, init?: ResponseInit) {
  const headers = new Headers(init?.headers);
  headers.set("Cache-Control", "no-store");
  return NextResponse.json(body, { ...init, headers });
}

function clientKey(request: Request) {
  return request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "local";
}

function isRateLimited(key: string) {
  const now = Date.now();
  for (const [entryKey, value] of attempts) {
    if (value.resetAt <= now) attempts.delete(entryKey);
  }
  const current = attempts.get(key);
  if (!current) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  current.count += 1;
  return current.count > MAX_ATTEMPTS;
}

export async function GET() {
  return response({ configured: isAdminConfigured(), authenticated: await isAdminAuthenticated() });
}

export async function POST(request: Request) {
  if (!isAdminConfigured()) {
    return response({ message: "Administrarea nu este configurată încă." }, { status: 503 });
  }
  if (!hasValidAdminOrigin(request)) {
    return response({ message: "Cerere respinsă." }, { status: 403 });
  }
  if (isRateLimited(clientKey(request))) {
    return response({ message: "Prea multe încercări. Reîncearcă peste 15 minute." }, { status: 429 });
  }

  let username = "";
  let password = "";
  try {
    const body = await request.text();
    if (body.length > 2_000) throw new Error("Payload too large");
    const credentials = JSON.parse(body) as { username?: unknown; password?: unknown };
    username = String(credentials.username || "");
    password = String(credentials.password || "");
  } catch {
    return response({ message: "Date de autentificare invalide." }, { status: 400 });
  }

  if (!verifyAdminCredentials(username, password)) {
    return response({ message: "Utilizator sau parolă incorectă." }, { status: 401 });
  }

  attempts.delete(clientKey(request));
  const result = response({ success: true });
  result.cookies.set(ADMIN_COOKIE_NAME, createAdminSessionToken(), adminCookieOptions(request));
  return result;
}

export async function DELETE(request: Request) {
  if (!hasValidAdminOrigin(request)) {
    return response({ message: "Cerere respinsă." }, { status: 403 });
  }
  const result = response({ success: true });
  result.cookies.set(ADMIN_COOKIE_NAME, "", { ...adminCookieOptions(request), maxAge: 0 });
  return result;
}
