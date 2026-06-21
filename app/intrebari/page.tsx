import { CircleHelp } from "lucide-react";
import { FaqSection } from "@/components/faq-section";
import { SiteShell } from "@/components/site-shell";
import { createPageMetadata } from "@/lib/metadata";
import { generalFaq } from "@/lib/service-content";
import { breadcrumbSchema, faqSchema, JsonLd } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Întrebări frecvente",
  description: "Răspunsuri despre fonduri europene, servicii administrative, documente, colaborare și confidențialitate.",
  path: "/intrebari"
});

export default function Page() {
  return (
    <>
      <JsonLd data={[
        breadcrumbSchema([
          { name: "Acasă", path: "/" },
          { name: "Întrebări frecvente", path: "/intrebari" }
        ]),
        faqSchema(generalFaq)
      ]} />
      <SiteShell>
        <section className="inner-hero faq-hero">
          <div className="section-container inner-hero-content">
            <p className="eyebrow eyebrow-light"><CircleHelp /> Întrebări frecvente</p>
            <h1>Informații clare înainte<br />de orice <em>decizie.</em></h1>
            <p>Am adunat răspunsurile la cele mai frecvente întrebări despre servicii și procesul de colaborare.</p>
          </div>
        </section>
        <FaqSection />
      </SiteShell>
    </>
  );
}
