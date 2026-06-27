export type SeoServicePageConfig = {
  path: string;
  title: string;
  metaDescription: string;
  eyebrow: string;
  h1: string;
  intro: string;
  category: "funding" | "admin";
  parent: { label: string; href: string };
  contactService: "fonduri-europene" | "servicii-administrative" | "secretariat" | "documente" | "infiintare-firma";
  serviceType: string[];
  audienceTitle: string;
  audienceIntro: string;
  audience: string[];
  benefitsTitle: string;
  benefits: Array<{ title: string; text: string }>;
  processTitle: string;
  steps: Array<{ title: string; text: string }>;
  faq: ReadonlyArray<readonly [string, string]>;
  related: Array<{ href: string; label: string; text: string }>;
};

export const seoServicePages = {
  consulting: {
    path: "/consultanta-fonduri-europene",
    title: "Consultanță fonduri europene",
    metaDescription: "Consultanță pentru fonduri europene: analiză de eligibilitate, documentație, depunere și sprijin în implementare pentru firme și ONG-uri.",
    eyebrow: "Consultanță specializată",
    h1: "Consultanță fonduri europene, de la eligibilitate la implementare",
    intro: "Verificăm programul, solicitantul și investiția, apoi stabilim documentele, bugetul și responsabilitățile necesare pentru fiecare etapă.",
    category: "funding",
    parent: { label: "Fonduri europene", href: "/fonduri-europene" },
    contactService: "fonduri-europene",
    serviceType: ["Consultanță fonduri europene", "Analiză eligibilitate", "Implementare proiect"],
    audienceTitle: "Când este utilă consultanța",
    audienceIntro: "Serviciul este util când există o investiție concretă, dar programul, eligibilitatea sau documentele trebuie clarificate înainte de depunere.",
    audience: [
      "Ai definit investiția, dar nu știi ce program se potrivește.",
      "Ai identificat un apel și vrei o verificare independentă a eligibilității.",
      "Ai nevoie de structură pentru cerere, buget și anexele obligatorii.",
      "Ai obținut finanțarea și trebuie să urmărești implementarea și documentele."
    ],
    benefitsTitle: "Ce primești în proces",
    benefits: [
      { title: "Decizie argumentată", text: "Clarificăm criteriile eliminatorii, punctajul și riscurile înainte de a investi timp în dosar." },
      { title: "Documentație coerentă", text: "Corelăm obiectivele, activitățile, rezultatele, calendarul și bugetul proiectului." },
      { title: "Opțiune de implementare", text: "Dacă este inclusă în contract, urmărim obligațiile, documentele și etapele proiectului aprobat." }
    ],
    processTitle: "Etapele serviciului de consultanță",
    steps: [
      { title: "Analiză inițială", text: "Verificăm solicitantul, investiția, locația, codurile CAEN și capacitatea de cofinanțare." },
      { title: "Planul proiectului", text: "Definim documentele, responsabilitățile, calendarul și informațiile care lipsesc." },
      { title: "Pregătire și depunere", text: "Construim cererea și anexele, apoi gestionăm clarificările din etapa de evaluare." },
      { title: "Implementare contractată", text: "Organizăm urmărirea activităților, indicatorilor și documentelor justificative incluse în serviciu." }
    ],
    faq: [
      ["Poate fi garantată aprobarea proiectului?", "Nu. Decizia aparține autorității finanțatoare. Consultanța reduce erorile evitabile și clarifică riscurile înainte de depunere."],
      ["Pot cere o analiză dacă nu am toate documentele?", "Da. Pentru început sunt suficiente informațiile despre solicitant, investiție, locație și bugetul estimat."],
      ["Serviciul include implementarea?", "Poate include implementarea, în funcție de contract și de responsabilitățile asumate de fiecare parte."]
    ],
    related: [
      { href: "/fonduri-europene-pentru-firme", label: "Fonduri europene pentru firme", text: "Condiții și pregătire pentru investiții realizate de companii." },
      { href: "/fonduri-europene-pentru-ong", label: "Fonduri europene pentru ONG", text: "Proiecte cu obiective sociale, educaționale sau comunitare." },
      { href: "/calculator-pret-consultanta", label: "Estimator de consultanță", text: "Calculează orientativ complexitatea și intervalul de preț." }
    ]
  },
  companies: {
    path: "/fonduri-europene-pentru-firme",
    title: "Fonduri europene pentru firme",
    metaDescription: "Fonduri europene pentru firme: verificarea eligibilității, bugetului și investiției, pregătirea cererii și sprijin în implementare.",
    eyebrow: "Finanțare pentru companii",
    h1: "Fonduri europene pentru firme cu un plan concret de investiții",
    intro: "Verificăm potrivirea dintre firmă, investiție și program, inclusiv cofinanțarea și obligațiile care continuă după aprobare.",
    category: "funding",
    parent: { label: "Fonduri europene", href: "/fonduri-europene" },
    contactService: "fonduri-europene",
    serviceType: ["Fonduri europene pentru firme", "Investiții IMM", "Digitalizare"],
    audienceTitle: "Ce verificăm pentru o firmă",
    audienceIntro: "Eligibilitatea depinde de program, regiune, dimensiunea întreprinderii, situația financiară și tipul cheltuielilor propuse.",
    audience: [
      "Vechimea, codurile CAEN și situația financiară a companiei.",
      "Locația investiției și condițiile regionale ale apelului.",
      "Capacitatea de cofinanțare și susținerea fluxului de numerar.",
      "Încadrarea echipamentelor, lucrărilor și serviciilor în cheltuieli eligibile."
    ],
    benefitsTitle: "O investiție pregătită pentru evaluare și implementare",
    benefits: [
      { title: "Buget realist", text: "Separăm cheltuielile eligibile de costurile care trebuie susținute din surse proprii." },
      { title: "Obiective măsurabile", text: "Legăm investiția de indicatori, rezultate și capacitatea operațională a firmei." },
      { title: "Documente urmărite", text: "Construim o listă clară de documente, termene și responsabilități." }
    ],
    processTitle: "De la planul firmei la cererea de finanțare",
    steps: [
      { title: "Profilul firmei", text: "Verificăm datele juridice, financiare și activitățile eligibile." },
      { title: "Structura investiției", text: "Definim echipamentele, lucrările, serviciile și sursele de finanțare." },
      { title: "Cererea de finanțare", text: "Corelăm planul, bugetul, indicatorii și anexele." },
      { title: "Pregătirea implementării", text: "Stabilim de la început obligațiile care vor continua după contractare." }
    ],
    faq: [
      ["Orice firmă poate accesa fonduri europene?", "Nu. Fiecare apel are condiții proprii privind vechimea, activitatea, regiunea, dimensiunea și situația financiară."],
      ["Este obligatorie cofinanțarea?", "Multe programe solicită contribuție proprie și capacitatea de a susține temporar anumite cheltuieli. Procentul diferă de la un apel la altul."],
      ["Pot cumpăra orice echipament?", "Doar cheltuielile prevăzute de program și justificate prin proiect pot fi eligibile."]
    ],
    related: [
      { href: "/consultanta-fonduri-europene", label: "Procesul de consultanță", text: "Vezi etapele de la eligibilitate la implementare." },
      { href: "/fonduri-europene-pentru-startup", label: "Fonduri pentru startup", text: "Cerințe specifice afacerilor aflate la început." },
      { href: "/calculator-pret-consultanta", label: "Estimator consultanță", text: "Evaluează orientativ complexitatea proiectului." }
    ]
  },
  ngo: {
    path: "/fonduri-europene-pentru-ong",
    title: "Fonduri europene pentru ONG",
    metaDescription: "Consultanță pentru ONG-uri care pregătesc proiecte europene sociale, educaționale sau comunitare: eligibilitate, buget, parteneriate și implementare.",
    eyebrow: "Finanțare pentru sectorul nonprofit",
    h1: "Fonduri europene pentru ONG-uri și proiecte cu rezultate măsurabile",
    intro: "Corelăm nevoia documentată, beneficiarii, activitățile și bugetul cu cerințele programului și capacitatea organizației de a implementa.",
    category: "funding",
    parent: { label: "Fonduri europene", href: "/fonduri-europene" },
    contactService: "fonduri-europene",
    serviceType: ["Fonduri europene pentru ONG", "Proiecte sociale", "Proiecte educaționale"],
    audienceTitle: "Ce trebuie demonstrat într-un proiect pentru ONG",
    audienceIntro: "Proiectele nonprofit trebuie să demonstreze nevoia, capacitatea organizației și legătura dintre activități, beneficiari și rezultate.",
    audience: [
      "Grupul țintă și problema documentată pe care proiectul o adresează.",
      "Experiența organizației și resursele echipei de implementare.",
      "Parteneriatele necesare și distribuirea responsabilităților.",
      "Indicatorii de rezultat și continuitatea intervenției după finanțare."
    ],
    benefitsTitle: "O logică de proiect ușor de evaluat",
    benefits: [
      { title: "Logică de intervenție", text: "Legăm problema, obiectivele, activitățile și rezultatele într-o structură coerentă." },
      { title: "Buget justificat", text: "Fiecare cost este asociat unei activități și unei nevoi reale din proiect." },
      { title: "Responsabilități clare", text: "Definim rolurile solicitantului, partenerilor și furnizorilor." }
    ],
    processTitle: "Cum pregătim proiectul unui ONG",
    steps: [
      { title: "Clarificarea nevoii", text: "Documentăm problema și beneficiarii vizați." },
      { title: "Verificarea apelului", text: "Analizăm eligibilitatea organizației, activităților și partenerilor." },
      { title: "Construcția proiectului", text: "Pregătim planul de activități, indicatorii, bugetul și anexele." },
      { title: "Implementare și raportare", text: "Organizăm dovezile, livrabilele și documentele necesare raportării." }
    ],
    faq: [
      ["Un ONG nou poate aplica?", "Depinde de apel. Unele programe cer experiență, vechime sau capacitate financiară demonstrabilă."],
      ["Parteneriatul este obligatoriu?", "Doar dacă ghidul îl impune sau dacă proiectul are nevoie reală de competențe și acces la beneficiari."],
      ["Cheltuielile cu personalul pot fi eligibile?", "În multe programe da, în limitele și condițiile stabilite de ghidul aplicabil."]
    ],
    related: [
      { href: "/consultanta-fonduri-europene", label: "Consultanță fonduri europene", text: "Procesul complet, de la analiză la implementare." },
      { href: "/fonduri-europene-pentru-firme", label: "Finanțare pentru firme", text: "Informații pentru activități economice și investiții." },
      { href: "/contact?service=fonduri-europene", label: "Solicită o analiză", text: "Trimite contextul organizației și ideea de proiect." }
    ]
  },
  startup: {
    path: "/fonduri-europene-pentru-startup",
    title: "Fonduri europene pentru startup",
    metaDescription: "Fonduri europene pentru startup-uri: eligibilitate, plan de afaceri, buget, cofinanțare și obligațiile unei afaceri finanțate.",
    eyebrow: "Finanțare pentru afaceri noi",
    h1: "Fonduri europene pentru startup-uri cu un model de afaceri verificabil",
    intro: "Finanțarea nu înlocuiește cererea din piață. Verificăm dacă ideea, echipa, bugetul și calendarul pot susține obligațiile programului.",
    category: "funding",
    parent: { label: "Fonduri europene", href: "/fonduri-europene" },
    contactService: "fonduri-europene",
    serviceType: ["Fonduri europene startup", "Plan de afaceri", "Înființare afacere"],
    audienceTitle: "Ce trebuie clarificat înainte de aplicare",
    audienceIntro: "Programele pentru afaceri noi pot avea reguli despre momentul înființării, locuri de muncă, aport propriu și menținerea investiției.",
    audience: [
      "Cine poate fi solicitant și când trebuie înființată firma.",
      "Experiența echipei și validarea cererii din piață.",
      "Investiția minimă necesară pentru funcționarea afacerii.",
      "Obligațiile privind locurile de muncă, veniturile sau perioada de sustenabilitate."
    ],
    benefitsTitle: "Un plan de afaceri bazat pe ipoteze explicite",
    benefits: [
      { title: "Ipoteze verificate", text: "Separăm estimările comerciale de informațiile care pot fi documentate." },
      { title: "Investiție etapizată", text: "Prioritizăm costurile esențiale și evităm un buget construit doar pentru punctaj." },
      { title: "Obligații înțelese", text: "Explicăm ce trebuie menținut după finanțare și ce riscuri apar." }
    ],
    processTitle: "De la idee la un proiect care poate fi analizat",
    steps: [
      { title: "Validarea ideii", text: "Clarificăm clientul, problema, oferta și modul de vânzare." },
      { title: "Alegerea programului", text: "Verificăm solicitantul, activitatea, regiunea și calendarul." },
      { title: "Planul de afaceri", text: "Construim activitățile, bugetul și proiecțiile pe ipoteze explicite." },
      { title: "Pornirea operațională", text: "Pregătim pașii administrativi și obligațiile de după contractare." }
    ],
    faq: [
      ["Trebuie să am firma înființată înainte de aplicare?", "Depinde de program. Unele apeluri acceptă persoane care vor înființa firma ulterior, altele cer o societate existentă."],
      ["Finanțarea acoperă toate costurile?", "De regulă nu. Pot exista contribuții proprii, cheltuieli neeligibile și costuri care trebuie susținute înainte de rambursare."],
      ["Un plan de afaceri garantează finanțarea?", "Nu. Planul trebuie să respecte criteriile apelului, iar decizia aparține evaluatorului și autorității competente."]
    ],
    related: [
      { href: "/servicii-administrative/infiintare-firma", label: "Înființare firmă", text: "Pașii administrativi pentru pornirea societății." },
      { href: "/fonduri-europene-pentru-firme", label: "Fonduri pentru firme", text: "Pregătirea investițiilor realizate de companii." },
      { href: "/calculator-pret-consultanta", label: "Calculator consultanță", text: "Evaluează orientativ complexitatea proiectului." }
    ]
  },
  secretariat: {
    path: "/servicii-administrative/secretariat",
    title: "Servicii de secretariat externalizat",
    metaDescription: "Secretariat externalizat pentru firme: gestionarea corespondenței, programărilor, solicitărilor și termenelor după reguli convenite.",
    eyebrow: "Secretariat externalizat",
    h1: "Secretariat externalizat pentru solicitări și termene bine urmărite",
    intro: "Preluăm activități recurente de comunicare și organizare într-un flux cu aprobări, termene și responsabilități stabilite.",
    category: "admin",
    parent: { label: "Servicii administrative", href: "/servicii-administrative" },
    contactService: "secretariat",
    serviceType: ["Secretariat externalizat", "Gestionare corespondență", "Programări"],
    audienceTitle: "Activități care pot fi delegate",
    audienceIntro: "Pachetul se stabilește în funcție de volum, canalele folosite și nivelul de aprobare necesar.",
    audience: [
      "Preluarea și distribuirea corespondenței către persoanele responsabile.",
      "Programări, confirmări și evidența solicitărilor recurente.",
      "Pregătirea răspunsurilor standard și urmărirea termenelor.",
      "Centralizarea informațiilor necesare echipei sau managementului."
    ],
    benefitsTitle: "Un punct administrativ ușor de controlat",
    benefits: [
      { title: "Continuitate", text: "Solicitările sunt urmărite chiar și atunci când echipa internă este ocupată." },
      { title: "Reguli de escaladare", text: "Situațiile importante ajung rapid la persoana care poate decide." },
      { title: "Evidență clară", text: "Păstrăm istoricul solicitărilor, termenelor și răspunsurilor." }
    ],
    processTitle: "Cum preluăm fluxul de secretariat",
    steps: [
      { title: "Inventariem solicitările", text: "Stabilim canalele, tipurile de cereri și volumul estimat." },
      { title: "Definim regulile", text: "Clarificăm răspunsurile standard, aprobările și escaladările." },
      { title: "Preluăm un flux pilot", text: "Începem cu o zonă limitată și verificăm rezultatele." },
      { title: "Ajustăm serviciul", text: "Modificăm volumul și procedurile pe baza activității reale." }
    ],
    faq: [
      ["Serviciul poate începe cu un volum mic?", "Da. Este recomandat să începem cu un flux clar și să extindem după ce regulile funcționează."],
      ["Cine aprobă răspunsurile importante?", "Persoana desemnată de client. Regulile de aprobare și escaladare sunt stabilite înainte de preluare."],
      ["Cum sunt protejate informațiile?", "Accesul este limitat la activitățile contractate, cu reguli de confidențialitate și păstrare a datelor."]
    ],
    related: [
      { href: "/servicii-administrative/administrare-documente", label: "Administrare documente", text: "Organizare, evidență și urmărirea documentelor." },
      { href: "/servicii-administrative/infiintare-firma", label: "Înființare firmă", text: "Sprijin administrativ pentru o societate nouă." },
      { href: "/contact?service=secretariat", label: "Cere o ofertă", text: "Descrie volumul și activitățile pe care vrei să le delegi." }
    ]
  },
  documents: {
    path: "/servicii-administrative/administrare-documente",
    title: "Administrare documente pentru firme",
    metaDescription: "Administrare documente pentru firme: înregistrare, verificare, clasificare, evidență și urmărirea termenelor într-un flux controlat.",
    eyebrow: "Organizarea documentelor",
    h1: "Administrare documente într-un circuit clar și verificabil",
    intro: "Organizăm primirea, verificarea, clasificarea, predarea și evidența documentelor după reguli convenite cu echipa ta.",
    category: "admin",
    parent: { label: "Servicii administrative", href: "/servicii-administrative" },
    contactService: "documente",
    serviceType: ["Administrare documente", "Evidență documente", "Arhivare operațională"],
    audienceTitle: "Ce poate include fluxul",
    audienceIntro: "Serviciul nu înlocuiește arhivarea legală specializată, dar organizează documentele operaționale și responsabilitățile zilnice.",
    audience: [
      "Înregistrarea documentelor primite și asocierea lor cu proiectul sau furnizorul corect.",
      "Verificarea elementelor obligatorii și semnalarea informațiilor lipsă.",
      "Clasificarea în foldere și nomenclatoare convenite cu clientul.",
      "Urmărirea documentelor care necesită aprobare, răspuns sau completare."
    ],
    benefitsTitle: "Mai multă trasabilitate, mai puține căutări",
    benefits: [
      { title: "Trasabilitate", text: "Este clar când a intrat documentul, unde se află și cine trebuie să acționeze." },
      { title: "Mai puține omisiuni", text: "Listele de verificare reduc documentele incomplete și termenele ratate." },
      { title: "Predare simplă", text: "Structura poate fi înțeleasă și continuată de membrii echipei." }
    ],
    processTitle: "Cum construim circuitul documentelor",
    steps: [
      { title: "Inventar", text: "Identificăm tipurile de documente și sursele lor." },
      { title: "Reguli de clasificare", text: "Stabilim denumiri, foldere, responsabilități și termene." },
      { title: "Prelucrare curentă", text: "Înregistrăm, verificăm și distribuim documentele." },
      { title: "Raportare", text: "Semnalăm lipsurile, blocajele și documentele care așteaptă acțiune." }
    ],
    faq: [
      ["Puteți lucra cu documente digitale și fizice?", "Fluxul poate include ambele categorii, dacă sunt stabilite clar predarea, accesul și responsabilitățile."],
      ["Serviciul include arhivare legală?", "Nu implicit. Putem organiza arhiva operațională; serviciile de arhivare supuse unor cerințe speciale trebuie contractate separat."],
      ["Putem folosi structura noastră existentă?", "Da. Adaptăm fluxul la instrumentele și nomenclatoarele deja folosite, dacă acestea sunt funcționale."]
    ],
    related: [
      { href: "/servicii-administrative/secretariat", label: "Secretariat externalizat", text: "Urmărirea solicitărilor și comunicării recurente." },
      { href: "/servicii-administrative", label: "Toate serviciile administrative", text: "Vezi procesele care pot fi externalizate." },
      { href: "/contact?service=documente", label: "Solicită o evaluare", text: "Descrie documentele și volumul lunar estimat." }
    ]
  },
  companySetup: {
    path: "/servicii-administrative/infiintare-firma",
    title: "Înființare firmă și sprijin administrativ",
    metaDescription: "Sprijin administrativ pentru înființarea firmei: pași, informații, documente și organizare inițială, fără a înlocui consultanța autorizată.",
    eyebrow: "Pornirea unei societăți",
    h1: "Înființare firmă cu documente și pași administrativi organizați",
    intro: "Centralizăm informațiile și documentele necesare și semnalăm deciziile care trebuie validate de un profesionist autorizat.",
    category: "admin",
    parent: { label: "Servicii administrative", href: "/servicii-administrative" },
    contactService: "infiintare-firma",
    serviceType: ["Înființare firmă", "Asistență administrativă startup", "Pregătire documente firmă"],
    audienceTitle: "Ce clarificăm de la început",
    audienceIntro: "Forma juridică și obligațiile trebuie discutate cu profesioniștii autorizați relevanți atunci când situația o cere.",
    audience: [
      "Datele asociaților, administratorilor și structura de bază a societății.",
      "Denumirea, sediul, obiectul de activitate și informațiile necesare dosarului.",
      "Documentele care trebuie obținute, semnate sau transmise.",
      "Pașii administrativi de după înființare și organizarea inițială a firmei."
    ],
    benefitsTitle: "Un început administrativ mai ușor de urmărit",
    benefits: [
      { title: "Listă de pași", text: "Primești o succesiune clară a informațiilor și documentelor care trebuie pregătite." },
      { title: "Dosar organizat", text: "Verificăm dacă informațiile sunt coerente înainte de transmitere." },
      { title: "Continuitate administrativă", text: "Poți continua cu servicii de documente, secretariat și back-office." }
    ],
    processTitle: "Cum organizăm pregătirea firmei",
    steps: [
      { title: "Discuția inițială", text: "Clarificăm activitatea, asociații și nevoile administrative." },
      { title: "Colectarea informațiilor", text: "Organizăm datele și documentele necesare situației concrete." },
      { title: "Verificarea dosarului", text: "Semnalăm lipsurile și pașii care necesită decizia clientului." },
      { title: "Predare și continuare", text: "Centralizăm documentele finale și activitățile administrative următoare." }
    ],
    faq: [
      ["Oferiți consultanță juridică sau fiscală?", "Nu înlocuim avocatul, notarul, contabilul sau consultantul fiscal. Pentru decizii care cer autorizare, recomandăm implicarea profesionistului competent."],
      ["Puteți garanta termenul de înființare?", "Nu. Termenele depind de documente, instituții și eventualele solicitări de completare."],
      ["Pot continua cu servicii administrative după înființare?", "Da. Putem organiza documentele, secretariatul și alte activități administrative recurente."]
    ],
    related: [
      { href: "/fonduri-europene-pentru-startup", label: "Fonduri pentru startup", text: "Pregătirea unei afaceri noi pentru o posibilă finanțare." },
      { href: "/servicii-administrative/secretariat", label: "Secretariat externalizat", text: "Continuitate pentru comunicarea și solicitările firmei." },
      { href: "/contact?service=infiintare-firma", label: "Solicită sprijin", text: "Trimite-ne contextul și stadiul în care te afli." }
    ]
  }
} satisfies Record<string, SeoServicePageConfig>;
