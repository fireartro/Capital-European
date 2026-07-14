"use client";

import { ExternalLink } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export function FooterMap({ embedUrl, mapsUrl }: { embedUrl: string; mapsUrl: string }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;

    const Observer = Reflect.get(window, "IntersectionObserver") as typeof IntersectionObserver | undefined;
    if (!Observer) {
      const fallbackTimer = globalThis.setTimeout(() => setShouldLoad(true), 0);
      return () => globalThis.clearTimeout(fallbackTimer);
    }

    const observer = new Observer(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        setShouldLoad(true);
        observer.disconnect();
      },
      { rootMargin: "240px 0px" }
    );

    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="footer-map-frame" ref={frameRef}>
      {shouldLoad ? (
        <iframe
          src={embedUrl}
          title="Harta sediului Capital European din Satu Mare"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      ) : (
        <div className="footer-map-skeleton" aria-hidden="true" />
      )}
      <a className="footer-map-open" href={mapsUrl} target="_blank" rel="noopener noreferrer" title="Deschide sediul Capital European în Google Maps">
        Deschide în Google Maps <ExternalLink aria-hidden="true" />
      </a>
    </div>
  );
}
