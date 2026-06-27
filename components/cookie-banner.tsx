"use client";

import Link from "next/link";
import { BarChart3, Check, LockKeyhole, Settings2, X } from "lucide-react";
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
  }
}

function deleteAnalyticsCookies() {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  const hostname = window.location.hostname;
  const domains = [hostname, `.${hostname}`];

  document.cookie.split(";").forEach((entry) => {
    const name = entry.split("=")[0]?.trim();
    if (!name?.startsWith("_ga") && name !== "_gid" && name !== "_gat") return;

    document.cookie = `${name}=; Path=/; Max-Age=0; SameSite=Lax${secure}`;
    domains.forEach((domain) => {
      document.cookie = `${name}=; Path=/; Domain=${domain}; Max-Age=0; SameSite=Lax${secure}`;
    });
  });
}

function AnalyticsController({ measurementId, consent }: { measurementId?: string; consent: CookieConsent | null }) {
  useEffect(() => {
    if (!measurementId || !consent) return;

    const analyticsEnabled = consent.analytics;
    const windowFlags = window as unknown as Record<string, unknown>;
    windowFlags[`ga-disable-${measurementId}`] = !analyticsEnabled;

    window.dataLayer ??= [];
    window.gtag ??= (...args: unknown[]) => {
      window.dataLayer?.push(args);
    };

    window.gtag("consent", "update", {
      analytics_storage: analyticsEnabled ? "granted" : "denied"
    });

    if (!analyticsEnabled) {
      deleteAnalyticsCookies();
      return;
    }

    const configure = () => {
      window.gtag?.("js", new Date());
      window.gtag?.("config", measurementId, {
        anonymize_ip: true,
        allow_google_signals: false
      });
    };

    const existingScript = document.querySelector<HTMLScriptElement>("script[data-ce-analytics]");
    if (existingScript) {
      if (existingScript.dataset.loaded === "true") configure();
      else existingScript.addEventListener("load", configure, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
    script.dataset.ceAnalytics = "true";
    script.addEventListener("load", () => {
      script.dataset.loaded = "true";
      configure();
    }, { once: true });
    document.head.appendChild(script);
  }, [consent, measurementId]);

  return null;
}

export function CookieBanner({ googleAnalyticsId }: { googleAnalyticsId?: string }) {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [view, setView] = useState<BannerView>("loading");
  const [analyticsDraft, setAnalyticsDraft] = useState(false);
  const settingsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      const storedConsent = readCookieConsent();
      setConsent(storedConsent);
      setAnalyticsDraft(storedConsent?.analytics ?? false);
      setView(storedConsent ? "hidden" : "banner");
    });

    const openSettings = () => {
      const currentConsent = readCookieConsent();
      setAnalyticsDraft(currentConsent?.analytics ?? false);
      setView("settings");
    };
    const syncConsent = (event: Event) => {
      const nextConsent = (event as CustomEvent<CookieConsent>).detail;
      setConsent(nextConsent);
      setAnalyticsDraft(nextConsent.analytics);
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

  const applyConsent = (analytics: boolean) => {
    const nextConsent = saveCookieConsent(analytics);
    setConsent(nextConsent);
    setAnalyticsDraft(analytics);
    setView("hidden");
  };

  return (
    <>
      <AnalyticsController measurementId={googleAnalyticsId} consent={consent} />

      {view === "hidden" && (
        <button
          type="button"
          className="cookie-settings-floating"
          onClick={() => {
            setAnalyticsDraft(consent?.analytics ?? false);
            setView("settings");
          }}
          aria-label="Deschide setările pentru cookie-uri"
        >
          <Settings2 aria-hidden="true" />
          Setări cookies
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
              <strong id="cookie-banner-title">Confidențialitatea ta contează</strong>
              <p id="cookie-banner-description">
                Folosim stocare strict necesară pentru alegerea ta. Cookie-urile de analiză se activează numai dacă le accepți.
                Poți modifica opțiunea oricând din „Setări cookies”.
              </p>
              <div className="cookie-banner-links">
                <Link href="/cookies">Politica de cookies</Link>
                <Link href="/confidentialitate">Confidențialitate</Link>
              </div>
            </div>
          </div>
          <div className="cookie-banner-actions">
            <button type="button" className="cookie-button cookie-button-secondary" onClick={() => applyConsent(false)}>
              Respinge opționale
            </button>
            <button type="button" className="cookie-button cookie-button-secondary" onClick={() => setView("settings")}>
              <Settings2 aria-hidden="true" /> Setări
            </button>
            <button type="button" className="cookie-button cookie-button-primary" onClick={() => applyConsent(true)}>
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
                <span className="cookie-preferences-kicker">Controlul datelor</span>
                <h2 id="cookie-preferences-title">Setări cookies</h2>
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
              Cookie-urile opționale rămân dezactivate până când alegi explicit activarea lor.
            </p>

            <div className="cookie-category">
              <div className="cookie-category-icon"><LockKeyhole aria-hidden="true" /></div>
              <div>
                <h3>Strict necesare</h3>
                <p>Păstrează alegerea de consimțământ și funcțiile de bază ale site-ului. Nu pot fi dezactivate.</p>
              </div>
              <span className="cookie-category-required"><Check aria-hidden="true" /> Mereu active</span>
            </div>

            <label className="cookie-category cookie-category-toggle">
              <span className="cookie-category-icon"><BarChart3 aria-hidden="true" /></span>
              <span>
                <strong>Analiză audiență</strong>
                <small>
                  Permite Google Analytics, dacă este configurat, pentru statistici agregate despre utilizarea site-ului.
                  Nu folosim această categorie pentru publicitate.
                </small>
              </span>
              <input
                type="checkbox"
                checked={analyticsDraft}
                onChange={(event) => setAnalyticsDraft(event.target.checked)}
                aria-label="Permite cookie-uri de analiză"
              />
            </label>

            <p className="cookie-preferences-note">
              Detalii despre durată, furnizori și retragerea consimțământului sunt disponibile în <Link href="/cookies">Politica de cookies</Link>.
            </p>

            <div className="cookie-preferences-actions">
              <button type="button" className="cookie-button cookie-button-secondary" onClick={() => applyConsent(false)}>
                Respinge opționale
              </button>
              <button type="button" className="cookie-button cookie-button-primary" onClick={() => applyConsent(analyticsDraft)}>
                Salvează preferințele
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
