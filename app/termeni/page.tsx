import { LegalPage } from "@/components/legal-page";
import { createPageMetadata } from "@/lib/metadata";
import { siteConfig } from "@/lib/site-config";
import { breadcrumbSchema, JsonLd } from "@/lib/structured-data";

export const metadata = createPageMetadata({
  title: "Termeni și condiții de utilizare și colaborare",
  description: `Condițiile de utilizare a website-ului ${siteConfig.name}, limitele informațiilor publicate și cadrul general al solicitărilor și serviciilor.`,
  path: "/termeni",
  index: false
});

export default function TermsPage() {
  const legal = siteConfig.legal;

  return (
    <>
      <JsonLd data={breadcrumbSchema([
        { name: "Acasă", path: "/" },
        { name: "Termeni și condiții", path: "/termeni" }
      ])} />
      <LegalPage
        eyebrow="Informații contractuale și reguli de utilizare"
        title="Termeni și condiții"
        updated="13 iulie 2026"
        intro="Acești termeni reglementează utilizarea website-ului și transmiterea solicitărilor. Prestarea efectivă a serviciilor este guvernată de oferta și contractul încheiat separat, care prevalează în cazul oricărei neconcordanțe."
        notice={!legal.isComplete ? (
          <>
            <strong>NECESITĂ CONFIRMARE din partea proprietarului</strong>
            Lipsesc denumirea juridică, numărul de înregistrare și codul fiscal. Aceste informații trebuie confirmate înaintea contractării comerciale.
          </>
        ) : undefined}
        sections={[
          {
            title: "1. Operatorul website-ului",
            content: [
              legal.isComplete
                ? `Website-ul este operat de ${legal.entityName}, nr. de înregistrare ${legal.registrationNumber}, CUI ${legal.taxId}, sediul ${legal.registeredOffice}.`
                : `Website-ul este prezentat sub denumirea comercială ${siteConfig.name}. Identitatea juridică completă a operatorului necesită confirmarea proprietarului înaintea contractării.`,
              `Contact general: ${siteConfig.email}.${siteConfig.schedule ? ` Program orientativ de comunicare: ${siteConfig.schedule}.` : ""}`
            ],
            links: [
              { label: "Legea nr. 365/2002 — Portal Legislativ", href: "https://legislatie.just.ro/Public/DetaliiDocument/77218" }
            ]
          },
          {
            title: "2. Definiții și domeniu de aplicare",
            content: [
              "«Website» înseamnă paginile și funcționalitățile accesibile prin domeniul configurat pentru Capital European. «Utilizator» înseamnă orice persoană care accesează website-ul sau transmite o solicitare. «Client» înseamnă persoana fizică ori juridică ce încheie un contract de servicii.",
              "Website-ul se adresează în principal profesioniștilor, firmelor, IMM-urilor și ONG-urilor. Dacă utilizatorul are calitatea legală de consumator, drepturile imperative conferite de legislația protecției consumatorilor nu sunt limitate prin acești termeni."
            ]
          },
          {
            title: "3. Acceptarea termenilor",
            content: [
              "Prin utilizarea website-ului confirmi că ai citit termenii aplicabili navigării. Transmiterea formularului confirmă că datele furnizate sunt corecte și că ai consultat Politica de confidențialitate.",
              "Simpla navigare nu echivalează cu acceptarea unei oferte comerciale și nu creează o obligație de a contracta. Consimțământul pentru cookie-uri opționale este separat și poate fi refuzat fără a pierde accesul la conținut."
            ]
          },
          {
            title: "4. Scopul și natura informațiilor publicate",
            content: [
              "Conținutul are scop general, informativ și de prezentare. Nu constituie consultanță juridică, fiscală, contabilă sau o opinie profesională adaptată unei situații concrete.",
              "Ghidurile, calendarele, valorile și condițiile programelor de finanțare se pot modifica prin acte, corrigenda sau instrucțiuni ale autorităților. Utilizatorul trebuie să consulte documentația oficială aplicabilă la data deciziei."
            ]
          },
          {
            title: "5. Solicitările și formarea contractului",
            content: [
              "Mesajul trimis prin formular, email sau telefon reprezintă o invitație la discuție, nu o comandă acceptată și nu un contract. Putem solicita documente suplimentare sau refuza motivat o solicitare care nu intră în domeniul serviciilor.",
              "Contractul se consideră încheiat numai după acceptarea expresă a unei oferte și semnarea documentelor contractuale de către persoanele autorizate. Oferta va stabili obiectul, livrabilele, tarifele, termenele, dependențele și condițiile de încetare.",
              "Orice termen menționat înaintea contractului este estimativ, dacă nu este confirmat în scris ca termen ferm."
            ]
          },
          {
            title: "6. Servicii privind fondurile europene",
            content: [
              "Analiza de eligibilitate este realizată pe baza informațiilor și documentelor disponibile la momentul evaluării. O concluzie preliminară nu garantează eligibilitatea finală sau aprobarea finanțării.",
              "Deciziile privind admisibilitatea, punctajul, contractarea, plata și eventualele corecții aparțin autorităților competente. Capital European nu poate garanta aprobarea, punctajul, data evaluării sau plata ajutorului.",
              "Modificarea ghidului, epuizarea bugetului, suspendarea apelului, indisponibilitatea platformei sau interpretarea autorității pot afecta proiectul fără culpa consultantului."
            ]
          },
          {
            title: "7. Servicii administrative și înființare firmă",
            content: [
              "Serviciile administrative pot include organizarea documentelor, secretariat, back-office, urmărirea fluxurilor și sprijin procedural, în limitele definite prin ofertă.",
              "Asistența pentru înființarea firmei nu înlocuiește consultanța unui avocat, notar, contabil sau consultant fiscal atunci când legea ori situația concretă impune o asemenea calificare.",
              "Depunerea sau prelucrarea documentelor în numele clientului se efectuează numai în baza unui mandat ori a unei autorizări valabile, dacă aceasta este necesară."
            ]
          },
          {
            title: "8. Obligațiile utilizatorului și ale clientului",
            content: [
              "Utilizatorul și clientul trebuie să furnizeze informații complete, exacte, actuale și obținute legal, să verifice documentele înainte de aprobare și să respecte termenele comunicate.",
              "Clientul răspunde pentru autenticitatea documentelor, realitatea declarațiilor, drepturile asupra conținutului transmis și deciziile sale comerciale.",
              "Întârzierile, omisiunile sau modificările imputabile clientului pot conduce la recalcularea termenelor, costuri suplimentare sau imposibilitatea continuării serviciului."
            ],
            items: [
              "să desemneze persoane de contact cu putere de decizie;",
              "să comunice imediat orice schimbare relevantă;",
              "să nu transmită date sau documente fără drept;",
              "să păstreze copii și evidențe proprii ale documentelor aprobate;",
              "să respecte obligațiile de cofinanțare, achiziții, raportare și arhivare aplicabile."
            ]
          },
          {
            title: "9. Utilizări interzise",
            content: [
              "Este interzisă utilizarea website-ului pentru activități ilegale, fraudă, transmiterea de cod malițios, testarea neautorizată a securității, suprasolicitarea infrastructurii, colectarea automată masivă de conținut sau încălcarea drepturilor altor persoane.",
              "Putem bloca solicitările automate, abuzive, amenințătoare ori care urmăresc obținerea neautorizată de informații și putem păstra dovezile necesare apărării drepturilor."
            ]
          },
          {
            title: "10. Tarife, facturare și taxe",
            content: [
              "Website-ul nu afișează o listă universală de tarife deoarece volumul și complexitatea diferă. Prețul, moneda, TVA-ul, calendarul de plată și eventualele costuri terțe vor fi indicate în oferta sau contractul aplicabil.",
              "Taxele, avizele, traducerile, semnăturile, serviciile notariale și alte costuri ale terților nu sunt incluse decât dacă documentele contractuale prevăd expres contrariul."
            ]
          },
          {
            title: "11. Proprietate intelectuală",
            content: [
              "Textele, identitatea vizuală, structura, grafica și elementele originale ale website-ului sunt protejate de legislația proprietății intelectuale și aparțin operatorului sau licențiatorilor săi.",
              "Este permisă consultarea și citarea limitată cu indicarea sursei. Reproducerea substanțială, publicarea, revânzarea, modificarea sau utilizarea comercială necesită acord scris.",
              "Drepturile asupra livrabilelor create pentru un client sunt stabilite exclusiv prin contractul de servicii."
            ]
          },
          {
            title: "12. Disponibilitate, securitate și legături externe",
            content: [
              "Depunem eforturi rezonabile pentru disponibilitate și securitate, dar nu garantăm funcționarea neîntreruptă, absența erorilor sau compatibilitatea cu orice dispozitiv.",
              "Putem suspenda temporar website-ul pentru mentenanță, actualizări, incidente, măsuri de securitate sau cauze externe.",
              "Linkurile către autorități și terți sunt oferite informativ. Nu controlăm conținutul, disponibilitatea ori practicile lor și nu rezultă o afiliere din simpla includere a unui link."
            ]
          },
          {
            title: "13. Limitarea răspunderii",
            content: [
              "În limita permisă de lege, operatorul nu răspunde pentru decizii luate exclusiv pe baza conținutului general al website-ului, pentru pierderi indirecte ori pentru consecințele informațiilor incomplete furnizate de utilizator.",
              "Nicio prevedere nu exclude sau limitează răspunderea care nu poate fi exclusă legal, inclusiv pentru fraudă, intenție, culpă gravă ori alte cazuri protejate imperativ.",
              "Răspunderea aferentă serviciilor contractate, eventualele plafoane și excluderi sunt stabilite prin contract, raportat la natura serviciului și riscurile asumate."
            ]
          },
          {
            title: "14. Confidențialitate și date cu caracter personal",
            content: [
              "Datele personale sunt prelucrate conform Politicii de confidențialitate. Cookie-urile și tehnologiile similare sunt descrise separat în Politica de cookies.",
              "Obligațiile de confidențialitate privind informațiile comerciale și documentele de proiect vor fi detaliate în contract sau într-un acord separat, după caz."
            ]
          },
          {
            title: "15. Forța majoră și evenimente în afara controlului",
            content: [
              "Nicio parte nu răspunde pentru neexecutarea cauzată de un eveniment extern, imprevizibil, absolut invincibil și inevitabil, în condițiile legii.",
              "Incidentele platformelor autorităților, schimbările legislative urgente, atacurile cibernetice extinse ori indisponibilitatea furnizorilor pot conduce la ajustarea rezonabilă a termenelor, fără a înlătura obligația de informare și limitare a efectelor."
            ]
          },
          {
            title: "16. Modificarea și separabilitatea termenilor",
            content: [
              "Putem actualiza termenii pentru schimbări legislative, operaționale sau tehnice. Noua versiune se aplică utilizării ulterioare publicării și nu modifică retroactiv contractele deja încheiate.",
              "Dacă o clauză este nulă sau inaplicabilă, celelalte prevederi rămân valabile, iar clauza va fi interpretată în limita maximă permisă de lege."
            ]
          },
          {
            title: "17. Legea aplicabilă și soluționarea disputelor",
            content: [
              "Termenii sunt guvernați de legea română. Părțile vor încerca mai întâi soluționarea amiabilă printr-o notificare transmisă la adresa de contact.",
              "În lipsa unei soluții amiabile, competența revine instanțelor stabilite de normele legale aplicabile; o clauză de competență nu poate înlătura protecția jurisdicțională imperativă a consumatorului.",
              "Pentru litigii eligibile între consumatori și profesioniști poate fi utilizată procedura SAL administrată conform cadrului ANPC. Vechea platformă europeană ODR a fost închisă la 20 iulie 2025 și nu mai este indicată ca mijloc activ."
            ],
            links: [
              { label: "Soluționarea alternativă a litigiilor — ANPC", href: "https://anpc.ro/sal/" },
              { label: "Regulamentul (UE) 2024/3228 — închiderea platformei ODR", href: "https://eur-lex.europa.eu/eli/reg/2024/3228/oj" }
            ]
          }
        ]}
      />
    </>
  );
}
