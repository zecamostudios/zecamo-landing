// src/components/sections/Hero.tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { MessageCircle, ArrowDownRight, Maximize2, X } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Mesh from "@/components/ui/Mesh";
import ZWatermark from "@/components/ui/ZWatermark";
import PrimaryBtn from "@/components/ui/PrimaryBtn";
import GhostBtn from "@/components/ui/GhostBtn";
import DashboardMock from "@/components/sections/DashboardMock";
import { WHATSAPP_URL } from "@/lib/constants";

export default function Hero() {
  const reduce = useReducedMotion();
  const [demoOpen, setDemoOpen] = useState(false);

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-14 md:pt-40 md:pb-20">
      <div className="absolute inset-0 dot-grid opacity-70" aria-hidden />
      <Mesh variant="hero" />
      <ZWatermark className="-right-32 top-10 md:top-0 md:-right-20" size={760} opacity={0.06} />

      <div className="relative max-w-[1280px] mx-auto px-5 md:px-8">
        <div className="grid lg:grid-cols-[1fr_1.12fr] gap-12 lg:gap-10 items-center">

          {/* ── Columna izquierda: copy ── */}
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/40 backdrop-blur-md px-3 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                <span className="text-[12px] tracking-[.18em] uppercase text-muted font-mono">
                  Sistemas a medida con IA · B2B
                </span>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-7 font-display font-semibold text-ink leading-[1.22] tracking-[-0.02em] pb-2"
                  style={{ fontSize: "clamp(2.4rem, 5.2vw, 4.25rem)" }}>
                Hacemos que tu negocio<br />
                <span className="text-primary">trabaje solo.</span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-6 text-[17px] md:text-[19px] text-muted max-w-xl leading-relaxed">
                Diseñamos sistemas y agentes de IA a medida que se encargan del trabajo
                repetitivo. Vos te dedicás a hacer crecer el resto.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <PrimaryBtn as="a" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                  className="!px-7 !py-3.5" icon={<MessageCircle size={16} strokeWidth={1.75} />}>
                  Hablá con nosotros
                </PrimaryBtn>
                <GhostBtn as="a" href="#dia" className="!px-7 !py-3.5"
                  icon={<ArrowDownRight size={16} strokeWidth={1.75} />}>
                  Ver cómo funciona
                </GhostBtn>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <div className="mt-10">
                <div className="text-[11px] tracking-[.22em] uppercase text-muted/70 font-mono mb-3">
                  +7 negocios ya trabajan así
                </div>
                <div className="flex flex-wrap items-center gap-2.5">
                  {[
                    { src: "/logos/level.jpeg",         alt: "LEVEL",        blend: "screen" as const },
                    { src: "/logos/maximo-b.png",       alt: "Máximo B" },
                    { src: "/logos/roland-cotton.jpeg", alt: "Roland Cotton", blend: "screen" as const },
                    { src: "/logos/finca-cajal.png",    alt: "Finca Cajal",  white: true },
                  ].map((l) => (
                    <div key={l.alt} title={l.alt}
                      className="h-9 flex items-center justify-center px-3 rounded-lg border border-line transition-opacity opacity-70 hover:opacity-100"
                      style={{ background: l.white ? "#fff" : "rgba(255,255,255,.04)" }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={l.src} alt={l.alt} className="max-h-5 w-auto object-contain"
                        style={{ mixBlendMode: l.blend }} />
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* ── Columna derecha: dashboard 3D flotante ── */}
          <div className="flex flex-col items-center">
            <div className="relative w-full" style={{ perspective: 1200 }}>
              {/* glow detrás */}
              <div className="absolute -inset-6 rounded-[32px] pointer-events-none"
                style={{ background: "radial-gradient(60% 60% at 60% 30%, rgba(43,91,255,.28), transparent 70%)", filter: "blur(20px)" }} />
              <motion.div
                initial={reduce ? false : { opacity: 0, y: 40, rotateY: -20, rotateX: 8 }}
                animate={reduce ? {} : { opacity: 1, y: 0, rotateY: -11, rotateX: 5 }}
                transition={{ duration: 1, ease: [0.2, 0.7, 0.2, 1] }}
                style={{
                  transformStyle: "preserve-3d",
                  transform: reduce ? undefined : "rotateY(-11deg) rotateX(5deg)",
                  boxShadow: "-18px 30px 60px rgba(0,0,0,.55), 0 0 60px -10px rgba(43,91,255,.35)",
                  borderRadius: 16,
                }}
                className="relative">
                <DashboardMock />
                {/* badge flotante */}
                <motion.div
                  initial={reduce ? false : { opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.9, duration: 0.5 }}
                  className="absolute -top-4 -right-3 md:-right-5 rounded-xl border border-[#22C55E]/40 px-3 py-1.5 backdrop-blur-md"
                  style={{ background: "rgba(34,197,94,.12)", boxShadow: "0 8px 24px rgba(0,0,0,.4)", transform: "translateZ(40px)" }}>
                  <div className="text-[10px] text-muted">Ingresos</div>
                  <div className="text-[15px] font-semibold text-[#22C55E] leading-none">+12% ▲</div>
                </motion.div>
              </motion.div>
            </div>

            {/* botón ver demo completa */}
            <button onClick={() => setDemoOpen(true)}
              className="mt-6 inline-flex items-center gap-2 rounded-full border border-line bg-surface/50 px-4 py-2 text-[13px] text-muted hover:text-ink hover:border-primary/50 transition-colors backdrop-blur-md">
              <Maximize2 size={14} strokeWidth={1.75} /> Ver dashboard completo
            </button>
          </div>

        </div>
      </div>

      {/* ── Modal: demo completa del dashboard ── */}
      <AnimatePresence>
        {demoOpen && (
          <motion.div
            className="fixed inset-0 z-[1300] overflow-auto"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setDemoOpen(false)} />
            <div className="relative min-h-full flex items-center justify-center p-4">
              <motion.div
                initial={{ scale: 0.96, opacity: 0, y: 10 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.96, opacity: 0, y: 10 }}
                transition={{ duration: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
                className="relative">
                <div className="flex items-center justify-between mb-3">
                  <div className="font-mono text-[11px] tracking-[.2em] uppercase text-muted">
                    Demo · Sistema a medida
                  </div>
                  <button onClick={() => setDemoOpen(false)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/60 px-3 py-1.5 text-[12px] text-muted hover:text-ink hover:border-primary/50 transition-colors">
                    Cerrar <X size={14} strokeWidth={2} />
                  </button>
                </div>
                <div className="w-full lg:w-[720px] lg:[zoom:1.3] origin-top">
                  <DashboardMock />
                </div>
                <div className="mt-3 text-center text-[12px] text-muted/70">
                  Demo interactiva · clickeá las secciones del menú
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
