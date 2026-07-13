import { LegalPage } from "@/components/legal-page";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";
import { breadcrumbSchema, JsonLd } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Confidențialitate și protecția datelor",
  description: `Află ce date poate prelucra ${siteConfig.name}, în ce scop, cât timp sunt păstrate și cum îți poți exercita drepturile.`,
  path: "/confidentialitate",
  index: false
});

export default function PrivacyPage() {
  const legal = siteConfig.legal;

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Acasă", path: "/" },
        { name: "Politica de confidențialitate", path: "/confidentialitate" }
      ])} />
      <LegalPage
        eyebrow="GDPR · Regulamentul (UE) 2016/679"
        title="Politica de confidențialitate"
        updated="13 iulie 2026"
        intro="Această politică explică ce date putem prelucra prin website, formular și comunicările ulterioare, de ce sunt necesare și ce drepturi ai. Se aplică vizitatorilor și persoanelor care contactează sau reprezintă un potențial client."
        notice={!legal.isComplete ? (
          <>
            <strong>NECESITĂ CONFIRMARE din partea proprietarului</strong>
            Lipsesc denumirea juridică, numărul de înregistrare și codul fiscal ale operatorului. Aceste date trebuie publicate după confirmare.
          </>
        ) : undefined}
        sections={[
          {
            title: "1. Identitatea și datele de contact ale operatorului",
            content: [
              legal.isComplete
                ? `Operatorul este ${legal.entityName}, înregistrat sub nr. ${legal.registrationNumber}, CUI ${legal.taxId}, cu sediul în ${legal.registeredOffice}.`
                : `Website-ul este prezentat sub denumirea comercială ${siteConfig.name}. Identitatea juridică completă a operatorului necesită confirmarea proprietarului.`,
              `Pentru solicitări privind protecția datelor ne poți contacta la ${siteConfig.email}. Dacă va fi desemnat un responsabil cu protecția datelor, datele acestuia vor fi publicate aici.`
            ]
          },
          {
            title: "2. Datele pe care le putem colecta",
            content: [
              "Prin formularul de contact colectăm numele, adresa de email, serviciul selectat, mesajul, acordul privind politica și, numai dacă alegi să îl completezi, numărul de telefon. Câmpul anti-spam ascuns este folosit exclusiv pentru detectarea solicitărilor automate.",
              "În comunicările ulterioare putem prelucra date de identificare și contact, funcția și organizația reprezentată, documente furnizate voluntar, istoricul comunicărilor și informațiile necesare pentru evaluarea sau executarea serviciului.",
              "Serverul și furnizorii tehnici pot prelucra temporar adresa IP, data și ora accesului, ruta solicitată, tipul browserului și evenimente de securitate. Preferința pentru cookie-uri este stocată local conform Politicii de cookies."
            ]
          },
          {
            title: "3. Date pe care nu trebuie să ni le trimiți",
            content: [
              "Nu transmite prin formular categorii speciale de date, copii ale actelor de identitate, parole, date bancare complete, date medicale sau informații despre condamnări. Dacă asemenea date sunt necesare într-o colaborare, vom stabili un canal și instrucțiuni adecvate.",
              "Dacă primim date excesive sau nerelevante, le putem șterge, anonimiza ori solicita retransmiterea documentelor printr-un canal corespunzător."
            ]
          },
          {
            title: "4. Scopurile și temeiurile juridice",
            content: [
              "Răspunsul la solicitări, evaluarea nevoii și pregătirea unei oferte se bazează pe demersurile precontractuale solicitate de persoana vizată — art. 6 alin. (1) lit. (b) GDPR.",
              "Executarea contractului, administrarea relației, facturarea și gestionarea documentelor se bazează pe art. 6 alin. (1) lit. (b) și, unde este cazul, pe obligații legale conform art. 6 alin. (1) lit. (c) GDPR.",
              "Securizarea website-ului, prevenirea abuzului, apărarea drepturilor și păstrarea evidențelor minimale se pot baza pe interesul legitim — art. 6 alin. (1) lit. (f) GDPR — după evaluarea necesității și a impactului.",
              "Google Analytics, Microsoft Clarity, Google Tag Manager și orice comunicare de marketing bazată pe abonare se activează numai în baza consimțământului — art. 6 alin. (1) lit. (a) GDPR."
            ]
          },
          {
            title: "5. Caracterul obligatoriu al datelor",
            content: [
              "Câmpurile marcate obligatoriu sunt necesare pentru identificarea solicitării și pentru a putea răspunde. Numărul de telefon este opțional.",
              "Transmiterea formularului nu obligă părțile să încheie un contract și nu garantează eligibilitatea, finanțarea sau acceptarea unei solicitări."
            ]
          },
          {
            title: "6. Sursa datelor",
            content: [
              "În principal, obținem datele direct de la tine. Dacă reprezinți o companie sau un ONG, putem primi date profesionale de la organizația pe care o reprezinți ori din registre și surse publice relevante pentru verificarea solicitării.",
              "Dacă ne furnizezi datele altor persoane, trebuie să ai dreptul de a face acest lucru și să le informezi despre această politică."
            ]
          },
          {
            title: "7. Destinatari și persoane împuternicite",
            content: [
              "Accesul este limitat la persoanele care au nevoie de date pentru evaluarea sau executarea serviciului. Putem utiliza furnizori de găzduire, email, securitate, automatizare, CRM, contabilitate sau suport tehnic, obligați contractual să protejeze datele.",
              "Datele pot fi transmise consultanților ori partenerilor implicați numai când este necesar, există un temei legal și au fost stabilite rolurile și obligațiile de confidențialitate.",
              "Putem comunica date autorităților, instanțelor sau organelor de control atunci când există o obligație legală ori este necesar pentru constatarea, exercitarea sau apărarea unui drept."
            ]
          },
          {
            title: "8. Transferuri în afara Spațiului Economic European",
            content: [
              "Unii furnizori tehnici pot prelucra date în afara Spațiului Economic European. În aceste situații verificăm existența unei decizii de adecvare, a clauzelor contractuale standard sau a unui alt mecanism permis de capitolul V GDPR.",
              "Google Analytics, Google Tag Manager și Microsoft Clarity nu sunt încărcate fără consimțământul corespunzător. Dacă sunt activate, consultă politicile furnizorilor pentru informații despre infrastructură și mecanismele de transfer."
            ]
          },
          {
            title: "9. Perioade de păstrare",
            content: [
              "Solicitările care nu conduc la un contract sunt păstrate, de regulă, maximum 12 luni de la ultima comunicare, dacă nu există un motiv legitim pentru o perioadă mai scurtă sau mai lungă.",
              "Datele contractuale, facturile și evidențele financiar-contabile sunt păstrate pe perioadele impuse de legislația aplicabilă. Documentele de proiect sunt păstrate conform contractului și cerințelor programului de finanțare.",
              "Preferința pentru cookie-uri este păstrată maximum 180 de zile. Datele tehnice de securitate sunt păstrate pe durate limitate stabilite în funcție de risc și de configurația furnizorului.",
              "La expirarea termenului, datele sunt șterse, anonimizate sau arhivate separat dacă păstrarea este impusă de lege."
            ]
          },
          {
            title: "10. Drepturile persoanei vizate",
            content: [
              "În condițiile GDPR poți solicita accesul, rectificarea, ștergerea, restricționarea prelucrării, portabilitatea și opoziția față de prelucrările bazate pe interes legitim.",
              "Poți retrage oricând consimțământul, la fel de ușor cum l-ai acordat. Retragerea nu afectează legalitatea prelucrării anterioare.",
              `Trimite solicitarea la ${siteConfig.email}. Putem cere informații rezonabile pentru confirmarea identității. Răspundem fără întârzieri nejustificate și, în principiu, în maximum o lună, termen care poate fi prelungit în condițiile art. 12 GDPR.`
            ],
            items: [
              "dreptul de a primi informații clare și o copie a datelor;",
              "dreptul de a corecta date inexacte sau incomplete;",
              "dreptul la ștergere, când condițiile legale sunt îndeplinite;",
              "dreptul la restricționare și opoziție;",
              "dreptul la portabilitate pentru prelucrările eligibile;",
              "dreptul de a nu face obiectul unei decizii exclusiv automatizate cu efecte juridice semnificative."
            ]
          },
          {
            title: "11. Plângeri și căi de atac",
            content: [
              "Dacă apreciezi că prelucrarea încalcă GDPR, ne poți contacta pentru soluționare și ai dreptul să depui plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal.",
              "Exercitarea dreptului de a depune plângere nu afectează dreptul la o cale de atac judiciară."
            ],
            links: [
              { label: "ANSPDCP — informații și plângeri", href: "https://www.dataprotection.ro/" },
              { label: "Regulamentul (UE) 2016/679 — EUR-Lex", href: "https://eur-lex.europa.eu/eli/reg/2016/679/oj" }
            ]
          },
          {
            title: "12. Securitate, minori și decizii automate",
            content: [
              "Aplicăm măsuri tehnice și organizatorice proporționale cu riscul, inclusiv conexiuni HTTPS, validarea solicitărilor, limitarea accesului, protecție anti-spam și controale de securitate la nivelul aplicației.",
              "Website-ul se adresează profesioniștilor și organizațiilor, nu minorilor. Nu urmărim colectarea intenționată de date de la persoane sub 16 ani.",
              "Nu luăm decizii exclusiv automatizate care produc efecte juridice sau afectează semnificativ o persoană. Evaluările privind eligibilitatea și serviciile necesită analiză umană."
            ]
          },
          {
            title: "13. Modificarea politicii",
            content: [
              "Putem actualiza politica pentru a reflecta modificări legislative, tehnice sau operaționale. Versiunea nouă se publică pe această pagină cu data actualizării.",
              "Dacă o schimbare afectează substanțial o prelucrare bazată pe consimțământ, vom solicita o alegere nouă înainte de activarea scopului respectiv."
            ]
          }
        ]}
      />
    </>
  );
}
