import type { NextConfig } from "next";

const isDevelopment = process.env.NODE_ENV === "development";
const hasGoogleAnalytics = Boolean(process.env.NEXT_PUBLIC_GA_ID);

const securityHeaders = [
  { key: "X-DNS-Prefetch-Control", value: "on" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), payment=()" },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Cross-Origin-Resource-Policy", value: "same-origin" },
  { key: "X-Permitted-Cross-Domain-Policies", value: "none" },
  ...(!isDevelopment ? [{
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors 'none'",
      "object-src 'none'",
      "frame-src 'none'",
      `img-src 'self' data: blob:${hasGoogleAnalytics ? " https://www.google-analytics.com https://www.googletagmanager.com" : ""}`,
      "font-src 'self' data:",
      "style-src 'self' 'unsafe-inline'",
      `script-src 'self' 'unsafe-inline'${hasGoogleAnalytics ? " https://www.googletagmanager.com" : ""}`,
      `connect-src 'self'${hasGoogleAnalytics ? " https://www.google-analytics.com https://region1.google-analytics.com" : ""}`,
      "manifest-src 'self'",
      "media-src 'self'",
      "worker-src 'self' blob:",
      "upgrade-insecure-requests"
    ].join("; ")
  }] : [])
];

const nextConfig: NextConfig = {
  distDir: isDevelopment ? ".next-dev" : ".next",
  allowedDevOrigins: ["127.0.0.1", "::1", "desktop"],
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,
  experimental: {
    sri: {
      algorithm: "sha256"
    }
  },
  async headers() {
    return [
      {
        source: "/sw.js",
        headers: [
          { key: "Cache-Control", value: "no-cache, no-store, must-revalidate" },
          { key: "Service-Worker-Allowed", value: "/" },
          ...securityHeaders
        ]
      },
      { source: "/(.*)", headers: securityHeaders }
    ];
  },
  async redirects() {
    return [
      {
        source: "/birotica",
        destination: "/servicii-administrative",
        permanent: true
      }
    ];
  }
};

export default nextConfig;
