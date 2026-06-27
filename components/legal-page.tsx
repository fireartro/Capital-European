import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { Brand } from "@/components/brand";
import { CookieSettingsButton } from "@/components/cookie-settings-button";

export type LegalSection = {
  title: string;
  content: string[];
  items?: string[];
  links?: Array<{ label: string; href: string }>;
};

export function LegalPage({
  eyebrow,
  title,
  updated,
  intro,
  notice,
  actions,
  sections
}: {
  eyebrow: string;
  title: string;
  updated: string;
  intro?: string;
  notice?: ReactNode;
  actions?: ReactNode;
  sections: LegalSection[];
}) {
  return (
    <main className="legal-page">
      <header className="legal-header">
        <div className="shell legal-nav">
          <Link className="brand" href="/" aria-label="Înapoi la pagina principală Capital European" title="Capital European">
            <Brand variant="light" priority />
          </Link>
          <div className="legal-nav-actions">
            <CookieSettingsButton compact />
            <Link className="legal-back" href="/" aria-label="Înapoi la site-ul Capital European" title="Înapoi la site"><ArrowLeft aria-hidden="true" /> Înapoi la site</Link>
          </div>
        </div>
      </header>
      <article className="shell legal-content">
        <p className="kicker">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="legal-updated">Ultima actualizare: {updated}</p>
        {intro && <p className="legal-intro">{intro}</p>}
        {notice && <aside className="legal-compliance-notice" aria-label="Notă importantă">{notice}</aside>}
        {actions && <div className="legal-actions">{actions}</div>}
        <nav className="legal-toc" aria-label={`Cuprins ${title}`}>
          <strong>Cuprins</strong>
          <ol>
            {sections.map((section, index) => (
              <li key={section.title}>
                <a href={`#legal-section-${index + 1}`}>{section.title.replace(/^\d+\.\s*/, "")}</a>
              </li>
            ))}
          </ol>
        </nav>
        {sections.map((section, index) => {
          const sectionId = `legal-section-${index + 1}`;
          return (
            <section key={section.title} aria-labelledby={sectionId}>
              <h2 id={sectionId}>{section.title}</h2>
              {section.content.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.items && (
                <ul>
                  {section.items.map((item) => <li key={item}>{item}</li>)}
                </ul>
              )}
              {section.links && (
                <div className="legal-source-links" aria-label={`Surse pentru ${section.title}`}>
                  {section.links.map((link) => (
                    <a href={link.href} key={link.href} target="_blank" rel="noopener noreferrer">{link.label}</a>
                  ))}
                </div>
              )}
            </section>
          );
        })}
      </article>
    </main>
  );
}
