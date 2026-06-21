import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Brand } from "@/components/brand";

type LegalSection = { title: string; content: string[] };

export function LegalPage({ eyebrow, title, updated, sections }: { eyebrow: string; title: string; updated: string; sections: LegalSection[] }) {
  return (
    <main className="legal-page">
      <header className="legal-header">
        <div className="shell legal-nav">
          <Link className="brand" href="/" aria-label="Înapoi la pagina principală ProBirou" title="ProBirou">
            <Brand />
          </Link>
          <Link className="legal-back" href="/" aria-label="Înapoi la site-ul ProBirou" title="Înapoi la site"><ArrowLeft aria-hidden="true" /> Înapoi la site</Link>
        </div>
      </header>
      <article className="shell legal-content">
        <p className="kicker">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="legal-updated">Ultima actualizare: {updated}</p>
        <div className="legal-notice">
          Acest document este un model informativ. Înainte de publicarea comercială, completează datele juridice reale ale operatorului și solicită verificare de specialitate.
        </div>
        {sections.map((section, index) => {
          const sectionId = `legal-section-${index + 1}`;
          return (
          <section key={section.title} aria-labelledby={sectionId}>
            <h2 id={sectionId}>{section.title}</h2>
            {section.content.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </section>
          );
        })}
      </article>
    </main>
  );
}
