"use client";
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorBlob() {
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const rawX = useMotionValue(-200);
  const rawY = useMotionValue(-200);

  const x = useSpring(rawX, { stiffness: 120, damping: 22, mass: 0.5 });
  const y = useSpring(rawY, { stiffness: 120, damping: 22, mass: 0.5 });

  useEffect(() => {
    // No touch/mobile
    if (typeof window === "undefined" || window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
      if (!visible) setVisible(true);
    };

    const onEnter = (e: MouseEvent) => {
      const el = e.target as Element;
      if (el.closest("button, a, [role='button'], input, textarea, select, label")) {
        setHovered(true);
      }
    };

    const onLeave = () => setHovered(false);

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseenter", onEnter, true);
    document.addEventListener("mouseleave", onLeave, true);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseenter", onEnter, true);
      document.removeEventListener("mouseleave", onLeave, true);
    };
  }, [visible, rawX, rawY]);

  if (!visible) return null;

  const size = hovered ? 56 : 34;

  return (
    <motion.div
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        x,
        y,
        translateX: "-50%",
        translateY: "-50%",
        width: size,
        height: size,
        borderRadius: "50%",
        background:
          "radial-gradient(circle, rgba(43, 91, 255, 0.9) 0%, rgba(43, 91, 255, 0.5) 50%, transparent 70%)",
        filter: `blur(${hovered ? 16 : 8}px)`,
        opacity: hovered ? 0.9 : 0.75,
        boxShadow: hovered
          ? "0 0 32px rgba(43,91,255,0.7), 0 0 60px rgba(43,91,255,0.4)"
          : "0 0 24px rgba(43,91,255,0.6), 0 0 48px rgba(43,91,255,0.3)",
        pointerEvents: "none",
        zIndex: 9999,
        mixBlendMode: "screen",
      }}
      animate={{
        width: size,
        height: size,
        filter: `blur(${hovered ? 16 : 8}px)`,
        opacity: hovered ? 0.9 : 0.75,
      }}
      transition={{ type: "spring", stiffness: 200, damping: 28 }}
    />
  );
}
