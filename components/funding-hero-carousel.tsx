"use client";

import { ArrowRight, ChevronLeft, ChevronRight, Landmark, Pause, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    image: "/images/investitii-productie-atelier-cnc-romania.webp",
    alt: "Mașină CNC și piesă metalică într-un atelier de producție, imagine ilustrativă",
    label: "Investiții productive",
    title: "Modernizare și capacitate de producție",
    text: "Verificăm investiția, solicitantul și calendarul înainte de pregătirea documentației."
  },
  {
    image: "/images/energie-acoperis-industrial-fotovoltaic.webp",
    alt: "Panouri fotovoltaice pe un acoperiș industrial, imagine ilustrativă",
    label: "Energie și eficiență",
    title: "Eficiență energetică pentru activitatea curentă",
    text: "Corelăm soluția tehnică, consumul, bugetul și obligațiile care continuă după aprobare."
  },
  {
    image: "/images/digitalizare-linie-alimentara-automatizata.webp",
    alt: "Linie alimentară automatizată cu inspecție optică a produselor, imagine ilustrativă",
    label: "Digitalizare și automatizare",
    title: "Digitalizare legată de nevoia reală a afacerii",
    text: "Justificăm echipamentele și soluțiile digitale prin fluxuri, indicatori și cheltuieli eligibile."
  },
  {
    image: "/images/agricultura-sera-tomate-irigare.webp",
    alt: "Cultură de tomate într-o seră cu irigare prin picurare, imagine ilustrativă",
    label: "Agricultură și mediul rural",
    title: "Investiții rurale construite de la situația din teren",
    text: "Analizăm exploatația, capacitatea de cofinanțare și etapele care pot fi susținute în practică."
  },
  {
    image: "/images/ong-atelier-comunitar-reparare-carti.webp",
    alt: "Voluntari care repară cărți într-un atelier comunitar, imagine ilustrativă",
    label: "ONG și comunități",
    title: "Proiecte comunitare cu activități și rezultate verificabile",
    text: "Clarificăm grupul țintă, resursele, partenerii și modul în care rezultatele vor fi documentate."
  },
  {
    image: "/images/startup-prototip-lampa-atelier-ceramica.webp",
    alt: "Realizarea unui prototip de lampă într-un atelier de ceramică, imagine ilustrativă",
    label: "Startup și afaceri noi",
    title: "De la idee la un plan de afaceri realist",
    text: "Verificăm cererea din piață, investiția inițială și ipotezele care trebuie susținute prin date."
  }
] as const;

export function FundingHeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [interactionPaused, setInteractionPaused] = useState(false);
  const [manuallyPaused, setManuallyPaused] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [documentHidden, setDocumentHidden] = useState(false);
  const paused = interactionPaused || manuallyPaused || reducedMotion || documentHidden;
  const activeSlide = slides[activeIndex];

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateMotion = () => setReducedMotion(preference.matches);
    const updateVisibility = () => setDocumentHidden(document.hidden);
    updateMotion();
    updateVisibility();
    preference.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      preference.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  useEffect(() => {
    if (paused) return;
    const interval = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % slides.length);
    }, 7000);
    return () => window.clearInterval(interval);
  }, [paused]);

  const selectSlide = (index: number) => setActiveIndex((index + slides.length) % slides.length);

  return (
    <section
      className="funding-photo-hero"
      id="funding-hero"
      aria-labelledby="funding-hero-title"
      aria-describedby="funding-hero-description"
      onMouseEnter={() => setInteractionPaused(true)}
      onMouseLeave={() => setInteractionPaused(false)}
      onFocusCapture={() => setInteractionPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setInteractionPaused(false);
      }}
    >
      <div className="funding-hero-slides">
        <div className="funding-hero-slide is-active" key={activeSlide.image}>
          <Image
            src={activeSlide.image}
            alt={activeSlide.alt}
            fill
            quality={55}
            priority={activeIndex === 0}
            fetchPriority={activeIndex === 0 ? "high" : "auto"}
            sizes="(max-width: 1100px) 100vw, (min-width: 2000px) calc(100vw - 320px), calc(100vw - 288px)"
          />
        </div>
      </div>
      <div className="funding-hero-shade" aria-hidden="true" />
      <div className="section-container funding-photo-hero-content">
        <p className="eyebrow eyebrow-light"><Landmark aria-hidden="true" /> Programe și oportunități de finanțare</p>
        <h1 id="funding-hero-title">Consultanță fonduri europene</h1>
        <div className="funding-hero-active-copy" key={`funding-copy-${activeIndex}`}>
          <span>{activeSlide.label}</span>
          <h2>{activeSlide.title}</h2>
          <p id="funding-hero-description">{activeSlide.text}</p>
        </div>
        <div className="funding-hero-actions">
          <Link className="primary-button yellow-button" href="#fonduri-active">Vezi programele de finanțare <ArrowRight aria-hidden="true" /></Link>
          <Link className="funding-hero-contact" href="/consultanta-fonduri-europene">Vezi serviciul complet</Link>
        </div>
        <div className="funding-hero-controls">
          <button className="funding-hero-arrow" type="button" onClick={() => selectSlide(activeIndex - 1)} aria-label="Imaginea anterioară"><ChevronLeft aria-hidden="true" /></button>
          <div role="group" aria-label="Alege tipul de investiție prezentat">
            {slides.map((slide, index) => (
              <button
                className={index === activeIndex ? "is-active" : ""}
                type="button"
                key={slide.label}
                onClick={() => selectSlide(index)}
                aria-label={`Afișează: ${slide.label}`}
                aria-pressed={index === activeIndex}
              />
            ))}
          </div>
          <button className="funding-hero-arrow" type="button" onClick={() => selectSlide(activeIndex + 1)} aria-label="Imaginea următoare"><ChevronRight aria-hidden="true" /></button>
          <button
            className="funding-hero-pause"
            type="button"
            disabled={reducedMotion}
            onClick={() => setManuallyPaused((current) => !current)}
            aria-label={reducedMotion ? "Rotația automată este oprită pentru mișcare redusă" : manuallyPaused ? "Pornește rotația automată" : "Oprește rotația automată"}
            title={reducedMotion ? "Mișcare redusă activată" : manuallyPaused ? "Pornește rotația automată" : "Oprește rotația automată"}
            aria-pressed={manuallyPaused || reducedMotion}
          >
            {manuallyPaused || reducedMotion ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
          </button>
        </div>
      </div>
    </section>
  );
}
