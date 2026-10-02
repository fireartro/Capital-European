"use client";

import Link from "next/link";
import { BarChart3, Check, LockKeyhole, MapPin, Megaphone, Settings2, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  COOKIE_SETTINGS_EVENT,
  type CookieConsent,
  isCurrentCookieConsent,
  readCookieConsent,
  reloadAfterConsentWithdrawal,
  subscribeCookieConsent,
  saveCookieConsent
} from "@/lib/cookie-consent";
import { analyticsPageParameters, setAnalyticsReady } from "@/lib/analytics";

type BannerView = "loading" | "banner" | "settings" | "hidden";

declare global {
  interface Window {
    clarity?: ((...args: unknown[]) => void) & { q?: unknown[][] };
  }
}

function deleteTrackingCookies(prefixes: readonly string[]) {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  const hostname = window.location.hostname;
  const domains = [hostname, `.${hostname}`];

  document.cookie.split(";").forEach((entry) => {
    const name = entry.split("=")[0]?.trim();
    if (!name || !prefixes.some((prefix) => name === prefix || name.startsWith(prefix))) return;

    document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=Lax${secure}`;
    domains.forEach((domain) => {
      document.cookie = `${name}=; Path=/; Domain=${domain}; Max-Age=0; SameSite=Lax${secure}`;
    });
  });
}

function appendTrackingScript(src: string, marker: string, onLoad?: () => void, onError?: () => void) {
  const existing = document.querySelector<HTMLScriptElement>(`script[${marker}]`);
  if (existing) {
    if (existing.dataset.loaded === "true") onLoad?.();
    else {
      if (onLoad) existing.addEventListener("load", onLoad, { once: true });
      if (onError) existing.addEventListener("error", onError, { once: true });
    }
    return;
  }

  const script = document.createElement("script");
  script.async = true;
  script.src = src;
  script.setAttribute(marker, "true");
  script.addEventListener("load", () => {
    script.dataset.loaded = "true";
    onLoad?.();
  }, { once: true });
  if (onError) script.addEventListener("error", onError, { once: true });
  document.head.appendChild(script);
}

function removeTrackingScript(marker: string) {
  document.querySelector(`script[${marker}]`)?.remove();
}

function reconcileTrackingConsent(consent: CookieConsent | null, googleAnalyticsId?: string) {
  const flags = window as unknown as Record<string, unknown>;
  const allowed = isCurrentCookieConsent(consent) && !window.location.pathname.startsWith("/admin");
  const analytics = allowed && consent.analytics;
  const marketing = allowed && consent.marketing;
  const analyticsWithdrawn = flags.__ceAnalyticsGranted === true && !analytics;
  const marketingWithdrawn = flags.__ceMarketingGranted === true && !marketing;
  flags.__ceAnalyticsGranted = analytics;
  flags.__ceMarketingGranted = marketing;

  if (googleAnalyticsId) flags[`ga-disable-${googleAnalyticsId}`] = !analytics;
  if (!analytics) setAnalyticsReady(false);

  window.gtag?.("consent", "update", {
    analytics_storage: analytics ? "granted" : "denied",
    ad_storage: marketing ? "granted" : "denied",
    ad_user_data: marketing ? "granted" : "denied",
    ad_personalization: marketing ? "granted" : "denied"
  });
  window.clarity?.("consentv2", {
    ad_Storage: marketing ? "granted" : "denied",
    analytics_Storage: analytics ? "granted" : "denied"
  });
  if (!analytics) {
    setAnalyticsReady(false);
    removeTrackingScript("data-ce-ga");
    removeTrackingScript("data-ce-clarity");
    deleteTrackingCookies(["_ga", "_gid", "_gat", "_cl", "CLID", "ANONCHK", "MR", "MUID", "SM"]);
  }
  if (!marketing) {
    removeTrackingScript("data-ce-gtm");
    deleteTrackingCookies(["_gcl"]);
  }

  // Removing a script cannot unload vendor listeners or queued requests. Reset the document on withdrawal.
  const needsReload = (analyticsWithdrawn && (flags.__ceGaInitialized || flags.__ceGtmInitialized || flags.__ceClarityInitialized))
    || (marketingWithdrawn && (flags.__ceGtmInitialized || flags.__ceClarityInitialized));
  if (needsReload && !flags.__ceTrackingReloading) {
    flags.__ceTrackingReloading = true;
    window.setTimeout(reloadAfterConsentWithdrawal, 0);
  }
  return { analytics, marketing, reloading: Boolean(flags.__ceTrackingReloading) };
}

function TrackingController({
  googleAnalyticsId,
  googleTagManagerId,
  clarityProjectId,
  consent
}: {
  googleAnalyticsId?: string;
  googleTagManagerId?: string;
  clarityProjectId?: string;
  consent: CookieConsent | null;
}) {
  const pathname = usePathname();

  useEffect(() => {
    let disposed = false;
    const flags = window as unknown as Record<string, unknown>;
    window.dataLayer ??= [];
    window.gtag ??= function gtag(...args: unknown[]) {
      void args;
      // Google consumes the native arguments object, not an array.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer?.push(arguments);
    };
    if (!flags.__ceConsentDefault) {
      window.gtag("consent", "default", {
        analytics_storage: "denied",
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied"
      });
      flags.__ceConsentDefault = true;
    }

    const current = reconcileTrackingConsent(readCookieConsent(), googleAnalyticsId);
    if (current.reloading) return;

    if (current.analytics && googleAnalyticsId && /^G-[A-Z0-9]+$/i.test(googleAnalyticsId)) {
      const page = analyticsPageParameters();
      if (!flags.__ceGaInitialized) {
        window.gtag("js", new Date());
        window.gtag("config", googleAnalyticsId, {
          ...page,
          send_page_view: false,
          allow_google_signals: false,
          allow_ad_personalization_signals: false,
          // Enhanced measurement must also be disabled in the GA property.
          ignore_referrer: true
        });
        flags.__ceGaInitialized = true;
      }
      window.gtag("set", page);
      // Dedupe effect replays/category-only changes, but count a later return to this route.
      if (flags.__ceLastPagePath !== pathname) {
        window.gtag("event", "page_view", { ...page, send_to: googleAnalyticsId });
        flags.__ceLastPagePath = pathname;
      }
      appendTrackingScript(
        `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(googleAnalyticsId)}`,
        "data-ce-ga",
        () => {
          if (!disposed && readCookieConsent()?.analytics && !flags.__ceTrackingReloading) setAnalyticsReady(true);
        },
        () => setAnalyticsReady(false)
      );
    }

    if (current.marketing && googleTagManagerId && /^GTM-[A-Z0-9]+$/i.test(googleTagManagerId) && !flags.__ceGtmInitialized) {
      flags.__ceGtmInitialized = true;
      window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
      appendTrackingScript(
        `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(googleTagManagerId)}`,
        "data-ce-gtm"
      );
    }

    if (current.analytics && clarityProjectId && /^[a-z0-9]+$/i.test(clarityProjectId) && !flags.__ceClarityInitialized) {
      const clarityQueue: unknown[][] = [];
      window.clarity ??= Object.assign((...args: unknown[]) => clarityQueue.push(args), { q: clarityQueue });
      window.clarity("consentv2", {
        ad_Storage: current.marketing ? "granted" : "denied",
        analytics_Storage: "granted"
      });
      flags.__ceClarityInitialized = true;
      appendTrackingScript(`https://www.clarity.ms/tag/${encodeURIComponent(clarityProjectId)}`, "data-ce-clarity");
    }

    return () => { disposed = true; };
  }, [clarityProjectId, consent, googleAnalyticsId, googleTagManagerId, pathname]);

  return null;
}

export function CookieBanner({
  googleAnalyticsId,
  googleTagManagerId,
  clarityProjectId
}: {
  googleAnalyticsId?: string;
  googleTagManagerId?: string;
  clarityProjectId?: string;
}) {
  const pathname = usePathname();
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [view, setView] = useState<BannerView>("loading");
  const [analyticsDraft, setAnalyticsDraft] = useState(false);
  const [marketingDraft, setMarketingDraft] = useState(false);
  const [externalContentDraft, setExternalContentDraft] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const unsubscribe = subscribeCookieConsent((current) => {
      reconcileTrackingConsent(current, googleAnalyticsId);
      setConsent(current);
      setAnalyticsDraft(current?.analytics ?? false);
      setMarketingDraft(current?.marketing ?? false);
      setExternalContentDraft(current?.externalContent ?? false);
      setView(current ? "hidden" : "banner");
    });
    const openSettings = () => {
      const current = readCookieConsent();
      reconcileTrackingConsent(current, googleAnalyticsId);
      setConsent(current);
      setAnalyticsDraft(current?.analytics ?? false);
      setMarketingDraft(current?.marketing ?? false);
      setExternalContentDraft(current?.externalContent ?? false);
      setView("settings");
    };
    window.addEventListener(COOKIE_SETTINGS_EVENT, openSettings);
    return () => {
      unsubscribe();
      window.removeEventListener(COOKIE_SETTINGS_EVENT, openSettings);
    };
  }, [googleAnalyticsId]);

  useEffect(() => {
    if (view !== "settings") return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusable = settingsRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), [tabindex]:not([tabindex="-1"])'
    );
    const first = focusable?.[0];
    const last = focusable?.[focusable.length - 1];
    (first ?? settingsRef.current)?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setView(consent ? "hidden" : "banner");
        return;
      }
      if (event.key !== "Tab" || !first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [consent, view]);

  const applyConsent = (analytics: boolean, marketing: boolean, externalContent: boolean) => {
    const nextConsent = saveCookieConsent({ analytics, marketing, externalContent });
    reconcileTrackingConsent(nextConsent, googleAnalyticsId);
    setConsent(nextConsent);
    setView(nextConsent ? "hidden" : "banner");
  };
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      <TrackingController
        googleAnalyticsId={googleAnalyticsId}
        googleTagManagerId={googleTagManagerId}
        clarityProjectId={clarityProjectId}
        consent={consent}
      />

      {!isAdmin && view === "banner" && (
        <section
          className="cookie-banner"
          role="dialog"
          aria-modal="false"
          aria-labelledby="cookie-banner-title"
          aria-describedby="cookie-banner-description"
        >
          <div className="cookie-banner-copy">
            <span className="cookie-banner-icon" aria-hidden="true"><LockKeyhole /></span>
            <div>
              <strong id="cookie-banner-title">Alege cum putem folosi cookie-urile</strong>
              <p id="cookie-banner-description">
                Folosim doar stocarea necesară pentru funcționare și memorarea alegerii tale.
                Analiza, marketingul și harta Google Maps rămân dezactivate până când accepți categoria corespunzătoare.
              </p>
              <div className="cookie-banner-links">
                <Link href="/cookies">Politica de cookies</Link>
                <Link href="/confidentialitate">Confidențialitate</Link>
              </div>
            </div>
          </div>
          <div className="cookie-banner-actions">
            <button type="button" className="cookie-button cookie-button-secondary" onClick={() => applyConsent(false, false, false)}>
              Refuză opționalele
            </button>
            <button type="button" className="cookie-button cookie-button-secondary" onClick={() => setView("settings")}>
              <Settings2 aria-hidden="true" /> Alege preferințele
            </button>
            <button type="button" className="cookie-button cookie-button-primary" onClick={() => applyConsent(true, true, true)}>
              Acceptă toate
            </button>
          </div>
        </section>
      )}

      {!isAdmin && view === "settings" && (
        <div className="cookie-preferences-backdrop">
          <div
            className="cookie-preferences"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-preferences-title"
            tabIndex={-1}
            ref={settingsRef}
          >
            <header className="cookie-preferences-header">
              <div>
                <span className="cookie-preferences-kicker">Controlul consimțământului</span>
                <h2 id="cookie-preferences-title">Preferințe pentru cookies</h2>
              </div>
              <button
                type="button"
                className="cookie-preferences-close"
                onClick={() => setView(consent ? "hidden" : "banner")}
                aria-label="Închide setările pentru cookies"
              >
                <X aria-hidden="true" />
              </button>
            </header>
            <p className="cookie-preferences-intro">
              Poți modifica opțiunile oricând. Cookie-urile strict necesare rămân active pentru securitate și memorarea alegerii. Harta are o categorie opțională separată.
            </p>

            <div className="cookie-category">
              <span className="cookie-category-icon"><LockKeyhole aria-hidden="true" /></span>
              <div>
                <h3>Strict necesare</h3>
                <p>Active permanent pentru funcționarea website-ului, securitate și memorarea consimțământului.</p>
              </div>
              <span className="cookie-category-required"><Check aria-hidden="true" /> Activ</span>
            </div>

            <label className="cookie-category cookie-category-toggle">
              <span className="cookie-category-icon"><BarChart3 aria-hidden="true" /></span>
              <span>
                <strong>Analiză audiență</strong>
                <small>
                  Permite Google Analytics și Microsoft Clarity, dacă sunt configurate, pentru statistici și analiza interacțiunilor agregate.
                </small>
              </span>
              <input
                type="checkbox"
                checked={analyticsDraft}
                onChange={(event) => setAnalyticsDraft(event.target.checked)}
                aria-label="Permite cookie-uri de analiză"
              />
            </label>

            <label className="cookie-category cookie-category-toggle">
              <span className="cookie-category-icon"><Megaphone aria-hidden="true" /></span>
              <span>
                <strong>Marketing și etichete</strong>
                <small>
                  Permite încărcarea Google Tag Manager. Etichetele publicate trebuie configurate să respecte preferințele salvate aici.
                </small>
              </span>
              <input
                type="checkbox"
                checked={marketingDraft}
                onChange={(event) => setMarketingDraft(event.target.checked)}
                aria-label="Permite cookie-uri de marketing"
              />
            </label>

            <label className="cookie-category cookie-category-toggle">
              <span className="cookie-category-icon"><MapPin aria-hidden="true" /></span>
              <span>
                <strong>Conținut extern — Google Maps</strong>
                <small>Încarcă harta de la Google, care poate primi adresa IP și date despre browser și poate utiliza propriile cookie-uri. Nu activează analiza sau marketingul.</small>
              </span>
              <input
                type="checkbox"
                checked={externalContentDraft}
                onChange={(event) => setExternalContentDraft(event.target.checked)}
                aria-label="Permite conținut extern Google Maps"
              />
            </label>

            <p className="cookie-preferences-note">
              Detalii despre durată, furnizori și retragerea consimțământului sunt disponibile în <Link href="/cookies">Politica de cookies</Link>.
            </p>

            <div className="cookie-preferences-actions">
              <button type="button" className="cookie-button cookie-button-secondary" onClick={() => applyConsent(false, false, false)}>
                Refuză opționalele
              </button>
              <button type="button" className="cookie-button cookie-button-primary" onClick={() => applyConsent(analyticsDraft, marketingDraft, externalContentDraft)}>
                Salvează preferințele
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
