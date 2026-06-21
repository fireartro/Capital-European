"use client";

import { ArrowRight, CheckCircle2, ClipboardCheck } from "lucide-react";
import { useMemo, useState } from "react";

const criteria = [
  "Organizația este înregistrată în România",
  "Investiția are obiectiv și buget estimativ",
  "Există posibilitate de cofinanțare",
  "Nu există datorii fiscale majore",
  "Activitatea vizată poate fi încadrată într-un program eligibil"
] as const;

export function EligibilityChecker() {
  const [checked, setChecked] = useState<Record<string, boolean>>({});
  const score = criteria.filter((criterion) => checked[criterion]).length;

  const result = useMemo(() => {
    if (score >= 5) {
      return {
        title: "Pregătit pentru analiză detaliată",
        text: "Ai bifat semnalele de bază. Următorul pas este verificarea apelului, cheltuielilor eligibile și documentelor cerute."
      };
    }
    if (score >= 3) {
      return {
        title: "Merită verificată o linie de finanțare",
        text: "Există premise bune, dar câteva criterii trebuie clarificate înainte să investești timp în documentație."
      };
    }
    return {
      title: "Începe cu o analiză preliminară",
      text: "Ai nevoie de o verificare rapidă a eligibilității, a programelor active și a condițiilor minime."
    };
  }, [score]);

  return (
    <section className="eligibility-checker" id="calculator-eligibilitate" aria-labelledby="eligibility-title">
      <div className="eligibility-copy">
        <p className="eyebrow"><ClipboardCheck aria-hidden="true" /> Evaluare rapidă</p>
        <h2 id="eligibility-title">Calculator rapid de eligibilitate pentru fonduri europene.</h2>
        <p>Răspunde la câteva criterii de bază. Rezultatul este orientativ și nu înlocuiește analiza ghidului solicitantului.</p>
      </div>
      <div className="eligibility-tool" aria-live="polite">
        <div className="eligibility-options">
          {criteria.map((criterion) => (
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
        <div className="eligibility-result">
          <span><CheckCircle2 aria-hidden="true" /> {score}/5 criterii bifate</span>
          <h3>{result.title}</h3>
          <p>{result.text}</p>
          <a href="/contact?service=fonduri-europene" aria-label="Solicită verificarea eligibilității pentru fonduri europene" title="Solicită verificarea eligibilității">
            Verifică eligibilitatea <ArrowRight aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
