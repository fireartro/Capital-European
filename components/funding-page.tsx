import {
  ArrowRight,
  BarChart3,
  Check,
  ClipboardCheck,
  ExternalLink,
  FilePenLine,
  Landmark,
  SearchCheck,
  ShieldCheck
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { FundingEligibilityChecker } from "@/components/funding-eligibility-checker";
import { FundingHeroCarousel } from "@/components/funding-hero-carousel";
import { ServiceFaq } from "@/components/service-faq";
import { SiteShell } from "@/components/site-shell";
import { ScrollStarOrbit } from "@/components/scroll-star-orbit";
import { fundingPrograms } from "@/lib/funding-programs";
import { fundingFaq } from "@/lib/service-content";
import { siteConfig } from "@/lib/site-config";

const services = [
  { icon: SearchCheck, title: "Analiză de eligibilitate", text: "Comparăm solicitantul și investiția cu regulile programului înainte de pregătirea dosarului." },
  { icon: FilePenLine, title: "Cerere și documentație", text: "Corelăm obiectivele, activitățile, bugetul și anexele într-o documentație consecventă." },
  { icon: ClipboardCheck, title: "Depunere și clarificări", text: "Organizăm transmiterea proiectului și răspunsurile cerute în etapa de evaluare." },
  { icon: BarChart3, title: "Sprijin în implementare", text: "Urmărim indicatorii, achizițiile, documentele și raportarea pe parcursul implementării." }
];

const steps = [
  ["01", "Analiză inițială", "Verificăm solicitantul, investiția și condițiile programului."],
  ["02", "Plan de lucru", "Stabilim documentele, responsabilitățile și calendarul."],
  ["03", "Pregătire și depunere", "Construim documentația și gestionăm clarificările incluse în serviciu."],
  ["04", "Implementare", "Urmărim obligațiile, termenele și documentele proiectului aprobat."]
] as const;

const fundingStats = [
  ["4", "etape clare", "analiză, documentație, depunere și implementare"],
  ["3", "surse oficiale", "MIPE, fonduri-ue.ro și PNRR verificate în context"],
  ["Fără", "garanții false", "decizia de finanțare aparține autorității competente"],
  ["1", "plan de lucru comun", "același calendar leagă documentele, termenele, deciziile și persoanele responsabile, de la analiză până la raportare"]
] as const;

const fundingFit = [
  ["Ai o investiție concretă", "Știi ce vrei să cumperi, să construiești sau să schimbi în activitate, chiar dacă bugetul nu este încă definitiv."],
  ["Poți susține partea ta de proiect", "Ești pregătit să discutăm deschis despre cofinanțare, cheltuieli neeligibile și perioada în care banii pot rămâne blocați."],
  ["Vrei un răspuns sincer", "Analiza poate arăta că merită să aplici, că trebuie să mai pregătești investiția sau că programul nu este potrivit. Toate trei sunt răspunsuri utile."]
] as const;

const fundingChecklist = [
  "programul potrivit pentru investiție",
  "documentele lipsă înainte de depunere",
  "bugetul și cofinanțarea necesară",
  "riscurile administrative sau financiare",
  "calendarul realist până la termen",
  "obligațiile după aprobarea proiectului"
] as const;

const fundingConversionSteps = [
  ["1", "Trimite contextul", "Investiția dorită, locația, domeniul de activitate și termenul urmărit."],
  ["2", "Clarificăm eligibilitatea", "Separăm ce este verificabil acum de ce trebuie completat înainte de dosar."],
  ["3", "Decizi informat", "Primești următorii pași, riscurile principale și documentele care merită pregătite."]
] as const;

const differentiators = [
  {
    title: "Analiză înainte de recomandare",
    text: "Nu pornim dosarul doar pentru că există un apel. Verificăm mai întâi firma sau organizația, investiția și condițiile care pot opri proiectul.",
    details: ["criterii eliminatorii verificate", "riscuri discutate înainte de ofertă"]
  },
  {
    title: "Punctaj explicat, nu doar estimat",
    text: "Arătăm ce puncte pot fi susținute cu documente și ce depinde încă de investiție, oferte, rezultate financiare sau decizii viitoare.",
    details: ["ipoteze separate de dovezi", "grila oficială rămâne reperul"]
  },
  {
    title: "Un plan de lucru comun",
    text: "Clientul vede ce documente lipsesc, cine le pregătește, cine aprobă și care este termenul. Astfel, proiectul nu se pierde între mesaje și versiuni.",
    details: ["calendar și responsabilități", "versiuni și aprobări urmărite"]
  },
  {
    title: "Sprijin în implementare, fără opțional ascuns",
    text: "Dacă proiectul este aprobat, continuăm cu indicatorii, achizițiile, cererile de plată și raportarea în limitele stabilite prin contract.",
    details: ["legătură cu cererea aprobată", "obligații urmărite până la închidere"]
  }
] as const;

export function FundingPage() {
  return (
    <SiteShell navigationContext="funding">
      <ScrollStarOrbit sectionIds={[
        "funding-hero",
        "servicii-fonduri",
        "repere-fonduri",
        "fonduri-active",
        "beneficii-fonduri",
        "verificare-eligibilitate",
        "ce-ne-deosebeste",
        "proces-fonduri",
        "evaluare-fonduri",
        "intrebari-fonduri"
      ]} />
      <FundingHeroCarousel />

      <section className="content-section funding-section" id="servicii-fonduri" aria-labelledby="funding-services-title" aria-describedby="funding-services-description">
        <div className="section-container">
          <header className="section-title-row">
            <div>
              <p className="eyebrow"><Landmark /> Servicii de consultanță</p>
              <h2 id="funding-services-title">Ce putem prelua în pregătirea și gestionarea <em>proiectului.</em></h2>
            </div>
            <p id="funding-services-description">Conținutul serviciului se stabilește după analiza solicitantului, a apelului și a stadiului documentelor.</p>
          </header>

          <div className="funding-service-grid" aria-describedby="funding-services-description">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <article className="funding-service-card" key={service.title} aria-labelledby={`funding-service-${index + 1}-title`} aria-describedby={`funding-service-${index + 1}-description`}>
                  <span className="card-number">0{index + 1}</span>
                  <span className="service-round-icon"><Icon /></span>
                  <h3 id={`funding-service-${index + 1}-title`}>{service.title}</h3>
                  <p id={`funding-service-${index + 1}-description`}>{service.text}</p>
                </article>
              );
            })}
          </div>

          <section className="visual-story visual-story-funding" id="repere-fonduri" aria-labelledby="funding-story-title" aria-describedby="funding-story-description">
            <figure className="visual-story-media">
              <Image
                src="/images/fonduri-europene-consultanta-real.webp"
                alt="Consultanță fonduri europene cu documente de proiect, bugete și analiză de eligibilitate"
                width={1400}
                height={1050}
                loading="lazy"
                sizes="(max-width: 960px) 100vw, 48vw"
              />
              <figcaption>
                <strong>Analiză înainte de documentație</strong>
                <span>Verificăm criteriile și riscurile înainte de a construi dosarul.</span>
              </figcaption>
            </figure>
            <div className="visual-story-copy">
              <p className="eyebrow"><SearchCheck /> Repere clare</p>
              <h3 id="funding-story-title">O decizie informată începe cu verificarea proiectului.</h3>
              <p id="funding-story-description">Clarificăm eligibilitatea, bugetul, documentele și obligațiile viitoare înainte de recomandarea depunerii.</p>
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
          </section>

          <section className="funding-programs-section" id="fonduri-active" aria-labelledby="funding-programs-title" aria-describedby="funding-programs-description">
            <header className="funding-programs-header">
              <div>
                <p className="eyebrow"><Landmark aria-hidden="true" /> Apeluri urmărite</p>
                <h2 id="funding-programs-title">Fonduri active și oportunități în pregătire</h2>
              </div>
              <p id="funding-programs-description">Structura este pregătită pentru actualizări. Până la publicarea și verificarea ghidurilor, cardurile de mai jos sunt categorii orientative, nu apeluri active confirmate.</p>
            </header>
            <div className="funding-program-list">
              {fundingPrograms.map((program) => (
                <article className="funding-program-card" key={program.id}>
                  <figure className="funding-program-image">
                    <Image src={program.image} alt={program.imageAlt} fill sizes="(max-width: 640px) 100vw, (max-width: 1100px) 50vw, 33vw" />
                  </figure>
                  <div className="funding-program-body">
                  <div className="funding-program-meta">
                    <span>{program.status}</span>
                    <small>{program.lastVerified}</small>
                  </div>
                  <p>{program.program}</p>
                  <h3>{program.title}</h3>
                  <p>{program.summary}</p>
                  <dl className="funding-program-facts">
                    <div><dt>Beneficiari</dt><dd>{program.audience}</dd></div>
                    <div><dt>Valoare</dt><dd>{program.value}</dd></div>
                    <div><dt>Cofinanțare</dt><dd>{program.cofinancing}</dd></div>
                    <div><dt>Arie</dt><dd>{program.region}</dd></div>
                  </dl>
                  <div className="funding-program-actions">
                    <Link href={`/contact?service=fonduri-europene&program=${program.id}`}>Sunt interesat <ArrowRight aria-hidden="true" /></Link>
                    <a href={program.sourceUrl} target="_blank" rel="noopener noreferrer">Portal oficial <ExternalLink aria-hidden="true" /></a>
                  </div>
                  </div>
                </article>
              ))}
            </div>
            <div className="funding-programs-note">
              <p>Ai găsit un apel care nu apare aici? Trimite denumirea sau ghidul. Îl verificăm în sursa oficială înainte să îți spunem dacă merită analizat.</p>
              <Link className="primary-button blue-button" href="/contact?service=fonduri-europene&program=program-nespecificat">Solicită identificarea programului <ArrowRight aria-hidden="true" /></Link>
            </div>
          </section>

          <section className="fit-panel funding-fit-panel" aria-labelledby="funding-fit-title" aria-describedby="funding-fit-description">
            <div className="fit-panel-copy">
              <p className="eyebrow"><ShieldCheck /> Potrivire realistă</p>
              <h3 id="funding-fit-title">Când merită începută analiza</h3>
              <p id="funding-fit-description">Merită să începem când poți descrie investiția și ești pregătit să verificăm inclusiv partea mai puțin comodă: banii proprii, termenele și obligațiile de după aprobare.</p>
            </div>
            <div className="fit-grid">
              {fundingFit.map(([title, text]) => (
                <article key={title}>
                  <h4>{title}</h4>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </section>

          <section className="funding-benefits" id="beneficii-fonduri" aria-labelledby="funding-benefits-title">
            <div className="benefit-copy">
              <p className="eyebrow eyebrow-light">Beneficiile colaborării</p>
              <h3 id="funding-benefits-title">Ce primești înainte să aloci timp și resurse</h3>
              <p>O imagine structurată asupra eligibilității, riscurilor, documentelor, bugetului și responsabilităților.</p>
            </div>
            <ul>
              <li><Check /> Program ales pe criterii reale</li>
              <li><Check /> Buget și calendar construite coerent</li>
              <li><Check /> Documente verificate înainte de depunere</li>
              <li><Check /> Sprijin în implementare după aprobare</li>
            </ul>
          </section>

          <section className="compact-check-panel" aria-labelledby="funding-checklist-title">
            <div>
              <p className="eyebrow"><ClipboardCheck /> Ce clarificăm</p>
              <h3 id="funding-checklist-title">Punctele pe care le verificăm înainte de dosar</h3>
            </div>
            <ul>
              {fundingChecklist.map((item) => <li key={item}><Check /> {item}</li>)}
            </ul>
          </section>

          <section className="conversion-panel funding-conversion-panel" aria-labelledby="funding-conversion-title" aria-describedby="funding-conversion-description">
            <div className="conversion-copy">
              <p className="eyebrow"><SearchCheck /> Evaluare inițială</p>
              <h3 id="funding-conversion-title">Poți începe fără un dosar complet</h3>
              <p id="funding-conversion-description">Trimite informațiile disponibile despre solicitant și investiție. Prima discuție stabilește ce trebuie verificat înainte de ofertă.</p>
              <a className="primary-button yellow-button" href="/contact?service=fonduri-europene" aria-label="Trimite contextul proiectului pentru o evaluare de fonduri europene" title="Trimite contextul proiectului">Trimite contextul proiectului <ArrowRight aria-hidden="true" /></a>
            </div>
            <div className="conversion-steps" aria-label="Pașii primei evaluări pentru fonduri europene">
              {fundingConversionSteps.map(([number, title, text]) => (
                <article key={number}>
                  <span>{number}</span>
                  <h4>{title}</h4>
                  <p>{text}</p>
                </article>
              ))}
            </div>
          </section>

          <FundingEligibilityChecker />

          <section className="differentiators-section" id="ce-ne-deosebeste" aria-labelledby="differentiators-title">
            <header>
              <p className="eyebrow"><ShieldCheck aria-hidden="true" /> Mod de lucru</p>
              <h2 id="differentiators-title">Ce ne deosebește</h2>
              <p>Nu vindem certitudini. Construim un proces în care fiecare recomandare poate fi urmărită în ghid, în documente și în deciziile luate împreună.</p>
            </header>
            <div className="differentiators-grid">
              {differentiators.map((item, index) => (
                <article key={item.title}>
                  <span>0{index + 1}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                  <ul>{item.details.map((detail) => <li key={detail}><Check aria-hidden="true" /> {detail}</li>)}</ul>
                </article>
              ))}
            </div>
          </section>

          <section className="process-block" id="proces-fonduri" aria-labelledby="funding-process-title">
            <div className="process-heading">
              <p className="eyebrow">Procesul de colaborare</p>
              <h3 id="funding-process-title">Patru etape, cu responsabilități stabilite</h3>
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
          </section>

          <section className="semantic-content funding-semantic-content" id="evaluare-fonduri" aria-labelledby="funding-content-title">
            <div className="semantic-content-intro">
              <p className="eyebrow"><SearchCheck aria-hidden="true" /> Evaluare și documentație</p>
              <h2 id="funding-content-title">Ce verifică un consultant înainte de recomandarea depunerii</h2>
              <p>
                O cerere de finanțare solidă pornește de la potrivirea reală dintre obiectivele organizației și condițiile
                programului. Analizăm apelul, investiția, resursele și obligațiile viitoare înainte de a recomanda pregătirea proiectului.
              </p>
              <p className="official-links">
                Pentru verificarea programelor și ghidurilor oficiale, consultă și{" "}
                <a href={siteConfig.officialResources.mipe} target="_blank" rel="noopener noreferrer" title="Site oficial MIPE">
                  Ministerul Investițiilor și Proiectelor Europene
                </a>
                ,{" "}
                <a href={siteConfig.officialResources.fonduriUe} target="_blank" rel="noopener noreferrer" title="Portal oficial fonduri-ue.ro">
                  portalul fonduri-ue.ro
                </a>
                {" "}și{" "}
                <a href={siteConfig.officialResources.pnrr} target="_blank" rel="noopener noreferrer" title="Portal oficial PNRR România">
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

          <section className="seo-related-section" aria-labelledby="funding-guides-title">
            <p className="eyebrow">Informații pe situații concrete</p>
            <h2 id="funding-guides-title">Informații pentru tipul tău de solicitant</h2>
            <div className="seo-related-links">
              <Link href="/consultanta-fonduri-europene"><span><strong>Consultanță fonduri europene</strong><small>Serviciul complet, de la eligibilitate la implementare.</small></span><ArrowRight aria-hidden="true" /></Link>
              <Link href="/fonduri-europene-pentru-firme"><span><strong>Fonduri europene pentru firme</strong><small>Criterii și pregătire pentru investițiile companiilor.</small></span><ArrowRight aria-hidden="true" /></Link>
              <Link href="/fonduri-europene-pentru-ong"><span><strong>Fonduri europene pentru ONG</strong><small>Proiecte sociale, educaționale și comunitare.</small></span><ArrowRight aria-hidden="true" /></Link>
              <Link href="/fonduri-europene-pentru-startup"><span><strong>Fonduri europene pentru startup</strong><small>Condiții și obligații pentru afaceri aflate la început.</small></span><ArrowRight aria-hidden="true" /></Link>
              <Link href="/fonduri-europene#verificare-eligibilitate"><span><strong>Verificare eligibilitate și punctaj</strong><small>Alege programul și pregătește datele pentru o evaluare detaliată.</small></span><ArrowRight aria-hidden="true" /></Link>
            </div>
          </section>

          <section className="section-cta funding-cta" aria-labelledby="funding-cta-title">
            <div><p>Ai o investiție sau un proiect în pregătire?</p><h3 id="funding-cta-title">Trimite contextul pentru o evaluare inițială.</h3></div>
            <a className="primary-button yellow-button" href="/contact?service=fonduri-europene" aria-label="Solicită analiza pentru o linie de finanțare europeană" title="Solicită analiza pentru fonduri europene">Solicită analiza <ArrowRight aria-hidden="true" /></a>
          </section>
        </div>
      </section>
    </SiteShell>
  );
}
