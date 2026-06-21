import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const alt = `${siteConfig.name} — fonduri europene și servicii administrative`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        padding: 80,
        color: "white",
        background: "#071d38",
        fontFamily: "sans-serif"
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 34, fontWeight: 800 }}>
          <div style={{ display: "flex", width: 58, height: 58, alignItems: "center", justifyContent: "center", borderRadius: 14, color: "#071d38", background: "#63d4e7" }}>P</div>
          {siteConfig.name}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ maxWidth: 930, fontSize: 72, lineHeight: 1.05, fontWeight: 800, letterSpacing: 0 }}>
            Două direcții. Un singur partener de încredere.
          </div>
          <div style={{ marginTop: 28, color: "#a9bfd3", fontSize: 28 }}>
            Servicii administrative · Documente · Fonduri europene
          </div>
        </div>
      </div>
    </div>,
    size
  );
}
