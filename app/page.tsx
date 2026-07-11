import { HomePage } from "@/components/home-page";
import { createPageMetadata } from "@/lib/metadata";
import { JsonLd, professionalServiceSchema } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  path: "/",
  title: "Fonduri europene și servicii administrative",
  description: "Consultanță pentru fonduri europene și servicii administrative pentru firme și ONG-uri: eligibilitate, documentație, secretariat și înființare PFA sau SRL."
});

export default function Page() {
  return (
    <>
      <JsonLd data={[
        professionalServiceSchema({
          path: "/",
          serviceName: ["Consultanță fonduri europene", "Servicii administrative", "Înființare PFA", "Înființare SRL"],
          description: "Capital European oferă consultanță pentru fonduri europene, servicii administrative și sprijin pentru înființarea unui PFA sau SRL."
        })
      ]} />
      <HomePage />
    </>
  );
}
