import { ExternalLink } from "lucide-react";

export function FooterMap({ embedUrl, mapsUrl }: { embedUrl: string; mapsUrl: string }) {
  return (
    <div className="footer-map-frame">
      <iframe
        src={embedUrl}
        title="Harta sediului Capital European din Satu Mare"
        loading="eager"
        referrerPolicy="no-referrer-when-downgrade"
        allowFullScreen
      />
      <a className="footer-map-open" href={mapsUrl} target="_blank" rel="noopener noreferrer" title="Deschide sediul Capital European în Google Maps">
        Deschide în Google Maps <ExternalLink aria-hidden="true" />
      </a>
    </div>
  );
}
