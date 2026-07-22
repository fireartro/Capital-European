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

export function getFundingProgram(programId: string | undefined, programs: readonly FundingProgram[]) {
  return programs.find((program) => program.id === programId);
}

export function getFundingProgramLabel(programId: string | undefined, programs: readonly FundingProgram[]) {
  if (!programId || programId === UNKNOWN_FUNDING_PROGRAM) {
    return "Program neidentificat încă";
  }

  const program = getFundingProgram(programId, programs);
  return program ? program.title : "Program indicat de solicitant";
}
