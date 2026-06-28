import { Brand } from "@/components/brand";
import { CookieSettingsButton } from "@/components/cookie-settings-button";
import { siteConfig } from "@/lib/site-config";
import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="section-container footer-main">
        <div>
          <Brand variant="light" />
          <p>{siteConfig.description}</p>
        </div>
        <div>
          <h3>Fonduri europene</h3>
          <Link href="/consultanta-fonduri-europene">Consultanță fonduri europene</Link>
          <Link href="/fonduri-europene-pentru-firme">Fonduri pentru firme</Link>
          <Link href="/fonduri-europene-pentru-ong">Fonduri pentru ONG-uri</Link>
          <Link href="/calculator-pret-consultanta">Calculator orientativ</Link>
        </div>
        <div>
          <h3>Servicii administrative</h3>
          <Link href="/servicii-administrative">Servicii administrative</Link>
          <Link href="/servicii-administrative/secretariat">Secretariat externalizat</Link>
          <Link href="/servicii-administrative/administrare-documente">Administrare documente</Link>
          <Link href="/servicii-administrative/infiintare-firma">Înființare firmă</Link>
        </div>
        <div>
          <h3>Contact</h3>
          {siteConfig.phoneHref && <a href={`tel:${siteConfig.phoneHref}`} aria-label={`Sună ${siteConfig.name}`} title={`Sună ${siteConfig.name}`}>{siteConfig.phoneDisplay}</a>}
          <a href={`mailto:${siteConfig.email}`} title={`Trimite email către ${siteConfig.name}`}>{siteConfig.email}</a>
          {siteConfig.schedule && <span>Program: {siteConfig.schedule}</span>}
          {siteConfig.address && <span>{siteConfig.address}</span>}
          {siteConfig.legal.entityName && <span>Operator: {siteConfig.legal.entityName}</span>}
          {siteConfig.legal.registrationNumber && <span>Registrul comerțului: {siteConfig.legal.registrationNumber}</span>}
          {siteConfig.legal.taxId && <span>CUI: {siteConfig.legal.taxId}</span>}
          <Link className="footer-cta-link" href="/contact" aria-label="Trimite o solicitare către Capital European" title="Trimite solicitarea">Descrie situația ta</Link>
        </div>
      </div>
      <div className="section-container footer-bottom">
        <span>© {new Date().getFullYear()} {siteConfig.name}. Toate drepturile rezervate.</span>
        <div>
          <Link href="/confidentialitate" title="Politica de confidențialitate">Confidențialitate</Link>
          <Link href="/termeni" aria-label="Termeni și condiții" title="Termeni și condiții">Termeni</Link>
          <Link href="/cookies" aria-label="Politica de cookies" title="Politica de cookies">Cookies</Link>
          <CookieSettingsButton compact />
        </div>
      </div>
    </footer>
  );
}
