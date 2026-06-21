import { ContactPage } from "@/components/contact-page";
import type { ContactInput } from "@/lib/contact-schema";
import { createPageMetadata } from "@/lib/metadata";
import { breadcrumbSchema, JsonLd } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Contact",
  description: "Solicită o ofertă pentru consultanță fonduri europene, servicii administrative externalizate sau înființare firmă.",
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
        { name: "Acasa", path: "/" },
        { name: "Contact", path: "/contact" }
      ])} />
      <ContactPage defaultService={defaultService} />
    </>
  );
}
