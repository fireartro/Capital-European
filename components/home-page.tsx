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
  Sparkles,
  Star,
  Users,
  Zap
} from "lucide-react";
import Link from "next/link";
import { Brand } from "@/components/brand";
import { SiteShell } from "@/components/site-shell";
import { siteConfig } from "@/lib/site-config";

const landingProof = [
  [ClipboardCheck, "Clarificare înainte de ofertă", "Pornim de la context, documente și obiectiv, nu de la o listă generică de servicii."],
  [MessageSquareText, "Comunicare directă", "Primești întrebări concrete și următorii pași, fără formulări ambigue."],
  [Scale, "Decizie responsabilă", "Îți spunem ce merită continuat, ce trebuie verificat și unde există riscuri."]
] as const;

export function HomePage() {
  return (
    <SiteShell showFooter={false} showNavigation={false} showWhatsApp={false}>
      <section className="split-landing" aria-labelledby="split-title" aria-describedby="split-description">
        <Link className="split-brand" href="/" aria-label={`${siteConfig.name}, pagina de alegere`} title={`${siteConfig.name}, pagina de alegere`}><Brand variant="light" priority /></Link>
        <div className="eu-stars" aria-hidden="true">
          {Array.from({ length: 12 }, (_, index) => <span className={`eu-star star-${index + 1}`} key={index}>★</span>)}
        </div>
        <div className="landing-intro">
          <p className="eyebrow"><Sparkles /> Două direcții. Un singur partener de încredere.</p>
          <h1 id="split-title">Consultanță fonduri europene și servicii administrative în România</h1>
          <p className="landing-intro-copy" id="split-description">Alege serviciul potrivit, iar noi te ghidăm de la prima întrebare până la rezultat: finanțare, documente, back-office și pași administrativi clari.</p>
        </div>

        <nav className="split-grid" aria-labelledby="split-services-title">
          <h2 className="visually-hidden" id="split-services-title">Alege categoria de servicii Capital European</h2>
          <article className="choice-card choice-funding" aria-labelledby="choice-funding-title" aria-describedby="choice-funding-description">
            <div className="choice-copy">
              <span className="choice-index">01 / Finanțare</span>
              <span className="choice-icon"><Landmark aria-hidden="true" /></span>
              <h2 id="choice-funding-title">Consultanță<br />Fonduri Europene</h2>
              <p id="choice-funding-description">Analiză de eligibilitate, documentație, depunere și sprijin în implementarea proiectului.</p>
              <a
                className="choice-button"
                href="/fonduri-europene"
                title="Consultanță fonduri europene Capital European"
              >
                Verifică oportunitatea <ArrowRight aria-hidden="true" />
              </a>
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
              <span className="choice-index">02 / Administrativ</span>
              <span className="choice-icon"><Files aria-hidden="true" /></span>
              <h2 id="choice-admin-title">Servicii<br />Administrative</h2>
              <p id="choice-admin-description">Documente, secretariat, back-office și înființare firmă, organizate profesionist.</p>
              <a
                className="choice-button"
                href="/servicii-administrative"
                title="Servicii administrative externalizate Capital European"
              >
                Organizează administrativul <ArrowRight aria-hidden="true" />
              </a>
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
          <span><Zap /> Răspuns prompt</span>
          <span><Scale /> Evaluare responsabilă</span>
          <span><Users /> Comunicare directă</span>
        </footer>
      </section>
    </SiteShell>
  );
}
