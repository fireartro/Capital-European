"use client";

import { ArrowRight, ChevronLeft, ChevronRight, Landmark, Pause, Play } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

const slides = [
  {
    image: "/images/funding-hero-manufacturing.webp",
    alt: "Antreprenor și specialist care analizează modernizarea unei unități de producție",
    label: "Investiții productive",
    title: "Modernizare, echipamente și capacitate de producție",
    text: "Verificăm dacă investiția, solicitantul și calendarul se potrivesc cu regulile apelului înainte să înceapă documentația."
  },
  {
    image: "/images/funding-hero-energy.webp",
    alt: "Specialiști care verifică o investiție în panouri fotovoltaice pentru o unitate de producție",
    label: "Energie și eficiență",
    title: "Investiții care reduc consumul și susțin dezvoltarea",
    text: "Punem în aceeași analiză eligibilitatea tehnică, bugetul, contribuția proprie și obligațiile pe care proiectul le aduce după aprobare."
  },
  {
    image: "/images/funding-hero-digitalization.webp",
    alt: "Antreprenoare și tehnician care verifică digitalizarea unei linii de producție alimentară",
    label: "Digitalizare și automatizare",
    title: "Procese mai bune, susținute de o investiție bine justificată",
    text: "Legăm echipamentele și soluțiile digitale de nevoia reală a afacerii, de indicatori și de cheltuielile permise prin ghid."
  }
] as const;

export function FundingHeroCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [interactionPaused, setInteractionPaused] = useState(false);
  const [manuallyPaused, setManuallyPaused] = useState(false);
  const paused = interactionPaused || manuallyPaused;

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
        {slides.map((slide, index) => (
          <div className={`funding-hero-slide${index === activeIndex ? " is-active" : ""}`} key={slide.image} aria-hidden={index !== activeIndex}>
            <Image
              src={slide.image}
              alt={slide.alt}
              fill
              priority={index === 0}
              sizes="(max-width: 1100px) 100vw, calc(100vw - 288px)"
            />
          </div>
        ))}
      </div>
      <div className="funding-hero-shade" aria-hidden="true" />
      <div className="section-container funding-photo-hero-content">
        <p className="eyebrow eyebrow-light"><Landmark aria-hidden="true" /> Consultanță fonduri europene</p>
        <h1 id="funding-hero-title">Consultanță pentru fonduri europene și investiții bine pregătite</h1>
        <div className="funding-hero-active-copy">
          <span>{slides[activeIndex].label}</span>
          <h2>{slides[activeIndex].title}</h2>
          <p id="funding-hero-description">{slides[activeIndex].text}</p>
        </div>
        <div className="funding-hero-actions">
          <Link className="primary-button yellow-button" href="#fonduri-active">Vezi oportunitățile urmărite <ArrowRight aria-hidden="true" /></Link>
          <Link className="funding-hero-contact" href="/contact?service=fonduri-europene">Solicită verificarea proiectului</Link>
        </div>
        <div className="funding-hero-controls">
          <button type="button" onClick={() => selectSlide(activeIndex - 1)} aria-label="Imaginea anterioară"><ChevronLeft aria-hidden="true" /></button>
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
          <button type="button" onClick={() => selectSlide(activeIndex + 1)} aria-label="Imaginea următoare"><ChevronRight aria-hidden="true" /></button>
          <button
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
