import { Mail, MessageCircle, Phone, ShieldCheck } from "lucide-react";
import { ContactForm } from "@/components/contact-form";
import { SiteShell } from "@/components/site-shell";
import type { ContactInput } from "@/lib/contact-schema";
import { getWhatsAppUrl, siteConfig } from "@/lib/site-config";

const contactSteps = [
  ["01", "Trimite contextul", "Spune-ne serviciul, urgența și ce documente sau obiective există deja."],
  ["02", "Primești întrebări clare", "Revenim cu punctele care trebuie clarificate înainte de ofertă."],
  ["03", "Stabilim pașii", "Definim ce se poate face, în ce ordine și ce informații mai sunt necesare."]
] as const;

export function ContactPage({ defaultService }: { defaultService?: ContactInput["service"] }) {
  const navigationContext = defaultService === "fonduri-europene"
    ? "funding"
    : defaultService
      ? "admin"
      : "general";

  return (
    <SiteShell navigationContext={navigationContext}>
      <section className="contact-page" aria-labelledby="contact-page-title" aria-describedby="contact-page-description">
        <div className="section-container contact-layout">
          <div className="contact-copy">
            <p className="eyebrow eyebrow-light">Hai să discutăm</p>
            <h1 id="contact-page-title">Spune-ne ce vrei<br />să rezolvi.</h1>
            <p id="contact-page-description">Îți răspundem cu întrebările potrivite, o evaluare inițială și următorii pași concreți.</p>
            <div className="contact-options">
              {siteConfig.phoneHref && <a href={`tel:${siteConfig.phoneHref}`} aria-label={`Sună ${siteConfig.name}`} title={`Sună ${siteConfig.name}`}><span><Phone aria-hidden="true" /></span><div><small>Telefon</small><b>{siteConfig.phoneDisplay}</b></div></a>}
              <a href={`mailto:${siteConfig.email}`} aria-label={`Trimite email către ${siteConfig.name}`} title={`Trimite email către ${siteConfig.name}`}><span><Mail aria-hidden="true" /></span><div><small>Email</small><b>{siteConfig.email}</b></div></a>
              {siteConfig.whatsappNumber && <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" aria-label={`Scrie către ${siteConfig.name} pe WhatsApp`} title={`Scrie către ${siteConfig.name} pe WhatsApp`}><span><MessageCircle aria-hidden="true" /></span><div><small>WhatsApp</small><b>Scrie-ne direct</b></div></a>}
            </div>
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
            <div className="privacy-note"><ShieldCheck /><span>Datele tale sunt folosite exclusiv pentru a răspunde solicitării.</span></div>
          </div>
          <div className="form-wrap"><ContactForm defaultService={defaultService} /></div>
        </div>
      </section>
    </SiteShell>
  );
}
