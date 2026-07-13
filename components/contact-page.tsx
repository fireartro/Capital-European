import { ContactForm } from "@/components/contact-form";
import { SiteShell } from "@/components/site-shell";
import type { ContactInput } from "@/lib/contact-schema";
import type { FundingProgramOption } from "@/lib/funding-programs";

export function ContactPage({
  defaultService,
  defaultFundingProgram = "",
  defaultMessage = "",
  fundingProgramOptions = []
}: {
  defaultService?: ContactInput["service"];
  defaultFundingProgram?: string;
  defaultMessage?: string;
  fundingProgramOptions?: readonly FundingProgramOption[];
}) {
  const navigationContext = defaultService === "fonduri-europene" || defaultService === "consultanta"
    ? "funding"
    : defaultService && defaultService !== "nesigur"
      ? "admin"
      : "general";

  return (
    <SiteShell navigationContext={navigationContext} showWhatsApp={false}>
      <section className="contact-page" aria-labelledby="contact-page-title" aria-describedby="contact-page-description">
        <div className="section-container contact-layout contact-layout-simplified">
          <div className="contact-copy">
            <p className="eyebrow eyebrow-light">Contact</p>
            <h1 id="contact-page-title">Spune-ne ce vrei să rezolvi.</h1>
            <p id="contact-page-description">Alege direcția și serviciul, apoi descrie pe scurt situația. Formularul afișează numai opțiunile relevante alegerii tale.</p>
            <div className="contact-follow-up" aria-labelledby="contact-follow-up-title">
              <h2 id="contact-follow-up-title">Ce se întâmplă după trimitere</h2>
              <p>Citim mesajul tău, cerem informațiile care lipsesc și confirmăm ce putem prelua înainte de ofertă.</p>
              <p>Nu ai nevoie de un dosar complet și nu trebuie să trimiți documente sensibile la primul contact.</p>
            </div>
          </div>
          <div className="form-wrap" id="formular-contact">
            <ContactForm
              defaultService={defaultService}
              defaultFundingProgram={defaultFundingProgram}
              defaultMessage={defaultMessage}
              fundingProgramOptions={fundingProgramOptions}
            />
          </div>
        </div>
      </section>
    </SiteShell>
  );
}
