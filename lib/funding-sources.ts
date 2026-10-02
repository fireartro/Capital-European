const authorityDomains = [
  "gov.ro",
  "afir.ro",
  "afm.ro",
  "adrnordvest.ro",
  "regionordvest.ro",
  "adrcentru.ro",
  "regiocentru.ro",
  "adrnordest.ro",
  "regionordest.ro",
  "adrse.ro",
  "regiosudest.ro",
  "adrbi.ro",
  "regiobucuresti-ilfov.ro",
  "adrvest.ro",
  "adrmuntenia.ro",
  "adroltenia.ro",
  "adr.gov.ro",
  "fonduri-ue.ro",
  "fonduri.mt.ro",
  "ampeste.ro",
  "legislatie.just.ro",
  "europa.eu"
] as const;

export const fundingSourceLabels = {
  guide: "Ghid oficial",
  consultation: "Consultare publică",
  authority: "Informații de la autoritate",
  legislation: "Act normativ",
  archive: "Documentație istorică"
} as const;

export type FundingSourceKind = keyof typeof fundingSourceLabels;

export function getOfficialFundingSource(value: string): string | null {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.username || url.password || url.port) return null;
    const hostname = url.hostname.toLowerCase();
    return (hostname === "adr-bi.eventya.net" || authorityDomains.some((domain) => hostname === domain || hostname.endsWith(`.${domain}`)))
      ? url.href
      : null;
  } catch {
    return null;
  }
}
