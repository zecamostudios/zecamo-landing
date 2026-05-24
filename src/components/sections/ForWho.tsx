"use client";
import { useState } from "react";
import { TrendingUp, MessageCircle, Rocket, type LucideIcon } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Mesh from "@/components/ui/Mesh";
import SectionTitle from "@/components/ui/SectionTitle";

interface Audience {
  Icon: LucideIcon;
  title: string;
  intro: string;
  signals: string[];
}

const AUDIENCE: Audience[] = [
  {
    Icon: TrendingUp,
    title: "Empresas en crecimiento",
    intro: "Equipos que escalan más rápido de lo que pueden contratar.",
    signals: [
      "Procesos manuales que ya no escalan",
      "Equipo saturado con tareas repetitivas",
      "Datos dispersos en planillas y herramientas",
    ],
  },
  {
    Icon: MessageCircle,
    title: "Negocios con flujo de clientes",
    intro: "Empresas que reciben muchas consultas y quieren responder 24/7.",
    signals: [
      "WhatsApp / email desbordados",
      "Pérdida de leads por respuesta tardía",
      "Calificación manual de prospectos",
    ],
  },
  {
    Icon: Rocket,
    title: "Founders & equipos producto",
    intro: "Equipos que necesitan construir software rápido sin un dev senior fijo.",
    signals: [
      "MVPs, prototipos, herramientas internas",
      "Dashboards y paneles a medida",
      "Integraciones entre sistemas existentes",
    ],
  },
];

function AudienceCard({ a, i }: { a: Audience; i: number }) {
  const [hover, setHover] = useState(false);
  const Icon = a.Icon;
  return (
    <Reveal delay={i * 100} className="grad-border p-7 md:p-10 h-full overflow-hidden">
      <div
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          borderRadius: 20,
          boxShadow: hover
            ? "0 0 0 1px rgba(43,91,255,.5), 0 30px 80px -30px rgba(43,91,255,.45), 0 0 80px -20px rgba(43,91,255,.22)"
            : "none",
          transition: "box-shadow .3s ease, transform .3s ease",
          transform: hover ? "translateY(-3px)" : "none",
        }}
      >
        <div className="flex items-center gap-3 mb-6">
          <div
            className="w-11 h-11 rounded-xl bg-primary-dark/60 border border-primary/30 text-primary flex items-center justify-center"
            style={{ boxShadow: "0 0 26px -5px rgba(43,91,255,.4) inset" }}
          >
            <Icon size={20} strokeWidth={1.75} />
          </div>
          <span className="font-mono text-[11px] tracking-[.18em] uppercase text-muted">
            Perfil 0{i + 1}
          </span>
        </div>

        <h3 className="font-display font-semibold text-[22px] md:text-[23px] tracking-tight leading-snug">
          {a.title}
        </h3>
        <p className="mt-3 text-muted text-[14.5px] leading-relaxed">{a.intro}</p>

        <ul className="mt-6 pt-5 border-t border-line/70 space-y-3">
          {a.signals.map((sig, si) => (
            <li key={si} className="flex items-start gap-2.5 text-[14px] text-ink/90">
              <span
                className="mt-[7px] inline-block w-1.5 h-1.5 rounded-full bg-primary shrink-0"
                style={{ boxShadow: "0 0 8px rgba(43,91,255,.6)" }}
              />
              <span>{sig}</span>
            </li>
          ))}
        </ul>
      </div>
    </Reveal>
  );
}

export default function ForWho() {
  return (
    <section id="para-quien" className="relative py-24 md:py-32 overflow-hidden">
      <Mesh variant="soft" />
      <div className="relative max-w-[1280px] mx-auto px-5 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-14">
          <SectionTitle
            eyebrow="Para quién · 03 perfiles"
            title={
              <>
                ¿Te reconocés <span className="text-primary">acá</span>?
              </>
            }
          />
          <Reveal delay={150}>
            <p className="text-muted max-w-sm text-[15px]">
              Si al menos una de estas tres descripciones te suena, vale la pena que hablemos.
            </p>
          </Reveal>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {AUDIENCE.map((a, i) => (
            <AudienceCard key={a.title} a={a} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
