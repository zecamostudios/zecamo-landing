"use client";
import { useState } from "react";
import { Compass, Rocket, ArrowRight, ArrowDown, Gift } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";
import PrimaryBtn from "@/components/ui/PrimaryBtn";

const PHASES = [
  {
    num: "01",
    Icon: Compass,
    title: "Diagnóstico",
    desc: "Mapeamos tu negocio, encontramos oportunidades reales y evaluamos riesgos. Entregable: roadmap de 90 días accionable.",
    tags: ["1-4 semanas", "BPMN", "Roadmap"],
  },
  {
    num: "02",
    Icon: Rocket,
    title: "Implementación",
    desc: "Ejecutamos el roadmap. Automatización, agentes IA, vibe coding o consultoría — según lo que tu negocio necesite.",
    tags: ["Sprints cortos", "Stack moderno", "Operamos post-deploy"],
  },
] as const;

function PhaseCard({ phase, delay }: { phase: typeof PHASES[number]; delay: number }) {
  const [hover, setHover] = useState(false);
  const Icon = phase.Icon;

  return (
    <Reveal delay={delay} className="flex-1 min-w-0 rounded-2xl overflow-hidden">
      <div
        className="h-full flex flex-col p-7 md:p-8 rounded-2xl overflow-hidden"
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          background: "var(--color-surface)",
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: hover ? "rgba(43,91,255,.5)" : "var(--color-line)",
          boxShadow: hover
            ? "0 8px 40px rgba(43,91,255,.25), 0 4px 20px rgba(0,0,0,.25)"
            : "0 4px 20px rgba(0,0,0,.2)",
          transform: hover ? "translateY(-4px)" : "none",
          transition: "border-color .3s ease, box-shadow .3s ease, transform .3s ease",
        }}
      >
        {/* Number (corner) */}
        <div className="flex items-start justify-between mb-6">
          <div
            className="w-14 h-14 rounded-xl flex items-center justify-center"
            style={{
              background: hover ? "rgba(43,91,255,.18)" : "rgba(43,91,255,.1)",
              border: "1px solid rgba(43,91,255,.25)",
              transition: "background .3s ease",
            }}
          >
            <Icon size={26} strokeWidth={1.6} className="text-primary" />
          </div>
          <span
            className="font-display font-semibold text-[42px] md:text-[52px] leading-none tracking-tight text-primary/20 select-none"
            style={{ lineHeight: 1 }}
          >
            {phase.num}
          </span>
        </div>

        <h3 className="font-display font-semibold text-[22px] md:text-[24px] tracking-tight">
          {phase.title}
        </h3>
        <p className="mt-3 text-[15px] text-muted leading-relaxed flex-1">{phase.desc}</p>

        <div className="mt-6 pt-5 border-t border-line/60 flex flex-wrap gap-x-3 gap-y-2">
          {phase.tags.map((tag) => (
            <span key={tag} className="text-[12px] font-mono tracking-wide text-muted/80 inline-flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-primary" /> {tag}
            </span>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

export default function HowWeWork() {
  const handleCTA = () => {
    window.dispatchEvent(new CustomEvent("zcm:open-service", { detail: { id: "diagnostico" } }));
    setTimeout(() => {
      document.getElementById("servicios")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 50);
  };

  return (
    <section className="relative py-24 md:py-32">
      <div className="absolute inset-0 dot-grid opacity-30" aria-hidden />

      <div className="relative max-w-[1280px] mx-auto px-5 md:px-8">
        <div className="mb-12">
          <SectionTitle
            eyebrow="Cómo trabajamos · ZCM-02"
            title={
              <>
                Antes de automatizar,{" "}
                <span className="text-primary">ordenamos</span>.
              </>
            }
            kicker="Dos fases simples. Una sola lógica: pensar antes de ejecutar."
          />
        </div>

        {/* Two cards + arrow */}
        <div className="flex flex-col md:flex-row items-stretch gap-0">
          <PhaseCard phase={PHASES[0]} delay={100} />

          {/* Arrow — desktop horizontal / mobile vertical */}
          <Reveal delay={200} className="flex items-center justify-center px-4 py-4 md:py-0 shrink-0">
            <div className="hidden md:flex items-center justify-center w-10">
              <div className="arrow-pulse text-primary">
                <ArrowRight size={28} strokeWidth={1.75} />
              </div>
            </div>
            <div className="flex md:hidden items-center justify-center h-10">
              <div className="arrow-pulse-down text-primary">
                <ArrowDown size={28} strokeWidth={1.75} />
              </div>
            </div>
          </Reveal>

          <PhaseCard phase={PHASES[1]} delay={150} />
        </div>

        {/* Bonus badge */}
        <Reveal delay={250} className="mt-8">
          <div
            className="flex items-start gap-4 rounded-2xl border border-primary/35 bg-primary/[.05] px-6 py-5 md:px-8 md:py-6"
            style={{ boxShadow: "0 0 40px -15px rgba(43,91,255,.25) inset" }}
          >
            <div
              className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0 text-primary mt-0.5"
            >
              <Gift size={18} strokeWidth={1.75} />
            </div>
            <p className="text-[14.5px] md:text-[15px] text-muted leading-relaxed">
              Si avanzás con la implementación en 30 días,{" "}
              <span className="text-primary font-semibold">
                el 100% del diagnóstico se bonifica
              </span>
              . Lógica de continuidad, no descuento.
            </p>
          </div>
        </Reveal>

        {/* CTA */}
        <Reveal delay={300} className="mt-10 flex justify-center">
          <PrimaryBtn onClick={handleCTA} icon={<ArrowRight size={15} strokeWidth={2} />}>
            Empezá por el Diagnóstico
          </PrimaryBtn>
        </Reveal>
      </div>
    </section>
  );
}
