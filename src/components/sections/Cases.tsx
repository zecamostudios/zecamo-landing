// src/components/sections/Cases.tsx
"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import Mesh from "@/components/ui/Mesh";

interface CaseItem {
  id: string; category: string; name: string; desc: string; chips: string[];
  url: string; domain: string;
  image?: string; imagePosition?: string; imageZoom?: number; gradient?: string;
}

const CASES: CaseItem[] = [
  {
    id: "level", category: "Streetwear · Drop", name: "LEVEL",
    desc: "Drop limitado con reservas por WhatsApp, stock en vivo y un backoffice donde el equipo opera todo sin tocar código.",
    chips: ["Reservas WhatsApp", "Stock en vivo", "Panel de gestión"],
    url: "https://www.levelstudios.site/", domain: "levelstudios.site",
    image: "/cases/level.png", imagePosition: "top", imageZoom: 1.15,
  },
  {
    id: "suplementos", category: "E-commerce · Suplementos", name: "Suplementos Tucumán",
    desc: "Catálogo con checkout directo a WhatsApp, control de stock y panel de operaciones. De Instagram a sistema real.",
    chips: ["Tienda online", "Pedidos WhatsApp", "Panel de ventas"],
    url: "https://suplementos-tucuman.vercel.app/", domain: "suplementos-tucuman.vercel.app",
    image: "/cases/suplementos.png", imagePosition: "40% top", imageZoom: 1,
  },
  {
    id: "finca", category: "Eventos · Reservas", name: "Finca Cajal",
    desc: "Predio de eventos con sitio, reservas, reseñas reales de Google y un dashboard interno para leads, calendario y finanzas.",
    chips: ["Web + reservas", "Reseñas reales", "Dashboard interno"],
    url: "https://www.fincacajal.com.ar/", domain: "fincacajal.com.ar",
    image: "/cases/finca-cajal.png", imagePosition: "65% top", imageZoom: 1,
  },
  {
    id: "cabanas", category: "Turismo · Alojamiento", name: "Cabañas Las Flores",
    desc: "Sitio de cabañas + dashboard de gestión con reservas y finanzas. Todo el alojamiento operado desde un panel.",
    chips: ["Sitio + reservas", "Dashboard", "Finanzas"],
    url: "https://lasflores-web.vercel.app", domain: "lasflores-web.vercel.app",
    gradient: "linear-gradient(135deg, #14532d 0%, #0d1a14 100%)",
  },
];

/* ── chrome de navegador reutilizable ── */
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
          ? "0 20px 60px -20px rgba(43,91,255,.45), 0 0 60px -10px rgba(43,91,255,.25)"
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

/* ── detalle de un caso (visual + info) ── */
function CaseDetail({ c }: { c: CaseItem }) {
  return (
    <div>
      <BrowserMockup src={c.image} alt={c.name} domain={c.domain} hover
        objectPosition={c.imagePosition} imageZoom={c.imageZoom} gradient={c.gradient} />
      <div className="mt-6">
        <div className="inline-flex items-center gap-2 rounded-full border border-line bg-bg/40 px-2.5 py-1 mb-3">
          <span className="w-1 h-1 rounded-full bg-primary" />
          <span className="font-mono text-[11px] tracking-[.18em] uppercase text-muted">{c.category}</span>
        </div>
        <h3 className="font-display font-semibold text-[26px] md:text-[30px] tracking-tight text-ink leading-tight">{c.name}</h3>
        <p className="mt-2.5 text-[15px] text-muted leading-relaxed max-w-lg">{c.desc}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {c.chips.map((chip) => (
            <span key={chip} className="inline-flex items-center rounded-full border border-line bg-surface/60 px-2.5 py-1 text-[11.5px] text-muted font-mono">{chip}</span>
          ))}
        </div>
        <a href={c.url} target="_blank" rel="noopener noreferrer"
          className="mt-5 inline-flex items-center gap-1.5 text-[14px] font-medium text-primary hover:text-primary-hover transition-colors">
          Ver sitio en vivo <ArrowUpRight size={15} strokeWidth={2} />
        </a>
      </div>
    </div>
  );
}

export default function Cases() {
  const ref = useRef<HTMLDivElement>(null);
  const [idx, setIdx] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const n = CASES.length;
    setIdx(Math.min(n - 1, Math.max(0, Math.floor(v * n * 0.999))));
  });

  const jump = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const p = (i + 0.5) / CASES.length;
    window.scrollTo({ top: el.offsetTop + p * (el.offsetHeight - window.innerHeight), behavior: "smooth" });
  };

  const active = CASES[idx];

  return (
    <section id="casos" className="relative">
      <Mesh variant="soft" />
      <div className="relative max-w-[1280px] mx-auto px-5 md:px-8 pt-16 md:pt-24">
        <SectionTitle
          eyebrow="Casos · en vivo"
          title={<>Trabajos <span className="text-primary">recientes</span>.</>}
          kicker="Cuatro clientes, cuatro industrias. El sistema trabaja, no solo se ve bien — bajá y mirá cada uno."
        />
      </div>

      {/* ── DESKTOP: scroll con panel fijo ── */}
      <div ref={ref} className="hidden lg:block relative" style={{ height: `${CASES.length * 100}vh` }}>
        <div className="sticky top-0 h-screen flex items-center">
          <div className="max-w-[1280px] mx-auto px-8 w-full grid grid-cols-[1.25fr_1fr] gap-14 items-center">
            {/* izquierda: detalle que cambia */}
            <div className="relative min-h-[420px]">
              <AnimatePresence mode="wait">
                <motion.div key={active.id}
                  initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -24 }}
                  transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}>
                  <CaseDetail c={active} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* derecha: lista que se ilumina */}
            <div className="flex flex-col">
              {CASES.map((c, i) => {
                const on = i === idx;
                return (
                  <button key={c.id} type="button" onClick={() => jump(i)}
                    className="text-left py-4 border-l-2 pl-6 transition-all duration-300"
                    style={{ borderColor: on ? "var(--color-primary)" : "rgba(255,255,255,.06)" }}>
                    <span className="block font-display font-semibold tracking-tight leading-[1.1] transition-colors duration-300"
                      style={{ fontSize: "clamp(1.6rem, 2.6vw, 2.5rem)", color: on ? "var(--color-ink)" : "rgba(138,143,168,.28)" }}>
                      {c.name}
                    </span>
                    <span className="block font-mono text-[12px] tracking-[.16em] uppercase mt-1 transition-colors duration-300"
                      style={{ color: on ? "var(--color-muted)" : "transparent" }}>
                      {c.category}
                    </span>
                  </button>
                );
              })}
              <div className="mt-6 pl-6 font-mono text-[12px] text-muted/60 tabular-nums">
                {String(idx + 1).padStart(2, "0")} / {String(CASES.length).padStart(2, "0")}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── MOBILE: apilado ── */}
      <div className="lg:hidden max-w-[1280px] mx-auto px-5 pt-10 pb-16 flex flex-col gap-12">
        {CASES.map((c) => (
          <motion.div key={c.id}
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-12%" }}
            transition={{ duration: 0.5 }}>
            <CaseDetail c={c} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
