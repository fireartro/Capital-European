"use client";

import { ArrowRight, CheckCircle2, ClipboardCheck, Info } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { fundingProgramOptions, getFundingProgramLabel, UNKNOWN_FUNDING_PROGRAM } from "@/lib/funding-programs";

const readinessCriteria = [
  "Solicitantul este înregistrat și activ în România",
  "Investiția, locația și obiectivul sunt definite",
  "Există un buget estimativ și o sursă posibilă de cofinanțare",
  "Situațiile financiare și documentele fiscale pot fi verificate",
  "Activitatea și cheltuielile propuse pot fi încadrate în program"
] as const;

export function FundingEligibilityChecker() {
  const [programId, setProgramId] = useState<string>(UNKNOWN_FUNDING_PROGRAM);
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const checkedCount = readinessCriteria.filter((criterion) => checked[criterion]).length;
  const score = checkedCount * 20;

  const result = useMemo(() => {
    if (score >= 80) {
      return {
        title: "Proiect pregătit pentru o verificare detaliată",
        text: "Informațiile de bază sunt disponibile. Urmează verificarea criteriilor și a grilei oficiale a programului."
      };
    }
    if (score >= 40) {
      return {
        title: "Sunt necesare câteva clarificări",
        text: "Există suficiente repere pentru o discuție, dar unele condiții și documente trebuie confirmate."
      };
    }
    return {
      title: "Începe cu definirea proiectului",
      text: "Clarifică solicitantul, investiția, bugetul și programul înainte de pregătirea documentației."
    };
  }, [score]);

  const contactHref = useMemo(() => {
    const params = new URLSearchParams({
      service: "fonduri-europene",
      program: programId,
      score: String(score)
    });
    return `/contact?${params.toString()}`;
  }, [programId, score]);

  return (
    <section className="funding-eligibility" id="verificare-eligibilitate" aria-labelledby="eligibility-checker-title">
      <div className="eligibility-heading">
        <p className="eyebrow"><ClipboardCheck aria-hidden="true" /> Pre-evaluare orientativă</p>
        <h2 id="eligibility-checker-title">Verificare eligibilitate și punctaj</h2>
        <p>Selectează programul și bifează informațiile pe care le poți confirma. Punctajul măsoară nivelul de pregătire, nu punctajul oficial al apelului.</p>
      </div>

      <div className="eligibility-layout">
        <div className="eligibility-controls">
          <label className="eligibility-program-select">
            <span>Linia de finanțare</span>
            <select value={programId} onChange={(event) => setProgramId(event.target.value)}>
              {fundingProgramOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </label>

          <fieldset>
            <legend>Ce poți confirma acum?</legend>
            <div className="eligibility-options">
              {readinessCriteria.map((criterion) => (
                <label key={criterion}>
                  <input
                    type="checkbox"
                    checked={Boolean(checked[criterion])}
                    onChange={(event) => setChecked((current) => ({ ...current, [criterion]: event.target.checked }))}
                  />
                  <span>{criterion}</span>
                </label>
              ))}
            </div>
          </fieldset>
        </div>

        <aside className="eligibility-result" aria-live="polite">
          <span><CheckCircle2 aria-hidden="true" /> {checkedCount}/5 criterii bifate</span>
          <strong>{score}/100</strong>
          <h3>{result.title}</h3>
          <p>{result.text}</p>
          <small><Info aria-hidden="true" /> Program selectat: {getFundingProgramLabel(programId)}</small>
          <Link className="primary-button yellow-button" href={contactHref}>
            Solicită evaluarea punctajului <ArrowRight aria-hidden="true" />
          </Link>
          <em>Evaluarea finală se face exclusiv pe baza ghidului și grilei oficiale în vigoare.</em>
        </aside>
      </div>
    </section>
  );
}
