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
        color: "#071d38",
        background: "#63d4e7",
        fontSize: 19,
        fontWeight: 800
      }}
    >
      P
    </div>,
    size
  );
}
