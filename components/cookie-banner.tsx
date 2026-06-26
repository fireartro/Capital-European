"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

const COOKIE_CONSENT_KEY = "cookieConsent";

function getCookieConsentValue(name: string) {
  const cookieMatch = document.cookie.match(new RegExp(`(?:^|; )${name}=([^;]*)`));
  return cookieMatch ? decodeURIComponent(cookieMatch[1]) : null;
}

function isCookieConsentAccepted() {
  if (typeof window === "undefined") {
    return false;
  }

  try {
    const storedValue = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    if (storedValue === "accepted") {
      return true;
    }
  } catch {
    // ignore storage failures
  }

  return getCookieConsentValue(COOKIE_CONSENT_KEY) === "accepted";
}

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.requestAnimationFrame(() => {
      if (!isCookieConsentAccepted()) {
        setVisible(true);
      }
    });
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
        <p className="cookie-banner-description">
          Continuând navigarea, accepți <Link href="/cookies" className="cookie-banner-link">politica de cookie-uri</Link> și <Link href="/termeni" className="cookie-banner-link">termenii și condițiile</Link>.
        </p>
      </div>
      <div className="cookie-banner-actions">
        <button type="button" className="cookie-banner-accept" onClick={acceptCookies}>
          Am înțeles
        </button>
      </div>
    </div>
  );
}
