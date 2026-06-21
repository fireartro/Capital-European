import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(siteConfig.lastUpdated);
  const routes: Array<{
    path: string;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
    priority: number;
  }> = [
    { path: "", changeFrequency: "monthly", priority: 1 },
    { path: "/fonduri-europene", changeFrequency: "monthly", priority: 0.9 },
    { path: "/servicii-administrative", changeFrequency: "monthly", priority: 0.9 },
    { path: "/contact", changeFrequency: "monthly", priority: 0.8 },
    { path: "/despre", changeFrequency: "yearly", priority: 0.6 },
    { path: "/intrebari", changeFrequency: "yearly", priority: 0.6 },
    { path: "/confidentialitate", changeFrequency: "yearly", priority: 0.2 },
    { path: "/termeni", changeFrequency: "yearly", priority: 0.2 },
    { path: "/cookies", changeFrequency: "yearly", priority: 0.2 }
  ];
  return routes.map((route) => ({
    url: `${siteConfig.url}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority
  }));
}
