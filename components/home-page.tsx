import {
  ArrowRight,
  Check,
  ClipboardCheck,
  FileCheck2,
  Files,
  Landmark,
  LockKeyhole,
  MessageSquareText,
  Scale,
  Star,
  Users,
  Zap
} from "lucide-react";
import Link from "next/link";
import { Brand } from "@/components/brand";
import { GoogleReviewsSection } from "@/components/google-reviews-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteShell } from "@/components/site-shell";
import { siteConfig } from "@/lib/site-config";
import { AnalyticsLink } from "@/components/analytics-link";

const landingProof = [
  [ClipboardCheck, "Evaluare înainte de ofertă", "Clarificăm obiectivul, informațiile disponibile și serviciul de care ai nevoie."],
  [MessageSquareText, "Răspuns ușor de urmărit", "Primești întrebări concrete, responsabilități și următorii pași."],
  [Scale, "Recomandări responsabile", "Semnalăm ce poate fi continuat, ce trebuie verificat și unde există riscuri."]
] as const;

const eligibilityHref = "/fonduri-europene#verificare-eligibilitate";

export function HomePage() {
  return (
    <SiteShell showFooter={false} showNavigation={false} showWhatsApp={true}>
      <section className="split-landing" aria-labelledby="split-title" aria-describedby="split-description">
        <Link className="split-brand" href="/" aria-label={`${siteConfig.name}, pagina de alegere`} title={`${siteConfig.name}, pagina de alegere`}><Brand variant="light" priority /></Link>
        <div className="eu-stars" aria-hidden="true">
          {Array.from({ length: 12 }, (_, index) => <span className={`eu-star star-${index + 1}`} key={index}>★</span>)}
        </div>
        <div className="landing-intro">
          <h1 id="split-title">Consultanță fonduri europene și servicii administrative</h1>
          <p className="landing-intro-copy" id="split-description">Alege direcția potrivită pentru proiectul sau activitatea ta. Clarificăm situația, documentele necesare și pașii următori, fără promisiuni nerealiste.</p>
        </div>

        <nav className="split-grid" aria-labelledby="split-services-title">
          <h2 className="visually-hidden" id="split-services-title">Alege categoria de servicii Capital European</h2>
          <article className="choice-card choice-funding" aria-labelledby="choice-funding-title" aria-describedby="choice-funding-description">
            <div className="choice-copy">
              <span className="choice-icon"><Landmark aria-hidden="true" /></span>
              <h2 id="choice-funding-title">Consultanță<br />Fonduri Europene</h2>
              <p id="choice-funding-description">Verificarea eligibilității, pregătirea documentației, depunere și sprijin în implementare.</p>
              <Link
                className="choice-secondary-link"
                href={eligibilityHref}
                title="Verificare orientativă a eligibilității și punctajului"
              >
                <ClipboardCheck aria-hidden="true" /> Verificare eligibilitate și punctaj
              </Link>
              <AnalyticsLink
                className="choice-button"
                href="/fonduri-europene#fonduri-active"
                eventName="select_service"
                eventParameters={{ service_area: "fonduri_europene", destination: "fonduri_active" }}
                title="Vezi oportunitățile de finanțare urmărite"
              >
                Vezi oportunitățile <ArrowRight aria-hidden="true" />
              </AnalyticsLink>
            </div>
            <div className="eu-emblem" aria-hidden="true">
              <span className="star-orbit">
                {Array.from({ length: 12 }, (_, index) => (
                  <span className={`ring-star ring-star-${index + 1}`} key={index}>
                    <i className="shooting-tail" />
                    <Star className="star-core" />
                  </span>
                ))}
              </span>
              <Landmark className="emblem-center" />
            </div>
          </article>

          <article className="choice-card choice-admin" aria-labelledby="choice-admin-title" aria-describedby="choice-admin-description">
            <div className="choice-copy">
              <span className="choice-icon"><Files aria-hidden="true" /></span>
              <h2 id="choice-admin-title">Servicii<br />Administrative</h2>
              <p id="choice-admin-description">Documente, secretariat, back-office și sprijin administrativ pentru înființarea firmei.</p>
              <Link
                className="choice-secondary-link"
                href="/contact?service=servicii-administrative"
                title="Descrie activitatea administrativă pe care vrei să o delegi"
              >
                <MessageSquareText aria-hidden="true" /> Discută un flux administrativ
              </Link>
              <AnalyticsLink
                className="choice-button"
                href="/servicii-administrative"
                eventName="select_service"
                eventParameters={{ service_area: "servicii_administrative", destination: "servicii_administrative" }}
                title="Servicii administrative externalizate Capital European"
              >
                Vezi serviciile administrative <ArrowRight aria-hidden="true" />
              </AnalyticsLink>
            </div>
            <div className="admin-visual" aria-hidden="true">
              <span className="admin-sheet sheet-back" />
              <span className="admin-sheet sheet-middle" />
              <span className="admin-sheet sheet-front">
                <FileCheck2 />
                <i /><i /><i />
                <b><Check /> Verificat</b>
              </span>
            </div>
          </article>
        </nav>

        <section className="landing-proof-grid" aria-labelledby="landing-proof-title">
          <h2 className="visually-hidden" id="landing-proof-title">Cum începe colaborarea cu Capital European</h2>
          {landingProof.map(([Icon, title, text]) => (
            <article key={title}>
              <Icon aria-hidden="true" />
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </article>
          ))}
        </section>

        <footer className="landing-trust" aria-label="Avantajele colaborării">
          <span><LockKeyhole /> Confidențialitate</span>
          <span><Zap /> Pași bine definiți</span>
          <span><Scale /> Evaluare responsabilă</span>
          <span><Users /> Comunicare directă</span>
          <Link href="/contact" title="Discută direct cu echipa Capital European"><MessageSquareText /> Discuție inițială</Link>
        </footer>
        <GoogleReviewsSection variant="split" />
      </section>
      <SiteFooter showCookieSettings={false} />
    </SiteShell>
  );
}
