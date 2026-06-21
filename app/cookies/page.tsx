import { LegalPage } from "@/components/legal-page";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";
import { breadcrumbSchema, JsonLd } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Politica de cookies",
  description: `Informații despre utilizarea cookie-urilor pe website-ul ${siteConfig.name}.`,
  path: "/cookies"
});

export default function CookiesPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Acasa", path: "/" },
        { name: "Politica de cookies", path: "/cookies" }
      ])} />
      <LegalPage eyebrow="Preferințe website" title="Politica de cookies" updated="19 iunie 2026" sections={[
        { title: "1. Cookie-uri utilizate", content: ["Versiunea actuală a website-ului nu instalează cookie-uri de marketing sau analiză și nu folosește servicii terțe de urmărire. Pot exista cookie-uri strict necesare furnizate de platforma de găzduire pentru securitate și funcționare."] },
        { title: "2. Servicii terțe", content: ["Linkurile către telefon, email și WhatsApp deschid aplicații sau servicii externe. Aceste servicii aplică propriile politici de confidențialitate și cookies."] },
        { title: "3. Modificări viitoare", content: ["Dacă vor fi adăugate instrumente de analiză sau marketing, politica va fi actualizată și, când este necesar, va fi afișat un mecanism de consimțământ înainte de activarea cookie-urilor opționale."] }
      ]} />
    </>
  );
}
