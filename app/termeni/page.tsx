import { LegalPage } from "@/components/legal-page";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";
import { breadcrumbSchema, JsonLd } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Termeni și condiții",
  description: `Termenii de utilizare ai website-ului ${siteConfig.name}, cu informații despre servicii, responsabilități, limitări și condițiile de colaborare.`,
  path: "/termeni"
});

export default function TermsPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Acasa", path: "/" },
        { name: "Termeni si conditii", path: "/termeni" }
      ])} />
      <LegalPage eyebrow="Informații legale" title="Termeni și condiții" updated="19 iunie 2026" sections={[
        { title: "1. Utilizarea website-ului", content: [`Website-ul prezintă serviciile ${siteConfig.name} și permite transmiterea solicitărilor de contact. Informațiile au caracter general și nu reprezintă o ofertă contractuală sau o garanție de obținere a finanțării.`] },
        { title: "2. Servicii și oferte", content: ["Conținutul, termenii, prețul și responsabilitățile fiecărei colaborări vor fi stabilite printr-o ofertă și un contract separat, după analiza solicitării clientului."] },
        { title: "3. Proprietate intelectuală", content: ["Textele, elementele grafice și structura website-ului nu pot fi copiate sau reutilizate comercial fără acordul titularului drepturilor."] },
        { title: "4. Limitarea răspunderii", content: ["Depunerea unei cereri de finanțare nu garantează aprobarea acesteia. Decizia aparține autorităților competente, iar eligibilitatea depinde de condițiile programului și de situația solicitantului."] }
      ]} />
    </>
  );
}
