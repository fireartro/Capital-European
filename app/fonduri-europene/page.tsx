import { FundingPage } from "@/components/funding-page";
import { createPageMetadata } from "@/lib/metadata";
import { fundingFaq } from "@/lib/service-content";
import { breadcrumbSchema, faqSchema, JsonLd, professionalServiceSchema, serviceSchema } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Consultanță fonduri europene pentru firme și ONG-uri",
  description: "Consultanță fonduri europene pentru firme și ONG-uri: oportunități urmărite, eligibilitate, punctaj, documentație și sprijin în implementare.",
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
          description: "Capital European oferă analiză de eligibilitate, pregătirea documentației, depunere și sprijin în implementarea proiectelor cu fonduri europene."
        }),
        serviceSchema({
          name: "Consultanță fonduri europene",
          description: "Analiză de eligibilitate, documentație, depunere și sprijin pentru implementarea proiectelor cu fonduri europene.",
          path: "/fonduri-europene",
          serviceType: ["Consultanță fonduri europene", "Cereri de finanțare", "Management proiecte finanțate"]
        }),
        faqSchema(fundingFaq)
      ]} />
      <FundingPage />
    </>
  );
}
