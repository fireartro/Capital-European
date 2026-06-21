import { siteConfig } from "@/lib/site-config";

export const generalFaq = [
  [`Ce tipuri de companii pot apela la ${siteConfig.name}?`, "Lucrăm cu antreprenori, IMM-uri, ONG-uri și companii în dezvoltare, atât punctual, cât și prin colaborări recurente adaptate volumului de activitate."],
  ["Cum sunt protejate documentele și datele companiei?", "Accesul este limitat la persoanele implicate, procesele sunt documentate, iar datele transmise prin formular sunt validate și prelucrate exclusiv pentru soluționarea solicitării."],
  ["Puteți prelua doar o parte din activitatea administrativă?", "Da. Poți delega un singur proces, un proiect temporar sau întregul back-office. Structura colaborării se poate ajusta pe parcurs."],
  ["Cum aflu dacă proiectul meu este eligibil pentru fonduri europene?", "Începem cu o analiză inițială a companiei, investiției și criteriilor programului. Primești o evaluare realistă înainte de a investi timp în documentație."],
  ["Oferiți sprijin și după aprobarea finanțării?", "Da. Te asistăm în implementare, monitorizare, raportare și pregătirea documentelor necesare cererilor de plată sau rambursare."],
  ["În cât timp primesc o ofertă?", "Termenul depinde de complexitatea solicitării și de informațiile disponibile. După evaluarea inițială comunicăm un interval realist și pașii necesari pentru ofertare."]
] as const;

export const fundingFaq = [
  [
    "Cum aflu dacă firma sau ONG-ul este eligibil pentru fonduri europene?",
    "Eligibilitatea se stabilește raportând solicitantul, investiția, locația, codul CAEN, dimensiunea organizației și capacitatea financiară la ghidul programului. Analiza inițială clarifică aceste criterii înainte de pregătirea dosarului."
  ],
  [
    "Ce include consultanța pentru accesarea fondurilor europene?",
    "Serviciul poate include identificarea programului potrivit, analiza de eligibilitate, structurarea ideii de proiect, bugetul, planul de afaceri, pregătirea anexelor, depunerea și răspunsurile la solicitările de clarificări."
  ],
  [
    "Puteți garanta aprobarea unui proiect?",
    "Nu. Nicio firmă de consultanță nu poate garanta decizia autorității finanțatoare. Putem oferi o evaluare argumentată, documentație riguroasă și un proces de lucru care reduce erorile și riscurile evitabile."
  ],
  [
    "Oferiți sprijin și pentru implementarea proiectului aprobat?",
    "Da. Sprijinul poate acoperi calendarul activităților, achizițiile, documentele justificative, indicatorii, cererile de plată sau rambursare și comunicarea administrativă aferentă proiectului."
  ],
  [
    "Cât durează pregătirea unei cereri de finanțare?",
    "Durata depinde de complexitatea programului, stadiul documentelor și termenul apelului. După analiza inițială stabilim un calendar realist, responsabilități clare și lista documentelor necesare."
  ]
] as const;

export const administrativeFaq = [
  [
    "Ce sunt serviciile administrative externalizate?",
    "Sunt activități de back-office preluate de un partener extern: redactare și procesare documente, centralizări, organizarea arhivei, secretariat, relația administrativă cu furnizorii și alte sarcini recurente."
  ],
  [
    "Pot externaliza doar o parte din activitatea administrativă?",
    "Da. Colaborarea poate acoperi un singur proces, un proiect temporar sau un volum lunar de activități. Serviciile se stabilesc după nevoile și fluxurile reale ale companiei."
  ],
  [
    "Cum sunt protejate documentele companiei?",
    "Accesul se limitează la persoanele implicate, iar documentele sunt gestionate în procese convenite cu clientul. Pentru proiectele care o cer, colaborarea poate include clauze contractuale de confidențialitate și reguli de păstrare a datelor."
  ],
  [
    "Pentru ce tipuri de organizații sunt potrivite serviciile?",
    "Serviciile sunt potrivite pentru antreprenori, IMM-uri, ONG-uri și echipe care vor să reducă timpul consumat de sarcini administrative și să păstreze procesele de lucru ordonate."
  ],
  [
    "Oferiți și asistență pentru înființarea unei firme?",
    "Da. Putem explica pașii administrativi, pregăti documentele necesare și oferi suport pentru organizarea activității după înființare. Situațiile care necesită consultanță juridică sau fiscală specializată sunt direcționate către profesioniști autorizați."
  ]
] as const;

export type ServiceFaqItems = ReadonlyArray<readonly [question: string, answer: string]>;
