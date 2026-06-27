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
import Link from "next/link";
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

const adminConversionSteps = [
  ["1", "Alegi un flux mic", "Începem cu documente, secretariat sau o zonă administrativă clară."],
  ["2", "Stabilim regulile", "Definim ce se predă, cine aprobă, cum se verifică și la ce interval."],
  ["3", "Extindem controlat", "După ce fluxul funcționează, poți adăuga activități fără haos operațional."]
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
      <section className="inner-hero admin-hero" id="admin-hero" aria-labelledby="admin-hero-title" aria-describedby="admin-hero-description">
        <div className="section-container inner-hero-content">
          <p className="eyebrow eyebrow-light"><Files /> Servicii administrative externalizate</p>
          <h1 id="admin-hero-title">Ordine în documente.<br />Mai mult timp pentru <em>afacere.</em></h1>
          <p id="admin-hero-description">Preluăm activitățile administrative recurente și le transformăm în procese clare, predictibile și ușor de urmărit pentru antreprenori, IMM-uri și ONG-uri.</p>
          <div className="inner-hero-actions">
            <a className="primary-button yellow-button" href="/contact?service=servicii-administrative" aria-label="Solicită o ofertă pentru servicii administrative externalizate" title="Solicită ofertă pentru servicii administrative">Solicită o ofertă <ArrowRight aria-hidden="true" /></a>
            <a className="secondary-link" href="#servicii-administrative" aria-label="Vezi serviciile administrative externalizate Capital European" title="Vezi serviciile administrative">Vezi serviciile</a>
          </div>
          <div className="hero-proof">
            <span><Check /> Poți începe cu un singur flux</span>
            <span><Check /> Documente și termene urmărite</span>
            <span><Check /> Reguli clare de predare</span>
          </div>
        </div>
      </section>

      <section className="content-section admin-section" id="servicii-administrative" aria-labelledby="admin-services-title" aria-describedby="admin-services-description">
        <div className="section-container">
          <header className="section-title-row">
            <div>
              <p className="eyebrow"><Files /> Servicii administrative</p>
              <h2 id="admin-services-title">Servicii administrative externalizate pentru companii organizate.</h2>
            </div>
            <p id="admin-services-description">Alegi exact activitățile pe care vrei să le delegi, iar volumul poate fi ajustat pe măsură ce compania evoluează.</p>
          </header>

          <section className="visual-story visual-story-admin" id="repere-administrative" aria-labelledby="admin-story-title" aria-describedby="admin-story-description">
            <div className="visual-story-copy">
              <p className="eyebrow"><FileCheck2 /> Back-office organizat</p>
              <h3 id="admin-story-title">Un birou administrativ care se simte prezent, chiar dacă este externalizat.</h3>
              <p id="admin-story-description">Colaborarea urmărește documentele, solicitările și responsabilitățile într-un flux ușor de predat, verificat și ajustat pe măsură ce compania crește.</p>
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
                width={1400}
                height={1050}
                loading="lazy"
                sizes="(max-width: 960px) 100vw, 48vw"
              />
              <figcaption>
                <strong>Documente la zi</strong>
                <span>Procese urmărite, arhivă coerentă și comunicare mai ușor de delegat.</span>
              </figcaption>
            </figure>
          </section>

          <div className="admin-service-grid" aria-describedby="admin-services-description">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <article className="admin-service-card" key={service.title} aria-labelledby={`admin-service-${index + 1}-title`} aria-describedby={`admin-service-${index + 1}-description`}>
                  <span className="admin-card-icon"><Icon /></span>
                  <h3 id={`admin-service-${index + 1}-title`}>{service.title}</h3>
                  <p id={`admin-service-${index + 1}-description`}>{service.text}</p>
                  <ul>{service.benefits.map((benefit) => <li key={benefit}><Check /> {benefit}</li>)}</ul>
                  <a href="/contact?service=servicii-administrative" aria-label={`Solicită detalii despre ${service.title}`} title={`Solicită detalii despre ${service.title}`}>Solicită detalii <ArrowRight aria-hidden="true" /></a>
                </article>
              );
            })}

            <article className="company-card" id="infiintare-firma" aria-labelledby="company-setup-title" aria-describedby="company-setup-description">
              <div className="company-card-copy">
                <span className="company-label"><Building2 /> Serviciu nou</span>
                <h3 id="company-setup-title">Înființare firmă</h3>
                <p id="company-setup-description">Te ajutăm să pornești corect, cu documentele pregătite și pașii administrativi explicați clar.</p>
                <ul>
                  <li><Check /> Orientare pentru alegerea formei juridice</li>
                  <li><Check /> Pregătirea documentelor necesare</li>
                  <li><Check /> Asistență pentru depunerea dosarului</li>
                  <li><Check /> Suport administrativ după înființare</li>
                </ul>
                <a className="primary-button yellow-button" href="/contact?service=infiintare-firma" title="Discută despre înființarea firmei">Discută despre firma ta <ArrowRight aria-hidden="true" /></a>
              </div>
              <ol className="company-steps" aria-label="Pașii pentru înființarea firmei">
                {companySteps.map(([number, label]) => <li key={number}><span>{number}</span><p>{label}</p></li>)}
              </ol>
            </article>
          </div>

          <section className="operations-board" aria-labelledby="operations-title" aria-describedby="operations-description">
            <div className="operations-copy">
              <p className="eyebrow"><FolderKanban /> Flux operațional</p>
              <h3 id="operations-title">Activitățile sunt grupate pe fluxuri, nu lăsate ca sarcini izolate.</h3>
              <p id="operations-description">O colaborare bună trebuie să fie ușor de urmărit: ce intră, cine aprobă, ce se predă și când se verifică.</p>
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
          </section>

          <section className="conversion-panel admin-conversion-panel" aria-labelledby="admin-conversion-title" aria-describedby="admin-conversion-description">
            <div className="conversion-copy">
              <p className="eyebrow"><FileCheck2 /> Delegare controlată</p>
              <h3 id="admin-conversion-title">Nu trebuie să externalizezi tot biroul din prima.</h3>
              <p id="admin-conversion-description">Începem cu un proces concret, îl facem ușor de verificat și apoi decizi dacă extinzi colaborarea.</p>
              <a className="primary-button blue-button" href="/contact?service=servicii-administrative" title="Discută despre servicii administrative">Discută despre un flux <ArrowRight aria-hidden="true" /></a>
            </div>
            <div className="conversion-steps" aria-label="Pașii pentru delegarea unui flux administrativ">
              {adminConversionSteps.map(([number, title, text]) => (
                <article key={number}>
                  <span>{number}</span>
                  <h4>{title}</h4>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </section>

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

          <section className="seo-related-section" aria-labelledby="admin-guides-title">
            <p className="eyebrow">Servicii detaliate</p>
            <h2 id="admin-guides-title">Alege fluxul administrativ pe care vrei să îl delegi.</h2>
            <div className="seo-related-links">
              <Link href="/servicii-administrative/secretariat"><span><strong>Secretariat externalizat</strong><small>Corespondență, programări și solicitări urmărite.</small></span><ArrowRight aria-hidden="true" /></Link>
              <Link href="/servicii-administrative/administrare-documente"><span><strong>Administrare documente</strong><small>Clasificare, evidență și responsabilități clare.</small></span><ArrowRight aria-hidden="true" /></Link>
              <Link href="/servicii-administrative/infiintare-firma"><span><strong>Înființare firmă</strong><small>Pașii și documentele pentru pornirea societății.</small></span><ArrowRight aria-hidden="true" /></Link>
            </div>
          </section>

          <section className="section-cta admin-cta" aria-labelledby="admin-cta-title">
            <div><p>Vrei să scapi de munca administrativă repetitivă?</p><h3 id="admin-cta-title">Trimite-ne ce proces vrei să delegi și îți spunem cum poate fi organizat.</h3></div>
            <a className="primary-button yellow-button" href="/contact?service=servicii-administrative" aria-label="Solicită o ofertă pentru servicii administrative" title="Solicită ofertă servicii administrative">Solicită o ofertă <ArrowRight aria-hidden="true" /></a>
          </section>
        </div>
      </section>
    </SiteShell>
  );
}
