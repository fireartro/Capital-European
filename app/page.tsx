import { HomePage } from "@/components/home-page";
import { createPageMetadata } from "@/lib/metadata";
import { JsonLd, professionalServiceSchema } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  path: "/",
  title: "Consultanță fonduri europene și servicii administrative",
  description: "Consultanță pentru fonduri europene și servicii administrative externalizate pentru firme și ONG-uri: eligibilitate, documentație, secretariat și back-office."
});

export default function Page() {
  return (
    <>
      <JsonLd data={[
        professionalServiceSchema({
          path: "/",
          serviceName: ["Consultanță fonduri europene", "Servicii administrative"],
          description: "Capital European oferă consultanță pentru fonduri europene și servicii administrative externalizate pentru firme și ONG-uri din România."
        })
      ]} />
      <HomePage />
    </>
  );
}
