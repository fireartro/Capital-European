import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Check,
  FileCheck2,
  FilePenLine,
  Files,
  FolderKanban,
  Headphones,
  Network
} from "lucide-react";
import Image from "next/image";
import { ServiceFaq } from "@/components/service-faq";
import { SiteShell } from "@/components/site-shell";
import { ScrollStarOrbit } from "@/components/scroll-star-orbit";
import { administrativeFaq } from "@/lib/service-content";

const services = [
  { icon: FilePenLine, title: "Redactare și procesare documente", text: "Redactare, formatare și prelucrare profesională pentru documente clare și consecvente.", benefits: ["Documente editabile", "Formatare unitară", "Revizii controlate"] },
  { icon: FolderKanban, title: "Administrare documente", text: "Organizare, indexare, digitalizare și arhivare într-un sistem clar și ușor de urmărit.", benefits: ["Arhivă coerentă", "Acces rapid", "Trasabilitate"] },
  { icon: Headphones, title: "Secretariat", text: "Gestionăm agenda, comunicarea și solicitările recurente cu atenție și profesionalism.", benefits: ["Continuitate", "Imagine profesionistă", "Zero solicitări pierdute"] },
  { icon: BriefcaseBusiness, title: "Asistență administrativă", text: "Suport flexibil pentru furnizori, programări, centralizări și activitatea de back-office.", benefits: ["Cost controlat", "Suport scalabil", "Raportare clară"] },
  { icon: Network, title: "Consultanță operațională", text: "Analizăm fluxurile interne și propunem procese mai simple, clare și ușor de delegat.", benefits: ["Procese eficiente", "Roluri clare", "Plan personalizat"] }
];

const companySteps = [
  ["1", "Alegerea formei juridice"],
  ["2", "Pregătirea documentelor"],
  ["3", "Depunerea dosarului"],
  ["4", "Predarea documentelor firmei"]
] as const;

const adminStats = [
  ["5", "direcții administrative", "documente, arhivă, secretariat, back-office și procese"],
  ["4", "pași pentru firmă", "orientare, documente, depunere și predare organizată"],
  ["1", "flux delegat", "responsabilități, termene și verificări într-un loc clar"],
  ["3", "puncte urmărite", "documente, termene și comunicare centralizate consecvent"]
] as const;

const adminWorkflow = [
  ["Documente", ["redactare și formatare", "centralizare și evidență", "arhivare și trasabilitate"]],
  ["Comunicare", ["agenda solicitărilor", "răspunsuri recurente", "urmărirea termenelor"]],
  ["Back-office", ["relația cu furnizorii", "raportări interne", "procese ușor de delegat"]]
] as const;

export function AdminPage() {
  return (
    <SiteShell navigationContext="admin">
      <ScrollStarOrbit sectionIds={[
        "admin-hero",
        "servicii-administrative",
        "repere-administrative",
        "infiintare-firma",
        "externalizare-administrativa",
        "intrebari-administrative"
      ]} />
      <section className="inner-hero admin-hero" id="admin-hero">
        <div className="section-container inner-hero-content">
          <p className="eyebrow eyebrow-light"><Files /> Servicii administrative externalizate</p>
          <h1>Ordine în documente.<br />Mai mult timp pentru <em>afacere.</em></h1>
          <p>Preluăm activitățile administrative recurente și le transformăm în procese clare, predictibile și ușor de urmărit pentru antreprenori, IMM-uri și ONG-uri.</p>
          <div className="inner-hero-actions">
            <a className="primary-button yellow-button" href="/contact?service=servicii-administrative" aria-label="Solicită o ofertă pentru servicii administrative externalizate" title="Solicită ofertă pentru servicii administrative">Solicită o ofertă <ArrowRight aria-hidden="true" /></a>
            <a className="secondary-link" href="#servicii-administrative" aria-label="Vezi serviciile administrative externalizate ProBirou" title="Vezi serviciile administrative">Vezi serviciile</a>
          </div>
        </div>
      </section>

      <section className="content-section admin-section" id="servicii-administrative">
        <div className="section-container">
          <header className="section-title-row">
            <div>
              <p className="eyebrow"><Files /> Servicii administrative</p>
              <h2>Servicii administrative externalizate pentru companii organizate.</h2>
            </div>
            <p>Alegi exact activitățile pe care vrei să le delegi, iar volumul poate fi ajustat pe măsură ce compania evoluează.</p>
          </header>

          <div className="visual-story visual-story-admin" id="repere-administrative" aria-label="Repere pentru serviciile administrative externalizate">
            <div className="visual-story-copy">
              <p className="eyebrow"><FileCheck2 /> Back-office organizat</p>
              <h3>Un birou administrativ care se simte prezent, chiar dacă este externalizat.</h3>
              <p>Colaborarea urmărește documentele, solicitările și responsabilitățile într-un flux ușor de predat, verificat și ajustat pe măsură ce compania crește.</p>
              <div className="service-metrics">
                {adminStats.map(([value, label, detail]) => (
                  <article key={label}>
                    <strong>{value}</strong>
                    <span>{label}</span>
                    <p>{detail}</p>
                  </article>
                ))}
              </div>
            </div>
            <figure className="visual-story-media">
              <Image
                src="/images/servicii-administrative-workflow-real.webp"
                alt="Servicii administrative externalizate cu documente organizate, laptop și flux de lucru"
                fill
                sizes="(max-width: 960px) 100vw, 48vw"
              />
              <figcaption>
                <strong>Documente la zi</strong>
                <span>Procese urmărite, arhivă coerentă și comunicare mai ușor de delegat.</span>
              </figcaption>
            </figure>
          </div>

          <div className="admin-service-grid">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article className="admin-service-card" key={service.title}>
                  <span className="admin-card-icon"><Icon /></span>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <ul>{service.benefits.map((benefit) => <li key={benefit}><Check /> {benefit}</li>)}</ul>
                  <a href="/contact?service=servicii-administrative" aria-label={`Solicită detalii despre ${service.title}`} title={`Solicită detalii despre ${service.title}`}>Solicită detalii <ArrowRight aria-hidden="true" /></a>
                </article>
              );
            })}

            <article className="company-card" id="infiintare-firma">
              <div className="company-card-copy">
                <span className="company-label"><Building2 /> Serviciu nou</span>
                <h3>Înființare firmă</h3>
                <p>Te ajutăm să pornești corect, cu documentele pregătite și pașii administrativi explicați clar.</p>
                <ul>
                  <li><Check /> Orientare pentru alegerea formei juridice</li>
                  <li><Check /> Pregătirea documentelor necesare</li>
                  <li><Check /> Asistență pentru depunerea dosarului</li>
                  <li><Check /> Suport administrativ după înființare</li>
                </ul>
                <a className="primary-button yellow-button" href="/contact?service=infiintare-firma" aria-label="Discută cu ProBirou despre înființarea firmei tale" title="Discută despre înființarea firmei">Discută despre firma ta <ArrowRight aria-hidden="true" /></a>
              </div>
              <ol className="company-steps" aria-label="Pașii pentru înființarea firmei">
                {companySteps.map(([number, label]) => <li key={number}><span>{number}</span><p>{label}</p></li>)}
              </ol>
            </article>
          </div>

          <div className="operations-board" aria-label="Ce poate include externalizarea administrativă">
            <div className="operations-copy">
              <p className="eyebrow"><FolderKanban /> Flux operațional</p>
              <h3>Activitățile sunt grupate pe fluxuri, nu lăsate ca sarcini izolate.</h3>
              <p>O colaborare bună trebuie să fie ușor de urmărit: ce intră, cine aprobă, ce se predă și când se verifică.</p>
            </div>
            <div className="operations-lanes">
              {adminWorkflow.map(([title, items]) => (
                <article key={title}>
                  <h4>{title}</h4>
                  <ul>
                    {items.map((item) => <li key={item}><Check /> {item}</li>)}
                  </ul>
                </article>
              ))}
            </div>
          </div>

          <section className="semantic-content" id="externalizare-administrativa" aria-labelledby="administrative-content-title">
            <div className="semantic-content-intro">
              <p className="eyebrow"><FileCheck2 aria-hidden="true" /> Externalizare administrativă</p>
              <h2 id="administrative-content-title">Servicii administrative pentru procese de business mai eficiente.</h2>
              <p>
                Activitățile de back-office consumă timp și atenție, chiar dacă nu fac parte din obiectivul principal al companiei.
                Prin externalizare, documentele, centralizările și solicitările recurente sunt gestionate într-un flux clar, cu
                responsabilități și termene convenite.
              </p>
            </div>
            <div className="semantic-content-grid">
              <article>
                <h3>Ce activități pot fi preluate</h3>
                <p>Procesare și organizare documente, secretariat, actualizarea evidențelor interne, centralizări, programări și suport administrativ pentru relația cu furnizorii.</p>
              </article>
              <article>
                <h3>Cum începe colaborarea</h3>
                <p>Cartografiem volumul de lucru, canalele de comunicare și documentele folosite, apoi stabilim un proces, un calendar și puncte de verificare ușor de urmărit.</p>
              </article>
              <article>
                <h3>Ce rămâne sub controlul companiei</h3>
                <p>Deciziile, aprobările și accesul la informații sensibile rămân la client. Activitățile delegate sunt executate în limitele și regulile convenite.</p>
              </article>
            </div>
          </section>

          <ServiceFaq
            id="intrebari-administrative"
            title="Răspunsuri despre serviciile administrative."
            description="Clarificări despre externalizare, documente, confidențialitate și modul de colaborare."
            items={administrativeFaq}
          />
        </div>
      </section>
    </SiteShell>
  );
}
