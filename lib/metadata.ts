import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";

export function createPageMetadata({
  title,
  description = siteConfig.description,
  path
}: {
  title?: string;
  description?: string;
  path: string;
}): Metadata {
  const resolvedTitle = title
    ? title.includes(siteConfig.name) ? title : `${title} | ${siteConfig.name}`
    : `${siteConfig.name} | Fonduri europene & servicii administrative`;

  return {
    title: {
      absolute: resolvedTitle
    },
    description,
    alternates: {
      canonical: path,
      languages: {
        "ro-RO": path,
        "x-default": path
      }
    },
    openGraph: {
      type: "website",
      locale: "ro_RO",
      siteName: siteConfig.name,
      url: path,
      title: resolvedTitle,
      description,
      images: [
        {
          url: siteConfig.defaultOgImage,
          width: 1200,
          height: 630,
          alt: `${siteConfig.name} - consultanță fonduri europene și servicii administrative externalizate`
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
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1
      }
    }
  };
}
