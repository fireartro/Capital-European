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
        { name: "Acasă", path: "/" },
        { name: "Termeni și condiții", path: "/termeni" }
      ])} />
      <LegalPage
        eyebrow="Informații legale"
        title="Termeni și condiții de utilizare"
        updated="26 iunie 2026"
        sections={[
          {
            title: "1. Informații despre operator",
            content: [
              "Website-ul capitaleuropean.ro este operat de Capital European, cu sediul în Cluj-Napoca, România. Prin utilizarea acestui website, accepți în mod tacit termenii și condițiile prezentate mai jos.",
              "Dacă nu ești de acord cu acești termeni, te rugăm să nu utilizezi website-ul nostru. Ne rezervăm dreptul de a modifica aceste condiții în orice moment, iar continuarea utilizării site-ului după publicarea modificărilor constituie acceptul tău implicat."
            ]
          },
          {
            title: "2. Scopul website-ului și al serviciilor",
            content: [
              "Website-ul are scopul de a prezenta serviciile Capital European în domeniul consultanței pentru fonduri europene și al serviciilor administrative, și de a facilita contactul cu potențialii clienți.",
              "Informațiile prezentate pe site au caracter general și orientativ. Nu reprezintă o ofertă contractuală fermă, o garanție de eligibilitate sau o asigurare a obținerii finanțării. Fiecare caz este analizat individual, în funcție de documentele și situația specifică a solicitantului.",
              "Serviciile efective, termenii, prețul, termenele și responsabilitățile sunt stabilite exclusiv prin ofertă scrisă și contract individual, semnat de ambele părți."
            ]
          },
          {
            title: "3. Condiții de utilizare a website-ului",
            content: [
              "Utilizatorul se angajează să folosească website-ul în scopuri legale și conform legislației în vigoare. Este interzisă transmiterea de conținut ilegal, ofensator, fals sau care încalcă drepturile altor persoane prin formularul de contact sau prin orice altă modalitate oferită de site.",
              "Este interzisă orice tentativă de a accesa, modifica, perturba sau deteriora funcționarea website-ului sau a infrastructurii tehnice aferente.",
              "Utilizatorul este singurul responsabil pentru informațiile transmise prin formular sau în comunicarea cu echipa Capital European. Ne rezervăm dreptul de a nu da curs solicitărilor incomplete, neclare sau care nu sunt în acord cu serviciile oferite."
            ]
          },
          {
            title: "4. Proprietate intelectuală",
            content: [
              "Toate elementele website-ului – texte, grafică, logo, structură, cod sursă, denumiri și conținut editorial – sunt proprietatea Capital European sau a licențiatorilor săi și sunt protejate de legislația privind drepturile de autor.",
              "Este interzisă copierea, reproducerea, distribuirea, modificarea sau utilizarea comercială a oricărui element de pe acest site fără acordul scris prealabil al Capital European.",
              "Linkurile către resurse externe (platforme instituționale, documente oficiale) sunt furnizate ca referință și nu implică un parteneriat sau o afiliere cu entitățile respective."
            ]
          },
          {
            title: "5. Limitarea răspunderii",
            content: [
              "Capital European depune toate eforturile rezonabile pentru ca informațiile de pe website să fie corecte și actualizate, însă nu garantează acuratețea, completitudinea sau actualitatea acestora la orice moment în timp.",
              "Depunerea unei cereri de finanțare nu garantează aprobarea acesteia. Decizia de aprobare aparține exclusiv autorităților de management competente, iar eligibilitatea depinde de condițiile specifice ale programului, de documentele prezentate și de situația individuală a solicitantului.",
              "Capital European nu este responsabilă pentru pierderi directe sau indirecte rezultate din utilizarea informațiilor prezentate pe site sau din indisponibilitatea temporară a website-ului.",
              "Linkurile externe sunt furnizate doar în scop informativ. Nu ne asumăm responsabilitatea pentru conținutul, disponibilitatea sau practicile de confidențialitate ale site-urilor terțe."
            ]
          },
          {
            title: "6. Comunicări și solicitări",
            content: [
              "Transmiterea unui mesaj prin formularul de contact sau la adresa de email nu creează un raport contractual și nu implică nicio obligație de prestare a serviciilor din partea Capital European.",
              "Ne angajăm să răspundem solicitărilor în cel mai scurt timp rezonabil, în funcție de complexitatea acestora și de programul de lucru (Luni–Vineri, 08:00–18:00).",
              "Orice comunicare comercială (oferte, propuneri de colaborare) transmisă de terți fără solicitarea noastră prealabilă nu va genera obligații din partea Capital European."
            ]
          },
          {
            title: "7. Legea aplicabilă și litigii",
            content: [
              "Prezentele condiții de utilizare sunt guvernate de legislația română în vigoare.",
              "Orice litigiu legat de utilizarea website-ului sau de serviciile Capital European va fi soluționat pe cale amiabilă. Dacă acest lucru nu este posibil, competența aparține instanțelor judecătorești de la sediul operatorului, în conformitate cu legislația în vigoare.",
              "Utilizatorul are, de asemenea, dreptul de a accesa platforma europeană de soluționare online a litigiilor: https://ec.europa.eu/consumers/odr."
            ]
          }
        ]}
      />
    </>
  );
}
