// src/components/sections/Cases.tsx
"use client";
import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, X, Check } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import Mesh from "@/components/ui/Mesh";
import Reveal from "@/components/ui/Reveal";

interface CaseItem {
  id: string; category: string; name: string; desc: string; chips: string[];
  url: string; domain: string;
  image?: string; imagePosition?: string; imageZoom?: number; gradient?: string;
  challenge: string; built: string[]; stack: string[];
}

const CASES: CaseItem[] = [
  {
    id: "level", category: "Streetwear · Drop", name: "LEVEL",
    desc: "Drop limitado con reservas por WhatsApp, stock en vivo y un backoffice donde el equipo opera todo sin tocar código.",
    chips: ["Reservas WhatsApp", "Stock en vivo", "Panel de gestión"],
    url: "https://www.levelstudios.site/", domain: "levelstudios.site",
    image: "/cases/level.png", imagePosition: "top", imageZoom: 1.15,
    challenge: "LEVEL necesitaba un sitio que reflejara su identidad bold y un canal directo de reservas por WhatsApp, más un backoffice para operar productos y precios sin depender de un dev.",
    built: [
      "Landing del drop con tap-to-flip en cada producto",
      "Stock en tiempo real visible por talle",
      "Reserva directa por WhatsApp con producto y talle prearmados",
      "Dashboard de finanzas y gestión de productos",
      "Tracking de reservas entrantes",
    ],
    stack: ["Next.js", "React", "Tailwind", "Supabase", "WhatsApp API", "Vercel"],
  },
  {
    id: "suplementos", category: "E-commerce · Suplementos", name: "Suplementos Tucumán",
    desc: "Catálogo con checkout directo a WhatsApp, control de stock y panel de operaciones. De Instagram a sistema real.",
    chips: ["Tienda online", "Pedidos WhatsApp", "Panel de ventas"],
    url: "https://suplementos-tucuman.vercel.app/", domain: "suplementos-tucuman.vercel.app",
    image: "/cases/suplementos.png", imagePosition: "40% top", imageZoom: 1,
    challenge: "Vendía por Instagram y WhatsApp pero perdía el día respondiendo precios y stock. Necesitaba un catálogo con pedido directo y un panel para operar las ventas.",
    built: [
      "Catálogo con filtros por categoría",
      "Carrito + checkout a WhatsApp con el pedido prearmado",
      "Optimizado para conversión mobile",
      "SEO local para Tucumán",
      "Panel de productos, stock y métricas de venta",
    ],
    stack: ["Next.js", "Tailwind", "Supabase", "WhatsApp API", "Vercel"],
  },
  {
    id: "finca", category: "Eventos · Reservas", name: "Finca Cajal",
    desc: "Predio de eventos con sitio, reservas, reseñas reales de Google y un dashboard interno para leads, calendario y finanzas.",
    chips: ["Web + reservas", "Reseñas reales", "Dashboard interno"],
    url: "https://www.fincacajal.com.ar/", domain: "fincacajal.com.ar",
    image: "/cases/finca-cajal.png", imagePosition: "65% top", imageZoom: 1,
    challenge: "Recibía consultas por WhatsApp y formularios, pero no podía centralizar leads, gestionar reservas, controlar el calendario ni ver las finanzas del negocio.",
    built: [
      "Web institucional con galería, video y reseñas reales de Google",
      "Formulario de reservas (fecha, invitados, tipo de evento)",
      "Centralización de cada lead en el dashboard",
      "Calendario de eventos + control de depósitos",
      "Panel de finanzas por evento",
    ],
    stack: ["Next.js", "Supabase", "PostgreSQL", "WhatsApp", "Google Maps", "Vercel"],
  },
  {
    id: "cabanas", category: "Turismo · Alojamiento", name: "Cabañas Las Flores",
    desc: "Sitio de cabañas + dashboard de gestión con reservas y finanzas. Todo el alojamiento operado desde un panel.",
    chips: ["Sitio + reservas", "Dashboard", "Finanzas"],
    url: "https://lasflores-web.vercel.app", domain: "lasflores-web.vercel.app",
    gradient: "linear-gradient(135deg, #14532d 0%, #0d1a14 100%)",
    challenge: "Necesitaba un sitio de cabañas y, sobre todo, un panel para gestionar reservas y finanzas en un solo lugar, sin planillas sueltas.",
    built: [
      "Sitio de cabañas con galería y disponibilidad",
      "Reservas centralizadas",
      "Dashboard de gestión del alojamiento",
      "Módulo de finanzas (ingresos por reserva)",
      "Operación completa sin depender de Excel",
    ],
    stack: ["Next.js", "Supabase", "Tailwind", "Vercel"],
  },
];

/* ── chrome de navegador reutilizable (lo usa también el preview) ── */
export function BrowserMockup({
  src, alt, domain, hover, objectPosition = "center center", imageZoom = 1, gradient,
}: {
  src?: string; alt: string; domain: string; hover: boolean;
  objectPosition?: string; imageZoom?: number; gradient?: string;
}) {
  return (
    <div className="relative rounded-xl overflow-hidden border border-line"
      style={{
        background: "var(--color-bg)",
        boxShadow: hover
          ? "0 24px 70px -20px rgba(43,91,255,.45), 0 0 70px -10px rgba(43,91,255,.25)"
          : "0 1px 0 0 rgba(255,255,255,.04) inset, 0 24px 50px -25px rgba(0,0,0,.5)",
        transition: "box-shadow .35s ease",
      }}>
      <div className="flex items-center gap-2 px-3 py-2 bg-surface/80 border-b border-line/80 backdrop-blur-sm">
        <span className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]/80" />
        </span>
        <div className="ml-2 flex-1 h-6 rounded-md border border-line/80 flex items-center justify-center text-[11px] font-mono tracking-tight text-primary bg-primary/[.06]">
          <span className="opacity-70 mr-1">↳</span> {domain}
        </div>
        <span className="w-6 h-6 hidden md:block" />
      </div>
      {src ? (
        <div style={{
          aspectRatio: "16 / 10", backgroundImage: `url(${src})`, backgroundSize: "cover",
          backgroundPosition: objectPosition, backgroundRepeat: "no-repeat", backgroundColor: "var(--color-bg)",
          transform: `scale(${imageZoom})`, transformOrigin: "center center",
        }} role="img" aria-label={alt} />
      ) : (
        <div style={{ aspectRatio: "16 / 10", background: gradient }}
          className="flex items-center justify-center" role="img" aria-label={alt}>
          <span className="font-display font-semibold text-[22px] text-white/85">{alt}</span>
        </div>
      )}
    </div>
  );
}

/** Modal preview — imagen directa (la usa CaseModal) */
export function CaseImageBare({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="w-full overflow-hidden" style={{
      borderRadius: 12, border: "1px solid rgba(43,91,255,.2)",
      boxShadow: "0 0 0 1px rgba(43,91,255,.12), 0 20px 60px -15px rgba(43,91,255,.45), 0 0 80px -20px rgba(43,91,255,.2)",
    }}>
      <Image src={src} alt={alt} width={1920} height={1080} quality={85} sizes="(max-width: 900px) 100vw, 900px" className="w-full h-auto block" />
    </div>
  );
}

export default function Cases() {
  const [idx, setIdx] = useState(0);
  const [ficha, setFicha] = useState(false);
  const c = CASES[idx];

  return (
    <section id="casos" className="relative py-16 md:py-24 overflow-hidden">
      <Mesh variant="soft" />
      <div className="absolute inset-0 line-grid opacity-30" aria-hidden />

      <div className="relative max-w-[1280px] mx-auto px-5 md:px-8">
        <SectionTitle
          eyebrow="Casos · en vivo"
          title={<>Trabajos <span className="text-primary">recientes</span>.</>}
          kicker="Cuatro clientes, cuatro industrias. Tocá cada uno y mirá qué construimos."
        />

        {/* mobile: tabs de casos */}
        <div className="lg:hidden mt-8 flex gap-2 overflow-x-auto pb-1 -mx-5 px-5">
          {CASES.map((cc, i) => (
            <button key={cc.id} type="button" onClick={() => setIdx(i)}
              className={`shrink-0 rounded-full px-3.5 py-2 text-[13px] font-medium border transition-all ${
                i === idx ? "bg-primary/15 border-primary text-ink" : "border-line text-muted"
              }`}>
              {cc.name}
            </button>
          ))}
        </div>

        <div className="mt-6 lg:mt-10 grid lg:grid-cols-[1.25fr_1fr] gap-10 lg:gap-14 items-center">
          {/* izquierda: preview + info (cambia con animación) */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div key={c.id}
                initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 24 }}
                transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}>
                <BrowserMockup src={c.image} alt={c.name} domain={c.domain} hover
                  objectPosition={c.imagePosition} imageZoom={c.imageZoom} gradient={c.gradient} />
                <div className="mt-6">
                  <div className="inline-flex items-center gap-2 rounded-full border border-line bg-bg/40 px-2.5 py-1 mb-3">
                    <span className="w-1 h-1 rounded-full bg-primary" />
                    <span className="font-mono text-[11px] tracking-[.18em] uppercase text-muted">{c.category}</span>
                  </div>
                  <p className="text-[15px] text-muted leading-relaxed max-w-lg">{c.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {c.chips.map((chip) => (
                      <span key={chip} className="inline-flex items-center rounded-full border border-line bg-surface/60 px-2.5 py-1 text-[11.5px] text-muted font-mono">{chip}</span>
                    ))}
                  </div>
                  <div className="mt-5 flex flex-wrap items-center gap-4">
                    <button type="button" onClick={() => setFicha(true)}
                      className="inline-flex items-center gap-2 rounded-full bg-primary hover:bg-primary-hover px-5 py-2.5 text-[14px] font-medium text-white transition-colors cta-glow">
                      Ver ficha completa
                    </button>
                    <a href={c.url} target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-[14px] font-medium text-muted hover:text-primary transition-colors">
                      Ver sitio en vivo <ArrowUpRight size={15} strokeWidth={2} />
                    </a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* derecha: lista clickeable que se ilumina (solo desktop) */}
          <Reveal className="hidden lg:block">
            <div className="flex flex-col">
              {CASES.map((cc, i) => {
                const on = i === idx;
                return (
                  <button key={cc.id} type="button" onClick={() => setIdx(i)}
                    className="text-left py-4 border-l-2 pl-6 transition-all duration-300 outline-none focus-visible:bg-white/[.02]"
                    style={{ borderColor: on ? "var(--color-primary)" : "rgba(255,255,255,.06)" }}>
                    <span className="block font-display font-semibold tracking-tight leading-[1.18] pb-1 transition-colors duration-300"
                      style={{ fontSize: "clamp(1.5rem, 2.4vw, 2.3rem)", color: on ? "var(--color-ink)" : "rgba(138,143,168,.28)" }}>
                      {cc.name}
                    </span>
                    <span className="block font-mono text-[12px] tracking-[.16em] uppercase mt-0.5 transition-colors duration-300"
                      style={{ color: on ? "var(--color-muted)" : "transparent" }}>
                      {cc.category}
                    </span>
                  </button>
                );
              })}
              <div className="mt-5 pl-6 font-mono text-[12px] text-muted/60 tabular-nums">
                {String(idx + 1).padStart(2, "0")} / {String(CASES.length).padStart(2, "0")}
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* ── ficha completa ── */}
      <AnimatePresence>
        {ficha && (
          <motion.div className="fixed inset-0 z-[1300] overflow-auto"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setFicha(false)} />
            <div className="relative min-h-full flex items-start md:items-center justify-center p-4 py-10">
              <motion.div
                initial={{ scale: 0.96, opacity: 0, y: 16 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.96, opacity: 0, y: 16 }}
                transition={{ duration: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
                className="relative w-full max-w-[680px] rounded-2xl border border-line overflow-hidden"
                style={{ background: "var(--color-surface)", boxShadow: "0 40px 100px -20px rgba(0,0,0,.85)" }}>
                {/* header */}
                <div className="relative">
                  <BrowserMockup src={c.image} alt={c.name} domain={c.domain} hover={false}
                    objectPosition={c.imagePosition} imageZoom={c.imageZoom} gradient={c.gradient} />
                  <button onClick={() => setFicha(false)} aria-label="Cerrar"
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-bg/70 border border-line backdrop-blur-md flex items-center justify-center text-muted hover:text-ink transition-colors">
                    <X size={16} />
                  </button>
                </div>

                <div className="p-6 md:p-8">
                  <div className="font-mono text-[11px] tracking-[.18em] uppercase text-primary mb-1">{c.category}</div>
                  <h3 className="font-display font-semibold text-[26px] tracking-tight text-ink">{c.name}</h3>

                  <div className="mt-5">
                    <div className="font-mono text-[11px] tracking-[.2em] uppercase text-muted mb-2">El desafío</div>
                    <p className="text-[14.5px] text-muted leading-relaxed">{c.challenge}</p>
                  </div>

                  <div className="mt-5">
                    <div className="font-mono text-[11px] tracking-[.2em] uppercase text-muted mb-2.5">Qué construimos</div>
                    <ul className="flex flex-col gap-2">
                      {c.built.map((b) => (
                        <li key={b} className="flex items-start gap-2.5 text-[14px] text-ink/90">
                          <Check size={15} strokeWidth={2.5} className="text-primary mt-0.5 shrink-0" /> {b}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-5">
                    <div className="font-mono text-[11px] tracking-[.2em] uppercase text-muted mb-2.5">Stack</div>
                    <div className="flex flex-wrap gap-1.5">
                      {c.stack.map((t) => (
                        <span key={t} className="rounded-full border border-line bg-bg/40 px-2.5 py-1 text-[12px] font-mono text-muted">{t}</span>
                      ))}
                    </div>
                  </div>

                  <a href={c.url} target="_blank" rel="noopener noreferrer"
                    className="mt-7 inline-flex items-center gap-2 rounded-full bg-primary hover:bg-primary-hover px-6 py-3 text-[14.5px] font-medium text-white transition-colors cta-glow">
                    Ver sitio en vivo <ArrowUpRight size={16} strokeWidth={2} />
                  </a>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
