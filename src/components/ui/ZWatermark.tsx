import Image from "next/image";
import { CSSProperties } from "react";

interface ZWatermarkProps {
  className?: string;
  opacity?: number;
  size?: number;
  style?: CSSProperties;
}

export default function ZWatermark({
  className = "",
  opacity = 0.07,
  size = 720,
  style = {},
}: ZWatermarkProps) {
  return (
    <div
      className={`absolute pointer-events-none ${className}`}
      style={{ width: size, height: size, opacity, ...style }}
      aria-hidden
    >
      <Image
        src="/brand/logo-z.png"
        alt=""
        width={size}
        height={size}
        quality={85}
        style={{ width: "100%", height: "100%", objectFit: "contain", mixBlendMode: "screen" }}
      />
    </div>
  );
}
