import { LegalPage } from "@/components/legal-page";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";
import { breadcrumbSchema, JsonLd } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Politica de confidențialitate",
  description: `Informații despre modul în care ${siteConfig.name} prelucrează datele cu caracter personal, în conformitate cu GDPR.`,
  path: "/confidentialitate"
});

export default function PrivacyPage() {
  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Acasă", path: "/" },
        { name: "Politică de confidențialitate", path: "/confidentialitate" }
      ])} />
      <LegalPage
        eyebrow="GDPR · Regulamentul (UE) 2016/679"
        title="Politica de confidențialitate"
        updated="26 iunie 2026"
        sections={[
          {
            title: "1. Identitatea operatorului de date",
            content: [
              "Operator: Capital European, cu sediul în Cluj-Napoca, România.",
              "Contact: contact@capitaleuropean.ro",
              "Această politică descrie modul în care Capital European colectează, utilizează, stochează și protejează datele tale cu caracter personal, în conformitate cu Regulamentul General privind Protecția Datelor (GDPR – Regulamentul UE 2016/679) și cu legislația română aplicabilă."
            ]
          },
          {
            title: "2. Datele cu caracter personal colectate",
            content: [
              "Prin formularul de contact de pe website, colectăm: numele și prenumele, adresa de email, numărul de telefon (opțional), serviciul pentru care soliciți informații și conținutul mesajului tău.",
              "Nu solicităm și nu dorim să primim date sensibile prin formularul de contact (date privind starea de sănătate, convingerile politice sau religioase, originea etnică, date biometrice etc.). Te rugăm să nu incluzi astfel de informații în mesajele transmise.",
              "Nu colectăm date despre minori (persoane sub 16 ani). Dacă ești minor, nu utiliza formularul fără acordul părinților sau tutorilor legali."
            ]
          },
          {
            title: "3. Scopul și temeiul juridic al prelucrării",
            content: [
              "Datele colectate sunt prelucrate exclusiv în scopuri determinate și legitime: (a) răspunderea la solicitările și întrebările transmise; (b) pregătirea și transmiterea de oferte la cererea ta; (c) comunicări privind serviciile solicitate sau colaborarea în curs.",
              "Temeiul juridic principal al prelucrării este art. 6 alin. (1) lit. (b) GDPR – demersuri precontractuale inițiate la solicitarea ta – și art. 6 alin. (1) lit. (a) GDPR – consimțământul exprimat prin completarea formularului.",
              "Nu prelucrăm datele tale în scopuri de marketing direct fără consimțământul tău explicit și nu le transferăm terților în scop publicitar."
            ]
          },
          {
            title: "4. Durata păstrării datelor",
            content: [
              "Datele colectate prin formularul de contact sunt păstrate pe durata necesară soluționării solicitării și, ulterior, pe perioada impusă de obligațiile legale aplicabile (contabile, fiscale, arhivistice).",
              "Dacă între noi nu se încheie un contract de prestări servicii, datele vor fi șterse sau anonimizate în termen de 12 luni de la ultima comunicare.",
              "În cazul unui raport contractual, datele relevante sunt păstrate conform legislației privind arhivarea documentelor financiar-contabile (de regulă 5–10 ani, conform legislației în vigoare)."
            ]
          },
          {
            title: "5. Destinatarii datelor",
            content: [
              "Datele tale nu sunt vândute, închiriate sau transmise comercial niciunui terț.",
              "Accesul la datele tale este restricționat la membrii echipei Capital European care au nevoie de ele pentru a gestiona solicitarea ta.",
              "Datele pot fi accesate de furnizori tehnici (platformă de hosting, serviciu de email) în calitate de operatori asociați sau persoane împuternicite, exclusiv în scopuri tehnice și cu obligații contractuale stricte de confidențialitate și securitate.",
              "În cazul în care legislația o impune, datele pot fi dezvăluite autorităților competente (autorități fiscale, instanțe judecătorești, organe de anchetă), strict în limita obligației legale."
            ]
          },
          {
            title: "6. Securitatea datelor",
            content: [
              "Aplicăm măsuri tehnice și organizatorice adecvate pentru protejarea datelor tale împotriva accesului neautorizat, pierderii, distrugerii sau divulgării accidentale.",
              "Website-ul utilizează conexiune securizată HTTPS (criptare TLS). Accesul la datele din comunicările primite este restricționat prin parole și permisiuni de acces.",
              "Deși depunem toate eforturile rezonabile pentru securizarea datelor, nicio transmitere de date prin internet nu poate fi garantată ca 100% sigură. Utilizezi website-ul și formularul de contact pe propria răspundere."
            ]
          },
          {
            title: "7. Drepturile tale conform GDPR",
            content: [
              "Conform Regulamentului GDPR, ai următoarele drepturi cu privire la datele tale cu caracter personal:",
              "Dreptul de acces (art. 15): poți solicita o copie a datelor pe care le deținem despre tine.",
              "Dreptul la rectificare (art. 16): poți solicita corectarea datelor inexacte sau incomplete.",
              "Dreptul la ștergere (art. 17): poți solicita ștergerea datelor, în limitele prevăzute de lege.",
              "Dreptul la restricționarea prelucrării (art. 18): poți solicita limitarea modului în care utilizăm datele tale.",
              "Dreptul la portabilitate (art. 20): poți solicita datele tale într-un format structurat, utilizat în mod curent.",
              "Dreptul de opoziție (art. 21): poți obiecta față de prelucrarea datelor în anumite situații.",
              "Dreptul de a retrage consimțământul: retragerea consimțământului nu afectează legalitatea prelucrării anterioare.",
              "Pentru exercitarea oricăruia dintre aceste drepturi, transmite o solicitare scrisă la adresa contact@capitaleuropean.ro. Vom răspunde în termen de maximum 30 de zile."
            ]
          },
          {
            title: "8. Dreptul de a depune plângere",
            content: [
              "Dacă consideri că drepturile tale privind protecția datelor au fost încălcate, ai dreptul să depui o plângere la autoritatea de supraveghere competentă din România:",
              "Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP), B-dul G-ral. Gheorghe Magheru nr. 28–30, Sector 1, București. Website: www.dataprotection.ro. Email: anspdcp@dataprotection.ro."
            ]
          },
          {
            title: "9. Modificări ale acestei politici",
            content: [
              "Ne rezervăm dreptul de a modifica această politică de confidențialitate ori de câte ori este necesar, pentru a reflecta schimbările în practicile noastre de prelucrare sau cerințele legale.",
              "Data ultimei modificări este indicată în antetul documentului. Versiunile anterioare pot fi solicitate la adresa de contact.",
              "Continuarea utilizării website-ului după publicarea modificărilor constituie acceptul tău față de noua versiune a politicii."
            ]
          }
        ]}
      />
    </>
  );
}
