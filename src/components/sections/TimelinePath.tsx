// src/components/sections/TimelinePath.tsx
"use client";
import { motion, useTransform, useReducedMotion, type MotionValue } from "framer-motion";

interface Props {
  /** progreso de scroll 0..1 de la sección contenedora */
  progress: MotionValue<number>;
  /** cantidad de paradas (nodos) */
  stops: number;
}

function Node({ at, progress, reduce }: { at: number; progress: MotionValue<number>; reduce: boolean }) {
  const lit = useTransform(progress, [at - 0.05, at], [0, 1]);
  const bg = useTransform(lit, [0, 1], ["#0A0F1F", "#2B5BFF"]);
  const scale = useTransform(lit, [0, 1], [0.7, 1]);
  return (
    <motion.span
      className="absolute left-1/2 w-2.5 h-2.5 rounded-full border-2 border-primary"
      style={{
        top: `${at * 100}%`, x: "-50%", y: "-50%",
        background: reduce ? "#2B5BFF" : bg,
        scale: reduce ? 1 : scale,
        boxShadow: "0 0 10px rgba(43,91,255,.5)",
      }}
    />
  );
}

export default function TimelinePath({ progress, stops }: Props) {
  const reduce = useReducedMotion() ?? false;
  const fillScale = useTransform(progress, [0, 0.95], [0, 1]);
  const cometTop = useTransform(progress, [0, 0.95], ["0%", "100%"]);
  const cometOpacity = useTransform(progress, [0, 0.01, 0.97, 1], [0, 1, 1, 0]);

  return (
    <div className="absolute inset-0 hidden md:block pointer-events-none" style={{ zIndex: 0 }} aria-hidden>
      {/* track tenue (toda la ruta) */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] rounded-full"
        style={{ background: "rgba(43,91,255,.13)" }} />

      {/* rastro encendido que crece desde arriba con el scroll */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 top-0 w-[2px] h-full origin-top rounded-full"
        style={{
          scaleY: reduce ? 1 : fillScale,
          background: "linear-gradient(180deg, #2B5BFF, #7E9BFF)",
          boxShadow: "0 0 10px rgba(43,91,255,.55)",
        }} />

      {/* nodos */}
      {Array.from({ length: stops }).map((_, i) => (
        <Node key={i} at={(i + 0.5) / stops} progress={progress} reduce={reduce} />
      ))}

      {/* cometa: la luz en la punta del rastro */}
      {!reduce && (
        <motion.span
          className="absolute left-1/2 w-3.5 h-3.5 rounded-full"
          style={{
            top: cometTop, x: "-50%", y: "-50%", opacity: cometOpacity,
            background: "radial-gradient(circle, #eaf1ff 0%, #4F7BFF 70%)",
            boxShadow: "0 0 16px 4px rgba(79,123,255,.85)",
          }} />
      )}
    </div>
  );
}
