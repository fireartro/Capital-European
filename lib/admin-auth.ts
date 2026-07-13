import "server-only";

import { cookies } from "next/headers";
import { createHmac, randomUUID, timingSafeEqual } from "node:crypto";

export const ADMIN_COOKIE_NAME = "capital_admin_session";
const SESSION_DURATION_SECONDS = 8 * 60 * 60;

function adminPassword() {
  return process.env.ADMIN_PASSWORD?.trim() || "";
}

function adminUsername() {
  return process.env.ADMIN_USERNAME?.trim().toLowerCase() || "";
}

function sessionSecret() {
  return process.env.ADMIN_SESSION_SECRET?.trim() || "";
}

export function isAdminConfigured() {
  return adminUsername().length >= 3 && adminPassword().length >= 12 && sessionSecret().length >= 32;
}

function signature(payload: string) {
  return createHmac("sha256", sessionSecret()).update(payload).digest("base64url");
}

function safeEqual(left: string, right: string) {
  const leftHash = createHmac("sha256", "comparison").update(left).digest();
  const rightHash = createHmac("sha256", "comparison").update(right).digest();
  return timingSafeEqual(leftHash, rightHash);
}

export function verifyAdminCredentials(username: string, password: string) {
  return isAdminConfigured()
    && safeEqual(username.trim().toLowerCase(), adminUsername())
    && safeEqual(password, adminPassword());
}

export function createAdminSessionToken() {
  const issuedAt = Math.floor(Date.now() / 1000);
  const expiresAt = issuedAt + SESSION_DURATION_SECONDS;
  const payload = `${issuedAt}.${expiresAt}.${randomUUID()}`;
  return `${payload}.${signature(payload)}`;
}

export function verifyAdminSessionToken(token: string | undefined) {
  if (!token || !isAdminConfigured()) return false;
  const segments = token.split(".");
  if (segments.length !== 4) return false;
  const [issuedAt, expiresAt, nonce, receivedSignature] = segments;
  if (!/^\d+$/.test(issuedAt) || !/^\d+$/.test(expiresAt) || !nonce || !receivedSignature) return false;
  const payload = `${issuedAt}.${expiresAt}.${nonce}`;
  const expectedSignature = signature(payload);
  if (!safeEqual(receivedSignature, expectedSignature)) return false;

  const now = Math.floor(Date.now() / 1000);
  return Number(issuedAt) <= now + 60 && Number(expiresAt) > now;
}

export async function isAdminAuthenticated() {
  const cookieStore = await cookies();
  return verifyAdminSessionToken(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
}

function isLoopbackHostname(hostname: string) {
  return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1";
}

export function adminCookieOptions(request?: Request) {
  const requestIsLoopback = request ? isLoopbackHostname(new URL(request.url).hostname) : false;
  return {
    httpOnly: true,
    sameSite: "strict" as const,
    secure: process.env.NODE_ENV === "production" && !requestIsLoopback,
    path: "/",
    maxAge: SESSION_DURATION_SECONDS
  };
}

export function hasValidAdminOrigin(request: Request) {
  if (request.headers.get("x-requested-with") !== "XMLHttpRequest") return false;
  if (request.headers.get("sec-fetch-site") === "cross-site") return false;
  const origin = request.headers.get("origin");
  if (!origin) return process.env.NODE_ENV !== "production";

  try {
    const originUrl = new URL(origin);
    const requestUrl = new URL(request.url);
    const hostHeader = request.headers.get("host")?.toLowerCase();
    const allowedHosts = new Set([requestUrl.host.toLowerCase(), hostHeader].filter((value): value is string => Boolean(value)));
    const protocolAllowed = process.env.NODE_ENV === "production"
      ? originUrl.protocol === "https:" || (originUrl.protocol === "http:" && isLoopbackHostname(originUrl.hostname))
      : originUrl.protocol === "http:" || originUrl.protocol === "https:";
    return protocolAllowed && allowedHosts.has(originUrl.host.toLowerCase());
  } catch {
    return false;
  }
}
