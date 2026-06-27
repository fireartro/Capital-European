"use client";

import { Settings2 } from "lucide-react";
import { openCookieSettings } from "@/lib/cookie-consent";

export function CookieSettingsButton({ compact = false }: { compact?: boolean }) {
  return (
    <button
      type="button"
      className={`cookie-settings-button ${compact ? "cookie-settings-button-compact" : ""}`}
      onClick={openCookieSettings}
      aria-label="Deschide setările pentru cookie-uri"
    >
      <Settings2 aria-hidden="true" />
      Setări cookies
    </button>
  );
}
