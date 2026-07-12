import { FundingPage } from "@/components/funding-page";
import { createPageMetadata } from "@/lib/metadata";
import { fundingFaq } from "@/lib/service-content";
import { breadcrumbSchema, faqSchema, JsonLd } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Fonduri europene pentru firme, ONG-uri și startup-uri",
  description: "Fonduri europene pentru firme, ONG-uri și startup-uri: oportunități urmărite, criterii de eligibilitate, punctaj, surse oficiale și pașii de accesare.",
  path: "/fonduri-europene"
});

export default function Page() {
  return (
    <>
      <JsonLd data={[
        breadcrumbSchema([
          { name: "Acasă", path: "/" },
          { name: "Fonduri europene", path: "/fonduri-europene" }
        ]),
        faqSchema(fundingFaq)
      ]} />
      <FundingPage />
    </>
  );
}
