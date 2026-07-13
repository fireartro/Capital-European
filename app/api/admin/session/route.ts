import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  ADMIN_MFA_CHALLENGE_COOKIE_NAME,
  adminCookieOptions,
  adminLoginAttemptKey,
  adminMfaChallengeCookieOptions,
  adminSessionPolicy,
  createAdminMfaChallengeToken,
  createAdminSession,
  getAdminSession,
  hasValidAdminOrigin,
  isAdminConfigured,
  revokeCurrentAdminSession,
  verifyAdminCredentials,
  verifyAdminMfaChallengeToken
} from "@/lib/admin-auth";
import {
  isAdminMfaConfigured,
  maskedAdminMfaPhone,
  sendAdminMfaCode,
  verifyAdminMfaCode
} from "@/lib/admin-mfa";
import { clearAdminLoginAttempts, consumeAdminLoginAttempt } from "@/lib/admin-session-store";

export const runtime = "nodejs";

const LOGIN_WINDOW_SECONDS = 15 * 60;
const MAX_LOGIN_ATTEMPTS = 6;
const MAX_MFA_ATTEMPTS = 5;

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
  result.cookies.set(ADMIN_MFA_CHALLENGE_COOKIE_NAME, "", { ...adminMfaChallengeCookieOptions(request), maxAge: 0 });
  return result;
}

export async function GET() {
  const session = await getAdminSession();
  return response({
    configured: isAdminConfigured(),
    authenticated: Boolean(session),
    expiresAt: session?.expiresAt ?? null,
    mfaEnabled: isAdminMfaConfigured(),
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
  if (!isAdminMfaConfigured()) return authenticatedResponse(request);

  try {
    await sendAdminMfaCode();
  } catch (error) {
    return response({ message: error instanceof Error ? error.message : "Codul SMS nu a putut fi trimis." }, { status: 502 });
  }

  const result = response({
    mfaRequired: true,
    destination: maskedAdminMfaPhone()
  }, { status: 202 });
  result.cookies.set(
    ADMIN_MFA_CHALLENGE_COOKIE_NAME,
    createAdminMfaChallengeToken(),
    adminMfaChallengeCookieOptions(request)
  );
  return result;
}

export async function PUT(request: Request) {
  if (!isAdminConfigured() || !isAdminMfaConfigured()) {
    return response({ message: "Verificarea SMS nu este disponibilă." }, { status: 503 });
  }
  if (!hasValidAdminOrigin(request)) {
    return response({ message: "Cerere respinsă." }, { status: 403 });
  }

  const cookieStore = await cookies();
  if (!verifyAdminMfaChallengeToken(cookieStore.get(ADMIN_MFA_CHALLENGE_COOKIE_NAME)?.value)) {
    return response({ message: "Verificarea a expirat. Reia autentificarea." }, { status: 401 });
  }

  const attemptKey = `${adminLoginAttemptKey(request)}:mfa`;
  if (await consumeAdminLoginAttempt(attemptKey, MAX_MFA_ATTEMPTS, LOGIN_WINDOW_SECONDS)) {
    return response({ message: "Prea multe coduri greșite. Reia autentificarea mai târziu." }, { status: 429 });
  }

  let code = "";
  try {
    const body = await parseBody(request);
    code = typeof body.code === "string" ? body.code.trim() : "";
  } catch {
    return response({ message: "Cod invalid." }, { status: 400 });
  }

  if (!await verifyAdminMfaCode(code)) {
    return response({ message: "Cod incorect sau expirat." }, { status: 401 });
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
  result.cookies.set(ADMIN_MFA_CHALLENGE_COOKIE_NAME, "", { ...adminMfaChallengeCookieOptions(request), maxAge: 0 });
  return result;
}
