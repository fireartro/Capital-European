import { FileCheck2 } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <span className={`brand ${compact ? "brand-compact" : ""}`}>
      <span className="brand-symbol"><FileCheck2 aria-hidden="true" /></span>
      <span>{siteConfig.namePrefix}<strong>{siteConfig.nameAccent}</strong></span>
    </span>
  );
}
