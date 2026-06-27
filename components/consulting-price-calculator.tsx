"use client";

import Link from "next/link";
import { ArrowRight, Calculator, CircleCheckBig, Info, RotateCcw } from "lucide-react";
import { useMemo, useState } from "react";

type SelectOption = {
  value: string;
  label: string;
  factor: number;
};

const applicantOptions: SelectOption[] = [
  { value: "srl", label: "SRL", factor: 1 },
  { value: "pfa", label: "PFA", factor: .85 },
  { value: "ngo", label: "ONG", factor: 1.1 },
];

const projectOptions: SelectOption[] = [
  { value: "equipment", label: "Echipamente sau extindere", factor: 1 },
  { value: "digital", label: "Digitalizare", factor: .9 },
  { value: "construction", label: "Lucrări și investiție complexă", factor: 1.3 },
  { value: "social", label: "Proiect social sau educațional", factor: 1.25 },
  { value: "unknown", label: "Nu am stabilit încă", factor: .85 }
];

const valueOptions: SelectOption[] = [
  { value: "small", label: "Sub 100.000 EUR", factor: .9 },
  { value: "medium", label: "100.000 - 500.000 EUR", factor: 1 },
  { value: "large", label: "500.000 - 1.000.000 EUR", factor: 1.2 },
  { value: "enterprise", label: "Peste 1.000.000 EUR", factor: 1.45 }
];

const documentOptions: SelectOption[] = [
  { value: "ready", label: "Documentele principale sunt pregătite", factor: .9 },
  { value: "partial", label: "Avem doar o parte din informații", factor: 1 },
  { value: "early", label: "Suntem la început", factor: 1.2 }
];

const urgencyOptions: SelectOption[] = [
  { value: "normal", label: "Calendar normal", factor: 1 },
  { value: "short", label: "Termen scurt", factor: 1.15 },
  { value: "urgent", label: "Urgență ridicată", factor: 1.3 }
];

function optionFactor(options: SelectOption[], value: string) {
  return options.find((option) => option.value === value)?.factor ?? 1;
}

function formatRon(value: number) {
  return new Intl.NumberFormat("ro-RO", {
    style: "currency",
    currency: "RON",
    maximumFractionDigits: 0
  }).format(value);
}

export function ConsultingPriceCalculator({ basePriceRon }: { basePriceRon: number }) {
  const [applicant, setApplicant] = useState("srl");
  const [project, setProject] = useState("equipment");
  const [projectValue, setProjectValue] = useState("medium");
  const [documents, setDocuments] = useState("partial");
  const [urgency, setUrgency] = useState("normal");

  const estimate = useMemo(() => {
    const score =
      optionFactor(applicantOptions, applicant) *
      optionFactor(projectOptions, project) *
      optionFactor(valueOptions, projectValue) *
      optionFactor(documentOptions, documents) *
      optionFactor(urgencyOptions, urgency);
    const complexity = score < 1 ? "redusă" : score < 1.35 ? "medie" : "ridicată";
    const round = (value: number) => Math.max(100, Math.round(value / 100) * 100);
    return {
      complexity,
      lower: round(basePriceRon * score * .9),
      upper: round(basePriceRon * score * 1.15)
    };
  }, [applicant, basePriceRon, documents, project, projectValue, urgency]);

  const hasCommercialBase = Number.isFinite(basePriceRon) && basePriceRon > 0;
  const reset = () => {
    setApplicant("srl");
    setProject("equipment");
    setProjectValue("medium");
    setDocuments("partial");
    setUrgency("normal");
  };

  return (
    <div className="price-calculator">
      <div className="calculator-fields">
        <div className="calculator-form-heading">
          <span>5 factori analizați</span>
          <h2>Configurează proiectul</h2>
          <p>Modifică răspunsurile, iar estimarea se actualizează imediat.</p>
        </div>
        <fieldset className="calculator-applicant">
          <legend>Tip solicitant</legend>
          <div>
            {applicantOptions.map((option) => (
              <label key={option.value}>
                <input
                  type="radio"
                  name="applicant"
                  value={option.value}
                  checked={applicant === option.value}
                  onChange={(event) => setApplicant(event.target.value)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <label>
          <span>Tipul investiției</span>
          <select value={project} onChange={(event) => setProject(event.target.value)}>
            {projectOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </label>
        <label>
          <span>Valoarea estimată a proiectului</span>
          <select value={projectValue} onChange={(event) => setProjectValue(event.target.value)}>
            {valueOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </label>
        <label>
          <span>Stadiul documentelor</span>
          <select value={documents} onChange={(event) => setDocuments(event.target.value)}>
            {documentOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </label>
        <label>
          <span>Urgența termenului</span>
          <select value={urgency} onChange={(event) => setUrgency(event.target.value)}>
            {urgencyOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </label>
        <button className="calculator-reset" type="button" onClick={reset}>
          <RotateCcw aria-hidden="true" /> Resetează răspunsurile
        </button>
      </div>

      <aside className="calculator-result" aria-live="polite">
        <div className="calculator-result-header">
          <span className="calculator-result-icon"><Calculator aria-hidden="true" /></span>
          <span className="calculator-estimate-label">Estimare orientativă</span>
        </div>
        <div className="calculator-complexity">
          <p>Complexitatea proiectului</p>
          <strong>{estimate.complexity}</strong>
        </div>
        {hasCommercialBase ? (
          <div className="calculator-price-range">
            <p>Interval orientativ pentru consultanță</p>
            <h2>{formatRon(estimate.lower)} - {formatRon(estimate.upper)}</h2>
            <small>Calculat din baza comercială aprobată și factorii selectați.</small>
          </div>
        ) : (
          <div className="calculator-pending-price">
            <Info aria-hidden="true" />
            <p>Intervalul financiar se confirmă după validarea datelor comerciale. Estimarea de complexitate rămâne disponibilă.</p>
          </div>
        )}
        <ul>
          <li><CircleCheckBig aria-hidden="true" /> Rezultat orientativ, fără obligație contractuală</li>
          <li><CircleCheckBig aria-hidden="true" /> Oferta finală urmează după analiza apelului și a documentelor</li>
        </ul>
        <Link className="primary-button yellow-button" href="/contact?service=consultanta">
          Cere evaluarea exactă <ArrowRight aria-hidden="true" />
        </Link>
        <p className="calculator-disclaimer">Rezultatul nu reprezintă ofertă contractuală și nu garantează eligibilitatea sau aprobarea finanțării.</p>
      </aside>
    </div>
  );
}
