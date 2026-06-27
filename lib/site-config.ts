function normalizeSiteUrl(value?: string) {
  if (!value) return "";
  const trimmed = value.trim();
  if (!trimmed) return "";
  const withProtocol = /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
  return withProtocol.replace(/\/$/, "");
}

const resolvedSiteUrl =
  normalizeSiteUrl(process.env.NEXT_PUBLIC_SITE_URL) ||
  normalizeSiteUrl(process.env.VERCEL_PROJECT_PRODUCTION_URL) ||
  normalizeSiteUrl(process.env.VERCEL_URL) ||
  "https://capitaleuropean.ro";

function publicValue(value?: string) {
  return value?.trim() || "";
}

const legalEntityName = publicValue(process.env.NEXT_PUBLIC_LEGAL_ENTITY_NAME);
const registrationNumber = publicValue(process.env.NEXT_PUBLIC_REGISTRATION_NUMBER);
const taxId = publicValue(process.env.NEXT_PUBLIC_TAX_ID);
const registeredOffice = publicValue(process.env.NEXT_PUBLIC_REGISTERED_OFFICE);
const contactEmail = publicValue(process.env.NEXT_PUBLIC_CONTACT_EMAIL) || "contact@capitaleuropean.ro";
const phoneDisplay = publicValue(process.env.NEXT_PUBLIC_PHONE_DISPLAY);
const phoneHref = publicValue(process.env.NEXT_PUBLIC_PHONE_HREF);
const whatsappNumber = publicValue(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER).replace(/\D/g, "");
const businessAddress = publicValue(process.env.NEXT_PUBLIC_BUSINESS_ADDRESS);
const businessSchedule = publicValue(process.env.NEXT_PUBLIC_BUSINESS_SCHEDULE);
const socialProfiles = [
  publicValue(process.env.NEXT_PUBLIC_FACEBOOK_URL),
  publicValue(process.env.NEXT_PUBLIC_INSTAGRAM_URL),
  publicValue(process.env.NEXT_PUBLIC_LINKEDIN_URL)
].filter((value): value is string => Boolean(value && /^https:\/\//i.test(value)));

export const siteConfig = {
  name: "Capital European",
  namePrefix: "Capital ",
  nameAccent: "European",
  tagline: "Consultanță și administrare, cu pași clari",
  description: "Capital European oferă consultanță pentru fonduri europene și servicii administrative externalizate pentru firme și ONG-uri din România: eligibilitate, documentație, implementare, secretariat și back-office.",
  url: resolvedSiteUrl,
  defaultOgImage: "/opengraph-image",
  officialResources: {
    mipe: "https://mfe.gov.ro/",
    fonduriUe: "https://www.fonduri-ue.ro/",
    pnrr: "https://pnrr.gov.ro/"
  },
  lastUpdated: "2026-06-27",
  email: contactEmail,
  phoneDisplay,
  phoneHref,
  whatsappNumber,
  address: businessAddress,
  schedule: businessSchedule,
  legal: {
    entityName: legalEntityName,
    registrationNumber,
    taxId,
    registeredOffice,
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
  sameAs: socialProfiles
} as const;

export function getWhatsAppUrl(message = "Bună ziua! Aș dori să discut despre serviciile Capital European.") {
  if (!siteConfig.whatsappNumber) return "";
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
