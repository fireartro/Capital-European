import { NextResponse } from "next/server";
import { z } from "zod";
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
import { BodyTooLargeError, readLimitedBody } from "@/lib/request-body";

export const runtime = "nodejs";

const LOGIN_WINDOW_SECONDS = 15 * 60;
const MAX_LOGIN_ATTEMPTS = 6;
const loginSchema = z.object({
  username: z.string().trim().min(3).max(120),
  password: z.string().min(12).max(300)
});

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
  const body = await readLimitedBody(request, 2_000);
  return loginSchema.parse(JSON.parse(body.toString("utf8")));
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
  try {
    if (await consumeAdminLoginAttempt(attemptKey, MAX_LOGIN_ATTEMPTS, LOGIN_WINDOW_SECONDS)) {
      return response({ message: "Prea multe încercări. Reîncearcă peste 15 minute." }, { status: 429 });
    }
  } catch {
    return response({ message: "Autentificarea este temporar indisponibilă." }, { status: 503 });
  }

  let credentials: z.infer<typeof loginSchema>;
  try {
    credentials = await parseBody(request);
  } catch (error) {
    if (error instanceof BodyTooLargeError) {
      return response({ message: "Solicitarea este prea mare." }, { status: 413 });
    }
    return response({ message: "Date de autentificare invalide." }, { status: 400 });
  }

  if (!await verifyAdminCredentials(credentials.username, credentials.password)) {
    return response({ message: "Utilizator sau parolă incorectă." }, { status: 401 });
  }

  try {
    await clearAdminLoginAttempts(attemptKey);
    return await authenticatedResponse(request);
  } catch {
    return response({ message: "Autentificarea este temporar indisponibilă." }, { status: 503 });
  }
}

export async function DELETE(request: Request) {
  if (!hasValidAdminOrigin(request)) {
    return response({ message: "Cerere respinsă." }, { status: 403 });
  }
  try {
    await revokeCurrentAdminSession();
  } catch {
    return response({ message: "Sesiunea nu a putut fi revocată. Reîncearcă deconectarea." }, { status: 503 });
  }
  const result = response({ success: true });
  result.cookies.set(ADMIN_COOKIE_NAME, "", { ...adminCookieOptions(request), maxAge: 0 });
  return result;
}
