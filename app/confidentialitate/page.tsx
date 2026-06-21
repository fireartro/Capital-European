import { LegalPage } from "@/components/legal-page";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";
import { breadcrumbSchema, JsonLd } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Politica de confidențialitate",
  description: `Informații despre modul în care ${siteConfig.name} prelucrează datele cu caracter personal.`,
  path: "/confidentialitate"
});

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Acasa", path: "/" },
        { name: "Politica de confidentialitate", path: "/confidentialitate" }
      ])} />
      <LegalPage eyebrow="GDPR" title="Politica de confidențialitate" updated="19 iunie 2026" sections={[
        { title: "1. Datele colectate", content: ["Prin formularul de contact putem colecta numele, adresa de email, numărul de telefon, serviciul solicitat și conținutul mesajului. Nu solicităm date sensibile prin formular."] },
        { title: "2. Scopul și temeiul prelucrării", content: ["Datele sunt folosite exclusiv pentru a răspunde solicitărilor, a pregăti oferte și a comunica în legătură cu serviciile cerute, pe baza demersurilor precontractuale și a consimțământului exprimat."] },
        { title: "3. Păstrarea și securitatea datelor", content: ["Datele sunt păstrate doar atât cât este necesar pentru soluționarea solicitării și obligațiile legale aplicabile. Aplicăm măsuri tehnice și organizatorice pentru limitarea accesului și protejarea informațiilor."] },
        { title: "4. Drepturile tale", content: ["Poți solicita accesul, rectificarea, ștergerea, restricționarea sau portabilitatea datelor și îți poți retrage consimțământul printr-un mesaj la adresa de contact publicată pe site."] }
      ]} />
    </>
  );
}
