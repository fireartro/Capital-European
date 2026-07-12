import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(siteConfig.lastUpdated);
  const routes = [
    "",
    "/fonduri-europene",
    "/consultanta-fonduri-europene",
    "/fonduri-europene-pentru-firme",
    "/fonduri-europene-pentru-ong",
    "/fonduri-europene-pentru-startup",
    "/servicii-administrative",
    "/servicii-administrative/secretariat",
    "/servicii-administrative/administrare-documente",
    "/servicii-administrative/infiintare-pfa-srl",
    "/servicii-administrative/infiintare-pfa",
    "/servicii-administrative/infiintare-srl",
    "/contact",
    "/despre",
    "/intrebari",
    "/confidentialitate",
    "/termeni",
    "/cookies"
  ];
  return routes.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified
  }));
}
