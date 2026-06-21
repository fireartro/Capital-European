export const siteConfig = {
  name: "ProBirou",
  namePrefix: "Pro",
  nameAccent: "Birou",
  tagline: "Consultanță și servicii administrative",
  description:
    "Consultanță pentru fonduri europene și servicii administrative complete pentru antreprenori, ONG-uri și companii.",
  url: "https://probirou.ro",
  defaultOgImage: "/opengraph-image",
  officialResources: {
    mipe: "https://mfe.gov.ro/",
    fonduriUe: "https://www.fonduri-ue.ro/",
    pnrr: "https://pnrr.gov.ro/"
  },
  lastUpdated: "2026-06-19",
  email: "contact@probirou.ro",
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
