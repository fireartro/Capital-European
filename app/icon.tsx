import { ImageResponse } from "next/og";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
        color: "#021b52",
        background: "linear-gradient(145deg, #ffcc00 0%, #ffe27a 100%)",
        boxShadow: "inset 0 0 0 2px rgba(0, 51, 153, 0.18)",
        fontSize: 13,
        fontWeight: 900,
        letterSpacing: -1
      }}
    >
      CE
    </div>,
    size
  );
}
