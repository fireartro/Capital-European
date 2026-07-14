import Link from "next/link";
import { ArrowRight, Check, ChevronRight, Files, Landmark } from "lucide-react";
import { SiteShell } from "@/components/site-shell";
import type { SeoServicePageConfig } from "@/lib/seo-service-pages";

function contactServiceForPage(page: SeoServicePageConfig) {
  if (page.path.endsWith("/infiintare-pfa")) return "infiintare-pfa";
  if (page.path.endsWith("/infiintare-srl")) return "infiintare-srl";
  return page.contactService;
}

export function SeoServicePage({ page }: { page: SeoServicePageConfig }) {
  const CategoryIcon = page.category === "funding" ? Landmark : Files;
  const contactService = contactServiceForPage(page);
  const isPfa = page.path.endsWith("/infiintare-pfa");
  const isSrl = page.path.endsWith("/infiintare-srl");
  const isCompanySetup = page.path.endsWith("/infiintare-firma");
  const actionLabel = isCompanySetup
    ? "Clarifică opțiunea potrivită"
    : isPfa
    ? "Solicită lista pentru PFA"
    : isSrl
      ? "Solicită lista pentru SRL"
      : page.category === "funding"
        ? "Solicită evaluarea"
        : "Descrie activitatea";
  const limits = page.category === "funding"
    ? [
        "Aprobarea și calendarul evaluării aparțin autorității de finanțare.",
        "Clientul furnizează informații corecte și documentele cerute la termen.",
        "Eligibilitatea finală se confirmă numai pe baza ghidului și a documentelor complete."
      ]
    : [
        "Deciziile și aprobările rămân la client.",
        "Serviciul nu înlocuiește consultanța juridică, fiscală sau contabilă autorizată.",
        "Volumul, accesul și termenele se stabilesc înainte de preluarea activității."
      ];

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
            <Link className="primary-button yellow-button" href={`/contact?service=${contactService}`}>
              {actionLabel} <ArrowRight aria-hidden="true" />
            </Link>
            <Link className="seo-service-parent-link" href={page.parent.href}>Înapoi la {page.parent.label}</Link>
          </div>
        </div>
      </section>

      <section className="seo-service-band" aria-labelledby="seo-audience-title">
        <div className="section-container seo-service-overview">
          <div>
            <p className="eyebrow">Cui îi este util</p>
            <h2 id="seo-audience-title">{page.audienceTitle}</h2>
            <p>{page.audienceIntro}</p>
            <ul className="seo-check-list">
              {page.audience.map((item) => <li key={item}><Check aria-hidden="true" /> <span>{item}</span></li>)}
            </ul>
          </div>
          <div className="seo-included-list" aria-labelledby="seo-benefits-title">
            <p className="eyebrow">Ce include</p>
            <h2 id="seo-benefits-title">{page.benefitsTitle}</h2>
            {page.benefits.map((benefit) => (
              <article key={benefit.title}>
                <h3>{benefit.title}</h3>
                <p>{benefit.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="seo-service-band seo-service-band-muted" aria-labelledby="seo-process-title">
        <div className="section-container seo-service-process-layout">
          <div>
            <p className="eyebrow">Colaborarea</p>
            <h2 id="seo-process-title">{page.processTitle}</h2>
            <ol className="plain-process-list">
              {page.steps.map((step) => <li key={step.title}><h3>{step.title}</h3><p>{step.text}</p></li>)}
            </ol>
          </div>
          <aside className="seo-service-limits" aria-labelledby="seo-limits-title">
            <h2 id="seo-limits-title">Ce trebuie să știi înainte</h2>
            <ul>{limits.map((item) => <li key={item}>{item}</li>)}</ul>
          </aside>
        </div>
      </section>

      <section className="seo-service-band" aria-labelledby="seo-faq-title">
        <div className="section-container seo-service-split">
          <div>
            <p className="eyebrow">Întrebări</p>
            <h2 id="seo-faq-title">Clarificări utile</h2>
            <p>Răspunsurile generale nu înlocuiesc verificarea situației concrete.</p>
          </div>
          <div className="seo-service-faq">
            {page.faq.slice(0, 4).map(([question, answer]) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <nav className="seo-related-inline" aria-label="Servicii și informații relevante">
        <div className="section-container">
          <strong>Mai poți consulta:</strong>
          {page.related.filter((item) => !item.href.startsWith("/contact")).slice(0, 3).map((item) => (
            <Link href={item.href} key={item.href}>{item.label}<ArrowRight aria-hidden="true" /></Link>
          ))}
        </div>
      </nav>

      <section className="seo-service-cta" aria-labelledby="seo-cta-title">
        <div className="section-container">
          <div>
            <p>Ai informațiile de bază?</p>
            <h2 id="seo-cta-title">Trimite situația și îți spunem ce mai trebuie clarificat.</h2>
          </div>
          <Link className="primary-button yellow-button" href={`/contact?service=${contactService}`}>
            {actionLabel} <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>
    </SiteShell>
  );
}
