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

const VIEW_W = 100;
const ROW_H = 100; // alto por parada en unidades de viewBox
const XS = [22, 78];

// Path serpenteante: alterna X entre 22 y 78, una curva suave por fila
function buildPath(stops: number): string {
  let d = `M 50 0`;
  for (let i = 0; i < stops; i++) {
    const y0 = i * ROW_H;
    const yMid = y0 + ROW_H / 2;
    const yEnd = y0 + ROW_H;
    const x = XS[i % 2];
    d += ` C 50 ${y0 + ROW_H * 0.3}, ${x} ${y0 + ROW_H * 0.2}, ${x} ${yMid}`;
    d += ` C ${x} ${yEnd - ROW_H * 0.2}, 50 ${yEnd - ROW_H * 0.3}, 50 ${yEnd}`;
  }
  return d;
}

function nodePositions(stops: number) {
  return Array.from({ length: stops }, (_, i) => ({
    x: XS[i % 2],
    y: i * ROW_H + ROW_H / 2,
    at: (i + 0.5) / stops,
  }));
}

function TimelineNode({
  x, y, at, progress, reduce,
}: { x: number; y: number; at: number; progress: MotionValue<number>; reduce: boolean }) {
  const lit = useTransform(progress, [at - 0.06, at], [0, 1]);
  const scale = useTransform(lit, [0, 1], [0.6, 1]);
  return (
    <g>
      <motion.circle
        cx={x} cy={y} r={2.6} fill="var(--color-bg)" stroke="#2B5BFF"
        strokeWidth={0.8} vectorEffect="non-scaling-stroke"
        style={reduce ? { opacity: 1 } : { scale }}
        transform-origin={`${x} ${y}`}
      />
      <motion.circle
        cx={x} cy={y} r={2.6} fill="none" stroke="#4F7BFF"
        strokeWidth={1.2} vectorEffect="non-scaling-stroke" filter="url(#tlglow)"
        style={reduce ? { opacity: 0.8 } : { opacity: lit }}
      />
    </g>
  );
}

export default function TimelinePath({ progress, stops }: Props) {
  const reduce = useReducedMotion() ?? false;
  const pathRef = useRef<SVGPathElement>(null);
  const [comet, setComet] = useState({ x: 50, y: 0 });
  const d = buildPath(stops);
  const nodes = nodePositions(stops);
  const totalH = stops * ROW_H;

  const pathLength = useTransform(progress, [0, 0.92], [0, 1]);

  useMotionValueEvent(progress, "change", (v) => {
    const el = pathRef.current;
    if (!el) return;
    const L = el.getTotalLength();
    const p = el.getPointAtLength(Math.min(Math.max(v, 0), 1) * L);
    setComet({ x: p.x, y: p.y });
  });

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
      viewBox={`0 0 ${VIEW_W} ${totalH}`} preserveAspectRatio="none" aria-hidden>
      <defs>
        <filter id="tlglow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* ruta base tenue */}
      <path d={d} fill="none" stroke="rgba(43,91,255,.16)" strokeWidth={0.6} vectorEffect="non-scaling-stroke" />

      {/* ruta encendida que se dibuja */}
      <motion.path
        ref={pathRef} d={d} fill="none" stroke="#2B5BFF" strokeWidth={0.8}
        vectorEffect="non-scaling-stroke" filter="url(#tlglow)"
        style={reduce ? { pathLength: 1 } : { pathLength }} />

      {/* nodos */}
      {nodes.map((n, i) => (
        <TimelineNode key={i} x={n.x} y={n.y} at={n.at} progress={progress} reduce={reduce} />
      ))}

      {/* cometa */}
      {!reduce && (
        <circle cx={comet.x} cy={comet.y} r={1.8} fill="#fff" filter="url(#tlglow)" />
      )}
    </svg>
  );
}
