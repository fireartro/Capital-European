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
  { value: "construction", label: "Lucrări sau investiție complexă", factor: 1.3 },
  { value: "social", label: "Proiect social sau educațional", factor: 1.25 },
  { value: "unknown", label: "Investiția nu este încă definită", factor: .85 }
];

const valueOptions: SelectOption[] = [
  { value: "small", label: "Sub 100.000 EUR", factor: .9 },
  { value: "medium", label: "100.000 - 500.000 EUR", factor: 1 },
  { value: "large", label: "500.000 - 1.000.000 EUR", factor: 1.2 },
  { value: "enterprise", label: "Peste 1.000.000 EUR", factor: 1.45 }
];

const documentOptions: SelectOption[] = [
  { value: "ready", label: "Documentele principale sunt pregătite", factor: .9 },
  { value: "partial", label: "Există doar o parte dintre informații", factor: 1 },
  { value: "early", label: "Proiectul este la început", factor: 1.2 }
];

const urgencyOptions: SelectOption[] = [
  { value: "normal", label: "Peste 8 săptămâni", factor: 1 },
  { value: "short", label: "Între 4 și 8 săptămâni", factor: 1.15 },
  { value: "urgent", label: "Sub 4 săptămâni", factor: 1.3 }
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
          <span>Estimare în 5 pași</span>
          <h2>Descrie pe scurt proiectul</h2>
          <p>Selectează situația cea mai apropiată. Rezultatul se actualizează automat.</p>
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
          <span>Obiectul principal al proiectului</span>
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
          <span>Timp disponibil până la depunere</span>
          <select value={urgency} onChange={(event) => setUrgency(event.target.value)}>
            {urgencyOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </label>
        <button className="calculator-reset" type="button" onClick={reset}>
          <RotateCcw aria-hidden="true" /> Revino la valorile inițiale
        </button>
      </div>

      <aside className="calculator-result" aria-live="polite">
        <div className="calculator-result-header">
          <span className="calculator-result-icon"><Calculator aria-hidden="true" /></span>
          <span className="calculator-estimate-label">Rezultat orientativ</span>
        </div>
        <div className="calculator-complexity">
          <p>Complexitatea proiectului</p>
          <strong>{estimate.complexity}</strong>
        </div>
        {hasCommercialBase ? (
          <div className="calculator-price-range">
            <p>Interval estimativ pentru serviciul de consultanță</p>
            <h2>{formatRon(estimate.lower)} - {formatRon(estimate.upper)}</h2>
            <small>Calculat pe baza valorii configurate și a opțiunilor selectate.</small>
          </div>
        ) : (
          <div className="calculator-pending-price">
            <Info aria-hidden="true" />
            <p>Intervalul de preț va fi afișat după configurarea bazei comerciale. Complexitatea orientativă rămâne disponibilă.</p>
          </div>
        )}
        <ul>
          <li><CircleCheckBig aria-hidden="true" /> Estimare orientativă, nu ofertă comercială finală</li>
          <li><CircleCheckBig aria-hidden="true" /> Prețul final depinde de apel, livrabile și documentele disponibile</li>
        </ul>
        <Link className="primary-button yellow-button" href="/contact?service=consultanta">
          Solicită o ofertă pentru proiect <ArrowRight aria-hidden="true" />
        </Link>
        <p className="calculator-disclaimer">Rezultatul este informativ. Nu reprezintă o ofertă comercială, nu confirmă eligibilitatea și nu garantează aprobarea finanțării.</p>
      </aside>
    </div>
  );
}
