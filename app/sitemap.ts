import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getManagedContent } from "@/lib/content-store";
import { publishedAnnouncements } from "@/lib/managed-content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
    "/servicii-administrative/infiintare-firma",
    "/servicii-administrative/infiintare-pfa",
    "/servicii-administrative/infiintare-srl",
    "/anunturi",
    "/contact",
    "/despre",
    "/intrebari"
  ];
  const staticRoutes = routes.map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified
  }));
  const announcements = publishedAnnouncements(await getManagedContent()).map((announcement) => ({
    url: `${siteConfig.url}/anunturi/${announcement.slug}`,
    lastModified: new Date(announcement.updatedAt)
  }));

  return [...staticRoutes, ...announcements];
}
