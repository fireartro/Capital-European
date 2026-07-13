import { ContactPage } from "@/components/contact-page";
import type { ContactInput } from "@/lib/contact-schema";
import { fundingProgramOptions, getFundingProgramLabel } from "@/lib/funding-programs";
import { createPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, JsonLd } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Contact Capital European | Trimite o solicitare",
  description: "Descrie proiectul de fonduri europene sau activitatea administrativă pe care vrei să o delegi. Revenim cu întrebările și pașii necesari.",
  path: "/contact"
});

const allowedServices = new Set<ContactInput["service"]>([
  "nesigur", "servicii-administrative", "documente", "secretariat", "administrativ", "consultanta",
  "infiintare-pfa", "infiintare-srl", "fonduri-europene"
]);

export default async function Page({ searchParams }: { searchParams: Promise<{ service?: string; program?: string; score?: string }> }) {
  const { service, program, score } = await searchParams;
  const normalizedService = service === "birotica" || service === "infiintare-firma"
    ? "servicii-administrative"
    : service;
  const defaultService = normalizedService && allowedServices.has(normalizedService as ContactInput["service"])
    ? normalizedService as ContactInput["service"]
    : undefined;
  const defaultFundingProgram = program && fundingProgramOptions.some((option) => option.value === program)
    ? program
    : "";
  const parsedScore = score && /^\d{1,3}$/.test(score) ? Number(score) : undefined;
  const validScore = parsedScore !== undefined && parsedScore >= 0 && parsedScore <= 100 ? parsedScore : undefined;
  const defaultMessage = defaultService === "fonduri-europene" && defaultFundingProgram
    ? `Solicit evaluarea eligibilității și a punctajului pentru ${getFundingProgramLabel(defaultFundingProgram)}.${validScore !== undefined ? ` Punctaj orientativ de pregătire calculat pe site: ${validScore}/100.` : ""} Doresc verificarea criteriilor și a grilei oficiale.`
    : "";

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Acasă", path: "/" },
        { name: "Contact", path: "/contact" }
      ])} />
      <ContactPage
        defaultService={defaultService}
        defaultFundingProgram={defaultFundingProgram}
        defaultMessage={defaultMessage}
      />
    </>
  );
}
