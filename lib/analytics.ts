"use client";

import { readCookieConsent } from "@/lib/cookie-consent";

type AnalyticsValue = string | number | boolean | null | undefined;
type AnalyticsParameters = Record<string, AnalyticsValue>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __capitalEuropeanAnalyticsReady?: boolean;
  }
}

const PUBLIC_PATHS = new Set([
  "/", "/fonduri-europene", "/consultanta-fonduri-europene", "/fonduri-europene-pentru-firme",
  "/fonduri-europene-pentru-ong", "/fonduri-europene-pentru-startup", "/servicii-administrative",
  "/servicii-administrative/secretariat", "/servicii-administrative/administrare-documente",
  "/servicii-administrative/infiintare-firma", "/servicii-administrative/infiintare-pfa",
  "/servicii-administrative/infiintare-srl", "/anunturi", "/contact", "/despre", "/intrebari",
  "/cookies", "/confidentialitate", "/termeni"
]);

export function sanitizeAnalyticsUrl(value: string) {
  try {
    const url = new URL(value, window.location.origin);
    if (!/^https?:$/.test(url.protocol) || url.username || url.password) return "";
    // The query allowlist is deliberately empty. Unknown/dynamic paths can contain private data.
    const local = url.origin === window.location.origin;
    const path = local && PUBLIC_PATHS.has(url.pathname) ? url.pathname
      : local && /^\/anunturi\/[a-z0-9]+(?:-[a-z0-9]+)*\/?$/.test(url.pathname) ? "/anunturi/articol" : "/";
    return `${url.origin}${path}`;
  } catch {
    return "";
  }
}

export function analyticsPageParameters() {
  const pageLocation = sanitizeAnalyticsUrl(window.location.href);
  return {
    page_location: pageLocation,
    page_path: new URL(pageLocation).pathname,
    page_referrer: document.referrer ? sanitizeAnalyticsUrl(document.referrer) : "",
    page_title: "Capital European"
  };
}

function cleanParameters(parameters: AnalyticsParameters) {
  return Object.fromEntries(
    Object.entries(parameters)
      .map(([key, value]) => [key, typeof value === "string" && /(?:url|location|referrer|path)$/i.test(key)
        ? sanitizeAnalyticsUrl(value) : value])
      .filter(([, value]) => value !== undefined && value !== null && value !== "")
  );
}

export function setAnalyticsReady(ready: boolean) {
  if (typeof window === "undefined") return;
  window.__capitalEuropeanAnalyticsReady = ready;
}

export function trackAnalyticsEvent(name: string, parameters: AnalyticsParameters = {}) {
  if (
    typeof window === "undefined" ||
    !window.__capitalEuropeanAnalyticsReady ||
    typeof window.gtag !== "function" ||
    !readCookieConsent()?.analytics ||
    window.location.pathname.startsWith("/admin")
  ) {
    return false;
  }

  window.gtag("event", name, { ...cleanParameters(parameters), ...analyticsPageParameters() });
  return true;
}
