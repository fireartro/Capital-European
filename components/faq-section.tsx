"use client";

import { ChevronDown, Phone, X } from "lucide-react";
import { useState } from "react";
import { generalFaq } from "@/lib/service-content";
import { siteConfig } from "@/lib/site-config";

export function FaqSection() {
  const [activeFaq, setActiveFaq] = useState(0);

  return (
    <section className="section faq" id="faq">
      <div className="shell faq-layout">
        <div className="faq-intro">
          <p className="kicker">Întrebări frecvente</p>
          <h2>Informații clare înainte de orice <em>decizie.</em></h2>
          <p>Nu ai găsit răspunsul? Discută direct cu echipa noastră.</p>
          {siteConfig.phoneHref
            ? <a href={`tel:${siteConfig.phoneHref}`} aria-label={`Sună ${siteConfig.name} pentru întrebări frecvente`} title={`Sună ${siteConfig.name}`}><Phone aria-hidden="true" /> {siteConfig.phoneDisplay}</a>
            : <a href={`mailto:${siteConfig.email}`} aria-label={`Trimite email către ${siteConfig.name} pentru întrebări`} title={`Trimite email către ${siteConfig.name}`}>{siteConfig.email}</a>}
        </div>
        <div className="faq-list">
          {generalFaq.map(([question, answer], index) => (
            <article className={`faq-item ${activeFaq === index ? "open" : ""}`} key={question}>
              <button
                type="button"
                onClick={() => setActiveFaq(activeFaq === index ? -1 : index)}
                aria-expanded={activeFaq === index}
                aria-controls={`faq-answer-${index}`}
              >
                <span>{question}</span><span className="faq-toggle" aria-hidden="true">{activeFaq === index ? <X /> : <ChevronDown />}</span>
              </button>
              {activeFaq === index && (
                <div className="faq-answer" id={`faq-answer-${index}`} role="region" aria-label={question}>
                  <p>{answer}</p>
                </div>
              )}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
