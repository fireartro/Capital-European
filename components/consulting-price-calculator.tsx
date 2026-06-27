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

const administrativeServiceOptions: SelectOption[] = [
  { value: "documents", label: "Administrare documente", factor: .9 },
  { value: "secretariat", label: "Secretariat externalizat", factor: 1 },
  { value: "backoffice", label: "Back-office recurent", factor: 1.2 },
  { value: "company", label: "Sprijin pentru înființare firmă", factor: .85 },
  { value: "unknown", label: "Serviciul trebuie clarificat", factor: 1 }
];

const administrativeVolumeOptions: SelectOption[] = [
  { value: "small", label: "Volum redus sau solicitare punctuală", factor: .8 },
  { value: "medium", label: "Volum lunar moderat", factor: 1 },
  { value: "large", label: "Volum lunar ridicat", factor: 1.25 },
  { value: "enterprise", label: "Mai multe fluxuri sau departamente", factor: 1.45 }
];

const administrativeReadinessOptions: SelectOption[] = [
  { value: "ready", label: "Procesul și responsabilitățile sunt clare", factor: .9 },
  { value: "partial", label: "Există un flux, dar trebuie organizat", factor: 1 },
  { value: "early", label: "Procesul trebuie definit de la început", factor: 1.2 }
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

export function ConsultingPriceCalculator({
  consultingBasePriceRon,
  adminBasePriceRon
}: {
  consultingBasePriceRon: number;
  adminBasePriceRon: number;
}) {
  const [serviceArea, setServiceArea] = useState<"consulting" | "admin">("consulting");
  const [applicant, setApplicant] = useState("srl");
  const [project, setProject] = useState("equipment");
  const [projectValue, setProjectValue] = useState("medium");
  const [documents, setDocuments] = useState("partial");
  const [urgency, setUrgency] = useState("normal");

  const estimate = useMemo(() => {
    const activeProjectOptions = serviceArea === "consulting" ? projectOptions : administrativeServiceOptions;
    const activeValueOptions = serviceArea === "consulting" ? valueOptions : administrativeVolumeOptions;
    const activeDocumentOptions = serviceArea === "consulting" ? documentOptions : administrativeReadinessOptions;
    const score =
      optionFactor(applicantOptions, applicant) *
      optionFactor(activeProjectOptions, project) *
      optionFactor(activeValueOptions, projectValue) *
      optionFactor(activeDocumentOptions, documents) *
      optionFactor(urgencyOptions, urgency);
    const complexity = score < 1 ? "redusă" : score < 1.35 ? "medie" : "ridicată";
    const basePriceRon = serviceArea === "consulting" ? consultingBasePriceRon : adminBasePriceRon;
    const round = (value: number) => Math.max(100, Math.round(value / 100) * 100);
    return {
      complexity,
      lower: round(basePriceRon * score * .9),
      upper: round(basePriceRon * score * 1.15)
    };
  }, [adminBasePriceRon, applicant, consultingBasePriceRon, documents, project, projectValue, serviceArea, urgency]);

  const activeBasePriceRon = serviceArea === "consulting" ? consultingBasePriceRon : adminBasePriceRon;
  const hasCommercialBase = Number.isFinite(activeBasePriceRon) && activeBasePriceRon > 0;
  const activeProjectOptions = serviceArea === "consulting" ? projectOptions : administrativeServiceOptions;
  const activeValueOptions = serviceArea === "consulting" ? valueOptions : administrativeVolumeOptions;
  const activeDocumentOptions = serviceArea === "consulting" ? documentOptions : administrativeReadinessOptions;

  const changeServiceArea = (value: "consulting" | "admin") => {
    setServiceArea(value);
    setProject(value === "consulting" ? "equipment" : "documents");
    setProjectValue("medium");
    setDocuments("partial");
    setUrgency("normal");
  };

  const reset = () => {
    setServiceArea("consulting");
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
          <span>Estimare în 6 pași</span>
          <h2>Descrie serviciul de care ai nevoie</h2>
          <p>Selectează situația cea mai apropiată. Rezultatul se actualizează automat.</p>
        </div>
        <fieldset className="calculator-service">
          <legend>Direcția serviciului</legend>
          <div>
            <label>
              <input
                type="radio"
                name="service-area"
                value="consulting"
                checked={serviceArea === "consulting"}
                onChange={() => changeServiceArea("consulting")}
              />
              <span>Consultanță fonduri</span>
            </label>
            <label>
              <input
                type="radio"
                name="service-area"
                value="admin"
                checked={serviceArea === "admin"}
                onChange={() => changeServiceArea("admin")}
              />
              <span>Servicii administrative</span>
            </label>
          </div>
        </fieldset>
        <fieldset className="calculator-applicant">
          <legend>Tip organizație</legend>
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
          <span>{serviceArea === "consulting" ? "Obiectul principal al proiectului" : "Serviciul administrativ"}</span>
          <select value={project} onChange={(event) => setProject(event.target.value)}>
            {activeProjectOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </label>
        <label>
          <span>{serviceArea === "consulting" ? "Valoarea estimată a proiectului" : "Volumul estimat"}</span>
          <select value={projectValue} onChange={(event) => setProjectValue(event.target.value)}>
            {activeValueOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </label>
        <label>
          <span>{serviceArea === "consulting" ? "Stadiul documentelor" : "Stadiul procesului"}</span>
          <select value={documents} onChange={(event) => setDocuments(event.target.value)}>
            {activeDocumentOptions.map((option) => <option key={option.value} value={option.value}>{option.label}</option>)}
          </select>
        </label>
        <label>
          <span>{serviceArea === "consulting" ? "Timp disponibil până la depunere" : "Termenul dorit pentru începere"}</span>
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
          <p>Complexitatea estimată</p>
          <strong>{estimate.complexity}</strong>
        </div>
        {hasCommercialBase ? (
          <div className="calculator-price-range">
            <p>Interval estimativ pentru serviciul selectat</p>
            <h2>{formatRon(estimate.lower)} - {formatRon(estimate.upper)}</h2>
            <small>Calculat pe baza valorii configurate și a opțiunilor selectate.</small>
          </div>
        ) : (
          <div className="calculator-pending-price">
            <Info aria-hidden="true" />
            <p>Intervalul de preț va fi afișat după configurarea bazei comerciale pentru această categorie. Complexitatea orientativă rămâne disponibilă.</p>
          </div>
        )}
        <ul>
          <li><CircleCheckBig aria-hidden="true" /> Estimare orientativă, nu ofertă comercială finală</li>
          <li><CircleCheckBig aria-hidden="true" /> Prețul final depinde de volum, livrabile și informațiile disponibile</li>
        </ul>
        <Link className="primary-button yellow-button" href={`/contact?service=${serviceArea === "consulting" ? "consultanta" : "servicii-administrative"}`}>
          Solicită o ofertă personalizată <ArrowRight aria-hidden="true" />
        </Link>
        <p className="calculator-disclaimer">
          {serviceArea === "consulting"
            ? "Rezultatul este informativ, nu reprezintă o ofertă comercială, nu confirmă eligibilitatea și nu garantează aprobarea finanțării."
            : "Rezultatul este informativ și nu reprezintă o ofertă comercială. Volumul real și cerințele stabilite în discuția inițială pot modifica estimarea."}
        </p>
      </aside>
    </div>
  );
}
