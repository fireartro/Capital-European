function normalizeSiteUrl(value?: string) {
  if (!value) return "";
  const trimmed = value.trim();
  if (!trimmed) return "";
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  return withProtocol.replace(/\/$/, "");
}

const resolvedSiteUrl =
  normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL) ||
  "https://capitaleuropean.ro";

function publicValue(value?: string) {
  return value?.trim() || "";
}

function normalizeRomanianPhone(value: string) {
  const digits = value.replace(/\D/g, "");
  const normalizedDigits = digits.startsWith("0") ? `40${digits.slice(1)}` : digits;

  return normalizedDigits.startsWith("40") ? normalizedDigits : "";
}

function formatRomanianPhone(digits: string) {
  if (digits.length !== 11 || !digits.startsWith("40")) return "";
  return `+40 ${digits.slice(2, 5)} ${digits.slice(5, 8)} ${digits.slice(8)}`;
}

const legalEntityName = publicValue(process.env.NEXT_PUBLIC_LEGAL_ENTITY_NAME);
const registrationNumber = publicValue(process.env.NEXT_PUBLIC_REGISTRATION_NUMBER);
const taxId = publicValue(process.env.NEXT_PUBLIC_TAX_ID);
const registeredOffice = publicValue(process.env.NEXT_PUBLIC_REGISTERED_OFFICE) || "Satu Mare, Piața Soarelui, Bl. UU6, Ap. 9";
const workingOffice = publicValue(process.env.NEXT_PUBLIC_WORKING_OFFICE) || "Seini, Piața Unirii nr. 2";
const secondaryOffice = publicValue(process.env.NEXT_PUBLIC_SECONDARY_OFFICE) || "Cluj-Napoca, Strada Oltului nr. 1";
const contactEmail = publicValue(process.env.NEXT_PUBLIC_CONTACT_EMAIL) || "contact@capitaleuropean.ro";
const phoneDigits =
  normalizeRomanianPhone(publicValue(process.env.NEXT_PUBLIC_PHONE_HREF)) ||
  normalizeRomanianPhone(publicValue(process.env.NEXT_PUBLIC_PHONE_DISPLAY)) ||
  "40753527110";
const phoneDisplay = formatRomanianPhone(phoneDigits) || "+40 753 527 110";
const phoneHref = `+${phoneDigits}`;
const whatsappNumber =
  normalizeRomanianPhone(publicValue(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER)) ||
  phoneDigits;
const businessAddress = publicValue(process.env.NEXT_PUBLIC_BUSINESS_ADDRESS);
const googleBusinessUrl =
  publicValue(process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_URL) ||
  "https://www.google.com/maps?cid=14253260384950460462";
const primaryOffice = registeredOffice || businessAddress;

function googleMapsSearchUrl(address: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
}

const locations = [
  { label: "Sediu social", address: primaryOffice, mapsUrl: googleBusinessUrl },
  { label: "Punct de lucru", address: workingOffice, mapsUrl: googleMapsSearchUrl(workingOffice) },
  { label: "Locație administrativă", address: secondaryOffice, mapsUrl: googleMapsSearchUrl(secondaryOffice) }
].filter((location): location is { label: string; address: string; mapsUrl: string } => Boolean(location.address));
const mapEmbedUrl = primaryOffice
  ? `https://www.google.com/maps?q=${encodeURIComponent(primaryOffice)}&output=embed`
  : "";
const businessSchedule = publicValue(process.env.NEXT_PUBLIC_BUSINESS_SCHEDULE) || "L-V · 10:00-18:00";
const socialProfiles = [
  publicValue(process.env.NEXT_PUBLIC_FACEBOOK_URL),
  publicValue(process.env.NEXT_PUBLIC_INSTAGRAM_URL),
  publicValue(process.env.NEXT_PUBLIC_LINKEDIN_URL)
].filter((value): value is string => Boolean(value && /^https:\/\//i.test(value)));

export const siteConfig = {
  name: "Capital European",
  namePrefix: "Capital ",
  nameAccent: "European",
  tagline: "Fonduri europene și servicii administrative",
  description: "Capital European oferă două direcții distincte: consultanță pentru fonduri europene și servicii administrative pentru documente, secretariat, back-office și înființare PFA sau SRL.",
  url: resolvedSiteUrl,
  defaultOgImage: "/opengraph-image",
  officialResources: {
    mipe: "https://mfe.gov.ro/",
    fonduriUe: "https://www.fonduri-ue.ro/",
    pnrr: "https://pnrr.gov.ro/"
  },
  lastUpdated: "2026-07-13",
  email: contactEmail,
  phoneDisplay,
  phoneHref,
  whatsappNumber,
  address: primaryOffice,
  locations,
  schedule: businessSchedule,
  googleBusiness: {
    url: googleBusinessUrl,
    mapEmbedUrl
  },
  legal: {
    entityName: legalEntityName,
    registrationNumber,
    taxId,
    registeredOffice,
    workingOffice,
    secondaryOffice,
    isComplete: Boolean(legalEntityName && registrationNumber && taxId && registeredOffice)
  },
  navigation: [
    { label: "Acasă", href: "/" },
    { label: "Fonduri europene", href: "/fonduri-europene" },
    { label: "Servicii administrative", href: "/servicii-administrative" },
    { label: "Despre", href: "/despre" },
    { label: "Întrebări", href: "/intrebari" },
    { label: "Contact", href: "/contact" }
  ],
  sameAs: [...socialProfiles, googleBusinessUrl]
} as const;

export function getWhatsAppUrl(message = "Bună ziua! Aș dori să discut despre serviciile Capital European.") {
  if (!siteConfig.whatsappNumber) return "";
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
