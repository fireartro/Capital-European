"use client";

import Link from "next/link";
import { ArrowRight, Calculator, CircleCheckBig, Info } from "lucide-react";
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

  return (
    <div className="price-calculator">
      <div className="calculator-fields">
        <label>
          <span>Tip solicitant</span>
          <select value={applicant} onChange={(event) => setApplicant(event.target.value)}>
            {applicantOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </label>
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
      </div>

      <aside className="calculator-result" aria-live="polite">
        <span className="calculator-result-icon"><Calculator aria-hidden="true" /></span>
        <p>Complexitate estimată</p>
        <strong>{estimate.complexity}</strong>
        {hasCommercialBase ? (
          <>
            <p>Interval orientativ pentru consultanță</p>
            <h2>{formatRon(estimate.lower)} - {formatRon(estimate.upper)}</h2>
          </>
        ) : (
          <div className="calculator-pending-price">
            <Info aria-hidden="true" />
            <p>Prețul nu este publicat automat. Configurarea bazei comerciale se face prin variabila <code>NEXT_PUBLIC_ESTIMATOR_BASE_PRICE_RON</code>.</p>
          </div>
        )}
        <ul>
          <li><CircleCheckBig aria-hidden="true" /> Rezultat orientativ, fără obligație contractuală</li>
          <li><CircleCheckBig aria-hidden="true" /> Oferta finală urmează după analiza apelului și a documentelor</li>
        </ul>
        <Link className="primary-button yellow-button" href="/contact?service=consultanta">
          Cere evaluarea exactă <ArrowRight aria-hidden="true" />
        </Link>
      </aside>
    </div>
  );
}
