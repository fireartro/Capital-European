import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";
import { getManagedContent } from "@/lib/content-store";
import { publishedAnnouncements } from "@/lib/managed-content";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const content = await getManagedContent();
  const actualDate = (value: string) => {
    const date = new Date(value);
    return Number.isFinite(date.getTime()) && date.getTime() <= Date.now() ? date : undefined;
  };
  const cmsUpdatedAt = actualDate(content.updatedAt);
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
    ...(["/fonduri-europene", "/anunturi", "/contact"].includes(path) && cmsUpdatedAt
      ? { lastModified: cmsUpdatedAt } : {})
  }));
  const announcements = publishedAnnouncements(content).map((announcement) => {
    const lastModified = actualDate(announcement.updatedAt);
    return {
      url: `${siteConfig.url}/anunturi/${announcement.slug}`,
      ...(lastModified ? { lastModified } : {})
    };
  });

  return [...staticRoutes, ...announcements];
}
