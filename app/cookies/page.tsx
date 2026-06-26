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
        { name: "Acasă", path: "/" },
        { name: "Politica de cookies", path: "/cookies" }
      ])} />
      <LegalPage
        eyebrow="Preferințe website"
        title="Politica de cookies"
        updated="26 iunie 2026"
        sections={[
          {
            title: "1. Ce sunt cookie-urile?",
            content: [
              "Cookie-urile sunt fișiere text de mici dimensiuni pe care un website le plasează în browserul tău atunci când îl vizitezi. Ele permit site-ului să îți recunoască vizita, să rețină preferințele tale și să funcționeze corect la accesările ulterioare.",
              "Cookie-urile nu pot accesa alte date de pe dispozitivul tău, nu pot rula programe și nu conțin viruși. Sunt o tehnologie standard utilizată de aproape toate site-urile web."
            ]
          },
          {
            title: "2. Ce cookie-uri folosim",
            content: [
              "Cookie-uri strict necesare: Aceste cookie-uri sunt indispensabile pentru funcționarea corectă a website-ului. Fără ele, anumite funcționalități de bază (cum ar fi securitatea conexiunii sau funcționalitățile formularului de contact) nu ar putea opera. Nu necesită consimțământul tău și nu pot fi dezactivate.",
              "Cookie-uri funcționale: Rețin preferințele tale de navigare (de exemplu, pagina ultimei vizite sau opțiunile selectate) pentru a îmbunătăți experiența la vizitele ulterioare. Nu colectează date în scop de marketing.",
              "Cookie-uri de platformă și găzduire: Platforma de găzduire și infrastructura tehnică pot plasa cookie-uri tehnice pentru securitate, echilibrarea traficului și prevenirea abuzurilor. Aceste cookie-uri sunt gestionate de furnizorul tehnic și respectă politicile sale de confidențialitate."
            ]
          },
          {
            title: "3. Cookie-uri de terți",
            content: [
              "Website-ul nostru nu utilizează în prezent instrumente de analiză (Google Analytics, Hotjar etc.) sau publicitate (Facebook Pixel, Google Ads etc.). Prin urmare, nu sunt plasate cookie-uri de marketing sau profilare.",
              "Linkurile către telefon, adresa de email și WhatsApp deschid aplicații sau servicii externe (aplicația de telefon, clientul de email, WhatsApp). Aceste servicii terțe aplică propriile politici de confidențialitate și cookie-uri, independent de website-ul nostru.",
              "Dacă navigezi către site-uri externe prin linkurile de pe pagina noastră (resurse oficiale, platforme instituționale), acele site-uri pot plasa propriile cookie-uri conform politicilor lor."
            ]
          },
          {
            title: "4. Durata de stocare",
            content: [
              "Cookie-urile de sesiune (session cookies): Sunt temporare și se șterg automat când închizi browserul. Sunt folosite pentru funcționalitățile care necesită continuitate în cadrul unei singure vizite.",
              "Cookie-urile persistente: Rămân pe dispozitivul tău pe o perioadă determinată (de la câteva zile până la un an) sau până când le ștergi manual. Sunt folosite pentru a reține preferințele la vizitele ulterioare."
            ]
          },
          {
            title: "5. Cum poți controla cookie-urile",
            content: [
              "Poți gestiona și controla cookie-urile direct din setările browserului tău. Poți alege să blochezi toate cookie-urile, să ștergi cookie-urile existente sau să primești o notificare înainte ca un cookie să fie plasat.",
              "Instrucțiuni pentru principalele browsere: Google Chrome → Setări → Confidențialitate și securitate → Cookie-uri și alte date ale site-ului. Mozilla Firefox → Opțiuni → Confidențialitate și securitate → Cookie-uri și date ale site-ului. Microsoft Edge → Setări → Cookie-uri și permisiuni pentru site. Safari → Preferințe → Confidențialitate → Gestionare date website.",
              "Atenție: Blocarea cookie-urilor strict necesare poate afecta funcționarea corectă a website-ului sau a formularului de contact."
            ]
          },
          {
            title: "6. Modificări viitoare ale politicii",
            content: [
              "Dacă în viitor vom adăuga instrumente de analiză, marketing sau orice alte servicii care implică plasarea de cookie-uri opționale, vom actualiza această politică și vom implementa un mecanism de consimțământ (banner cookies) înainte de activarea acestora.",
              "Data ultimei actualizări a acestei politici este indicată în antetul documentului. Îți recomandăm să verifici periodic această pagină pentru a fi la curent cu eventualele modificări.",
              "Dacă ai întrebări despre utilizarea cookie-urilor pe website-ul nostru, ne poți contacta la adresa " + "contact@capitaleuropean.ro" + "."
            ]
          }
        ]}
      />
    </>
  );
}
