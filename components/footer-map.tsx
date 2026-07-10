"use client";

import { ExternalLink, MapPinned } from "lucide-react";
import { useState } from "react";

export function FooterMap({ embedUrl, mapsUrl }: { embedUrl: string; mapsUrl: string }) {
  const [loaded, setLoaded] = useState(false);

  if (loaded) {
    return (
      <div className="footer-map-frame">
        <iframe
          src={embedUrl}
          title="Harta sediului Capital European din Satu Mare"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          allowFullScreen
        />
      </div>
    );
  }

  return (
    <div className="footer-map-frame footer-map-placeholder">
      <MapPinned aria-hidden="true" />
      <div>
        <strong>Harta sediului din Satu Mare</strong>
        <p>Harta Google se încarcă numai după ce alegi să o deschizi.</p>
      </div>
      <button type="button" onClick={() => setLoaded(true)} aria-label="Încarcă harta Google pentru sediul Capital European">
        Încarcă harta
      </button>
      <a href={mapsUrl} target="_blank" rel="noopener noreferrer" title="Deschide sediul Capital European în Google Maps">
        Deschide în Google Maps <ExternalLink aria-hidden="true" />
      </a>
    </div>
  );
}
