"use client";

type AnalyticsValue = string | number | boolean | null | undefined;
type AnalyticsParameters = Record<string, AnalyticsValue>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    __capitalEuropeanAnalyticsReady?: boolean;
  }
}

function cleanParameters(parameters: AnalyticsParameters) {
  return Object.fromEntries(
    Object.entries(parameters).filter(([, value]) => value !== undefined && value !== null && value !== "")
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
    typeof window.gtag !== "function"
  ) {
    return false;
  }

  window.gtag("event", name, cleanParameters(parameters));
  return true;
}
