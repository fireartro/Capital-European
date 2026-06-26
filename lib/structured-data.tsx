import { siteConfig } from "@/lib/site-config";

type JsonObject = Record<string, unknown>;

function absoluteUrl(path = "/") {
  return new URL(path, siteConfig.url).toString();
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
        url: siteConfig.url,
        logo: absoluteUrl("/icon"),
        email: siteConfig.email,
        ...(siteConfig.phoneHref ? { telephone: siteConfig.phoneHref } : {}),
        sameAs: siteConfig.sameAs
      },
      {
        "@type": ["LocalBusiness", "ProfessionalService"],
        "@id": `${siteConfig.url}#local-business`,
        name: siteConfig.name,
        url: siteConfig.url,
        image: absoluteUrl(siteConfig.defaultOgImage),
        email: siteConfig.email,
        ...(siteConfig.phoneHref ? { telephone: siteConfig.phoneHref } : {}),
        address: {
          "@type": "PostalAddress",
          addressLocality: "Cluj-Napoca",
          addressCountry: "RO"
        },
        areaServed: {
          "@type": "Country",
          name: "Romania"
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Servicii Capital European",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Consultanță fonduri europene",
                url: absoluteUrl("/fonduri-europene")
              }
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Servicii administrative externalizate",
                url: absoluteUrl("/servicii-administrative")
              }
            }
          ]
        },
        openingHours: "Mo-Fr 08:00-18:00",
        priceRange: "$$"
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
    url: absoluteUrl(path),
    image: absoluteUrl(siteConfig.defaultOgImage),
    provider: {
      "@id": `${siteConfig.url}#organization`
    },
    areaServed: {
      "@type": "Country",
      name: "Romania"
    }
  };
}

export function professionalServiceSchema({
  path,
  description,
  serviceName
}: {
  path: string;
  description: string;
  serviceName: string | string[];
}): JsonObject {
  const url = absoluteUrl(path);
  const serviceNames = Array.isArray(serviceName) ? serviceName : [serviceName];

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${url}#professional-service`,
    name: siteConfig.name,
    url,
    description,
    image: absoluteUrl(siteConfig.defaultOgImage),
    email: siteConfig.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Cluj-Napoca",
      addressCountry: "RO"
    },
    areaServed: {
      "@type": "Country",
      name: "România"
    },
    makesOffer: serviceNames.map((name) => ({
      "@type": "Offer",
      itemOffered: {
        "@type": "Service",
        name,
        serviceType: name,
        url: name === "Servicii administrative" ? absoluteUrl("/servicii-administrative") : url,
        provider: {
          "@id": `${siteConfig.url}#organization`
        }
      }
    }))
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
