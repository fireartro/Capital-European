import { HomePage } from "@/components/home-page";
import { createPageMetadata } from "@/lib/metadata";
import { JsonLd, professionalServiceSchema, webSiteSchema } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  path: "/",
  title: "Consultanță fonduri europene și servicii administrative în România",
  description: "Capital European oferă consultanță pentru fonduri europene, documentație, depunere, implementare și servicii administrative pentru firme și ONG-uri."
});

export default function Page() {
  return (
    <>
      <JsonLd data={[
        webSiteSchema(),
        professionalServiceSchema({
          path: "/",
          serviceName: ["Consultanță fonduri europene", "Servicii administrative"],
          description: "Capital European oferă consultanță pentru fonduri europene și servicii administrative pentru antreprenori, ONG-uri și companii din România."
        })
      ]} />
      <HomePage />
    </>
  );
}
