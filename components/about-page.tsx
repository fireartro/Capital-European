import { ArrowRight, BadgeCheck, BookOpenCheck, ShieldCheck, Users, Zap } from "lucide-react";
import Image from "next/image";
import { SiteShell } from "@/components/site-shell";

const principles = [
  [ShieldCheck, "Confidențialitate", "Datele și documentele sunt tratate cu discreție și acces controlat."],
  [Zap, "Claritate", "Stabilim termene, responsabilități și puncte de verificare înainte de lucru."],
  [BadgeCheck, "Rigoare", "Verificăm informațiile și păstrăm documentele într-un circuit ușor de urmărit."],
  [Users, "Colaborare", "Adaptăm serviciul la context, volum și deciziile care rămân la client."]
] as const;

const aboutStats = [
  ["2", "direcții de servicii", "fonduri europene și administrare externalizată"],
  ["4", "principii de lucru", "confidențialitate, claritate, rigoare și colaborare"],
  ["1", "punct de coordonare", "mai puține fire pierdute între documente și decizii"]
] as const;

const workingRhythm = [
  ["Ascultăm contextul", "Înțelegem situația, documentele existente și presiunea reală de timp."],
  ["Definim responsabilități", "Stabilim ce preluăm, ce rămâne la client și ce trebuie aprobat."],
  ["Lucrăm verificabil", "Păstrăm pașii, termenele și documentele într-un flux clar."],
  ["Ajustăm colaborarea", "Volumul și structura pot fi schimbate când apar proiecte sau nevoi noi."]
] as const;

export function AboutPage() {
  return (
    <SiteShell>
      <section className="inner-hero about-hero" aria-labelledby="about-hero-title" aria-describedby="about-hero-description">
        <div className="section-container inner-hero-content">
          <p className="eyebrow eyebrow-light"><BookOpenCheck /> Despre noi</p>
          <h1 id="about-hero-title">Consultanță și suport administrativ,<br />într-un proces <em>clar.</em></h1>
          <p id="about-hero-description">Organizăm informațiile, responsabilitățile și documentele necesare pentru proiecte de finanțare și activități administrative.</p>
        </div>
      </section>

      <section className="content-section about-section" aria-labelledby="about-approach-title">
        <div className="section-container about-layout">
          <div className="about-panel">
            <span className="about-mark"><BookOpenCheck /></span>
            <p className="eyebrow eyebrow-light">Abordarea noastră</p>
            <h2 id="about-approach-title">Mai întâi clarificăm. Apoi stabilim ce preluăm.</h2>
            <p>Fiecare colaborare începe cu situația reală a clientului: obiectiv, documente, termene și persoane responsabile. Din aceste informații construim un mod de lucru verificabil.</p>
            <a href="/contact" aria-label="Discută cu Capital European despre nevoia ta" title="Discută cu Capital European">Discută despre nevoia ta <ArrowRight aria-hidden="true" /></a>
          </div>
          <div className="principles-grid">
            {principles.map(([Icon, title, text], index) => (
              <article key={title}>
                <span className="principle-number">0{index + 1}</span>
                <Icon />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
          <div className="about-rhythm" aria-label="Ritmul de lucru Capital European">
            {workingRhythm.map(([title, text], index) => (
              <article key={title}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-section about-story" aria-labelledby="about-audience-title">
        <div className="section-container about-story-layout">
          <div className="story-grid">
            <div>
              <p className="eyebrow">Pentru cine lucrăm</p>
              <h2 id="about-audience-title">Pentru organizații care au nevoie de structură, nu de o soluție generică.</h2>
            </div>
            <div className="story-copy">
              <p>Serviciile se adresează antreprenorilor, IMM-urilor, ONG-urilor și echipelor care pregătesc un proiect sau vor să organizeze mai bine activitatea administrativă.</p>
              <p>Volumul, livrabilele și responsabilitățile se stabilesc după o discuție inițială. Nu recomandăm mai mult decât este necesar pentru situația analizată.</p>
            </div>
          </div>

          <div className="about-media-panel" id="repere-despre">
            <figure className="about-media">
              <Image
                src="/images/capital-european-consultanta-organizare-real.webp"
                alt="Consultanți Capital European discutând un proces administrativ și un plan de proiect"
                width={1400}
                height={1050}
                loading="lazy"
                sizes="(max-width: 960px) 100vw, 52vw"
              />
            </figure>
            <div className="about-stat-grid" aria-label="Repere despre Capital European">
              {aboutStats.map(([value, label, detail]) => (
                <article key={label}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                  <p>{detail}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
