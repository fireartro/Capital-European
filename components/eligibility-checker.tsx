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
        title: "Poți continua cu o analiză detaliată",
        text: "Criteriile de bază sunt bifate. Urmează verificarea apelului, a cheltuielilor și a documentelor cerute."
      };
    }
    if (score >= 3) {
      return {
        title: "Sunt necesare câteva clarificări",
        text: "Există premise pentru analiză, dar unele condiții trebuie verificate înainte de pregătirea documentației."
      };
    }
    return {
      title: "Începe cu verificarea criteriilor de bază",
      text: "Clarifică solicitantul, investiția, bugetul și posibilitatea de cofinanțare înainte de alegerea programului."
    };
  }, [score]);

  return (
    <section className="eligibility-checker" id="calculator-eligibilitate" aria-labelledby="eligibility-title">
      <div className="eligibility-copy">
        <p className="eyebrow"><ClipboardCheck aria-hidden="true" /> Evaluare rapidă</p>
        <h2 id="eligibility-title">Verificare preliminară pentru fonduri europene</h2>
        <p>Bifează informațiile pe care le poți confirma. Rezultatul este orientativ și nu înlocuiește analiza ghidului programului.</p>
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
          <a href="/contact?service=fonduri-europene" title="Solicită verificarea eligibilității">
            Solicită analiza eligibilității <ArrowRight aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
