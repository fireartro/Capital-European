import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";
import { siteConfig } from "@/lib/site-config";

export const runtime = "nodejs";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_REQUESTS = 5;
const MAX_BODY_LENGTH = 12_000;
const attempts = new Map<string, { count: number; resetAt: number }>();

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  const candidate = forwarded?.split(",")[0]?.trim();
  if (candidate && /^[a-fA-F0-9:.]{3,45}$/.test(candidate)) return candidate;
  return "local";
}

function pruneAttempts(now: number) {
  for (const [key, value] of attempts) {
    if (value.resetAt < now) attempts.delete(key);
  }
}

function isRateLimited(key: string) {
  const now = Date.now();
  pruneAttempts(now);
  const current = attempts.get(key);

  if (!current || current.resetAt < now) {
    attempts.set(key, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }

  current.count += 1;
  attempts.set(key, current);
  return current.count > MAX_REQUESTS;
}

function hasValidOrigin(request: Request) {
  const origin = request.headers.get("origin");
  const fetchSite = request.headers.get("sec-fetch-site");
  if (fetchSite === "cross-site") return false;
  if (!origin) return fetchSite !== "cross-site";

  try {
    const originUrl = new URL(origin);
    const requestUrl = new URL(request.url);
    const publicUrl = new URL(siteConfig.url);
    const localHosts = new Set(["127.0.0.1", "localhost", "::1"]);
    const isLocalRequest = localHosts.has(requestUrl.hostname);
    if (
      isLocalRequest &&
      localHosts.has(originUrl.hostname) &&
      originUrl.port === requestUrl.port &&
      ["http:", "https:"].includes(originUrl.protocol)
    ) {
      return true;
    }

    const productionHosts = [publicUrl.host, publicUrl.host.startsWith("www.") ? publicUrl.host.slice(4) : `www.${publicUrl.host}`];
    const allowedHosts = process.env.NODE_ENV === "production"
      ? new Set(productionHosts)
      : new Set([request.headers.get("host"), requestUrl.host, publicUrl.host].filter(Boolean));
    const allowedProtocols = process.env.NODE_ENV === "production"
      ? new Set(["https:"])
      : new Set(["http:", "https:"]);

    return allowedHosts.has(originUrl.host) && allowedProtocols.has(originUrl.protocol);
  } catch {
    return false;
  }
}

function jsonResponse(body: unknown, init?: ResponseInit) {
  const headers = new Headers(init?.headers);
  headers.set("Cache-Control", "no-store");
  return NextResponse.json(body, { ...init, headers });
}

export async function POST(request: Request) {
  if (!request.headers.get("content-type")?.startsWith("application/json")) {
    return jsonResponse({ message: "Tip de conținut invalid." }, { status: 415 });
  }

  if (!hasValidOrigin(request)) {
    return jsonResponse({ message: "Cerere respinsă." }, { status: 403 });
  }

  const contentLength = Number(request.headers.get("content-length") || 0);
  if (contentLength > MAX_BODY_LENGTH) {
    return jsonResponse({ message: "Solicitarea este prea mare." }, { status: 413 });
  }

  if (isRateLimited(getClientIp(request))) {
    return jsonResponse(
      { message: "Prea multe solicitări. Încearcă din nou peste câteva minute." },
      { status: 429, headers: { "Retry-After": "600" } }
    );
  }

  let payload: unknown;
  try {
    const body = await request.text();
    if (body.length > MAX_BODY_LENGTH) {
      return jsonResponse({ message: "Solicitarea este prea mare." }, { status: 413 });
    }
    payload = JSON.parse(body);
  } catch {
    return jsonResponse({ message: "Format invalid." }, { status: 400 });
  }

  const result = contactSchema.safeParse(payload);
  if (!result.success) {
    return jsonResponse(
      { message: "Verifică datele introduse.", issues: result.error.flatten().fieldErrors },
      { status: 400 }
    );
  }

  // Honeypot anti-spam: răspuns neutru, fără a confirma detectarea botului.
  if (result.data.website) {
    return jsonResponse({ success: true }, { status: 202 });
  }

  const webhook = process.env.CONTACT_WEBHOOK_URL;
  if (webhook) {
    let target: URL;
    try {
      target = new URL(webhook);
    } catch {
      return jsonResponse({ message: "Serviciul de contact nu este configurat corect." }, { status: 503 });
    }

    if (target.protocol !== "https:") {
      return jsonResponse({ message: "Serviciul de contact nu este configurat corect." }, { status: 503 });
    }

    try {
      const response = await fetch(target, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
        redirect: "error",
        signal: AbortSignal.timeout(8_000)
      });

      if (!response.ok) {
        return jsonResponse({ message: "Mesajul nu a putut fi trimis momentan." }, { status: 502 });
      }
    } catch {
      return jsonResponse({ message: "Mesajul nu a putut fi trimis momentan." }, { status: 502 });
    }
  } else if (new URL(request.url).hostname === "127.0.0.1" || new URL(request.url).hostname === "localhost") {
    return jsonResponse({ success: true, demo: true }, { status: 201 });
  } else if (process.env.NODE_ENV === "production") {
    return jsonResponse({ message: "Serviciul de contact este în curs de configurare." }, { status: 503 });
  }

  return jsonResponse({ success: true }, { status: 201 });
}
