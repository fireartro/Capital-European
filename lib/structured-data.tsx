import { siteConfig } from "@/lib/site-config";

type JsonObject = Record<string, unknown>;

function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
}

function postalAddress(address: string): JsonObject {
  const parts = address.split(",").map((part) => part.trim()).filter(Boolean);

  if (parts.length < 2) {
    return {
      "@type": "PostalAddress",
      streetAddress: address,
      addressCountry: "RO"
    };
  }

  return {
    "@type": "PostalAddress",
    streetAddress: parts.slice(1).join(", "),
    addressLocality: parts[0],
    addressCountry: "RO"
  };
}

function sanitizeJsonLd(data: JsonObject | JsonObject[]) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

export function JsonLd({ data }: { data: JsonObject | JsonObject[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: sanitizeJsonLd(data) }}
    />
  );
}

export function organizationSchema(): JsonObject {
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteConfig.url}#organization`,
        name: siteConfig.name,
        ...(siteConfig.legal.entityName ? { legalName: siteConfig.legal.entityName } : {}),
        ...(siteConfig.legal.taxId ? { taxID: siteConfig.legal.taxId } : {}),
        ...(siteConfig.legal.registrationNumber ? {
          identifier: {
            "@type": "PropertyValue",
            propertyID: "Registrul Comerțului",
            value: siteConfig.legal.registrationNumber
          }
        } : {}),
        url: siteConfig.url,
        inLanguage: "ro-RO",
        slogan: siteConfig.tagline,
        logo: {
          "@type": "ImageObject",
          url: absoluteUrl("/images/Consultanta-Fonduri-Europene-si-Servicii-Administrari-firme-2.webp"),
          width: 700,
          height: 344
        },
        email: siteConfig.email,
        ...(siteConfig.phoneHref ? { telephone: siteConfig.phoneHref } : {}),
        contactPoint: {
          "@type": "ContactPoint",
          contactType: "customer service",
          email: siteConfig.email,
          ...(siteConfig.phoneHref ? { telephone: siteConfig.phoneHref } : {}),
          availableLanguage: ["ro"]
        },
        ...(siteConfig.address ? { address: postalAddress(siteConfig.address) } : {}),
        sameAs: siteConfig.sameAs.length > 0 ? [...siteConfig.sameAs] : undefined,
        knowsAbout: [
          "Fonduri europene",
          "Consultanță fonduri europene",
          "Fonduri nerambursabile pentru firme",
          "Fonduri europene pentru IMM-uri",
          "Fonduri europene pentru ONG-uri",
          "Fonduri europene pentru startup-uri",
          "Verificare eligibilitate și punctaj",
          "Consultanță PNRR",
          "Cereri de finanțare nerambursabilă",
          "Servicii administrative externalizate",
          "Secretariat externalizat",
          "Administrare documente",
          "Înființare firmă",
          "Înființare PFA",
          "Înființare SRL",
          "Back-office externalizat"
        ]
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteConfig.url}#local-business`,
        name: siteConfig.name,
        ...(siteConfig.legal.entityName ? { legalName: siteConfig.legal.entityName } : {}),
        ...(siteConfig.legal.taxId ? { taxID: siteConfig.legal.taxId } : {}),
        url: siteConfig.url,
        inLanguage: "ro-RO",
        description: siteConfig.description,
        slogan: siteConfig.tagline,
        image: absoluteUrl(siteConfig.defaultOgImage),
        email: siteConfig.email,
        ...(siteConfig.phoneHref ? { telephone: siteConfig.phoneHref } : {}),
        ...(siteConfig.address ? { address: postalAddress(siteConfig.address) } : {}),
        parentOrganization: { "@id": `${siteConfig.url}#organization` },
        areaServed: { "@type": "Country", name: "România" },
        sameAs: [siteConfig.googleBusiness.url],
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Serviciile Capital European",
          itemListElement: [
            {
              "@type": "OfferCatalog",
              name: "Consultanță fonduri europene",
              itemListElement: [{
                "@type": "Offer",
                itemOffered: {
                  "@type": "Service",
                  name: "Consultanță fonduri europene",
                  description: "Analiză de eligibilitate, pregătire documentație, depunere cereri de finanțare și implementare proiecte cu fonduri europene.",
                  url: absoluteUrl("/consultanta-fonduri-europene")
                }
              }]
            },
            {
              "@type": "OfferCatalog",
              name: "Servicii administrative",
              itemListElement: [
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Înființare firmă",
                    description: "Orientare administrativă între PFA și SRL, organizarea informațiilor și pregătirea dosarului de înregistrare.",
                    url: absoluteUrl("/servicii-administrative/infiintare-firma")
                  }
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Servicii administrative externalizate",
                    description: "Secretariat extern, procesare documente, back-office și organizare operațională pentru firme.",
                    url: absoluteUrl("/servicii-administrative")
                  }
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Înființare PFA",
                    description: "Sprijin administrativ pentru informațiile, actele și pașii necesari înființării unui PFA.",
                    url: absoluteUrl("/servicii-administrative/infiintare-pfa")
                  }
                },
                {
                  "@type": "Offer",
                  itemOffered: {
                    "@type": "Service",
                    name: "Înființare SRL",
                    description: "Sprijin administrativ pentru informațiile, actele și pașii necesari înființării unui SRL.",
                    url: absoluteUrl("/servicii-administrative/infiintare-srl")
                  }
                }
              ]
            }
          ]
        }
      }
    ]
  };
}

export function webSiteSchema(): JsonObject {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}#website`,
    name: siteConfig.name,
    url: siteConfig.url,
    inLanguage: "ro-RO",
    publisher: {
      "@id": `${siteConfig.url}#organization`
    }
  };
}

export function breadcrumbSchema(items: Array<{ name: string; path: string }>): JsonObject {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path)
    }))
  };
}

export function serviceSchema({
  name,
  description,
  path,
  serviceType
}: {
  name: string;
  description: string;
  path: string;
  serviceType: string | string[];
}): JsonObject {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${absoluteUrl(path)}#service`,
    name,
    description,
    serviceType,
    inLanguage: "ro-RO",
    url: absoluteUrl(path),
    image: absoluteUrl(siteConfig.defaultOgImage),
    provider: {
      "@id": `${siteConfig.url}#organization`
    },
    areaServed: {
      "@type": "Country",
      name: "România"
    }
  };
}

export function faqSchema(questions: readonly (readonly [string, string])[]): JsonObject {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: questions.map(([question, answer]) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: {
        "@type": "Answer",
        text: answer
      }
    }))
  };
}
