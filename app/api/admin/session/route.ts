import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  adminCookieOptions,
  adminLoginAttemptKey,
  adminSessionPolicy,
  createAdminSession,
  getAdminSession,
  hasValidAdminOrigin,
  isAdminConfigured,
  revokeCurrentAdminSession,
  verifyAdminCredentials
} from "@/lib/admin-auth";
import { clearAdminLoginAttempts, consumeAdminLoginAttempt } from "@/lib/admin-session-store";

export const runtime = "nodejs";

const LOGIN_WINDOW_SECONDS = 15 * 60;
const MAX_LOGIN_ATTEMPTS = 6;

function response(body: unknown, init?: ResponseInit) {
  const headers = new Headers(init?.headers);
  headers.set("Cache-Control", "no-store");
  return NextResponse.json(body, { ...init, headers });
}

function acceptsJson(request: Request) {
  return request.headers.get("content-type")?.startsWith("application/json");
}

async function parseBody(request: Request) {
  if (!acceptsJson(request)) throw new Error("Invalid content type");
  const body = await request.text();
  if (body.length > 2_000) throw new Error("Payload too large");
  return JSON.parse(body) as Record<string, unknown>;
}

async function authenticatedResponse(request: Request) {
  const session = await createAdminSession();
  const result = response({
    success: true,
    expiresAt: session.expiresAt,
    sessionPolicy: adminSessionPolicy()
  });
  result.cookies.set(ADMIN_COOKIE_NAME, session.token, adminCookieOptions(request));
  return result;
}

export async function GET() {
  const session = await getAdminSession();
  return response({
    configured: isAdminConfigured(),
    authenticated: Boolean(session),
    expiresAt: session?.expiresAt ?? null,
    sessionPolicy: adminSessionPolicy()
  });
}

export async function POST(request: Request) {
  if (!isAdminConfigured()) {
    return response({ message: "Administrarea nu este configurată complet." }, { status: 503 });
  }
  if (!hasValidAdminOrigin(request)) {
    return response({ message: "Cerere respinsă." }, { status: 403 });
  }

  const attemptKey = adminLoginAttemptKey(request);
  if (await consumeAdminLoginAttempt(attemptKey, MAX_LOGIN_ATTEMPTS, LOGIN_WINDOW_SECONDS)) {
    return response({ message: "Prea multe încercări. Reîncearcă peste 15 minute." }, { status: 429 });
  }

  let credentials: Record<string, unknown>;
  try {
    credentials = await parseBody(request);
  } catch {
    return response({ message: "Date de autentificare invalide." }, { status: 400 });
  }

  const username = typeof credentials.username === "string" ? credentials.username : "";
  const password = typeof credentials.password === "string" ? credentials.password : "";
  if (username.length > 120 || password.length > 300 || !verifyAdminCredentials(username, password)) {
    return response({ message: "Utilizator sau parolă incorectă." }, { status: 401 });
  }

  await clearAdminLoginAttempts(attemptKey);
  return authenticatedResponse(request);
}

export async function DELETE(request: Request) {
  if (!hasValidAdminOrigin(request)) {
    return response({ message: "Cerere respinsă." }, { status: 403 });
  }
  await revokeCurrentAdminSession();
  const result = response({ success: true });
  result.cookies.set(ADMIN_COOKIE_NAME, "", { ...adminCookieOptions(request), maxAge: 0 });
  return result;
}
