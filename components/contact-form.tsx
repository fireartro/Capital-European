"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Check, LoaderCircle, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { contactCategoryForService, contactSchema, type ContactCategory, type ContactInput } from "@/lib/contact-schema";
import { fundingProgramOptions } from "@/lib/funding-programs";
import { siteConfig } from "@/lib/site-config";
import { trackAnalyticsEvent } from "@/lib/analytics";

const servicesByCategory = {
  "fonduri-europene": [
    ["fonduri-europene", "Consultanță pentru fonduri europene"],
    ["consultanta", "Analiză sau consultanță de proiect"]
  ],
  "servicii-administrative": [
    ["servicii-administrative", "Pachet de servicii administrative"],
    ["documente", "Administrare documente"],
    ["secretariat", "Secretariat externalizat"],
    ["administrativ", "Asistență administrativă"],
    ["infiintare-firma", "Sprijin pentru înființare firmă"]
  ]
} as const;

const formTrust = [
  "Este suficientă o descriere scurtă pentru primul contact.",
  "Nu este necesar să trimiți documente sensibile prin formular.",
  "Solicitarea este verificată înainte de ofertare."
] as const;

export function ContactForm({
  defaultService = "fonduri-europene",
  defaultFundingProgram = "",
  defaultMessage = ""
}: {
  defaultService?: ContactInput["service"];
  defaultFundingProgram?: string;
  defaultMessage?: string;
}) {
  const defaultCategory = contactCategoryForService(defaultService);
  const [serverMessage, setServerMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [demoMode, setDemoMode] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    control,
    setValue,
    formState: { errors, isSubmitting }
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      category: defaultCategory,
      service: defaultService,
      fundingProgram: defaultFundingProgram,
      message: defaultMessage,
      consent: false,
      website: ""
    }
  });
  const category = (useWatch({ control, name: "category" }) ?? defaultCategory) as ContactCategory;
  const selectedService = useWatch({ control, name: "service" });
  const availableServices = servicesByCategory[category];

  useEffect(() => {
    const serviceIsAvailable = availableServices.some(([value]) => value === selectedService);
    if (!serviceIsAvailable) {
      setValue("service", availableServices[0][0], { shouldValidate: true });
    }
  }, [availableServices, selectedService, setValue]);

  useEffect(() => {
    if (category !== "fonduri-europene") {
      setValue("fundingProgram", "");
    }
  }, [category, setValue]);

  const submit = async (data: ContactInput) => {
    setServerMessage("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", "X-Requested-With": "XMLHttpRequest" },
        body: JSON.stringify(data)
      });
      const isJson = response.headers.get("content-type")?.includes("application/json");
      const result = (isJson ? await response.json().catch(() => ({})) : {}) as { success?: boolean; demo?: boolean; message?: string };
      if (!response.ok) throw new Error(result.message || "Solicitarea nu a putut fi trimisă.");
      setDemoMode(Boolean(result.demo));
      trackAnalyticsEvent("generate_lead", {
        lead_source: "contact_form",
        service_category: data.category,
        service: data.service,
        funding_program: data.fundingProgram || undefined
      });
      setSent(true);
      reset({
        category: defaultCategory,
        service: defaultService,
        fundingProgram: defaultFundingProgram,
        message: defaultMessage,
        consent: false,
        website: ""
      });
    } catch (error) {
      setServerMessage(error instanceof Error ? error.message : "A apărut o eroare. Încearcă din nou.");
    }
  };

  if (sent) {
    return (
      <div className="success-state" role="status">
        <span><Check /></span>
        <p className="kicker">Solicitare înregistrată</p>
        <h2>Solicitarea a fost înregistrată.</h2>
        <p>{demoMode ? "Formularul funcționează în modul de test. Configurează CONTACT_WEBHOOK_URL pentru livrarea solicitărilor reale." : `${siteConfig.name} va reveni pentru clarificarea situației și a următorilor pași.`}</p>
        <button className="button button-dark" type="button" onClick={() => setSent(false)}>
          Trimite o altă solicitare
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit(submit)} aria-busy={isSubmitting} noValidate>
      <div className="form-heading">
        <p className="kicker">Solicitare inițială</p>
        <h2>Spune-ne de ce serviciu ai nevoie</h2>
        <p className="form-intro">Completează informațiile esențiale. Nu trebuie să ai dosarul sau toate documentele pregătite.</p>
      </div>
      <ul className="form-trust-list" aria-label="Ce se întâmplă cu solicitarea trimisă">
        {formTrust.map((item) => <li key={item}><Check aria-hidden="true" /> {item}</li>)}
      </ul>
      <div className="form-service-path">
        <label>
          <span>Categoria serviciului</span>
          <select required {...register("category")}>
            <option value="fonduri-europene">Fonduri europene</option>
            <option value="servicii-administrative">Servicii administrative</option>
          </select>
        </label>
        <label>
          <span>Serviciu de interes</span>
          <select required {...register("service")} aria-invalid={!!errors.service} aria-describedby={errors.service ? "service-error" : undefined}>
            {availableServices.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
          {errors.service && <small id="service-error">{errors.service.message}</small>}
        </label>
        {category === "fonduri-europene" && (
          <label className="funding-program-field">
            <span>Linia de finanțare</span>
            <select {...register("fundingProgram")}>
              <option value="">Selectează linia de finanțare</option>
              {fundingProgramOptions.map((option) => (
                <option key={option.value} value={option.value}>{option.label}</option>
              ))}
            </select>
          </label>
        )}
      </div>
      <div className="form-grid">
        <label>
          <span>Nume și prenume</span>
          <input autoComplete="name" placeholder="Ion Popescu" maxLength={100} required {...register("name")} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} />
          {errors.name && <small id="name-error">{errors.name.message}</small>}
        </label>
        <label>
          <span>Email</span>
          <input type="email" autoComplete="email" placeholder="nume@companie.ro" maxLength={160} required {...register("email")} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} />
          {errors.email && <small id="email-error">{errors.email.message}</small>}
        </label>
        <label>
          <span>Telefon</span>
          <input type="tel" autoComplete="tel" placeholder="07xx xxx xxx" maxLength={24} required {...register("phone")} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : undefined} />
          {errors.phone && <small id="phone-error">{errors.phone.message}</small>}
        </label>
        <label className="full-field">
          <span>Mesaj</span>
          <textarea placeholder="Descrie obiectivul, situația actuală și termenul relevant..." maxLength={2000} required {...register("message")} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} />
          {errors.message && <small id="message-error">{errors.message.message}</small>}
        </label>
        <label className="honeypot" aria-hidden="true">
          <span>Website</span>
          <input tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>
      <label className="consent">
        <input type="checkbox" {...register("consent")} required aria-invalid={!!errors.consent} aria-describedby={errors.consent ? "consent-error" : undefined} />
        <span>Confirm că am citit <a href="/confidentialitate" title="Politica de confidențialitate Capital European">politica de confidențialitate</a> și înțeleg cum sunt folosite datele pentru soluționarea solicitării.</span>
      </label>
      {errors.consent && <small className="standalone-error" id="consent-error">{errors.consent.message}</small>}
      {serverMessage && <p className="server-error" role="alert" aria-live="polite">{serverMessage}</p>}
      <button className="button button-accent form-submit" disabled={isSubmitting} type="submit">
        {isSubmitting ? <LoaderCircle className="spin" aria-hidden="true" /> : <Send aria-hidden="true" />}
        {isSubmitting ? "Se trimite..." : "Trimite solicitarea"}
      </button>
      <p className="form-note">După trimitere, verificăm solicitarea și revenim pentru clarificări. Formularul nu creează o obligație contractuală.</p>
    </form>
  );
}
