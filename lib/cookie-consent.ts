const COOKIE_CONSENT_VERSION = 3;
const COOKIE_CONSENT_KEY = "ce_cookie_consent_v3";
export const COOKIE_SETTINGS_EVENT = "capital-european:open-cookie-settings";
export const COOKIE_CONSENT_EVENT = "capital-european:cookie-consent";

const LEGACY_CONSENT_KEY = "cookieConsent";
const PREVIOUS_CONSENT_KEY = "ce_cookie_consent_v2";
const CONSENT_MAX_AGE = 60 * 60 * 24 * 180;

export type CookieConsent = {
  version: typeof COOKIE_CONSENT_VERSION;
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
};

export type CookiePreferences = Pick<CookieConsent, "analytics" | "marketing">;

function isCookieConsent(value: unknown): value is CookieConsent {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<CookieConsent>;
  return candidate.version === COOKIE_CONSENT_VERSION
    && candidate.necessary === true
    && typeof candidate.analytics === "boolean"
    && typeof candidate.marketing === "boolean"
    && typeof candidate.updatedAt === "string";
}

function readCookie(name: string) {
  if (typeof document === "undefined") return null;
  const prefix = `${name}=`;
  const entry = document.cookie.split("; ").find((item) => item.startsWith(prefix));
  return entry ? decodeURIComponent(entry.slice(prefix.length)) : null;
}

function parseConsent(value: string | null) {
  if (!value) return null;
  try {
    const parsed: unknown = JSON.parse(value);
    return isCookieConsent(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function hasCurrentTimestamp(consent: CookieConsent) {
  const updatedAt = Date.parse(consent.updatedAt);
  if (!Number.isFinite(updatedAt)) return false;

  const now = Date.now();
  const maxFutureSkew = 5 * 60 * 1000;
  return updatedAt <= now + maxFutureSkew && now - updatedAt <= CONSENT_MAX_AGE * 1000;
}

function clearStoredConsent() {
  try {
    window.localStorage.removeItem(COOKIE_CONSENT_KEY);
  } catch {
    // Storage can be unavailable in privacy-restricted browsers.
  }
}

function clearConsentCookie() {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE_CONSENT_KEY}=; Path=/; Max-Age=0; SameSite=Lax${secure}`;
}

export function readCookieConsent() {
  if (typeof window === "undefined") return null;

  try {
    const stored = parseConsent(window.localStorage.getItem(COOKIE_CONSENT_KEY));
    if (stored && hasCurrentTimestamp(stored)) return stored;
    if (stored) clearStoredConsent();
  } catch {
    // The cookie fallback remains available when storage is blocked.
  }

  const cookieConsent = parseConsent(readCookie(COOKIE_CONSENT_KEY));
  if (cookieConsent && hasCurrentTimestamp(cookieConsent)) return cookieConsent;
  if (cookieConsent) clearConsentCookie();
  return null;
}

export function saveCookieConsent(preferences: CookiePreferences) {
  const consent: CookieConsent = {
    version: COOKIE_CONSENT_VERSION,
    necessary: true,
    analytics: preferences.analytics,
    marketing: preferences.marketing,
    updatedAt: new Date().toISOString()
  };

  const serialized = JSON.stringify(consent);

  try {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, serialized);
    window.localStorage.removeItem(LEGACY_CONSENT_KEY);
    window.localStorage.removeItem(PREVIOUS_CONSENT_KEY);
  } catch {
    // Continue with the first-party cookie when localStorage is unavailable.
  }

  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${COOKIE_CONSENT_KEY}=${encodeURIComponent(serialized)}; Path=/; Max-Age=${CONSENT_MAX_AGE}; SameSite=Lax${secure}`;
  document.cookie = `${LEGACY_CONSENT_KEY}=; Path=/; Max-Age=0; SameSite=Lax${secure}`;
  document.cookie = `${PREVIOUS_CONSENT_KEY}=; Path=/; Max-Age=0; SameSite=Lax${secure}`;

  window.dispatchEvent(new CustomEvent<CookieConsent>(COOKIE_CONSENT_EVENT, { detail: consent }));
  return consent;
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT));
}
