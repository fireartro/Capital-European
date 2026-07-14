"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { BriefcaseBusiness, Check, Landmark, LoaderCircle, Send } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { contactCategoryForService, contactSchema, type ContactCategory, type ContactInput } from "@/lib/contact-schema";
import type { FundingProgramOption } from "@/lib/funding-programs";
import { siteConfig } from "@/lib/site-config";
import { trackAnalyticsEvent } from "@/lib/analytics";

type FormCategory = Exclude<ContactCategory, "general">;

const fundingServiceOptions: ReadonlyArray<[ContactInput["service"], string]> = [
  ["fonduri-europene", "Fonduri europene: eligibilitate și proiect"],
  ["consultanta", "Consultanță pentru pregătire și implementare"]
] as const;

const administrativeServiceOptions: ReadonlyArray<[ContactInput["service"], string]> = [
  ["servicii-administrative", "Servicii administrative"],
  ["infiintare-firma", "Înființare firmă: alegerea între PFA și SRL"],
  ["infiintare-pfa", "Înființare PFA"],
  ["infiintare-srl", "Înființare SRL"],
  ["documente", "Administrare documente"],
  ["secretariat", "Secretariat externalizat"],
  ["administrativ", "Asistență administrativă"]
] as const;

export function ContactForm({
  defaultService = "fonduri-europene",
  defaultFundingProgram = "",
  defaultMessage = "",
  fundingProgramOptions = []
}: {
  defaultService?: ContactInput["service"];
  defaultFundingProgram?: string;
  defaultMessage?: string;
  fundingProgramOptions?: readonly FundingProgramOption[];
}) {
  const requestedCategory = contactCategoryForService(defaultService);
  const initialCategory: FormCategory = requestedCategory === "servicii-administrative"
    ? "servicii-administrative"
    : "fonduri-europene";
  const initialService: ContactInput["service"] = requestedCategory === "general"
    ? "fonduri-europene"
    : defaultService;
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
      name: "",
      email: "",
      phone: "",
      category: initialCategory,
      service: initialService,
      fundingProgram: defaultFundingProgram,
      message: defaultMessage,
      consent: false,
      website: ""
    }
  });
  const selectedCategory = (useWatch({ control, name: "category" }) ?? initialCategory) as FormCategory;
  const selectedService = useWatch({ control, name: "service" }) ?? initialService;
  const isFundingService = selectedService === "fonduri-europene" || selectedService === "consultanta";
  const serviceOptions = selectedCategory === "fonduri-europene"
    ? fundingServiceOptions
    : administrativeServiceOptions;

  const selectCategory = (category: FormCategory) => {
    setValue("category", category, { shouldDirty: true, shouldValidate: true });
    setValue(
      "service",
      category === "fonduri-europene" ? "fonduri-europene" : "servicii-administrative",
      { shouldDirty: true, shouldValidate: true }
    );
  };

  useEffect(() => {
    if (!isFundingService) {
      setValue("fundingProgram", "");
    }
  }, [isFundingService, setValue]);

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
        service_category: contactCategoryForService(data.service),
        service: data.service,
        funding_program: data.fundingProgram || undefined
      });
      setSent(true);
      reset({
        name: "",
        email: "",
        phone: "",
        category: initialCategory,
        service: initialService,
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
        <p>{demoMode ? "Solicitarea a fost validată în mediul local de test." : `${siteConfig.name} va reveni pentru clarificarea situației și a următorilor pași.`}</p>
        <button className="button button-dark" type="button" onClick={() => setSent(false)}>
          Trimite o altă solicitare
        </button>
      </div>
    );
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit(submit)} aria-busy={isSubmitting} noValidate>
      <div className="form-heading">
        <p className="kicker">Formular de contact</p>
        <h2>Spune-ne pe scurt cu ce te putem ajuta</h2>
        <p className="form-intro">Sunt suficiente informațiile pe care le ai acum. Nu trimite documente sensibile prin formular.</p>
      </div>
      <div className="form-service-path">
        <fieldset className="form-category-choice">
          <legend>Alege direcția</legend>
          <div className="form-category-options">
            <label data-selected={selectedCategory === "fonduri-europene"}>
              <input
                type="radio"
                value="fonduri-europene"
                {...register("category")}
                onClick={() => selectCategory("fonduri-europene")}
              />
              <span><Landmark aria-hidden="true" /><strong>Consultanță fonduri europene</strong></span>
            </label>
            <label data-selected={selectedCategory === "servicii-administrative"}>
              <input
                type="radio"
                value="servicii-administrative"
                {...register("category")}
                onClick={() => selectCategory("servicii-administrative")}
              />
              <span><BriefcaseBusiness aria-hidden="true" /><strong>Servicii administrative</strong></span>
            </label>
          </div>
          {errors.category && <small>{errors.category.message}</small>}
        </fieldset>
        <label>
          <span>Ce serviciu te interesează</span>
          <select required {...register("service")} aria-invalid={!!errors.service} aria-describedby={errors.service ? "service-error" : undefined}>
            {serviceOptions.map(([value, label]) => <option key={value} value={value}>{label}</option>)}
          </select>
          {errors.service && <small id="service-error">{errors.service.message}</small>}
        </label>
        <div className="form-dependent-slot" aria-live="polite">
          {isFundingService ? (
            <label className="funding-program-field">
              <span>Linia de finanțare, dacă o cunoști</span>
              <select {...register("fundingProgram")}>
                <option value="">Nu știu încă / nu apare în listă</option>
                {fundingProgramOptions.map((option) => (
                  <option key={option.value} value={option.value}>{option.label}</option>
                ))}
              </select>
            </label>
          ) : (
            <div className="form-context-note">
              <strong>Servicii administrative</strong>
              <span>Alege serviciul și descrie situația în câmpul „Mesaj”.</span>
            </div>
          )}
        </div>
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
          <span>Telefon <small>(opțional)</small></span>
          <input type="tel" autoComplete="tel" placeholder="07xx xxx xxx" maxLength={24} {...register("phone")} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "phone-error" : undefined} />
          {errors.phone && <small id="phone-error">{errors.phone.message}</small>}
        </label>
        <label className="full-field">
          <span>Mesaj</span>
          <textarea placeholder="Ce vrei să rezolvi și în ce stadiu te afli?" maxLength={2000} required {...register("message")} aria-invalid={!!errors.message} aria-describedby={errors.message ? "message-error" : undefined} />
          {errors.message && <small id="message-error">{errors.message.message}</small>}
        </label>
        <label className="honeypot" aria-hidden="true">
          <span>Website</span>
          <input tabIndex={-1} autoComplete="off" {...register("website")} />
        </label>
      </div>
      <label className="consent">
        <input type="checkbox" {...register("consent")} required aria-invalid={!!errors.consent} aria-describedby={errors.consent ? "consent-error" : undefined} />
        <span>Am citit <a href="/confidentialitate" title="Politica de confidențialitate Capital European">politica de confidențialitate</a> și sunt de acord cu folosirea datelor pentru a primi răspuns.</span>
      </label>
      {errors.consent && <small className="standalone-error" id="consent-error">{errors.consent.message}</small>}
      {serverMessage && <p className="server-error" role="alert" aria-live="polite">{serverMessage}</p>}
      <button className="button button-accent form-submit" disabled={isSubmitting} type="submit">
        {isSubmitting ? <LoaderCircle className="spin" aria-hidden="true" /> : <Send aria-hidden="true" />}
        {isSubmitting ? "Se trimite..." : "Trimite solicitarea"}
      </button>
      <p className="form-note">Revenim pentru clarificări înainte de orice ofertă. Trimiterea formularului nu creează obligații contractuale.</p>
    </form>
  );
}
