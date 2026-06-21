import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "./globals.css";
import { siteConfig } from "@/lib/site-config";
import { JsonLd, organizationSchema } from "@/lib/structured-data";

const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_ID;

const splitCriticalCss = `
.split-landing{position:relative;min-height:100svh;overflow:hidden;color:#fff;background:linear-gradient(145deg,#06142f 0%,#052469 56%,#003399 100%)}
.landing-intro{position:relative;z-index:2;text-align:center}
.landing-intro h1{margin:0;color:#fff;font-weight:780;line-height:1.02;letter-spacing:0}
.split-grid{position:relative;z-index:2;display:grid}
.choice-card{position:relative;overflow:hidden}
`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | Fonduri europene & servicii administrative`,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  keywords: [
    "servicii administrative externalizate",
    "secretariat externalizat",
    "administrare documente",
    "asistență administrativă",
    "consultanță fonduri europene",
    "fonduri europene firme",
    "finanțare nerambursabilă",
    "Cluj-Napoca"
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  applicationName: siteConfig.name,
  category: "business",
  openGraph: {
    type: "website",
    locale: "ro_RO",
    siteName: siteConfig.name,
    url: siteConfig.url,
    title: `${siteConfig.name} | Fonduri europene & servicii administrative`,
    description: siteConfig.description,
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
    title: `${siteConfig.name} | Fonduri europene & servicii administrative`,
    description: siteConfig.description,
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
  },
  icons: {
    icon: new URL("/icon", siteConfig.url).toString(),
    apple: new URL("/icon", siteConfig.url).toString()
  },
  manifest: new URL("/manifest.webmanifest", siteConfig.url).toString()
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#003399",
  colorScheme: "light"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ro">
      <head>
        <style id="critical-split-css" dangerouslySetInnerHTML={{ __html: splitCriticalCss }} />
      </head>
      <body>
        <JsonLd data={organizationSchema()} />
        {children}
        {googleAnalyticsId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
              strategy="lazyOnload"
            />
            <Script id="google-analytics" strategy="lazyOnload">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${googleAnalyticsId}', { anonymize_ip: true });
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
