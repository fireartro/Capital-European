"use client";

import { ArrowRight, ChevronLeft, ChevronRight, Landmark, Pause, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    image: "/images/funding-hero-manufacturing-v2.webp",
    alt: "Antreprenor și consultant care analizează un plan de investiții într-un atelier de producție din România",
    label: "Investiții productive",
    title: "Modernizare și capacitate de producție",
    text: "Verificăm investiția, solicitantul și calendarul înainte de pregătirea documentației."
  },
  {
    image: "/images/funding-hero-energy-v2.webp",
    alt: "Manager și specialist tehnic care verifică o investiție energetică la o fabrică din România",
    label: "Energie și eficiență",
    title: "Eficiență energetică pentru activitatea curentă",
    text: "Corelăm soluția tehnică, consumul, bugetul și obligațiile care continuă după aprobare."
  },
  {
    image: "/images/funding-hero-digitalization-v2.webp",
    alt: "Antreprenoare și tehnician care verifică digitalizarea unei mici unități alimentare din România",
    label: "Digitalizare și automatizare",
    title: "Digitalizare legată de nevoia reală a afacerii",
    text: "Justificăm echipamentele și soluțiile digitale prin fluxuri, indicatori și cheltuieli eligibile."
  },
  {
    image: "/images/funding-hero-rural-v2.webp",
    alt: "Fermier și consultant care discută un proiect de investiții într-o fermă din nord-vestul României",
    label: "Agricultură și mediul rural",
    title: "Investiții rurale construite de la situația din teren",
    text: "Analizăm exploatația, capacitatea de cofinanțare și etapele care pot fi susținute în practică."
  },
  {
    image: "/images/funding-hero-ngo-v2.webp",
    alt: "Coordonatori ai unui ONG care planifică activități într-un centru comunitar din România",
    label: "ONG și comunități",
    title: "Proiecte comunitare cu activități și rezultate verificabile",
    text: "Clarificăm grupul țintă, resursele, partenerii și modul în care rezultatele vor fi documentate."
  },
  {
    image: "/images/funding-hero-startup-v2.webp",
    alt: "Fondatori care analizează un prototip și bugetul unei afaceri noi într-un atelier din România",
    label: "Startup și afaceri noi",
    title: "De la idee la un plan de afaceri realist",
    text: "Verificăm cererea din piață, investiția inițială și ipotezele care trebuie susținute prin date."
  }
] as const;

export function FundingHeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [interactionPaused, setInteractionPaused] = useState(false);
  const [manuallyPaused, setManuallyPaused] = useState(false);
  const paused = interactionPaused || manuallyPaused;
  const activeSlide = slides[activeIndex];

  useEffect(() => {
    if (paused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
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
      onBlurCapture={() => setInteractionPaused(false)}
    >
      <div className="funding-hero-slides">
        <div className="funding-hero-slide is-active" key={activeSlide.image}>
          <Image
            src={activeSlide.image}
            alt={activeSlide.alt}
            fill
            priority={activeIndex === 0}
            fetchPriority={activeIndex === 0 ? "high" : "auto"}
            sizes="(max-width: 1100px) 100vw, calc(100vw - 288px)"
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
            onClick={() => setManuallyPaused((current) => !current)}
            aria-label={manuallyPaused ? "Pornește rotația automată" : "Oprește rotația automată"}
            aria-pressed={manuallyPaused}
          >
            {manuallyPaused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
          </button>
        </div>
      </div>
    </section>
  );
}
