// src/components/sections/Hero.tsx
"use client";
import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle, ArrowDownRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Mesh from "@/components/ui/Mesh";
import ZWatermark from "@/components/ui/ZWatermark";
import PrimaryBtn from "@/components/ui/PrimaryBtn";
import GhostBtn from "@/components/ui/GhostBtn";
import DashboardMock from "@/components/sections/DashboardMock";
import { WHATSAPP_URL } from "@/lib/constants";

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-14 md:pt-40 md:pb-20">
      <div className="absolute inset-0 dot-grid opacity-70" aria-hidden />
      <Mesh variant="hero" />
      <ZWatermark className="-right-32 top-10 md:top-0 md:-right-20" size={760} opacity={0.06} />

      <div className="relative max-w-[1280px] mx-auto px-5 md:px-8">
        <div className="grid lg:grid-cols-[0.9fr_1.18fr] gap-12 lg:gap-8 items-center">

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
              <h1 className="mt-7 font-display font-semibold text-ink leading-[1.16] tracking-[-0.02em] pb-2"
                  style={{ fontSize: "clamp(2.6rem, 6vw, 5rem)" }}>
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
          <div className="relative" style={{ perspective: 1200 }}>
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

        </div>
      </div>
    </section>
  );
}
