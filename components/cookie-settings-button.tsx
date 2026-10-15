"use client";

import { Settings2 } from "lucide-react";
import { openCookieSettings } from "@/lib/cookie-consent";

export function CookieSettingsButton({ compact = false, onOpen }: { compact?: boolean; onOpen?: () => void }) {
  const handleOpen = () => {
    if (!onOpen) return openCookieSettings();
    onOpen();
    // Let the drawer release its focus trap and scroll lock before opening a dialog.
    window.requestAnimationFrame(openCookieSettings);
  };

  return (
    <button
      type="button"
      className={`cookie-settings-button ${compact ? "cookie-settings-button-compact" : ""}`}
      onClick={handleOpen}
    >
      <Settings2 aria-hidden="true" />
      Preferințe cookies
    </button>
  );
}
