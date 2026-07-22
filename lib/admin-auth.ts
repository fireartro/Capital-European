import "server-only";

import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "node:crypto";
import {
  createAdminSessionRecord,
  hasPersistentAdminSessionStorage,
  revokeAdminSessionRecord,
  verifyAdminSessionRecord
} from "@/lib/admin-session-store";

export const ADMIN_COOKIE_NAME = "capital_admin_session";

function boundedMinutes(value: string | undefined, fallback: number, minimum: number, maximum: number) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? Math.min(maximum, Math.max(minimum, Math.round(parsed))) : fallback;
}

export function adminSessionPolicy() {
  const durationMinutes = boundedMinutes(process.env.ADMIN_SESSION_DURATION_MINUTES, 60, 15, 240);
  const idleMinutes = boundedMinutes(process.env.ADMIN_IDLE_TIMEOUT_MINUTES, 15, 5, durationMinutes);
  return {
    durationSeconds: durationMinutes * 60,
    idleTimeoutSeconds: idleMinutes * 60
  };
}

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
  const baseConfigured = adminUsername().length >= 3 && adminPassword().length >= 12 && sessionSecret().length >= 32;
  const storageConfigured = process.env.NODE_ENV !== "production" || hasPersistentAdminSessionStorage();
  return baseConfigured && storageConfigured;
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

export async function createAdminSession() {
  return createAdminSessionRecord(adminSessionPolicy().durationSeconds);
}

export async function getAdminSession() {
  const cookieStore = await cookies();
  return verifyAdminSessionRecord(
    cookieStore.get(ADMIN_COOKIE_NAME)?.value,
    adminSessionPolicy().idleTimeoutSeconds
  );
}

export async function isAdminAuthenticated() {
  return Boolean(await getAdminSession());
}

export async function revokeCurrentAdminSession() {
  const cookieStore = await cookies();
  await revokeAdminSessionRecord(cookieStore.get(ADMIN_COOKIE_NAME)?.value);
}

function isLoopbackHostname(hostname: string) {
  return hostname === "localhost" || hostname === "127.0.0.1" || hostname === "::1";
}

function cookieSecurity(request?: Request) {
  const requestIsLoopback = request ? isLoopbackHostname(new URL(request.url).hostname) : false;
  return {
    httpOnly: true,
    sameSite: "strict" as const,
    secure: process.env.NODE_ENV === "production" && !requestIsLoopback,
    path: "/"
  };
}

export function adminCookieOptions(request?: Request) {
  return { ...cookieSecurity(request), maxAge: adminSessionPolicy().durationSeconds };
}

export function adminLoginAttemptKey(request: Request) {
  const forwardedIp = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  const clientIp = forwardedIp || request.headers.get("x-real-ip")?.trim() || "unknown";
  return createHmac("sha256", sessionSecret()).update(clientIp).digest("base64url");
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
