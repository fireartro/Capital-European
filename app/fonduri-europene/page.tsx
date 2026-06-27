import { FundingPage } from "@/components/funding-page";
import { createPageMetadata } from "@/lib/metadata";
import { fundingFaq } from "@/lib/service-content";
import { breadcrumbSchema, faqSchema, JsonLd, professionalServiceSchema, serviceSchema } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Fonduri europene pentru firme și ONG-uri",
  description: "Consultanță fonduri europene în România: eligibilitate, cerere de finanțare, depunere și implementare pentru firme și ONG-uri. Fără promisiuni nerealiste.",
  path: "/fonduri-europene"
});

export default function Page() {
  return (
    <>
      <JsonLd data={[
        breadcrumbSchema([
          { name: "Acasă", path: "/" },
          { name: "Consultanță fonduri europene", path: "/fonduri-europene" }
        ]),
        professionalServiceSchema({
          path: "/fonduri-europene",
          serviceName: "Consultanță fonduri europene",
          description: "Capital European oferă servicii de consultanță pentru accesarea fondurilor europene: analiză de eligibilitate, pregătirea documentației, depunerea proiectelor și sprijin în implementare."
        }),
        serviceSchema({
          name: "Consultanță fonduri europene",
          description: "Analiză de eligibilitate, pregătire documentație, depunere și sprijin pentru implementarea proiectelor cu fonduri europene.",
          path: "/fonduri-europene",
          serviceType: ["Consultanță fonduri europene", "Cereri de finanțare", "Management proiecte finanțate"]
        }),
        faqSchema(fundingFaq)
      ]} />
      <FundingPage />
    </>
  );
}
