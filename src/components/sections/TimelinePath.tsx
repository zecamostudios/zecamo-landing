// src/components/sections/TimelinePath.tsx
"use client";
import { useRef, useState } from "react";
import {
  motion, useTransform, useMotionValueEvent, useReducedMotion,
  type MotionValue,
} from "framer-motion";

interface Props {
  /** progreso de scroll 0..1 de la sección contenedora */
  progress: MotionValue<number>;
  /** cantidad de paradas (para ubicar nodos) */
  stops: number;
}

const ROW_H = 100;
const AMP = 6;        // amplitud suave
const XS = [50 - AMP, 50 + AMP];

function buildSpine(stops: number): string {
  let d = "M 50 0";
  for (let i = 0; i < stops; i++) {
    const y0 = i * ROW_H, yMid = y0 + 50, yEnd = y0 + ROW_H;
    const x = XS[i % 2];
    d += ` C 50 ${y0 + 16}, ${x} ${y0 + 30}, ${x} ${yMid}`;
    d += ` C ${x} ${yEnd - 30}, 50 ${yEnd - 16}, 50 ${yEnd}`;
  }
  return d;
}

function nodePositions(stops: number) {
  return Array.from({ length: stops }, (_, i) => ({
    x: XS[i % 2], y: i * ROW_H + 50, at: (i + 0.5) / stops,
  }));
}

function TimelineNode({ x, y, at, draw, reduce }: {
  x: number; y: number; at: number; draw: MotionValue<number>; reduce: boolean;
}) {
  const lit = useTransform(draw, [at - 0.04, at], [0, 1]);
  const fill = useTransform(lit, [0, 1], ["#1E1E2A", "#4F7BFF"]);
  return (
    <motion.circle cx={x} cy={y} r={2} stroke="#4F7BFF" strokeWidth={0.8}
      vectorEffect="non-scaling-stroke"
      style={reduce ? { fill: "#4F7BFF" } : { fill, opacity: useTransform(lit, [0, 1], [0.5, 1]) }} />
  );
}

export default function TimelinePath({ progress, stops }: Props) {
  const reduce = useReducedMotion() ?? false;
  const pathRef = useRef<SVGPathElement>(null);
  const [comet, setComet] = useState({ x: 50, y: 0, show: false });
  const d = buildSpine(stops);
  const nodes = nodePositions(stops);
  const totalH = stops * ROW_H;

  // un único valor para dibujar Y para el cometa → siempre alineados
  const draw = useTransform(progress, [0, 0.92], [0, 1]);

  useMotionValueEvent(draw, "change", (v) => {
    const el = pathRef.current;
    if (!el) return;
    const L = el.getTotalLength();
    const p = el.getPointAtLength(Math.min(Math.max(v, 0), 1) * L);
    setComet({ x: p.x, y: p.y, show: v > 0.002 && v < 0.998 });
  });

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
      style={{ zIndex: 0 }}
      viewBox={`0 0 100 ${totalH}`} preserveAspectRatio="none" aria-hidden>
      <defs>
        <filter id="tlglow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="0.7" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* ruta base, muy tenue (guía completa) */}
      <path d={d} fill="none" stroke="rgba(43,91,255,.10)" strokeWidth={1} vectorEffect="non-scaling-stroke" strokeLinecap="round" />

      {/* rastro encendido — fino, sin glow exagerado, alineado al cometa */}
      <motion.path
        ref={pathRef} d={d} fill="none" stroke="#4F7BFF" strokeWidth={1.6}
        strokeLinecap="round" vectorEffect="non-scaling-stroke"
        style={reduce ? { pathLength: 1, opacity: 0.85 } : { pathLength: draw, opacity: 0.85 }} />

      {/* nodos */}
      {nodes.map((n, i) => (
        <TimelineNode key={i} x={n.x} y={n.y} at={n.at} draw={draw} reduce={reduce} />
      ))}

      {/* cometa: un solo punto en la punta del rastro */}
      {!reduce && comet.show && (
        <>
          <circle cx={comet.x} cy={comet.y} r={2.6} fill="#4F7BFF" opacity={0.35} filter="url(#tlglow)" />
          <circle cx={comet.x} cy={comet.y} r={1.4} fill="#dCe7ff" />
        </>
      )}
    </svg>
  );
}
