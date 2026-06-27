import Link from "next/link";
import { ArrowRight, Check, ChevronRight, ClipboardCheck, Landmark, Files } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import type { SeoServicePageConfig } from "@/lib/seo-service-pages";

export function SeoServicePage({ page }: { page: SeoServicePageConfig }) {
  const CategoryIcon = page.category === "funding" ? Landmark : Files;

  return (
    <SiteShell navigationContext={page.category}>
      <section className="seo-service-hero" aria-labelledby="seo-service-title">
        <div className="section-container">
          <nav className="service-breadcrumbs" aria-label="Navigare ierarhică">
            <Link href="/">Acasă</Link><ChevronRight aria-hidden="true" />
            <Link href={page.parent.href}>{page.parent.label}</Link><ChevronRight aria-hidden="true" />
            <span aria-current="page">{page.title}</span>
          </nav>
          <p className="eyebrow eyebrow-light"><CategoryIcon aria-hidden="true" /> {page.eyebrow}</p>
          <h1 id="seo-service-title">{page.h1}</h1>
          <p>{page.intro}</p>
          <div className="seo-service-actions">
            <Link className="primary-button yellow-button" href={`/contact?service=${page.contactService}`}>
              Solicită o analiză <ArrowRight aria-hidden="true" />
            </Link>
            <Link href={page.parent.href}>Vezi serviciul principal</Link>
          </div>
        </div>
      </section>

      <section className="seo-service-band" aria-labelledby="seo-audience-title">
        <div className="section-container seo-service-split">
          <div>
            <p className="eyebrow"><ClipboardCheck aria-hidden="true" /> Potrivire</p>
            <h2 id="seo-audience-title">{page.audienceTitle}</h2>
            <p>{page.audienceIntro}</p>
          </div>
          <ul className="seo-check-list">
            {page.audience.map((item) => <li key={item}><Check aria-hidden="true" /> <span>{item}</span></li>)}
          </ul>
        </div>
      </section>

      <section className="seo-service-band seo-service-band-muted" aria-labelledby="seo-benefits-title">
        <div className="section-container">
          <p className="eyebrow">Beneficii concrete</p>
          <h2 id="seo-benefits-title">{page.benefitsTitle}</h2>
          <div className="seo-benefit-grid">
            {page.benefits.map((benefit, index) => (
              <article key={benefit.title}>
                <span>0{index + 1}</span>
                <h3>{benefit.title}</h3>
                <p>{benefit.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="seo-service-band" aria-labelledby="seo-process-title">
        <div className="section-container">
          <p className="eyebrow">Proces de lucru</p>
          <h2 id="seo-process-title">{page.processTitle}</h2>
          <div className="seo-process-grid">
            {page.steps.map((step, index) => (
              <article key={step.title}>
                <span>{index + 1}</span>
                <div><h3>{step.title}</h3><p>{step.text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="seo-service-band seo-service-band-muted" aria-labelledby="seo-faq-title">
        <div className="section-container seo-service-split">
          <div>
            <p className="eyebrow">Întrebări frecvente</p>
            <h2 id="seo-faq-title">Clarificări înainte de colaborare</h2>
            <p>Răspunsurile sunt generale. Condițiile finale depind de situația solicitantului și de serviciul contractat.</p>
          </div>
          <div className="seo-service-faq">
            {page.faq.map(([question, answer], index) => (
              <details key={question} open={index === 0}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="seo-service-band" aria-labelledby="seo-related-title">
        <div className="section-container">
          <p className="eyebrow">Continuă documentarea</p>
          <h2 id="seo-related-title">Servicii și informații conexe</h2>
          <div className="seo-related-links">
            {page.related.map((item) => (
              <Link href={item.href} key={item.href}>
                <span><strong>{item.label}</strong><small>{item.text}</small></span>
                <ArrowRight aria-hidden="true" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="seo-service-cta" aria-labelledby="seo-cta-title">
        <div className="section-container">
          <div><p>Ai un context concret?</p><h2 id="seo-cta-title">Începe cu o discuție și o listă clară de pași.</h2></div>
          <Link className="primary-button yellow-button" href={`/contact?service=${page.contactService}`}>
            Trimite solicitarea <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
