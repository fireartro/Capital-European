import {
  ArrowRight,
  BarChart3,
  Check,
  ClipboardCheck,
  FilePenLine,
  Landmark,
  SearchCheck,
  ShieldCheck
} from "lucide-react";
import Link from "next/link";
import { FundingHeroCarousel } from "@/components/funding-hero-carousel";
import { FundingProgramList } from "@/components/funding-program-list";
import { ServiceFaq } from "@/components/service-faq";
import { SiteShell } from "@/components/site-shell";
import { ScrollStarOrbit } from "@/components/scroll-star-orbit";
import { fundingFaq } from "@/lib/service-content";
import { siteConfig } from "@/lib/site-config";
import type { FundingProgram } from "@/lib/funding-programs";

const services = [
  { icon: SearchCheck, title: "Eligibilitate și punctaj", text: "Verificăm solicitantul, investiția și criteriile care pot exclude sau limita proiectul." },
  { icon: FilePenLine, title: "Cerere și documente", text: "Pregătim cererea, bugetul și anexele cerute de programul ales." },
  { icon: ClipboardCheck, title: "Depunere și clarificări", text: "Organizăm transmiterea și răspunsurile solicitate în etapa de evaluare." },
  { icon: BarChart3, title: "Implementare", text: "După aprobare, urmărim indicatorii, achizițiile, plățile și raportarea prevăzute în contract." }
] as const;

const analysisFit = [
  "Ai o investiție sau un proiect pe care îl poți descrie concret.",
  "Poți discuta realist despre buget, cofinanțare și cheltuieli neeligibile.",
  "Accepți că analiza poate arăta și că un program nu este potrivit."
] as const;

const analysisChecks = [
  "condițiile solicitantului și ale investiției",
  "cheltuielile eligibile și contribuția proprie",
  "punctajul care poate fi susținut cu documente",
  "actele necesare și informațiile care lipsesc",
  "calendarul până la depunere",
  "obligațiile care continuă după aprobare"
] as const;

const differentiators = [
  ["Verificare înainte de ofertă", "Nu recomandăm pregătirea dosarului înainte să vedem criteriile eliminatorii, bugetul și capacitatea de implementare."],
  ["Punctaj explicat", "Separăm criteriile documentate de ipoteze și folosim grila oficială ca reper."],
  ["Sprijin inclus în implementare", "Pentru proiectele aprobate, serviciul poate continua cu obligațiile contractuale stabilite în ofertă."]
] as const;

const steps = [
  ["Analiză", "Verificăm programul, solicitantul, investiția și riscurile principale."],
  ["Plan de lucru", "Stabilim documentele, responsabilitățile, bugetul și calendarul."],
  ["Cerere și depunere", "Pregătim documentația și gestionăm clarificările incluse în serviciu."],
  ["Implementare", "Urmărim obligațiile și documentele proiectului aprobat, în limitele contractate."]
] as const;

export function FundingPage({ programs }: { programs: readonly FundingProgram[] }) {
  return (
    <SiteShell navigationContext="funding">
      <ScrollStarOrbit sectionIds={[
        "funding-hero",
        "servicii-fonduri",
        "fonduri-active",
        "ce-ne-deosebeste",
        "proces-fonduri",
        "intrebari-fonduri"
      ]} />
      <FundingHeroCarousel />

      <section className="content-section funding-section" id="servicii-fonduri" aria-labelledby="funding-services-title" aria-describedby="funding-services-description">
        <div className="section-container">
          <header className="section-title-row">
            <div>
              <p className="eyebrow"><Landmark aria-hidden="true" /> Serviciul de consultanță</p>
              <h2 id="funding-services-title">Ce putem prelua pentru un proiect de finanțare</h2>
            </div>
            <p id="funding-services-description">Serviciul se stabilește după program și stadiul proiectului. Pentru detalii, vezi <Link href="/consultanta-fonduri-europene">pagina de consultanță</Link>.</p>
          </header>

          <div className="funding-service-grid" aria-describedby="funding-services-description">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article className="funding-service-card" key={service.title}>
                  <span className="service-round-icon"><Icon aria-hidden="true" /></span>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </article>
              );
            })}
          </div>

          <section className="funding-programs-section" id="fonduri-active" aria-labelledby="funding-programs-title" aria-describedby="funding-programs-description">
            <header className="funding-programs-header">
              <div>
                <p className="eyebrow"><Landmark aria-hidden="true" /> Oportunități urmărite</p>
                <h2 id="funding-programs-title">Programe de finanțare</h2>
              </div>
              <p id="funding-programs-description">Statutul și condițiile se reconfirmă în sursa oficială înainte de evaluare. Verifică și portalurile <a href={siteConfig.officialResources.mipe} target="_blank" rel="noopener noreferrer">MIPE</a> și <a href={siteConfig.officialResources.fonduriUe} target="_blank" rel="noopener noreferrer">fonduri-ue.ro</a>.</p>
            </header>
            <FundingProgramList programs={programs} />
            <div className="funding-programs-note">
              <p>Nu găsești programul? Trimite denumirea sau ghidul și îl verificăm înainte de recomandare.</p>
              <Link className="primary-button blue-button" href="/contact?service=fonduri-europene&program=program-nespecificat">Trimite programul <ArrowRight aria-hidden="true" /></Link>
            </div>
          </section>

          <section className="funding-analysis-summary" aria-labelledby="funding-analysis-title">
            <div>
              <p className="eyebrow"><ShieldCheck aria-hidden="true" /> Înainte de dosar</p>
              <h2 id="funding-analysis-title">Când merită începută analiza</h2>
              <ul>{analysisFit.map((item) => <li key={item}><Check aria-hidden="true" /> {item}</li>)}</ul>
            </div>
            <div>
              <h3>Ce verificăm</h3>
              <ul>{analysisChecks.map((item) => <li key={item}><Check aria-hidden="true" /> {item}</li>)}</ul>
            </div>
          </section>

          <section className="differentiators-section" id="ce-ne-deosebeste" aria-labelledby="differentiators-title">
            <header>
              <p className="eyebrow"><ShieldCheck aria-hidden="true" /> Mod de lucru</p>
              <h2 id="differentiators-title">Ce ne deosebește</h2>
              <p>Recomandările sunt raportate la ghid, la documentele disponibile și la responsabilitățile pe care le poate susține clientul.</p>
            </header>
            <div className="differentiators-list">
              {differentiators.map(([title, text]) => <article key={title}><h3>{title}</h3><p>{text}</p></article>)}
            </div>
          </section>

          <section className="process-block" id="proces-fonduri" aria-labelledby="funding-process-title">
            <div className="process-heading">
              <p className="eyebrow">Colaborarea</p>
              <h2 id="funding-process-title">De la analiză la implementare</h2>
            </div>
            <ol className="plain-process-list">
              {steps.map(([title, text]) => <li key={title}><h3>{title}</h3><p>{text}</p></li>)}
            </ol>
          </section>

          <ServiceFaq
            id="intrebari-fonduri"
            title="Întrebări despre fondurile europene"
            description="Răspunsuri despre eligibilitate, depunere, termene și implementare."
            items={fundingFaq}
          />

          <section className="seo-related-section" aria-labelledby="funding-guides-title">
            <p className="eyebrow">Informații relevante</p>
            <h2 id="funding-guides-title">Alege situația care te descrie</h2>
            <div className="seo-related-links">
              <Link href="/consultanta-fonduri-europene"><span><strong>Consultanță fonduri europene</strong><small>Conținutul și limitele serviciului.</small></span><ArrowRight aria-hidden="true" /></Link>
              <Link href="/fonduri-europene-pentru-firme"><span><strong>Fonduri pentru firme</strong><small>Investiții și capacitate de implementare.</small></span><ArrowRight aria-hidden="true" /></Link>
              <Link href="/fonduri-europene-pentru-ong"><span><strong>Fonduri pentru ONG-uri</strong><small>Beneficiari, activități și rezultate.</small></span><ArrowRight aria-hidden="true" /></Link>
              <Link href="/fonduri-europene-pentru-startup"><span><strong>Fonduri pentru startup-uri</strong><small>Model de afaceri, echipă și buget.</small></span><ArrowRight aria-hidden="true" /></Link>
            </div>
          </section>

          <section className="section-cta funding-cta" aria-labelledby="funding-cta-title">
            <div><p>Ai un proiect concret?</p><h2 id="funding-cta-title">Trimite investiția, locația și programul care te interesează.</h2></div>
            <Link className="primary-button yellow-button" href="/contact?service=fonduri-europene">Solicită evaluarea <ArrowRight aria-hidden="true" /></Link>
          </section>
        </div>
      </section>
    </SiteShell>
  );
}
