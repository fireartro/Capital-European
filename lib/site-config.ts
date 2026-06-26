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

export const siteConfig = {
  name: "Capital European",
  namePrefix: "Capital ",
  nameAccent: "European",
  tagline: "Creăm astăzi succesul de mâine",
  description:
    "Consultanță pentru fonduri europene și servicii administrative complete pentru antreprenori, ONG-uri și companii.",
  url: resolvedSiteUrl,
  defaultOgImage: "/opengraph-image",
  officialResources: {
    mipe: "https://mfe.gov.ro/",
    fonduriUe: "https://www.fonduri-ue.ro/",
    pnrr: "https://pnrr.gov.ro/"
  },
  lastUpdated: "2026-06-26",
  email: "contact@capitaleuropean.ro",
  phoneDisplay: "",
  phoneHref: "",
  whatsappNumber: "",
  address: "Cluj-Napoca, România",
  schedule: "L–V · 08:00–18:00",
  navigation: [
    { label: "Acasă", href: "/" },
    { label: "Fonduri europene", href: "/fonduri-europene" },
    { label: "Servicii administrative", href: "/servicii-administrative" },
    { label: "Despre", href: "/despre" },
    { label: "Întrebări", href: "/intrebari" },
    { label: "Contact", href: "/contact" }
  ],
  sameAs: []
} as const;

export function getWhatsAppUrl(message = "Bună ziua! Doresc mai multe informații despre serviciile oferite.") {
  if (!siteConfig.whatsappNumber) return "";
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
