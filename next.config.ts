import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV === "development";
const googleAnalyticsId = process.env.NEXT_PUBLIC_GA_ID || "G-JJDLTV4VX9";
const hasGoogleAnalytics = Boolean(googleAnalyticsId);
const hasGoogleTagManager = Boolean(process.env.NEXT_PUBLIC_GTM_ID);
const hasClarity = Boolean(process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID);
const hasGoogleTracking = hasGoogleAnalytics || hasGoogleTagManager;

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
  ...(!isDevelopment ? [
    { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
    {
      key: "Content-Security-Policy",
      value: [
        "default-src 'self'",
        "base-uri 'self'",
        "form-action 'self'",
        "frame-ancestors 'none'",
        "object-src 'none'",
        "frame-src https://www.google.com https://maps.google.com",
        `img-src 'self' data: blob: https://lh3.googleusercontent.com https://*.public.blob.vercel-storage.com${hasGoogleTracking ? " https://www.google-analytics.com https://www.googletagmanager.com" : ""}${hasClarity ? " https://www.clarity.ms https://*.clarity.ms https://c.bing.com" : ""}`,
        "font-src 'self' data:",
        "style-src 'self' 'unsafe-inline'",
        `script-src 'self' 'unsafe-inline'${hasGoogleTracking ? " https://www.googletagmanager.com" : ""}${hasClarity ? " https://www.clarity.ms" : ""}`,
        `connect-src 'self'${hasGoogleTracking ? " https://www.google-analytics.com https://region1.google-analytics.com https://www.googletagmanager.com" : ""}${hasClarity ? " https://www.clarity.ms https://*.clarity.ms https://c.bing.com" : ""}`,
        "manifest-src 'self'",
        "media-src 'self'",
        "worker-src 'self' blob:"
      ].join("; ")
    }
  ] : [])
];

const nextConfig: NextConfig = {
  distDir: isDevelopment ? ".next-dev" : ".next",
  allowedDevOrigins: ["127.0.0.1", "::1", "desktop"],
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  experimental: {
    inlineCss: true,
    optimizePackageImports: ["lucide-react"]
  },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [55, 75],
    remotePatterns: [
      { protocol: "https", hostname: "lh3.googleusercontent.com" },
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" }
    ]
  },
  async headers() {
    return [
      { source: "/(.*)", headers: securityHeaders },
      {
        source: "/sw.js",
        headers: [
          { key: "Cache-Control", value: "no-store, no-cache, must-revalidate, proxy-revalidate" }
        ]
      }
    ];
  },
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.capitaleuropean.ro" }],
        destination: "https://capitaleuropean.ro/:path*",
        permanent: true
      },
      {
        source: "/birotica",
        destination: "/servicii-administrative",
        permanent: true
      },
      {
        source: "/calculator-pret-consultanta",
        destination: "/consultanta-fonduri-europene",
        permanent: true
      },
      {
        source: "/infiintare-firma",
        destination: "/servicii-administrative/infiintare-firma",
        permanent: true
      },
      {
        source: "/infiintare-pfa",
        destination: "/servicii-administrative/infiintare-pfa",
        permanent: true
      },
      {
        source: "/infiintare-srl",
        destination: "/servicii-administrative/infiintare-srl",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
