import { ArrowRight, BadgeCheck, BookOpenCheck, ShieldCheck, Users } from "lucide-react";
import Image from "next/image";
import { SiteShell } from "@/components/site-shell";

const principles = [
  [BadgeCheck, "Serviciu delimitat", "Spunem ce putem prelua, ce informații sunt necesare și ce rămâne în responsabilitatea clientului."],
  [ShieldCheck, "Date protejate", "Accesăm numai informațiile necesare activităților stabilite și tratăm documentele ca informații confidențiale."],
  [Users, "Comunicare directă", "Întrebările, aprobările și termenele sunt discutate cu persoanele responsabile, fără promisiuni pe care nu le putem controla."]
] as const;

export function AboutPage() {
  return (
    <SiteShell>
      <section className="inner-hero about-hero" aria-labelledby="about-hero-title" aria-describedby="about-hero-description">
        <div className="section-container inner-hero-content">
          <p className="eyebrow eyebrow-light"><BookOpenCheck /> Despre noi</p>
          <h1 id="about-hero-title">Despre Capital European</h1>
          <p id="about-hero-description">Lucrăm pe două direcții distincte: consultanță pentru fonduri europene și servicii administrative pentru firme, ONG-uri și activități independente.</p>
        </div>
      </section>

      <section className="content-section about-section" aria-labelledby="about-approach-title">
        <div className="section-container about-layout">
          <div className="about-panel">
            <span className="about-mark"><BookOpenCheck /></span>
            <p className="eyebrow eyebrow-light">Abordarea noastră</p>
            <h2 id="about-approach-title">Începem de la situația reală a clientului</h2>
            <p>Discutăm obiectivul, documentele disponibile, termenul și persoanele care pot decide. Abia apoi definim serviciul și livrabilele.</p>
            <a href="/contact" aria-label="Discută cu Capital European despre nevoia ta" title="Discută cu Capital European">Discută despre nevoia ta <ArrowRight aria-hidden="true" /></a>
          </div>
          <div className="principles-grid">
            {principles.map(([Icon, title, text]) => (
              <article key={title}>
                <Icon />
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
              <h2 id="about-audience-title">Pentru firme, ONG-uri și persoane care încep o activitate</h2>
            </div>
            <div className="story-copy">
              <p>Poți apela la noi pentru evaluarea unui proiect de finanțare, pregătirea documentației, înființarea unui PFA sau SRL ori preluarea unor activități administrative recurente.</p>
              <p>Oferta precizează serviciile incluse, informațiile necesare și responsabilitățile fiecărei părți.</p>
            </div>
          </div>

          <div className="about-media-panel about-media-panel-simple" id="repere-despre">
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
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
