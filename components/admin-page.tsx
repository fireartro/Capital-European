import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Check,
  Files,
  FolderKanban,
  Headphones
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { ServiceFaq } from "@/components/service-faq";
import { SiteShell } from "@/components/site-shell";
import { ScrollStarOrbit } from "@/components/scroll-star-orbit";
import { administrativeFaq } from "@/lib/service-content";

const services = [
  {
    icon: BriefcaseBusiness,
    title: "Înființare PFA",
    text: "Organizăm informațiile despre activitate, sediu și documentele necesare pentru traseul administrativ al unui PFA.",
    included: ["listă adaptată situației", "verificarea administrativă a dosarului"],
    href: "/servicii-administrative/infiintare-pfa",
    linkLabel: "Vezi serviciul PFA"
  },
  {
    icon: Building2,
    title: "Înființare SRL",
    text: "Centralizăm datele societății, asociaților, administratorului, sediului și activităților declarate.",
    included: ["date și documente centralizate", "urmărirea completărilor"],
    href: "/servicii-administrative/infiintare-srl",
    linkLabel: "Vezi serviciul SRL"
  },
  {
    icon: FolderKanban,
    title: "Administrare documente",
    text: "Înregistrăm, clasificăm și urmărim documentele care necesită aprobare, răspuns sau completare.",
    included: ["reguli de denumire și predare", "evidența termenelor"],
    href: "/servicii-administrative/administrare-documente",
    linkLabel: "Vezi administrarea documentelor"
  },
  {
    icon: Headphones,
    title: "Secretariat externalizat",
    text: "Gestionăm corespondența, programările și solicitările recurente după regulile stabilite cu echipa ta.",
    included: ["răspunsuri și escaladări", "istoricul solicitărilor"],
    href: "/servicii-administrative/secretariat",
    linkLabel: "Vezi serviciul de secretariat"
  },
  {
    icon: Files,
    title: "Asistență administrativă",
    text: "Preluăm centralizări, actualizări de evidențe și alte activități recurente de back-office.",
    included: ["volum și termene convenite", "raportarea activităților preluate"],
    href: "/contact?service=administrativ",
    linkLabel: "Descrie activitatea"
  }
] as const;

const collaborationSteps = [
  ["Inventar", "Stabilim activitățile, volumul, documentele și persoanele care aprobă."],
  ["Reguli de lucru", "Convenim predarea, termenele, accesul și situațiile care trebuie escaladate."],
  ["Preluare", "Începem cu activitățile stabilite și ajustăm volumul după munca reală."]
] as const;

export function AdminPage() {
  return (
    <SiteShell navigationContext="admin">
      <ScrollStarOrbit sectionIds={[
        "admin-hero",
        "servicii-administrative",
        "delegare-administrativa",
        "proces-administrativ",
        "intrebari-administrative"
      ]} />

      <section className="inner-hero admin-hero" id="admin-hero" aria-labelledby="admin-hero-title" aria-describedby="admin-hero-description">
        <div className="section-container inner-hero-content">
          <p className="eyebrow eyebrow-light"><Files aria-hidden="true" /> Servicii administrative</p>
          <h1 id="admin-hero-title">Activități administrative pe care le poți delega</h1>
          <p id="admin-hero-description">Oferim sprijin pentru înființarea PFA sau SRL, documente, secretariat și activități recurente de back-office.</p>
          <div className="inner-hero-actions">
            <Link className="primary-button yellow-button" href="/contact?service=servicii-administrative">Descrie activitatea <ArrowRight aria-hidden="true" /></Link>
            <a className="secondary-link" href="#servicii-administrative">Vezi serviciile</a>
          </div>
        </div>
      </section>

      <section className="content-section admin-section" id="servicii-administrative" aria-labelledby="admin-services-title" aria-describedby="admin-services-description">
        <div className="section-container">
          <header className="section-title-row">
            <div>
              <p className="eyebrow"><Files aria-hidden="true" /> Ce putem prelua</p>
              <h2 id="admin-services-title">Alege serviciul de care ai nevoie</h2>
            </div>
            <p id="admin-services-description">Fiecare serviciu are o pagină separată. Pentru un caz mixt, descrie activitățile în formular și stabilim ce poate fi grupat.</p>
          </header>

          <div className="admin-service-grid" aria-describedby="admin-services-description">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <article className="admin-service-card" key={service.title}>
                  <span className="admin-card-icon"><Icon aria-hidden="true" /></span>
                  <h3>{service.title}</h3>
                  <p>{service.text}</p>
                  <ul>{service.included.map((item) => <li key={item}><Check aria-hidden="true" /> {item}</li>)}</ul>
                  <Link href={service.href}>{service.linkLabel} <ArrowRight aria-hidden="true" /></Link>
                </article>
              );
            })}
          </div>

          <section className="admin-delegation-summary" id="delegare-administrativa" aria-labelledby="delegation-title">
            <figure>
              <Image
                src="/images/servicii-administrative-workflow-real.webp"
                alt="Birou cu documente și instrumente folosite pentru activități administrative"
                width={1400}
                height={1050}
                loading="lazy"
                sizes="(max-width: 960px) 100vw, 48vw"
              />
            </figure>
            <div>
              <p className="eyebrow"><FolderKanban aria-hidden="true" /> Limite și responsabilități</p>
              <h2 id="delegation-title">Ce trebuie stabilit înainte de delegare</h2>
              <p>Definim ce documente primim, ce putem executa fără aprobare și cine decide în situațiile care depășesc regulile convenite.</p>
              <ul>
                <li><Check aria-hidden="true" /> Clientul păstrează deciziile și aprobările.</li>
                <li><Check aria-hidden="true" /> Accesul este limitat la activitățile contractate.</li>
                <li><Check aria-hidden="true" /> Serviciile juridice, fiscale și contabile se validează separat.</li>
              </ul>
            </div>
          </section>

          <section className="process-block admin-process" id="proces-administrativ" aria-labelledby="admin-process-title">
            <div className="process-heading">
              <p className="eyebrow">Colaborarea</p>
              <h2 id="admin-process-title">Cum începe preluarea activităților</h2>
            </div>
            <ol className="plain-process-list">
              {collaborationSteps.map(([title, text]) => <li key={title}><h3>{title}</h3><p>{text}</p></li>)}
            </ol>
          </section>

          <ServiceFaq
            id="intrebari-administrative"
            title="Întrebări despre serviciile administrative"
            description="Răspunsuri despre activități, confidențialitate și modul de colaborare."
            items={administrativeFaq}
          />

          <section className="section-cta admin-cta" aria-labelledby="admin-cta-title">
            <div><p>Ai o activitate administrativă de delegat?</p><h2 id="admin-cta-title">Spune-ne ce presupune și cât de des apare.</h2></div>
            <Link className="primary-button yellow-button" href="/contact?service=servicii-administrative">Trimite solicitarea <ArrowRight aria-hidden="true" /></Link>
          </section>
        </div>
      </section>
    </SiteShell>
  );
}
