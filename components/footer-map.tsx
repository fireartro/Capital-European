"use client";

import { ExternalLink, MapPin } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { openCookieSettings, readCookieConsent, subscribeCookieConsent } from "@/lib/cookie-consent";
import { siteConfig } from "@/lib/site-config";

export function FooterMap({ embedUrl, mapsUrl }: { embedUrl: string; mapsUrl: string }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);
  const [externalContent, setExternalContent] = useState(false);

  useEffect(() => subscribeCookieConsent((consent) => {
    if (!consent?.externalContent) {
      // Stop an already-mounted external document before React commits the placeholder.
      frameRef.current?.querySelector("iframe")?.setAttribute("src", "about:blank");
    }
    setExternalContent(consent?.externalContent ?? false);
  }), []);

  useEffect(() => {
    if (!externalContent) return;
    const frame = frameRef.current;
    if (!frame) return;

    const Observer = Reflect.get(window, "IntersectionObserver") as typeof IntersectionObserver | undefined;
    if (!Observer) {
      const fallbackTimer = globalThis.setTimeout(() => {
        if (readCookieConsent()?.externalContent) setShouldLoad(true);
      }, 0);
      return () => globalThis.clearTimeout(fallbackTimer);
    }

    const observer = new Observer(
      ([entry]) => {
        if (!entry?.isIntersecting || !readCookieConsent()?.externalContent) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "240px 0px" }
    );

    observer.observe(frame);
    return () => observer.disconnect();
  }, [externalContent]);

  return (
    <div className="footer-map-frame" ref={frameRef}>
      {externalContent && shouldLoad ? (
        <iframe
          src={embedUrl}
          title="Harta sediului Capital European din Satu Mare"
          loading="lazy"
          referrerPolicy="no-referrer"
          allowFullScreen
        />
      ) : (
        <div className="footer-map-skeleton footer-map-placeholder">
          <MapPin aria-hidden="true" />
          <div>
            <strong>Sediul Capital European</strong>
            <p>{siteConfig.address}</p>
          </div>
          {!externalContent && <button type="button" onClick={openCookieSettings}>Activează harta</button>}
        </div>
      )}
      <a className="footer-map-open" href={mapsUrl} target="_blank" rel="noopener noreferrer" title="Deschide sediul Capital European în Google Maps">
        Deschide în Google Maps <ExternalLink aria-hidden="true" />
      </a>
    </div>
  );
}
