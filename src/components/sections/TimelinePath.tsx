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

const ROW_H = 100;   // alto por parada en unidades de viewBox
const AMP = 7;       // amplitud de la onda (suave, no garabato)
const TAIL = 6;      // cuántos puntos de cola tiene el cometa

// Espina central con ondas suaves (una curva por fila, tangente vertical en los cruces)
function buildSpine(stops: number): string {
  let d = "M 50 0";
  for (let i = 0; i < stops; i++) {
    const y0 = i * ROW_H, yMid = y0 + 50, yEnd = y0 + ROW_H;
    const x = 50 + (i % 2 === 0 ? -AMP : AMP);
    d += ` C 50 ${y0 + 16}, ${x} ${y0 + 30}, ${x} ${yMid}`;
    d += ` C ${x} ${yEnd - 30}, 50 ${yEnd - 16}, 50 ${yEnd}`;
  }
  return d;
}

function nodePositions(stops: number) {
  return Array.from({ length: stops }, (_, i) => ({
    x: 50 + (i % 2 === 0 ? -AMP : AMP),
    y: i * ROW_H + 50,
    at: (i + 0.5) / stops,
  }));
}

function TimelineNode({
  x, y, at, progress, reduce,
}: { x: number; y: number; at: number; progress: MotionValue<number>; reduce: boolean }) {
  const lit = useTransform(progress, [at - 0.05, at, at + 0.02], [0, 1, 1]);
  const coreScale = useTransform(lit, [0, 1], [0.5, 1]);
  const coreColor = useTransform(lit, [0, 1], ["#1E1E2A", "#2B5BFF"]);
  const burstScale = useTransform(lit, [0.6, 1], [0.4, 2.4]);
  const burstOpacity = useTransform(lit, [0.6, 0.85, 1], [0, 0.5, 0]);
  const haloOpacity = useTransform(lit, [0, 1], [0, 0.5]);
  return (
    <g>
      {/* anillo de estallido */}
      {!reduce && (
        <motion.circle cx={x} cy={y} r={3} fill="none" stroke="#4F7BFF"
          strokeWidth={1} vectorEffect="non-scaling-stroke"
          style={{ scale: burstScale, opacity: burstOpacity, transformBox: "fill-box", transformOrigin: "center" }} />
      )}
      {/* halo */}
      <motion.circle cx={x} cy={y} r={4} fill="#2B5BFF" filter="url(#tlglow)"
        style={{ opacity: reduce ? 0.5 : haloOpacity }} />
      {/* núcleo */}
      <motion.circle cx={x} cy={y} r={2.4} stroke="#4F7BFF" strokeWidth={0.8}
        vectorEffect="non-scaling-stroke"
        style={reduce
          ? { fill: "#2B5BFF" }
          : { fill: coreColor, scale: coreScale, transformBox: "fill-box", transformOrigin: "center" }} />
    </g>
  );
}

export default function TimelinePath({ progress, stops }: Props) {
  const reduce = useReducedMotion() ?? false;
  const pathRef = useRef<SVGPathElement>(null);
  const [tail, setTail] = useState<{ x: number; y: number }[]>([]);
  const d = buildSpine(stops);
  const nodes = nodePositions(stops);
  const totalH = stops * ROW_H;

  // estela persistente: se dibuja a medida que bajás (queda encendida detrás)
  const pathLength = useTransform(progress, [0, 0.9], [0, 1]);

  // cometa + cola: muestreo varios puntos detrás de la cabeza
  useMotionValueEvent(progress, "change", (v) => {
    const el = pathRef.current;
    if (!el) return;
    const L = el.getTotalLength();
    const pts: { x: number; y: number }[] = [];
    for (let k = 0; k < TAIL; k++) {
      const t = Math.max(0, Math.min(1, v - k * 0.012));
      const p = el.getPointAtLength(t * L);
      pts.push({ x: p.x, y: p.y });
    }
    setTail(pts);
  });

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
      viewBox={`0 0 100 ${totalH}`} preserveAspectRatio="none" aria-hidden>
      <defs>
        <filter id="tlglow" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="1.6" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        <linearGradient id="tlTrail" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#2B5BFF" />
          <stop offset="100%" stopColor="#7E9BFF" />
        </linearGradient>
      </defs>

      {/* ruta base tenue (guía, siempre visible) */}
      <path d={d} fill="none" stroke="rgba(43,91,255,.14)" strokeWidth={1.2}
        vectorEffect="non-scaling-stroke" strokeLinecap="round" />

      {/* estela encendida que se dibuja con el scroll = el RASTRO */}
      <motion.path
        ref={pathRef} d={d} fill="none" stroke="url(#tlTrail)" strokeWidth={1.8}
        strokeLinecap="round" vectorEffect="non-scaling-stroke" filter="url(#tlglow)"
        style={reduce ? { pathLength: 1 } : { pathLength }} />

      {/* nodos */}
      {nodes.map((n, i) => (
        <TimelineNode key={i} x={n.x} y={n.y} at={n.at} progress={progress} reduce={reduce} />
      ))}

      {/* cola del cometa (se desvanece hacia atrás) */}
      {!reduce && tail.map((p, k) => (
        <circle key={k} cx={p.x} cy={p.y} r={2.2 - k * 0.28}
          fill={k === 0 ? "#fff" : "#7E9BFF"}
          opacity={1 - k / TAIL}
          filter={k < 2 ? "url(#tlglow)" : undefined} />
      ))}
    </svg>
  );
}
