export type FundingProgram = {
  id: string;
  code: string;
  title: string;
  program: string;
  status: "Deschis" | "În pregătire" | "Închis";
  audience: string;
  summary: string;
  sourceUrl: string;
  lastVerified: string;
};

export const UNKNOWN_FUNDING_PROGRAM = "program-nespecificat";

// Add new validated funding lines here. Keep the official source and verification date current.
export const fundingPrograms: readonly FundingProgram[] = [
  {
    id: "prnv-2024-132-a2-1",
    code: "PRNV/2024/132.A.2/1",
    title: "Investiții inițiale pentru IMM-uri în parcuri de specializare inteligentă",
    program: "Program Regional Nord-Vest",
    status: "Deschis",
    audience: "IMM-uri eligibile din parcuri de specializare inteligentă",
    summary: "Sprijin pentru dezvoltarea unor investiții inițiale în cadrul parcurilor de specializare inteligentă din Regiunea Nord-Vest.",
    sourceUrl: "https://resurse.mysmis2021.gov.ro/ords/repo_bo/r/mysmis-2021/finantari-programe-2021-2027?clear=CR%2C%2CY&ir%5Bapeluri%5D_po=Program+Regional+Nord-Vest",
    lastVerified: "2 iulie 2026"
  }
];

export const fundingProgramOptions = [
  {
    value: UNKNOWN_FUNDING_PROGRAM,
    label: "Nu știu încă / doresc identificarea programului"
  },
  ...fundingPrograms.map((program) => ({
    value: program.id,
    label: `${program.code} - ${program.title}`
  }))
] as const;

export function getFundingProgram(programId: string | undefined) {
  return fundingPrograms.find((program) => program.id === programId);
}

export function getFundingProgramLabel(programId: string | undefined) {
  if (!programId || programId === UNKNOWN_FUNDING_PROGRAM) {
    return "Program neidentificat încă";
  }

  const program = getFundingProgram(programId);
  return program ? `${program.code} - ${program.title}` : "Program indicat de solicitant";
}
