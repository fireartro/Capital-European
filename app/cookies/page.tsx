import { CookieSettingsButton } from "@/components/cookie-settings-button";
import { LegalPage } from "@/components/legal-page";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";
import { breadcrumbSchema, JsonLd } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Politica de cookies și setări de consimțământ",
  description: `Categorii, scopuri, durate și opțiuni de control pentru cookie-urile utilizate pe website-ul ${siteConfig.name}.`,
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
        eyebrow="Legea nr. 506/2004 · Directiva ePrivacy"
        title="Politica de cookies"
        updated="27 iunie 2026"
        intro="Această politică explică exact ce informații pot fi stocate pe dispozitivul tău, când cerem consimțământul și cum poți refuza sau retrage o alegere fără a pierde accesul la conținutul site-ului."
        actions={<CookieSettingsButton />}
        sections={[
          {
            title: "1. Ce sunt cookie-urile și tehnologiile similare",
            content: [
              "Cookie-urile sunt fișiere mici salvate de browser la solicitarea unui website. Tehnologiile similare includ localStorage, identificatori de consimțământ și memoria cache controlată de un service worker.",
              "Aceste tehnologii pot avea scopuri strict tehnice sau, numai cu acordul tău, scopuri de analiză. Website-ul nu condiționează accesul la informațiile publice de acceptarea cookie-urilor opționale."
            ]
          },
          {
            title: "2. Temeiul legal",
            content: [
              "Pentru stocarea sau accesarea informațiilor care nu sunt strict necesare solicităm consimțământ prealabil, în conformitate cu art. 4 alin. (5) din Legea nr. 506/2004 și cu art. 5 alin. (3) din Directiva 2002/58/CE.",
              "Operațiunile strict necesare furnizării serviciului solicitat de utilizator se bazează pe excepția prevăzută de art. 4 alin. (6) din Legea nr. 506/2004. Când datele asociate pot identifica o persoană, se aplică și Regulamentul (UE) 2016/679."
            ],
            links: [
              { label: "Legea nr. 506/2004 — Portal Legislativ", href: "https://legislatie.just.ro/Public/DetaliiDocument/172094" },
              { label: "Directiva 2002/58/CE — EUR-Lex", href: "https://eur-lex.europa.eu/legal-content/RO/TXT/?uri=CELEX:32002L0058" }
            ]
          },
          {
            title: "3. Stocare strict necesară",
            content: [
              "Utilizăm identificatorul propriu «ce_cookie_consent_v2» în localStorage și, ca mecanism de rezervă, într-un cookie first-party. Acesta reține versiunea politicii, alegerea pentru analiză și data actualizării.",
              "Durata maximă este de 180 de zile. Scopul exclusiv este să respectăm alegerea ta și să nu afișăm bannerul la fiecare pagină. Nu este folosit pentru profilare, publicitate sau urmărire între website-uri.",
              "Service worker-ul poate păstra local resurse statice ale site-ului pentru încărcare mai rapidă și funcționare robustă. Cache-ul tehnic nu este utilizat pentru analizarea comportamentului."
            ]
          },
          {
            title: "4. Cookie-uri de analiză — opționale",
            content: [
              "Dacă variabila Google Analytics este configurată și alegi «Acceptă toate» sau activezi categoria «Analiză audiență», website-ul poate încărca Google Analytics 4.",
              "În acest caz pot fi utilizate cookie-uri precum «_ga» și «_ga_<container>» pentru diferențierea vizitelor și generarea de statistici agregate. Durata lor este stabilită de furnizor și poate ajunge până la 2 ani, în funcție de configurația activă.",
              "Am dezactivat semnalele Google pentru publicitate în configurarea site-ului. Nu activăm Analytics înaintea consimțământului și nu folosim această categorie pentru reclame personalizate."
            ]
          },
          {
            title: "5. Ce nu folosim în prezent",
            content: [
              "Nu am implementat Facebook Pixel, Google Ads remarketing, Hotjar sau alte instrumente de profilare comportamentală.",
              "Dacă vom introduce o categorie sau un furnizor nou, vom actualiza această politică și vom solicita din nou consimțământul atunci când schimbarea afectează scopurile existente."
            ]
          },
          {
            title: "6. Cum alegi, refuzi sau retragi consimțământul",
            content: [
              "La prima vizită poți accepta toate cookie-urile, respinge direct toate opțiunile neesențiale sau deschide setările detaliate. Butoanele de acceptare și respingere sunt disponibile în același nivel al interfeței.",
              "Poți reveni oricând asupra alegerii folosind butonul «Setări cookies» din footer sau butonul de mai sus. Retragerea este aplicată imediat pentru încărcările viitoare și încercăm să eliminăm cookie-urile first-party de analiză deja create.",
              "Retragerea consimțământului nu afectează legalitatea prelucrărilor efectuate anterior retragerii."
            ]
          },
          {
            title: "7. Furnizori terți și transferuri",
            content: [
              "Dacă Analytics este activat, Google poate prelucra date tehnice ca furnizor distinct sau persoană împuternicită, în funcție de serviciu și configurație. Consultă documentația Google înainte de a acorda consimțământul.",
              "Accesarea linkurilor externe, inclusiv WhatsApp, platforme publice sau resurse instituționale, te transferă pe website-uri care aplică propriile politici și pot utiliza propriile cookie-uri. Acestea nu sunt controlate de noi."
            ],
            links: [
              { label: "Politica Google privind datele", href: "https://policies.google.com/privacy" }
            ]
          },
          {
            title: "8. Setările browserului",
            content: [
              "Poți șterge sau bloca cookie-urile din setările browserului. Blocarea completă poate elimina inclusiv memorarea opțiunii tale, caz în care bannerul poate reapărea.",
              "Pentru control suplimentar, folosește funcțiile «Confidențialitate și securitate» din Chrome, Firefox, Edge sau Safari. Setările browserului operează separat de centrul de preferințe al acestui website."
            ]
          },
          {
            title: "9. Contact și actualizări",
            content: [
              `Pentru întrebări privind cookie-urile sau consimțământul ne poți scrie la ${siteConfig.email}.`,
              "Politica poate fi actualizată când se schimbă tehnologiile, furnizorii sau cadrul legal. Data versiunii curente este afișată în partea de sus a paginii."
            ]
          }
        ]}
      />
    </>
  );
}
