import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.description,
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait-primary",
    background_color: "#ffffff",
    theme_color: "#003399",
    lang: "ro",
    categories: ["business", "productivity"],
    icons: [
      { src: new URL("/icon", siteConfig.url).toString(), sizes: "32x32", type: "image/png" },
      { src: new URL("/icon", siteConfig.url).toString(), sizes: "any", type: "image/png", purpose: "maskable" }
    ]
  };
}
