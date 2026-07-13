import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site-config";

export const alt = `${siteConfig.name} — consultanță fonduri europene și servicii administrative`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "72px 80px",
        background: "linear-gradient(145deg, #06142f 0%, #052469 56%, #003399 100%)",
        fontFamily: "sans-serif",
        color: "#fff",
        position: "relative"
      }}
    >
      {/* Grid overlay subtle */}
      <div style={{
        position: "absolute", inset: 0, opacity: 0.06,
        backgroundImage: "linear-gradient(rgba(255,255,255,.7) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.7) 1px, transparent 1px)",
        backgroundSize: "72px 72px"
      }} />

      {/* Top: Brand + tagline */}
      <div style={{ display: "flex", alignItems: "center", gap: 20, position: "relative" }}>
        <div style={{
          width: 58, height: 58, display: "flex", alignItems: "center", justifyContent: "center",
          borderRadius: 14, background: "#ffcc00", color: "#021b52", fontSize: 28, fontWeight: 900
        }}>€</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 30, fontWeight: 800, letterSpacing: 0 }}>{siteConfig.name}</span>
          <span style={{ fontSize: 16, color: "rgba(255,255,255,.7)", marginTop: 3 }}>{siteConfig.tagline}</span>
        </div>
      </div>

      {/* Main headline */}
      <div style={{ display: "flex", flexDirection: "column", position: "relative" }}>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 62, fontWeight: 800, lineHeight: 1.08, letterSpacing: -1, maxWidth: 900 }}>
          <span>Consultanță fonduri europene</span>
          <span style={{ fontSize: 48, color: "#ffcc00" }}>Servicii administrative</span>
        </div>
        <div style={{ marginTop: 24, fontSize: 24, color: "rgba(255,255,255,.78)", lineHeight: 1.5 }}>
          Două direcții distincte pentru proiecte și activitatea curentă
        </div>
      </div>

      {/* Bottom pills */}
      <div style={{ display: "flex", gap: 14, position: "relative" }}>
        {["Analiză de eligibilitate", "Cereri de finanțare", "Implementare proiect", "Servicii administrative"].map((tag) => (
          <div key={tag} style={{
            padding: "10px 18px", borderRadius: 999,
            background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.2)",
            fontSize: 16, fontWeight: 700, color: "rgba(255,255,255,.9)"
          }}>{tag}</div>
        ))}
      </div>

      {/* Decorative circle */}
      <div style={{
        position: "absolute", right: -160, top: -80, width: 520, height: 520,
        borderRadius: "50%", border: "1px solid rgba(255,204,0,.18)",
        boxShadow: "inset 0 0 0 70px rgba(255,204,0,.02), inset 0 0 0 140px rgba(255,204,0,.02)"
      }} />
    </div>,
    size
  );
}
