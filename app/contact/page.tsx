import { ContactPage } from "@/components/contact-page";
import type { ContactInput } from "@/lib/contact-schema";
import { createPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, JsonLd } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Contact — Solicită o analiză inițială",
  description: "Contactează Capital European pentru o analiză inițială de eligibilitate pentru fonduri europene sau o ofertă pentru servicii administrative externalizate.",
  path: "/contact"
});

const allowedServices = new Set<ContactInput["service"]>([
  "servicii-administrative", "documente", "secretariat", "administrativ", "consultanta", "infiintare-firma", "fonduri-europene"
]);

export default async function Page({ searchParams }: { searchParams: Promise<{ service?: string }> }) {
  const { service } = await searchParams;
  const normalizedService = service === "birotica" ? "servicii-administrative" : service;
  const defaultService = normalizedService && allowedServices.has(normalizedService as ContactInput["service"])
    ? normalizedService as ContactInput["service"]
    : undefined;

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Acasă", path: "/" },
        { name: "Contact", path: "/contact" }
      ])} />
      <ContactPage defaultService={defaultService} />
    </>
  );
}
