"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const COOKIE_CONSENT_KEY = "cookieConsent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    let consent: string | null = null;
    try {
      consent = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    } catch {
      consent = null;
    }

    if (!consent) {
      window.requestAnimationFrame(() => setVisible(true));
    }
  }, []);

  const acceptCookies = () => {
    if (typeof window !== "undefined") {
      try {
        window.localStorage.setItem(COOKIE_CONSENT_KEY, "accepted");
      } catch {
        // ignore storage failures and still allow consent
      }
      document.cookie = `${COOKIE_CONSENT_KEY}=accepted; path=/; max-age=${60 * 60 * 24 * 365}; SameSite=Lax`;
    }
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <div className="cookie-banner" role="dialog" aria-live="polite" aria-label="Informații despre cookie-uri">
      <div className="cookie-banner-copy">
        <strong>Folosim cookie-uri pentru a îmbunătăți experiența pe site.</strong>
        <span>Cookie-urile strict necesare mențin site-ul funcțional și nu vor fi dezactivate.</span>
      </div>
      <div className="cookie-banner-actions">
        <Link href="/cookies" onClick={() => setVisible(false)} className="cookie-banner-link" title="Vezi politica de cookies">
          Află mai multe
        </Link>
        <button type="button" className="cookie-banner-accept" onClick={acceptCookies}>
          Am înțeles
        </button>
      </div>
    </div>
  );
}
