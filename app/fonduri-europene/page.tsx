import { FundingPage } from "@/components/funding-page";
import { createPageMetadata } from "@/lib/metadata";
import { fundingFaq } from "@/lib/service-content";
import { breadcrumbSchema, faqSchema, fundingProgramListSchema, JsonLd } from "@/lib/structured-data";
import { getManagedContent } from "@/lib/content-store";

export const revalidate = 300;

export const metadata = createPageMetadata({
  title: "Fonduri europene pentru firme, ONG-uri și startup-uri",
  description: "Fonduri europene pentru firme, ONG-uri și startup-uri: oportunități urmărite, criterii de eligibilitate, punctaj, surse oficiale și pașii de accesare.",
  path: "/fonduri-europene"
});

export default async function Page() {
  const content = await getManagedContent();
  return (
    <>
      <JsonLd data={[
        breadcrumbSchema([
          { name: "Acasă", path: "/" },
          { name: "Fonduri europene", path: "/fonduri-europene" }
        ]),
        faqSchema(fundingFaq),
        fundingProgramListSchema(content.fundingPrograms)
      ]} />
      <FundingPage programs={content.fundingPrograms} />
    </>
  );
}
