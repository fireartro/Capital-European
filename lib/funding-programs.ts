export type FundingProgram = {
  id: string;
  code: string;
  title: string;
  program: string;
  status: "Deschis" | "În pregătire" | "Închis";
  audience: string;
  summary: string;
  value: string;
  cofinancing: string;
  region: string;
  image: string;
  imageAlt: string;
  sourceUrl: string;
  lastVerified: string;
};

export const UNKNOWN_FUNDING_PROGRAM = "program-nespecificat";

// Replace placeholders only after checking the final guide and the official source.
export const defaultFundingPrograms: readonly FundingProgram[] = [
  {
    id: "investitii-productive",
    code: "Codul apelului va fi completat",
    title: "Investiții productive și modernizarea capacității de lucru",
    program: "Categorie urmărită",
    status: "În pregătire",
    audience: "IMM-uri care pregătesc echipamente, spații sau linii de producție",
    summary: "Loc rezervat apelurilor verificate pentru extindere, modernizare și creșterea capacității de producție.",
    value: "De completat după publicarea ghidului",
    cofinancing: "Se confirmă pentru fiecare apel",
    region: "Național sau regional, după caz",
    image: "/images/funding-hero-manufacturing.webp",
    imageAlt: "Modernizarea unei unități de producție printr-o investiție în echipamente",
    sourceUrl: "https://www.fonduri-ue.ro/",
    lastVerified: "În așteptarea ghidului oficial"
  },
  {
    id: "eficienta-energetica",
    code: "Codul apelului va fi completat",
    title: "Eficiență energetică și producerea energiei pentru consum propriu",
    program: "Categorie urmărită",
    status: "În pregătire",
    audience: "Firme și organizații care pregătesc investiții pentru reducerea consumului",
    summary: "Loc rezervat apelurilor pentru panouri fotovoltaice, eficientizarea clădirilor și modernizarea consumatorilor energetici.",
    value: "De completat după publicarea ghidului",
    cofinancing: "Se confirmă pentru fiecare apel",
    region: "Național sau regional, după caz",
    image: "/images/funding-hero-energy.webp",
    imageAlt: "Investiție în panouri fotovoltaice pentru o unitate de producție",
    sourceUrl: "https://mfe.gov.ro/",
    lastVerified: "În așteptarea ghidului oficial"
  },
  {
    id: "digitalizare-automatizare",
    code: "Codul apelului va fi completat",
    title: "Digitalizarea și automatizarea proceselor din întreprinderi",
    program: "Categorie urmărită",
    status: "În pregătire",
    audience: "IMM-uri care urmăresc software, echipamente digitale sau automatizare",
    summary: "Loc rezervat apelurilor în care investiția digitală trebuie legată clar de procese, rezultate și indicatori măsurabili.",
    value: "De completat după publicarea ghidului",
    cofinancing: "Se confirmă pentru fiecare apel",
    region: "Național sau regional, după caz",
    image: "/images/funding-hero-digitalization.webp",
    imageAlt: "Digitalizarea unei linii de producție într-o întreprindere",
    sourceUrl: "https://www.fonduri-ue.ro/",
    lastVerified: "În așteptarea ghidului oficial"
  },
  {
    id: "startup-antreprenoriat",
    code: "Codul apelului va fi completat",
    title: "Antreprenoriat, startup și dezvoltarea unei afaceri noi",
    program: "Categorie urmărită",
    status: "În pregătire",
    audience: "Antreprenori care pot demonstra o idee fezabilă și resurse pentru implementare",
    summary: "Loc rezervat programelor pentru afaceri noi, cu accent pe eligibilitate, plan de afaceri și sustenabilitatea investiției.",
    value: "De completat după publicarea ghidului",
    cofinancing: "Se confirmă pentru fiecare apel",
    region: "În funcție de program",
    image: "/images/capital-european-consultanta-organizare-real.webp",
    imageAlt: "Antreprenori care pregătesc documentele unei afaceri noi",
    sourceUrl: "https://www.fonduri-ue.ro/",
    lastVerified: "În așteptarea ghidului oficial"
  },
  {
    id: "ong-impact-local",
    code: "Codul apelului va fi completat",
    title: "Proiecte pentru ONG-uri, comunități și servicii cu impact local",
    program: "Categorie urmărită",
    status: "În pregătire",
    audience: "ONG-uri și organizații care pregătesc activități cu rezultate verificabile",
    summary: "Loc rezervat apelurilor sociale, educaționale sau comunitare, publicate și confirmate în surse oficiale.",
    value: "De completat după publicarea ghidului",
    cofinancing: "Se confirmă pentru fiecare apel",
    region: "Național, regional sau local",
    image: "/images/fonduri-europene-consultanta-real.webp",
    imageAlt: "Documente și buget analizate pentru un proiect cu finanțare europeană",
    sourceUrl: "https://mfe.gov.ro/",
    lastVerified: "În așteptarea ghidului oficial"
  }
];

export const fundingPrograms = defaultFundingPrograms;

export type FundingProgramOption = {
  value: string;
  label: string;
};

export function createFundingProgramOptions(programs: readonly FundingProgram[]): FundingProgramOption[] {
  return [
    {
      value: UNKNOWN_FUNDING_PROGRAM,
      label: "Nu știu încă / doresc identificarea programului"
    },
    ...programs.map((program) => ({
      value: program.id,
      label: program.title
    }))
  ];
}

export const fundingProgramOptions = createFundingProgramOptions(defaultFundingPrograms);

export function getFundingProgram(programId: string | undefined, programs: readonly FundingProgram[] = defaultFundingPrograms) {
  return programs.find((program) => program.id === programId);
}

export function getFundingProgramLabel(programId: string | undefined, programs: readonly FundingProgram[] = defaultFundingPrograms) {
  if (!programId || programId === UNKNOWN_FUNDING_PROGRAM) {
    return "Program neidentificat încă";
  }

  const program = getFundingProgram(programId, programs);
  return program ? program.title : "Program indicat de solicitant";
}
