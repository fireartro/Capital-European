import { siteConfig } from "@/lib/site-config";

export const generalFaq = [
  [`Cui se adresează serviciile ${siteConfig.name}?`, "Antreprenorilor, firmelor și ONG-urilor care pregătesc o investiție sau vor să delege activități administrative. Colaborarea poate fi punctuală sau recurentă."],
  ["Cum sunt protejate documentele și datele?", "Accesul este limitat la activitățile și persoanele implicate. Datele din formular sunt folosite pentru analizarea și soluționarea solicitării, conform politicii de confidențialitate."],
  ["Pot delega un singur proces administrativ?", "Da. Putem începe cu un flux clar, precum documentele sau secretariatul, și îl putem extinde numai dacă este util."],
  ["Cum verific eligibilitatea pentru fonduri europene?", "Comparăm solicitantul și investiția cu regulile programului: activitate, locație, buget, cofinanțare și documente. Analiza precedă pregătirea dosarului."],
  ["Sprijinul continuă după aprobarea finanțării?", "Implementarea poate fi inclusă separat, în funcție de contract. Responsabilitățile, documentele și etapele acoperite sunt stabilite înainte de începerea serviciului."],
  ["Când primesc o ofertă?", "După ce clarificăm obiectivul, volumul și informațiile disponibile. Comunicăm apoi livrabilele, responsabilitățile, termenul estimat și prețul."]
] as const;

export const fundingFaq = [
  [
    "Cum aflu dacă firma sau ONG-ul este eligibil pentru fonduri europene?",
    "Eligibilitatea se stabilește raportând solicitantul, investiția, locația, codul CAEN, dimensiunea organizației și capacitatea financiară la ghidul programului. Analiza inițială clarifică aceste criterii înainte de pregătirea dosarului."
  ],
  [
    "Ce include consultanța pentru accesarea fondurilor europene?",
    "Serviciul poate acoperi identificarea programului, eligibilitatea, structura proiectului, bugetul, anexele, depunerea și răspunsurile la clarificări. Conținutul exact este stabilit prin ofertă."
  ],
  [
    "Puteți garanta aprobarea unui proiect?",
    "Nu. Nicio firmă de consultanță nu poate garanta decizia autorității finanțatoare. Putem oferi o evaluare argumentată, documentație riguroasă și un proces de lucru care reduce erorile și riscurile evitabile."
  ],
  [
    "Oferiți sprijin și pentru implementarea proiectului aprobat?",
    "Da, dacă implementarea este inclusă în contract. Sprijinul poate acoperi calendarul, achizițiile, documentele justificative, indicatorii și cererile de plată sau rambursare."
  ],
  [
    "Cât durează pregătirea unei cereri de finanțare?",
    "Durata depinde de complexitatea programului, stadiul documentelor și termenul apelului. După analiza inițială stabilim un calendar realist, responsabilități clare și lista documentelor necesare."
  ]
] as const;

export const administrativeFaq = [
  [
    "Ce sunt serviciile administrative externalizate?",
    "Sunt activități de back-office preluate într-un flux convenit: documente, centralizări, evidențe, secretariat, programări și alte sarcini recurente."
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
    "Pentru antreprenori, firme și ONG-uri care au activități recurente, dar nu au nevoie sau nu doresc să le gestioneze integral intern."
  ],
  [
    "Oferiți și asistență pentru înființarea unei firme?",
    "Da. Putem explica pașii administrativi, pregăti documentele necesare și oferi suport pentru organizarea activității după înființare. Situațiile care necesită consultanță juridică sau fiscală specializată sunt direcționate către profesioniști autorizați."
  ]
] as const;

export type ServiceFaqItems = ReadonlyArray<readonly [question: string, answer: string]>;
