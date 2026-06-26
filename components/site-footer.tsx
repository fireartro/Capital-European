import { Brand } from "@/components/brand";
import { siteConfig } from "@/lib/site-config";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="section-container footer-main">
        <div>
          <Brand variant="light" />
          <p>{siteConfig.description}</p>
        </div>
        <div>
          <h3>Servicii</h3>
          <a href="/fonduri-europene" aria-label="Consultanță fonduri europene" title="Consultanță fonduri europene">Fonduri europene</a>
          <a href="/servicii-administrative" aria-label="Servicii administrative externalizate" title="Servicii administrative externalizate">Servicii administrative</a>
          <a href="/servicii-administrative#infiintare-firma" aria-label="Înființare firmă" title="Înființare firmă">Înființare firmă</a>
        </div>
        <div>
          <h3>Contact</h3>
          {siteConfig.phoneHref && <a href={`tel:${siteConfig.phoneHref}`} aria-label={`Sună ${siteConfig.name}`} title={`Sună ${siteConfig.name}`}>{siteConfig.phoneDisplay}</a>}
          <a href={`mailto:${siteConfig.email}`} title={`Trimite email către ${siteConfig.name}`}>{siteConfig.email}</a>
          <span>{siteConfig.address}</span>
          <a className="footer-cta-link" href="/contact" aria-label="Trimite o solicitare către Capital European" title="Trimite solicitarea">Trimite o solicitare</a>
        </div>
      </div>
      <div className="section-container footer-bottom">
        <span>© {new Date().getFullYear()} {siteConfig.name}. Toate drepturile rezervate.</span>
        <div>
          <a href="/confidentialitate" title="Politica de confidențialitate">Confidențialitate</a>
          <a href="/termeni" aria-label="Termeni și condiții" title="Termeni și condiții">Termeni</a>
          <a href="/cookies" aria-label="Politica de cookies" title="Politica de cookies">Cookies</a>
        </div>
      </div>
    </footer>
  );
}
