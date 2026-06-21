import { ArrowRight, BadgeCheck, BookOpenCheck, ShieldCheck, Users, Zap } from "lucide-react";
import Image from "next/image";
import { SiteShell } from "@/components/site-shell";

const principles = [
  [ShieldCheck, "Confidențialitate", "Datele și documentele sunt tratate cu discreție și acces controlat."],
  [Zap, "Rapiditate", "Termene clare, răspuns prompt și vizibilitate asupra fiecărei etape."],
  [BadgeCheck, "Rigoare", "Verificări, responsabilități definite și documentație atent pregătită."],
  [Users, "Parteneriat", "Comunicare umană și soluții adaptate contextului real al clientului."]
] as const;

const aboutStats = [
  ["2", "direcții de servicii", "fonduri europene și administrare externalizată"],
  ["4", "principii de lucru", "confidențialitate, rapiditate, rigoare și parteneriat"],
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
      <section className="inner-hero about-hero">
        <div className="section-container inner-hero-content">
          <p className="eyebrow eyebrow-light"><BookOpenCheck /> Despre noi</p>
          <h1>Organizare care dă<br />încredere <em>deciziilor.</em></h1>
          <p>Suntem partenerul care aduce structură în activitatea administrativă și rigoare în proiectele de finanțare.</p>
        </div>
      </section>

      <section className="content-section about-section">
        <div className="section-container about-layout">
          <div className="about-panel">
            <span className="about-mark"><BookOpenCheck /></span>
            <p className="eyebrow eyebrow-light">Abordarea noastră</p>
            <h2>Complexitatea devine un proces clar.</h2>
            <p>Combinăm disciplina administrativă cu o abordare consultativă. Fiecare colaborare are pași clari, responsabilități definite și comunicare transparentă.</p>
            <a href="/contact" aria-label="Cunoaște echipa ProBirou printr-o discuție" title="Cunoaște echipa ProBirou">Cunoaște echipa printr-o discuție <ArrowRight aria-hidden="true" /></a>
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
          <div className="about-rhythm" aria-label="Ritmul de lucru ProBirou">
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

      <section className="content-section about-story">
        <div className="section-container about-story-layout">
          <div className="story-grid">
            <div>
              <p className="eyebrow">Pentru cine lucrăm</p>
              <h2>Suport potrivit pentru companii care vor să crească organizat.</h2>
            </div>
            <div className="story-copy">
              <p>Lucrăm cu antreprenori, IMM-uri, ONG-uri și echipe care au nevoie fie de un proiect bine pregătit, fie de o administrare mai eficientă.</p>
              <p>Nu aplicăm o rețetă universală. Înțelegem situația, stabilim obiectivele și construim o soluție proporțională cu nevoia reală.</p>
            </div>
          </div>

          <div className="about-media-panel" id="repere-despre">
            <figure className="about-media">
              <Image
                src="/images/probirou-consultanta-organizare-real.webp"
                alt="Consultanți ProBirou discutând un proces administrativ și un plan de proiect"
                fill
                sizes="(max-width: 960px) 100vw, 52vw"
              />
            </figure>
            <div className="about-stat-grid" aria-label="Repere despre ProBirou">
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
