import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Zecamo Studios — IA que trabaja. Resultados que se miden.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          width: "100%",
          height: "100%",
          background: "#0A0F1F",
          padding: "72px 80px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Grid pattern */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(rgba(255,255,255,.06) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
        />

        {/* Blue glow */}
        <div
          style={{
            position: "absolute",
            top: -200,
            right: -200,
            width: 700,
            height: 700,
            borderRadius: "50%",
            background: "rgba(43,91,255,0.18)",
            filter: "blur(100px)",
          }}
        />

        {/* Logo Z */}
        <div
          style={{
            display: "flex",
            marginBottom: 40,
            fontSize: 52,
            fontWeight: 700,
            color: "#2B5BFF",
            letterSpacing: "-2px",
          }}
        >
          Z
        </div>

        {/* Eyebrow */}
        <div
          style={{
            display: "flex",
            fontSize: 14,
            fontWeight: 500,
            color: "#93A4D1",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          ZECAMO STUDIOS · AGENCIA IA · ARGENTINA
        </div>

        {/* Title */}
        <div
          style={{
            display: "flex",
            fontSize: 56,
            fontWeight: 700,
            color: "#FFFFFF",
            lineHeight: 1.05,
            letterSpacing: "-1.5px",
            maxWidth: 800,
          }}
        >
          IA que trabaja. Resultados que se miden.
        </div>

        {/* Tagline */}
        <div
          style={{
            display: "flex",
            marginTop: 24,
            fontSize: 22,
            color: "#93A4D1",
            maxWidth: 640,
          }}
        >
          Sitios que venden. Operaciones que escalan.
        </div>

        {/* Domain */}
        <div
          style={{
            position: "absolute",
            bottom: 72,
            right: 80,
            fontSize: 16,
            color: "#2B5BFF",
            fontFamily: "monospace",
          }}
        >
          zecamostudios.com
        </div>
      </div>
    ),
    { ...size }
  );
}
