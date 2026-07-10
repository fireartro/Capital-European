import { ShieldCheck } from "lucide-react";
import { ContactFormAnchor } from "@/components/contact-form-anchor";
import { ContactForm } from "@/components/contact-form";
import { SiteShell } from "@/components/site-shell";
import type { ContactInput } from "@/lib/contact-schema";

const contactSteps = [
  ["01", "Descrii situația", "Spune-ne serviciul dorit, termenul și informațiile pe care le ai deja."],
  ["02", "Clarificăm nevoia", "Revenim cu întrebările necesare pentru a delimita serviciul și riscurile."],
  ["03", "Primești următorii pași", "Îți comunicăm ce putem prelua, ce mai este necesar și cum poate începe colaborarea."]
] as const;

const contactAssurances = [
  "Nu ai nevoie de o documentație completă pentru prima discuție.",
  "Nu promitem rezultate garantate; clarificăm ce este realist.",
  "Datele rămân folosite strict pentru solicitarea transmisă."
] as const;

export function ContactPage({
  defaultService,
  defaultFundingProgram = "",
  defaultMessage = ""
}: {
  defaultService?: ContactInput["service"];
  defaultFundingProgram?: string;
  defaultMessage?: string;
}) {
  const navigationContext = defaultService === "fonduri-europene" || defaultService === "consultanta"
    ? "funding"
    : defaultService
      ? "admin"
      : "general";

  return (
    <SiteShell navigationContext={navigationContext}>
      <section className="contact-page" aria-labelledby="contact-page-title" aria-describedby="contact-page-description">
        <div className="section-container contact-layout contact-layout-simplified">
          <div className="contact-copy">
            <p className="eyebrow eyebrow-light">Prima discuție</p>
            <h1 id="contact-page-title">Descrie situația.{" "}<br />Clarificăm <em>următorul pas.</em></h1>
            <p id="contact-page-description">Poți începe cu informațiile pe care le ai. Analizăm solicitarea și revenim cu întrebările necesare înainte de ofertă.</p>
            <ContactFormAnchor />
            <div className="contact-steps" aria-labelledby="contact-steps-title">
              <h2 className="visually-hidden" id="contact-steps-title">Cum decurge prima discuție</h2>
              {contactSteps.map(([number, title, text]) => (
                <article key={number}>
                  <span>{number}</span>
                  <div>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                </article>
              ))}
            </div>
            <div className="privacy-note"><ShieldCheck /><span>Datele sunt folosite pentru analizarea și soluționarea solicitării.</span></div>
            <ul className="contact-assurances" aria-label="Asigurări înainte de trimiterea formularului">
              {contactAssurances.map((item) => <li key={item}><ShieldCheck aria-hidden="true" /> {item}</li>)}
            </ul>
          </div>
          <div className="form-wrap" id="formular-contact">
            <ContactForm
              defaultService={defaultService}
              defaultFundingProgram={defaultFundingProgram}
              defaultMessage={defaultMessage}
            />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
