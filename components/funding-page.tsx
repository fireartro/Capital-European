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
import Image from "next/image";
import { EligibilityChecker } from "@/components/eligibility-checker";
import { HeroBackgroundPreload } from "@/components/hero-background-preload";
import { ServiceFaq } from "@/components/service-faq";
import { SiteShell } from "@/components/site-shell";
import { ScrollStarOrbit } from "@/components/scroll-star-orbit";
import { fundingFaq } from "@/lib/service-content";
import { siteConfig } from "@/lib/site-config";

const services = [
  { icon: SearchCheck, title: "Analiză & eligibilitate", text: "Evaluăm compania, investiția și condițiile programului înainte de a începe documentația." },
  { icon: FilePenLine, title: "Pregătirea proiectului", text: "Construim cererea, planul de afaceri, bugetul și anexele într-un dosar coerent." },
  { icon: ClipboardCheck, title: "Depunere & clarificări", text: "Gestionăm transmiterea proiectului și răspunsurile solicitate de autoritatea finanțatoare." },
  { icon: BarChart3, title: "Implementare & monitorizare", text: "Urmărim indicatorii, achizițiile, documentele și raportarea pe durata implementării." }
];

const steps = [
  ["01", "Analiză inițială", "Identificăm oportunitatea potrivită și evaluăm realist eligibilitatea."],
  ["02", "Documentație", "Pregătim proiectul, bugetul, planul și documentele suport."],
  ["03", "Depunere", "Transmitem dosarul și gestionăm eventualele clarificări."],
  ["04", "Implementare", "Te sprijinim să respecți obligațiile și calendarul proiectului."]
] as const;

const fundingStats = [
  ["4", "etape clare", "analiză, documentație, depunere și implementare"],
  ["3", "surse oficiale", "MIPE, fonduri-ue.ro și PNRR verificate în context"],
  ["0", "promisiuni goale", "recomandări bazate pe eligibilitate, nu pe optimism"],
  ["1", "plan urmărit", "calendar, documente și responsabilități într-un fir logic"]
] as const;

const fundingFit = [
  ["IMM-uri cu plan de investiții", "Verificăm codul CAEN, locația, capacitatea financiară, cheltuielile eligibile și calendarul apelului."],
  ["ONG-uri și organizații locale", "Clarificăm obiectivele proiectului, impactul, indicatorii și documentele necesare pentru o cerere coerentă."],
  ["Antreprenori la început de drum", "Separăm ideile fezabile de proiectele care au nevoie de pregătire suplimentară înainte de aplicare."]
] as const;

const fundingChecklist = [
  "programul potrivit pentru investiție",
  "documentele lipsă înainte de depunere",
  "bugetul și cofinanțarea necesară",
  "riscurile administrative sau financiare",
  "calendarul realist până la termen",
  "obligațiile după aprobarea proiectului"
] as const;

export function FundingPage() {
  return (
    <SiteShell navigationContext="funding">
      <ScrollStarOrbit sectionIds={[
        "funding-hero",
        "servicii-fonduri",
        "repere-fonduri",
        "beneficii-fonduri",
        "calculator-eligibilitate",
        "proces-fonduri",
        "evaluare-fonduri",
        "intrebari-fonduri"
      ]} />
      <section className="inner-hero funding-hero" id="funding-hero">
        <div className="section-container inner-hero-content">
          <p className="eyebrow eyebrow-light"><Landmark /> Consultanță fonduri europene</p>
          <h1>Consultanță fonduri europene<br />pentru proiecte <em>bine construite.</em></h1>
          <p>Analiză responsabilă, documentație atentă și sprijin de la alegerea programului până la implementare.</p>
          <div className="inner-hero-actions">
            <a className="primary-button yellow-button" href="/contact?service=fonduri-europene" aria-label="Solicită analiza inițială pentru fonduri europene" title="Solicită analiza inițială pentru fonduri europene">Solicită analiza inițială <ArrowRight aria-hidden="true" /></a>
            <a className="secondary-link" href="#servicii-fonduri" aria-label="Vezi serviciile de consultanță pentru fonduri europene" title="Vezi serviciile de consultanță pentru fonduri europene">Vezi serviciile</a>
          </div>
          <div className="hero-proof">
            <span><ShieldCheck /> Fără promisiuni nerealiste</span>
            <span><Check /> Pași și responsabilități clare</span>
            <span><Check /> Sprijin inclus în implementare</span>
          </div>
        </div>
      </section>
      <HeroBackgroundPreload selector=".funding-hero .section-container.inner-hero-content" />

      <section className="content-section funding-section" id="servicii-fonduri">
        <div className="section-container">
          <header className="section-title-row">
            <div>
              <p className="eyebrow"><Landmark /> Servicii complete</p>
              <h2>Servicii de consultanță fonduri europene pentru proiecte <em>implementate corect.</em></h2>
            </div>
            <p>Nu promitem finanțări garantate. Oferim analiză realistă, documentație riguroasă și sprijin consecvent pe întregul parcurs.</p>
          </header>

          <div className="funding-service-grid">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <article className="funding-service-card" key={service.title}>
                  <span className="card-number">0{index + 1}</span>
                  <span className="service-round-icon"><Icon /></span>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                </article>
              );
            })}
          </div>

          <div className="visual-story visual-story-funding" id="repere-fonduri" aria-label="Repere pentru consultanța de fonduri europene">
            <figure className="visual-story-media">
              <Image
                src="/images/fonduri-europene-consultanta-real.webp"
                alt="Consultanță fonduri europene cu documente de proiect, bugete și analiză de eligibilitate"
                fill
                sizes="(max-width: 960px) 100vw, 48vw"
              />
              <figcaption>
                <strong>Analiză înainte de dosar</strong>
                <span>Verificăm riscurile înainte să investești timp în documentație.</span>
              </figcaption>
            </figure>
            <div className="visual-story-copy">
              <p className="eyebrow"><SearchCheck /> Repere clare</p>
              <h3>Mai multă încredere în decizie, înainte să pornești proiectul.</h3>
              <p>Colaborarea pune accent pe structură, documente controlate, buget urmărit și pași vizibili, astfel încât decizia de aplicare să fie una informată.</p>
              <div className="service-metrics">
                {fundingStats.map(([value, label, detail]) => (
                  <article key={label}>
                    <strong>{value}</strong>
                    <span>{label}</span>
                    <p>{detail}</p>
                  </article>
                ))}
              </div>
            </div>
          </div>

          <div className="fit-panel funding-fit-panel" aria-label="Pentru cine este potrivită consultanța pentru fonduri europene">
            <div className="fit-panel-copy">
              <p className="eyebrow"><ShieldCheck /> Potrivire realistă</p>
              <h3>Pentru cine are sens să începem analiza.</h3>
              <p>O finanțare nerambursabilă bună nu pornește din dorința de a aplica oriunde, ci din potrivirea dintre investiție, program și capacitatea de implementare.</p>
            </div>
            <div className="fit-grid">
              {fundingFit.map(([title, text]) => (
                <article key={title}>
                  <h4>{title}</h4>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="funding-benefits" id="beneficii-fonduri">
            <div className="benefit-copy">
              <p className="eyebrow eyebrow-light">Beneficiile colaborării</p>
              <h3>Decizii mai bune înainte de investiții importante.</h3>
              <p>Primești o imagine clară asupra eligibilității, riscurilor, documentelor și responsabilităților înainte să aloci timp și resurse.</p>
            </div>
            <ul>
              <li><Check /> Program ales pe criterii reale</li>
              <li><Check /> Buget și calendar construite coerent</li>
              <li><Check /> Documente verificate înainte de depunere</li>
              <li><Check /> Suport și după aprobarea proiectului</li>
            </ul>
          </div>

          <div className="compact-check-panel">
            <div>
              <p className="eyebrow"><ClipboardCheck /> Ce clarificăm</p>
              <h3>Întrebările care reduc riscul înainte de dosar.</h3>
            </div>
            <ul>
              {fundingChecklist.map((item) => <li key={item}><Check /> {item}</li>)}
            </ul>
          </div>

          <EligibilityChecker />

          <div className="process-block" id="proces-fonduri">
            <div className="process-heading">
              <p className="eyebrow">Procesul de colaborare</p>
              <h3>Proces clar pentru accesarea fondurilor europene.</h3>
            </div>
            <div className="process-steps">
              {steps.map(([number, title, text]) => (
                <article key={number}>
                  <span>{number}</span>
                  <h4>{title}</h4>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </div>

          <section className="semantic-content funding-semantic-content" id="evaluare-fonduri" aria-labelledby="funding-content-title">
            <div className="semantic-content-intro">
              <p className="eyebrow"><SearchCheck aria-hidden="true" /> Evaluare și documentație</p>
              <h2 id="funding-content-title">Consultanță pentru fonduri europene, de la eligibilitate la implementare.</h2>
              <p>
                O cerere de finanțare solidă pornește de la potrivirea reală dintre obiectivele organizației și condițiile
                programului. Analizăm apelul, investiția, resursele și obligațiile viitoare înainte de a recomanda pregătirea proiectului.
              </p>
              <p className="official-links">
                Pentru verificarea programelor și ghidurilor oficiale, consultă și{" "}
                <a href={siteConfig.officialResources.mipe} target="_blank" rel="noopener noreferrer" aria-label="Deschide site-ul oficial MIPE despre fonduri europene" title="Site oficial MIPE">
                  Ministerul Investițiilor și Proiectelor Europene
                </a>
                ,{" "}
                <a href={siteConfig.officialResources.fonduriUe} target="_blank" rel="noopener noreferrer" aria-label="Deschide portalul oficial fonduri-ue.ro" title="Portal oficial fonduri-ue.ro">
                  portalul fonduri-ue.ro
                </a>
                {" "}și{" "}
                <a href={siteConfig.officialResources.pnrr} target="_blank" rel="noopener noreferrer" aria-label="Deschide portalul oficial PNRR România" title="Portal oficial PNRR România">
                  PNRR România
                </a>
                .
              </p>
            </div>
            <div className="semantic-content-grid">
              <article>
                <h3>Analiza programului de finanțare</h3>
                <p>Verificăm solicitantul eligibil, domeniul investiției, locația, cheltuielile, cofinanțarea, calendarul și criteriile de evaluare prevăzute în ghid.</p>
              </article>
              <article>
                <h3>Pregătirea cererii și anexelor</h3>
                <p>Structurăm obiectivele, activitățile, rezultatele, bugetul și documentele suport într-o aplicație coerentă, ușor de verificat și aliniată cerințelor apelului.</p>
              </article>
              <article>
                <h3>Implementarea finanțării nerambursabile</h3>
                <p>După aprobare, urmărim obligațiile contractuale, indicatorii, achizițiile și documentele necesare pentru cererile de plată sau rambursare.</p>
              </article>
            </div>
          </section>

          <ServiceFaq
            id="intrebari-fonduri"
            title="Întrebări despre accesarea fondurilor europene."
            description="Răspunsuri directe despre eligibilitate, cererea de finanțare, termene și implementare."
            items={fundingFaq}
          />

          <div className="section-cta funding-cta">
            <div><p>Ai o idee de investiție?</p><h3>Verifică dacă există o linie de finanțare potrivită.</h3></div>
            <a className="primary-button yellow-button" href="/contact?service=fonduri-europene" aria-label="Solicită analiza pentru o linie de finanțare europeană" title="Solicită analiza pentru fonduri europene">Solicită analiza <ArrowRight aria-hidden="true" /></a>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
