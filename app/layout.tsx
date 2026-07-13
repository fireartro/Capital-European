import type { Metadata, Viewport } from "next";
import "./globals.css";
import "./interaction-fixes.css";
import { ServiceWorkerCleanup } from "@/components/service-worker-cleanup";
import { CookieBanner } from "@/components/cookie-banner";
import { siteConfig } from "@/lib/site-config";
import { JsonLd, organizationSchema, webSiteSchema } from "@/lib/structured-data";

const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_ID || "G-JJDLTV4VX9";
const googleTagManagerId = process.env.NEXT_PUBLIC_GTM_ID;
const clarityProjectId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID;

const splitCriticalCss = `
.split-landing{position:relative;min-height:0;overflow:hidden;color:#fff;background:linear-gradient(145deg,#06142f 0%,#052469 56%,#003399 100%)}
.landing-intro{position:relative;z-index:2;text-align:center}
.landing-intro h1{margin:0;color:#fff;font-weight:780;line-height:1.12;letter-spacing:0}
.split-grid{position:relative;z-index:2;display:grid}
.choice-card{position:relative;overflow:hidden}
`;

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `Consultanță fonduri europene și servicii administrative | ${siteConfig.name}`,
    template: `%s | ${siteConfig.name}`
  },
  description: siteConfig.description,
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  applicationName: siteConfig.name,
  category: "business",
  openGraph: {
    type: "website",
    locale: "ro_RO",
    siteName: siteConfig.name,
    url: siteConfig.url,
    title: `Consultanță fonduri europene și servicii administrative | ${siteConfig.name}`,
    description: siteConfig.description,
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
    title: `Consultanță fonduri europene și servicii administrative | ${siteConfig.name}`,
    description: siteConfig.description,
    images: [siteConfig.defaultOgImage]
  },
  icons: {
    icon: "/icon",
    apple: [{ url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }]
  },
  manifest: "/manifest.webmanifest"
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#003399",
  colorScheme: "light"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ro" data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <style id="critical-split-css" dangerouslySetInnerHTML={{ __html: splitCriticalCss }} />
      </head>
      <body>
        <JsonLd data={organizationSchema()} />
        <JsonLd data={webSiteSchema()} />
        <CookieBanner
          googleAnalyticsId={googleAnalyticsId}
          googleTagManagerId={googleTagManagerId}
          clarityProjectId={clarityProjectId}
        />
        {children}
        <ServiceWorkerCleanup />
      </body>
    </html>
  );
}
