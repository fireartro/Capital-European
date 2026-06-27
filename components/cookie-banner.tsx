"use client";

import Link from "next/link";
import { BarChart3, Check, LockKeyhole, Megaphone, Settings2, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  COOKIE_CONSENT_EVENT,
  COOKIE_SETTINGS_EVENT,
  type CookieConsent,
  readCookieConsent,
  saveCookieConsent
} from "@/lib/cookie-consent";

type BannerView = "loading" | "banner" | "settings" | "hidden";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
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

function appendTrackingScript(src: string, marker: string, onLoad?: () => void) {
  const existing = document.querySelector<HTMLScriptElement>(`script[${marker}]`);
  if (existing) {
    if (existing.dataset.loaded === "true") onLoad?.();
    else if (onLoad) existing.addEventListener("load", onLoad, { once: true });
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
  document.head.appendChild(script);
}

function removeTrackingScript(marker: string) {
  document.querySelector(`script[${marker}]`)?.remove();
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
  useEffect(() => {
    if (!consent) return;

    const analyticsState = consent.analytics ? "granted" : "denied";
    const marketingState = consent.marketing ? "granted" : "denied";

    window.dataLayer ??= [];
    window.gtag ??= (...args: unknown[]) => {
      window.dataLayer?.push(args);
    };

    window.gtag("consent", "update", {
      analytics_storage: analyticsState,
      ad_storage: marketingState,
      ad_user_data: marketingState,
      ad_personalization: marketingState
    });

    if (googleAnalyticsId && /^G-[A-Z0-9]+$/i.test(googleAnalyticsId)) {
      const windowFlags = window as unknown as Record<string, unknown>;
      windowFlags[`ga-disable-${googleAnalyticsId}`] = !consent.analytics;

      if (consent.analytics) {
        appendTrackingScript(
          `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(googleAnalyticsId)}`,
          "data-ce-ga",
          () => {
            window.gtag?.("js", new Date());
            window.gtag?.("config", googleAnalyticsId, {
              anonymize_ip: true,
              allow_google_signals: false,
              allow_ad_personalization_signals: false
            });
          }
        );
      } else {
        removeTrackingScript("data-ce-ga");
      }
    }

    if (googleTagManagerId && /^GTM-[A-Z0-9]+$/i.test(googleTagManagerId)) {
      if (consent.marketing) {
        window.dataLayer.push({ "gtm.start": Date.now(), event: "gtm.js" });
        appendTrackingScript(
          `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(googleTagManagerId)}`,
          "data-ce-gtm"
        );
      } else {
        removeTrackingScript("data-ce-gtm");
      }
    }

    if (clarityProjectId && /^[a-z0-9]+$/i.test(clarityProjectId)) {
      if (!window.clarity) {
        const clarityQueue: unknown[][] = [];
        const clarity = ((...args: unknown[]) => clarityQueue.push(args)) as NonNullable<Window["clarity"]>;
        clarity.q = clarityQueue;
        window.clarity = clarity;
      }
      window.clarity("consentv2", {
        ad_Storage: marketingState,
        analytics_Storage: analyticsState
      });

      if (consent.analytics) {
        appendTrackingScript(
          `https://www.clarity.ms/tag/${encodeURIComponent(clarityProjectId)}`,
          "data-ce-clarity"
        );
      } else {
        window.clarity("consent", false);
        removeTrackingScript("data-ce-clarity");
      }
    }

    if (!consent.analytics) deleteTrackingCookies(["_ga", "_gid", "_gat", "_cl", "CLID", "ANONCHK", "MR", "MUID", "SM"]);
    if (!consent.marketing) deleteTrackingCookies(["_gcl"]);
  }, [clarityProjectId, consent, googleAnalyticsId, googleTagManagerId]);

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
  const settingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const storedConsent = readCookieConsent();
      setConsent(storedConsent);
      setAnalyticsDraft(storedConsent?.analytics ?? false);
      setMarketingDraft(storedConsent?.marketing ?? false);
      setView(storedConsent ? "hidden" : "banner");
    });

    const openSettings = () => {
      const currentConsent = readCookieConsent();
      setAnalyticsDraft(currentConsent?.analytics ?? false);
      setMarketingDraft(currentConsent?.marketing ?? false);
      setView("settings");
    };
    const syncConsent = (event: Event) => {
      const nextConsent = (event as CustomEvent<CookieConsent>).detail;
      setConsent(nextConsent);
      setAnalyticsDraft(nextConsent.analytics);
      setMarketingDraft(nextConsent.marketing);
    };

    window.addEventListener(COOKIE_SETTINGS_EVENT, openSettings);
    window.addEventListener(COOKIE_CONSENT_EVENT, syncConsent);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener(COOKIE_SETTINGS_EVENT, openSettings);
      window.removeEventListener(COOKIE_CONSENT_EVENT, syncConsent);
    };
  }, []);

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

  const applyConsent = (analytics: boolean, marketing: boolean) => {
    const nextConsent = saveCookieConsent({ analytics, marketing });
    setConsent(nextConsent);
    setAnalyticsDraft(analytics);
    setMarketingDraft(marketing);
    setView("hidden");
  };

  return (
    <>
      <TrackingController
        googleAnalyticsId={googleAnalyticsId}
        googleTagManagerId={googleTagManagerId}
        clarityProjectId={clarityProjectId}
        consent={consent}
      />

      {view === "hidden" && pathname !== "/" && (
        <button
          type="button"
          className="cookie-settings-floating"
          onClick={() => {
            setAnalyticsDraft(consent?.analytics ?? false);
            setMarketingDraft(consent?.marketing ?? false);
            setView("settings");
          }}
        >
          <Settings2 aria-hidden="true" />
          Preferințe cookies
        </button>
      )}

      {view === "banner" && (
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
                Folosim numai stocarea necesară pentru funcționare și memorarea alegerii tale.
                Analiza și marketingul rămân dezactivate până când le accepți.
              </p>
              <div className="cookie-banner-links">
                <Link href="/cookies">Politica de cookies</Link>
                <Link href="/confidentialitate">Confidențialitate</Link>
              </div>
            </div>
          </div>
          <div className="cookie-banner-actions">
            <button type="button" className="cookie-button cookie-button-secondary" onClick={() => applyConsent(false, false)}>
              Refuză opționale
            </button>
            <button type="button" className="cookie-button cookie-button-secondary" onClick={() => setView("settings")}>
              <Settings2 aria-hidden="true" /> Alege preferințele
            </button>
            <button type="button" className="cookie-button cookie-button-primary" onClick={() => applyConsent(true, true)}>
              Acceptă toate
            </button>
          </div>
        </section>
      )}

      {view === "settings" && (
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
                aria-label="Închide setările pentru cookie-uri"
              >
                <X aria-hidden="true" />
              </button>
            </header>

            <p className="cookie-preferences-intro">
              Categoriile opționale sunt dezactivate implicit. Le poți activa separat și poți reveni oricând asupra alegerii.
            </p>

            <div className="cookie-category">
              <div className="cookie-category-icon"><LockKeyhole aria-hidden="true" /></div>
              <div>
                <h3>Strict necesare</h3>
                <p>Memorează alegerea ta și permite funcțiile de bază ale site-ului. Nu poate fi dezactivată.</p>
              </div>
              <span className="cookie-category-required"><Check aria-hidden="true" /> Mereu active</span>
            </div>

            <label className="cookie-category cookie-category-toggle">
              <span className="cookie-category-icon"><BarChart3 aria-hidden="true" /></span>
              <span>
                <strong>Analiză audiență</strong>
                <small>
                  Permite Google Analytics și Microsoft Clarity, dacă sunt configurate, pentru statistici și analizarea interacțiunilor mascate.
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

            <p className="cookie-preferences-note">
              Detalii despre durată, furnizori și retragerea consimțământului sunt disponibile în <Link href="/cookies">Politica de cookies</Link>.
            </p>

            <div className="cookie-preferences-actions">
              <button type="button" className="cookie-button cookie-button-secondary" onClick={() => applyConsent(false, false)}>
                Refuză opționale
              </button>
              <button type="button" className="cookie-button cookie-button-primary" onClick={() => applyConsent(analyticsDraft, marketingDraft)}>
                Salvează preferințele
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
