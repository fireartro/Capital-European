import {
  ArrowRight,
  Check,
  ClipboardCheck,
  FileCheck2,
  Files,
  Landmark,
  Star
} from "lucide-react";
import Link from "next/link";
import { Brand } from "@/components/brand";
import { GoogleReviewsSection } from "@/components/google-reviews-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteShell } from "@/components/site-shell";
import { siteConfig } from "@/lib/site-config";
import { AnalyticsLink } from "@/components/analytics-link";

const collaborationStart = [
  "Alegi direcția de serviciu",
  "Descrii pe scurt situația",
  "Primești întrebările necesare înainte de ofertă"
] as const;

const fundingProgramsHref = "/fonduri-europene#fonduri-active";

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
          <p className="landing-intro-copy" id="split-description">Capital European oferă consultanță pentru proiecte cu finanțare europeană și servicii administrative pentru firme sau activități independente.</p>
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
                href={fundingProgramsHref}
                title="Vezi programele și oportunitățile de finanțare urmărite"
              >
                <ClipboardCheck aria-hidden="true" /> Programe de finanțare
              </Link>
              <AnalyticsLink
                className="choice-button"
                href="/fonduri-europene"
                eventName="select_service"
                eventParameters={{ service_area: "fonduri_europene", destination: "fonduri_prezentare" }}
                title="Vezi prezentarea serviciilor pentru fonduri europene"
              >
                Vezi consultanța <ArrowRight aria-hidden="true" />
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
              <Link className="choice-secondary-link" href="/servicii-administrative#servicii-administrative" title="Vezi serviciile de înființare PFA și SRL">
                <ClipboardCheck aria-hidden="true" /> Înființare PFA și SRL
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

        <section className="landing-start" aria-labelledby="landing-start-title">
          <h2 id="landing-start-title">Cum începe colaborarea</h2>
          <ol>{collaborationStart.map((item) => <li key={item}>{item}</li>)}</ol>
          <nav aria-label="Informații despre Capital European">
            <Link href="/anunturi">Anunțuri</Link>
            <Link href="/despre">Despre noi</Link>
            <Link href="/intrebari">Întrebări frecvente</Link>
            <Link href="/contact">Contact</Link>
          </nav>
        </section>
        <GoogleReviewsSection variant="split" />
      </section>
      <SiteFooter showCookieSettings={false} />
    </SiteShell>
  );
}
