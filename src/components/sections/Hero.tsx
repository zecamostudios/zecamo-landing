"use client";
import { useEffect, useRef, useState, Fragment } from "react";
import { ArrowDownRight, Calendar } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Mesh from "@/components/ui/Mesh";
import ZWatermark from "@/components/ui/ZWatermark";
import PrimaryBtn from "@/components/ui/PrimaryBtn";
import GhostBtn from "@/components/ui/GhostBtn";

type Word = string | { word: string; className?: string };

interface Tagline {
  id: string;
  label: string;
  lines: Word[][];
}

export const HERO_TAGLINES: Tagline[] = [
  {
    id: "1",
    label: "Punchy",
    lines: [
      ["Automatizá", "lo", "que", "te", "frena."],
      ["Escalá", { word: "lo", className: "text-muted/80" }, "que", "te", { word: "impulsa.", className: "text-primary" }],
    ],
  },
  {
    id: "2",
    label: "Métrica",
    lines: [
      ["IA", "que", "trabaja."],
      ["Resultados", "que", "se", { word: "miden.", className: "text-primary" }],
    ],
  },
  {
    id: "3",
    label: "Capa IA",
    lines: [
      ["Construimos", "la", "capa", "de", "IA"],
      ["que", "tu", "empresa", { word: "todavía no tiene.", className: "text-primary" }],
    ],
  },
];

interface HeroWordsProps { taglineId?: string; }

// TODO: migrar a Framer Motion (motion.span con variants + staggerChildren)
function HeroWords({ taglineId = "1" }: HeroWordsProps) {
  const tagline = HERO_TAGLINES.find((t) => t.id === taglineId) ?? HERO_TAGLINES[0];
  const [revealed, setRevealed] = useState<number[]>([]);

  useEffect(() => {
    setRevealed([]);
    const all = tagline.lines.flat();
    const timers = all.map((_, i) =>
      setTimeout(() => setRevealed((r) => [...r, i]), 250 + i * 110),
    );
    return () => timers.forEach(clearTimeout);
  }, [taglineId]); // eslint-disable-line react-hooks/exhaustive-deps

  let counter = -1;
  return (
    <h1
      className="font-display font-semibold text-ink leading-[0.95] tracking-[-0.02em]"
      style={{ fontSize: "clamp(2.6rem, 7.5vw, 6.5rem)" }}
    >
      {tagline.lines.map((line, li) => (
        <div key={li} className="block">
          {line.map((w, wi) => {
            counter++;
            const isObj = typeof w === "object";
            const text = isObj ? w.word : w;
            const extra = isObj ? w.className ?? "" : "";
            const ix = counter;
            return (
              <Fragment key={wi}>
                <span className={`word ${revealed.includes(ix) ? "in " : ""}${extra}`}>{text}</span>
                {wi < line.length - 1 && <span> </span>}
              </Fragment>
            );
          })}
        </div>
      ))}
    </h1>
  );
}

interface StatProps { value: string; label: string; tone?: "primary"; }
function Stat({ value, label, tone }: StatProps) {
  return (
    <div className="bg-bg/80 px-6 py-6 md:py-8 flex flex-col gap-1">
      <div
        className={`font-display font-semibold tracking-tight text-[28px] md:text-[34px] ${
          tone === "primary" ? "text-primary" : "text-ink"
        }`}
      >
        {value}
      </div>
      <div className="text-[12px] tracking-[.16em] uppercase text-muted font-mono">{label}</div>
    </div>
  );
}

export default function Hero({ taglineId = "1" }: { taglineId?: string }) {
  const meshRef = useRef<HTMLDivElement>(null);

  // TODO: migrar a Framer Motion (useScroll + useTransform)
  useEffect(() => {
    const onScroll = () => {
      if (!meshRef.current) return;
      const y = Math.min(window.scrollY, 800);
      meshRef.current.style.transform = `translate3d(0, ${y * 0.18}px, 0)`;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="absolute inset-0 dot-grid opacity-70" aria-hidden />
      <div ref={meshRef} className="absolute inset-0">
        <Mesh variant="hero" />
      </div>
      <ZWatermark className="-right-32 top-10 md:top-0 md:-right-20" size={760} opacity={0.06} />
      <ZWatermark className="-left-40 -bottom-40 hidden md:block" size={560} opacity={0.04} />

      <div className="relative max-w-[1280px] mx-auto px-5 md:px-8 pt-6">
        <Reveal>
          <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/40 backdrop-blur-md px-3 py-1.5">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            <span className="text-[12px] tracking-[.18em] uppercase text-muted font-mono">
              Agencia&nbsp;IA · B2B · Argentina
            </span>
          </div>
        </Reveal>

        <div className="mt-8 md:mt-10">
          <HeroWords taglineId={taglineId} />
        </div>

        <Reveal delay={900}>
          <p className="mt-7 md:mt-9 text-[17px] md:text-[19px] text-muted max-w-2xl leading-relaxed">
            Construimos la capa de IA de tu empresa. Desde el diagnóstico hasta los agentes
            que trabajan mientras dormís.
          </p>
        </Reveal>

        <Reveal delay={1050}>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <PrimaryBtn as="a" href="#contacto" className="!px-7 !py-3.5" icon={<Calendar size={16} strokeWidth={1.75} />}>
              Agendá una llamada
            </PrimaryBtn>
            <GhostBtn as="a" href="#servicios" className="!px-7 !py-3.5" icon={<ArrowDownRight size={16} strokeWidth={1.75} />}>
              Ver servicios
            </GhostBtn>
          </div>
        </Reveal>

        <Reveal delay={1200}>
          <div className="mt-16 md:mt-24 grid grid-cols-2 md:grid-cols-4 gap-px bg-line/60 rounded-2xl overflow-hidden border border-line">
            <Stat value="24/7" label="Agentes activos" tone="primary" />
            <Stat value="< 2 sem" label="Time-to-prototype" />
            <Stat value="+40h" label="Ahorradas / mes / equipo" />
            <Stat value="6 verticales" label="Servicios integrados" />
          </div>
        </Reveal>
      </div>

      <Reveal delay={1300} className="relative mt-20 md:mt-28">
        <div className="text-center text-[11px] tracking-[.28em] uppercase text-muted/70 font-mono mb-6">
          Stack & integraciones
        </div>
        <div
          className="overflow-hidden relative"
          style={{
            maskImage: "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
            WebkitMaskImage: "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
          } as React.CSSProperties}
        >
          {/* TODO: migrar a Framer Motion (motion.div con animate x infinito) */}
          <div className="flex marquee-track gap-12 whitespace-nowrap font-display text-[22px] text-muted/80">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="flex items-center gap-12 pr-12">
                {[
                  "n8n", "OpenAI", "Claude", "Supabase", "Vercel", "Next.js",
                  "WhatsApp Business", "Notion", "Slack", "PostgreSQL", "Stripe",
                  "Make", "Zapier", "Airtable",
                ].map((l, j) => (
                  <span key={j} className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-primary/70" />
                    {l}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
