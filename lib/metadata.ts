import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export function createPageMetadata({
  title,
  description = siteConfig.description,
  path,
  index = true
}: {
  title?: string;
  description?: string;
  path: string;
  index?: boolean;
}): Metadata {
  const resolvedTitle = title
    ? title.includes(siteConfig.name) ? title : `${title} | ${siteConfig.name}`
    : `Consultanță fonduri europene și servicii administrative | ${siteConfig.name}`;

  const absoluteUrl = new URL(path, siteConfig.url).toString();

  return {
    title: {
      absolute: resolvedTitle
    },
    description,
    alternates: {
      canonical: absoluteUrl,
      languages: {
        "ro-RO": absoluteUrl,
        "x-default": absoluteUrl
      }
    },
    openGraph: {
      type: "website",
      locale: "ro_RO",
      siteName: siteConfig.name,
      url: absoluteUrl,
      title: resolvedTitle,
      description,
      images: [
        {
          url: siteConfig.defaultOgImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} - consultanță fonduri europene și servicii administrative`
        }
      ]
    },
    twitter: {
      card: "summary_large_image",
      title: resolvedTitle,
      description,
      images: [siteConfig.defaultOgImage]
    },
    robots: {
      index,
      follow: true,
      googleBot: {
        index,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1
      }
    }
  };
}
