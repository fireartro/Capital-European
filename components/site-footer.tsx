import { Brand } from "@/components/brand";
import { CookieSettingsButton } from "@/components/cookie-settings-button";
import { FooterMap } from "@/components/footer-map";
import { siteConfig } from "@/lib/site-config";
import { ExternalLink, MapPin } from "lucide-react";
import Link from "next/link";
import { TrackedAnchor } from "@/components/tracked-anchor";

export function SiteFooter({ showCookieSettings = true }: { showCookieSettings?: boolean }) {
  return (
    <footer className="site-footer" id="site-footer">
      <div className="section-container footer-main">
        <div>
          <Brand variant="light" />
          <p>Consultanță pentru fonduri europene și servicii administrative pentru firme, ONG-uri și activități independente.</p>
        </div>
        <div>
          <h3>Fonduri europene</h3>
          <Link href="/fonduri-europene">Prezentare și programe</Link>
          <Link href="/consultanta-fonduri-europene">Consultanță fonduri europene</Link>
          <Link href="/fonduri-europene#fonduri-active">Oportunități de finanțare</Link>
        </div>
        <div>
          <h3>Servicii administrative</h3>
          <Link href="/servicii-administrative">Servicii administrative</Link>
          <Link href="/servicii-administrative/infiintare-firma">Înființare firmă</Link>
          <Link href="/servicii-administrative/infiintare-pfa">Înființare PFA</Link>
          <Link href="/servicii-administrative/infiintare-srl">Înființare SRL</Link>
          <Link href="/servicii-administrative/administrare-documente">Administrare documente</Link>
          <Link href="/servicii-administrative/secretariat">Secretariat externalizat</Link>
        </div>
        <div>
          <h3>Informații</h3>
          <Link href="/anunturi">Anunțuri</Link>
          <Link href="/despre">Despre Capital European</Link>
          <Link href="/intrebari">Întrebări frecvente</Link>
          <TrackedAnchor eventName="google_business_click" eventParameters={{ placement: "footer" }} href={siteConfig.googleBusiness.url} target="_blank" rel="noopener noreferrer" title="Vezi profilul Capital European pe Google">Profil Google Business</TrackedAnchor>
        </div>
        <div className="footer-contact-column">
          <h3>Contact</h3>
          <Link href="/contact">Formular de contact</Link>
          {siteConfig.phoneHref && <TrackedAnchor eventName="click_phone" eventParameters={{ placement: "footer" }} href={`tel:${siteConfig.phoneHref}`} title={`Sună ${siteConfig.name}`}>{siteConfig.phoneDisplay}</TrackedAnchor>}
          <TrackedAnchor eventName="click_email" eventParameters={{ placement: "footer" }} href={`mailto:${siteConfig.email}`} title={`Trimite email către ${siteConfig.name}`}>{siteConfig.email}</TrackedAnchor>
          {siteConfig.schedule && <span>Program: {siteConfig.schedule}</span>}
          {siteConfig.legal.entityName && <span>{siteConfig.legal.entityName}{siteConfig.legal.taxId ? ` · CUI ${siteConfig.legal.taxId}` : ""}</span>}
        </div>
      </div>
      {siteConfig.locations.length > 0 && (
        <section className="section-container footer-locations" aria-labelledby="footer-locations-title">
          <div className="footer-locations-copy">
            <p className="footer-kicker"><MapPin aria-hidden="true" /> Locații Capital European</p>
            <h2 id="footer-locations-title">Ne găsești în Satu Mare, Seini și Cluj-Napoca</h2>
            <p>Alege locația potrivită și deschide direct indicațiile în Google Maps.</p>
            <div className="footer-location-links">
              {siteConfig.locations.map((location) => (
                <TrackedAnchor
                  href={location.mapsUrl}
                  eventName="location_click"
                  eventParameters={{ location_name: location.label }}
                  key={location.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Deschide ${location.address} în Google Maps`}
                >
                  <MapPin aria-hidden="true" />
                  <span><strong>{location.label}</strong><small>{location.address}</small></span>
                  <ExternalLink aria-hidden="true" />
                </TrackedAnchor>
              ))}
            </div>
          </div>
          {siteConfig.googleBusiness.mapEmbedUrl && (
            <FooterMap embedUrl={siteConfig.googleBusiness.mapEmbedUrl} mapsUrl={siteConfig.googleBusiness.url} />
          )}
        </section>
      )}
      <div className="section-container footer-bottom">
        <span>© {new Date().getFullYear()} {siteConfig.name}. Toate drepturile rezervate.</span>
        <div>
          <Link href="/confidentialitate" title="Politica de confidențialitate">Confidențialitate</Link>
          <Link href="/termeni" title="Termeni și condiții">Termeni</Link>
          <Link href="/cookies" title="Politica de cookies">Cookies</Link>
          <a href="https://anpc.ro/sal/" target="_blank" rel="noopener noreferrer" title="Soluționarea alternativă a litigiilor prin ANPC">SAL ANPC</a>
          {showCookieSettings && <CookieSettingsButton compact />}
        </div>
      </div>
    </footer>
  );
}
