"use client";

import { ArrowRight, ChevronDown, ChevronUp, ExternalLink } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { fundingPrograms } from "@/lib/funding-programs";

const INITIAL_PROGRAM_COUNT = 3;

export function FundingProgramList() {
  const [expanded, setExpanded] = useState(false);
  const visiblePrograms = expanded ? fundingPrograms : fundingPrograms.slice(0, INITIAL_PROGRAM_COUNT);
  const hasMorePrograms = fundingPrograms.length > INITIAL_PROGRAM_COUNT;

  return (
    <>
      <div className="funding-program-list" id="funding-program-list" data-expanded={expanded}>
        {visiblePrograms.map((program) => (
          <article className="funding-program-card" key={program.id}>
            <figure className="funding-program-image">
              <Image
                src={program.image}
                alt={program.imageAlt}
                fill
                loading="lazy"
                sizes="(max-width: 640px) calc(100vw - 60px), (max-width: 1100px) 44vw, 29vw"
              />
            </figure>
            <div className="funding-program-body">
              <div className="funding-program-meta">
                <span>{program.status}</span>
                <small>{program.lastVerified}</small>
              </div>
              <p>{program.program}</p>
              <h3>{program.title}</h3>
              <p>{program.summary}</p>
              <dl className="funding-program-facts">
                <div><dt>Beneficiari</dt><dd>{program.audience}</dd></div>
                <div><dt>Valoare</dt><dd>{program.value}</dd></div>
                <div><dt>Cofinanțare</dt><dd>{program.cofinancing}</dd></div>
                <div><dt>Arie</dt><dd>{program.region}</dd></div>
              </dl>
              <div className="funding-program-actions">
                <Link href={`/contact?service=fonduri-europene&program=${program.id}`}>Sunt interesat <ArrowRight aria-hidden="true" /></Link>
                <a href={program.sourceUrl} target="_blank" rel="noopener noreferrer">Portal oficial <ExternalLink aria-hidden="true" /></a>
              </div>
            </div>
          </article>
        ))}
      </div>
      {hasMorePrograms && (
        <button
          className="funding-program-list-toggle"
          type="button"
          onClick={() => setExpanded((current) => !current)}
          aria-controls="funding-program-list"
          aria-expanded={expanded}
        >
          {expanded ? "Restrânge lista" : `Vezi toate cele ${fundingPrograms.length} categorii urmărite`}
          {expanded ? <ChevronUp aria-hidden="true" /> : <ChevronDown aria-hidden="true" />}
        </button>
      )}
    </>
  );
}
