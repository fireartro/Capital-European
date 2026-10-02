const COOKIE_CONSENT_VERSION = 4;
const COOKIE_CONSENT_KEY = "ce_cookie_consent_v4";
export const COOKIE_SETTINGS_EVENT = "capital-european:open-cookie-settings";
export const COOKIE_CONSENT_EVENT = "capital-european:cookie-consent";

const PREVIOUS_KEYS = ["cookieConsent", "ce_cookie_consent_v2", "ce_cookie_consent_v3"];
const CONSENT_CHANNEL = "capital-european:consent-sync";
const CONSENT_MAX_AGE = 60 * 60 * 24 * 180;
let volatileConsent: CookieConsent | null = null;
const WITHDRAWAL_MARKER = "ce-privacy";
let forcedRefusal: CookieConsent | null = null;

export type CookieConsent = {
  version: typeof COOKIE_CONSENT_VERSION;
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  externalContent: boolean;
  updatedAt: string;
};

export type CookiePreferences = Pick<CookieConsent, "analytics" | "marketing" | "externalContent">;

export function isCurrentCookieConsent(value: unknown): value is CookieConsent {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Partial<CookieConsent>;
  const updatedAt = typeof candidate.updatedAt === "string" ? Date.parse(candidate.updatedAt) : NaN;
  const now = Date.now();
  return candidate.version === COOKIE_CONSENT_VERSION
    && candidate.necessary === true
    && typeof candidate.analytics === "boolean"
    && typeof candidate.marketing === "boolean"
    && typeof candidate.externalContent === "boolean"
    && Number.isFinite(updatedAt)
    && updatedAt <= now + 5 * 60 * 1000
    && now - updatedAt < CONSENT_MAX_AGE * 1000;
}

function readCookie(name: string) {
  try {
    const prefix = `${name}=`;
    const entry = document.cookie.split(";").map((item) => item.trim()).find((item) => item.startsWith(prefix));
    return entry ? decodeURIComponent(entry.slice(prefix.length)) : null;
  } catch {
    return null;
  }
}

function parseConsent(value: string | null) {
  try {
    const parsed: unknown = value ? JSON.parse(value) : null;
    return isCurrentCookieConsent(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

function clearCookie(name: string) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  try {
    document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=Lax${secure}`;
  } catch {
    // Storage restrictions must not prevent withdrawal in the current document.
  }
}

function clearPreviousConsent() {
  // Old choices did not cover external content. Never infer consent for a new purpose.
  for (const key of PREVIOUS_KEYS) {
    try {
      if (window.localStorage.getItem(key) !== null) window.localStorage.removeItem(key);
    } catch {
      // Cookies remain usable when storage is unavailable.
    }
    if (readCookie(key) !== null) clearCookie(key);
  }
}

export function readCookieConsent() {
  if (typeof window === "undefined") return null;
  clearPreviousConsent();

  // If all persistence is blocked, carry a fail-closed choice across the vendor-unloading reload.
  if (!forcedRefusal && new URL(window.location.href).searchParams.get(WITHDRAWAL_MARKER) === "denied") {
    forcedRefusal = {
      version: COOKIE_CONSENT_VERSION, necessary: true,
      analytics: false, marketing: false, externalContent: false,
      updatedAt: new Date().toISOString()
    };
  }
  if (forcedRefusal) {
    const url = new URL(window.location.href);
    if (url.searchParams.get(WITHDRAWAL_MARKER) !== "denied") {
      url.searchParams.set(WITHDRAWAL_MARKER, "denied");
      window.history.replaceState(window.history.state, "", url.href);
    }
    return isCurrentCookieConsent(forcedRefusal) ? forcedRefusal : null;
  }

  let serialized: string | null = null;
  try {
    serialized = window.localStorage.getItem(COOKIE_CONSENT_KEY);
  } catch {
    // A readable cookie may still be available.
  }
  const stored = parseConsent(serialized);
  const fallback = parseConsent(readCookie(COOKIE_CONSENT_KEY));
  if (volatileConsent && !isCurrentCookieConsent(volatileConsent)) volatileConsent = null;
  // A failed write can leave an older localStorage value next to a newer cookie.
  const candidates = [volatileConsent, fallback, stored].filter(isCurrentCookieConsent);
  const current = candidates.sort((a, b) => Date.parse(b.updatedAt) - Date.parse(a.updatedAt))[0];
  if (current) return current;
  if (serialized !== null) {
    try { window.localStorage.removeItem(COOKIE_CONSENT_KEY); } catch { /* Fail closed. */ }
  }
  clearCookie(COOKIE_CONSENT_KEY);
  return null;
}

export function saveCookieConsent(preferences: CookiePreferences) {
  const previous = readCookieConsent();
  forcedRefusal = null;
  const consent: CookieConsent = {
    version: COOKIE_CONSENT_VERSION,
    necessary: true,
    analytics: preferences.analytics === true,
    marketing: preferences.marketing === true,
    externalContent: preferences.externalContent === true,
    updatedAt: new Date(Math.max(Date.now(), previous ? Date.parse(previous.updatedAt) + 1 : 0)).toISOString()
  };
  const serialized = JSON.stringify(consent);
  clearPreviousConsent();
  try {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, serialized);
    clearCookie(COOKIE_CONSENT_KEY);
    volatileConsent = null;
  } catch {
    try { window.localStorage.removeItem(COOKIE_CONSENT_KEY); } catch { /* The newer cookie wins. */ }
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    try {
      document.cookie = `${COOKIE_CONSENT_KEY}=${encodeURIComponent(serialized)}; Path=/; Max-Age=${CONSENT_MAX_AGE}; SameSite=Lax${secure}`;
    } catch { /* Preserve the choice in memory if all persistence is blocked. */ }
    volatileConsent = parseConsent(readCookie(COOKIE_CONSENT_KEY))?.updatedAt === consent.updatedAt ? null : consent;
  }

  const url = new URL(window.location.href);
  if (volatileConsent && (!consent.analytics || !consent.marketing || !consent.externalContent)) {
    // With no writable storage, a reload must never revive an older, broader approval.
    forcedRefusal = { ...consent, analytics: false, marketing: false, externalContent: false };
    url.searchParams.set(WITHDRAWAL_MARKER, "denied");
    window.history.replaceState(window.history.state, "", url.href);
  } else if (url.searchParams.has(WITHDRAWAL_MARKER)) {
    url.searchParams.delete(WITHDRAWAL_MARKER);
    window.history.replaceState(window.history.state, "", url.href);
  }

  window.dispatchEvent(new Event(COOKIE_CONSENT_EVENT));
  try {
    const channel = new BroadcastChannel(CONSENT_CHANNEL);
    channel.postMessage(readCookieConsent());
    channel.close();
  } catch {
    // The storage event and focus checks cover browsers without BroadcastChannel.
  }
  return readCookieConsent();
}

export function reloadAfterConsentWithdrawal() {
  const current = readCookieConsent();
  let stored: CookieConsent | null = null;
  try { stored = parseConsent(window.localStorage.getItem(COOKIE_CONSENT_KEY)); } catch { /* Cookie fallback below. */ }
  const fallback = parseConsent(readCookie(COOKIE_CONSENT_KEY));
  const matches = (value: CookieConsent | null) => current && value
    && value.updatedAt === current.updatedAt
    && value.analytics === current.analytics && value.marketing === current.marketing
    && value.externalContent === current.externalContent;
  if (matches(stored) || matches(fallback)) {
    window.location.reload();
  } else {
    const url = new URL(window.location.href);
    url.searchParams.set(WITHDRAWAL_MARKER, "denied");
    window.location.replace(url.href);
  }
}

export function subscribeCookieConsent(onChange: (consent: CookieConsent | null) => void) {
  let timer: ReturnType<typeof setTimeout>;
  let previous: string | undefined;
  const refresh = () => {
    clearTimeout(timer);
    const consent = readCookieConsent();
    const serialized = JSON.stringify(consent);
    if (serialized !== previous) {
      previous = serialized;
      onChange(consent);
    }
    const remaining = consent ? Date.parse(consent.updatedAt) + CONSENT_MAX_AGE * 1000 - Date.now() : 60_000;
    timer = setTimeout(refresh, Math.max(1, Math.min(60_000, remaining)));
  };
  const onStorage = (event: StorageEvent) => {
    if (event.key === null || event.key === COOKIE_CONSENT_KEY || PREVIOUS_KEYS.includes(event.key)) {
      volatileConsent = null;
      refresh();
    }
  };
  let channel: BroadcastChannel | undefined;
  try {
    channel = new BroadcastChannel(CONSENT_CHANNEL);
    channel.addEventListener("message", (event: MessageEvent<unknown>) => {
      if (isCurrentCookieConsent(event.data)) {
        const current = readCookieConsent();
        if (!current || Date.parse(event.data.updatedAt) >= Date.parse(current.updatedAt)) volatileConsent = event.data;
      }
      refresh();
    });
  } catch {
    // Optional cross-tab transport for the cookie-only fallback.
  }
  window.addEventListener(COOKIE_CONSENT_EVENT, refresh);
  window.addEventListener("storage", onStorage);
  window.addEventListener("focus", refresh);
  document.addEventListener("visibilitychange", refresh);
  refresh();
  return () => {
    clearTimeout(timer);
    channel?.close();
    window.removeEventListener(COOKIE_CONSENT_EVENT, refresh);
    window.removeEventListener("storage", onStorage);
    window.removeEventListener("focus", refresh);
    document.removeEventListener("visibilitychange", refresh);
  };
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(COOKIE_SETTINGS_EVENT));
}
