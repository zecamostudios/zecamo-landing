// src/components/sections/Calculator.tsx
"use client";
import { useState, type ComponentType } from "react";
import { Clock, DollarSign, TrendingDown, MessageCircle } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import Mesh from "@/components/ui/Mesh";
import Reveal from "@/components/ui/Reveal";
import PrimaryBtn from "@/components/ui/PrimaryBtn";
import { WHATSAPP_URL } from "@/lib/constants";

const ars = (n: number) => "$ " + Math.round(n).toLocaleString("es-AR");

function Slider({ label, value, min, max, step, onChange, fmt }: {
  label: string; value: number; min: number; max: number; step: number;
  onChange: (v: number) => void; fmt: (v: number) => string;
}) {
  return (
    <div>
      <div className="flex items-end justify-between mb-2">
        <span className="text-[14px] text-muted">{label}</span>
        <span className="font-display text-[19px] font-semibold text-ink tabular-nums">{fmt(value)}</span>
      </div>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1.5 cursor-pointer accent-primary" />
    </div>
  );
}

function Result({ Icon, label, value, size = "md", danger }: {
  Icon: ComponentType<{ size?: number; strokeWidth?: number }>;
  label: string; value: string; size?: "md" | "lg" | "xl"; danger?: boolean;
}) {
  const txt = size === "xl" ? "text-[30px]" : size === "lg" ? "text-[24px]" : "text-[20px]";
  return (
    <div className="flex items-center gap-3">
      <span className="w-10 h-10 rounded-xl border border-line flex items-center justify-center shrink-0"
        style={{ color: danger ? "#EF4444" : "var(--color-primary)" }}>
        <Icon size={18} strokeWidth={1.75} />
      </span>
      <div>
        <div className="text-[12px] text-muted">{label}</div>
        <div className={`font-display font-semibold tabular-nums leading-tight ${txt}`}
          style={danger ? { color: "#EF4444" } : undefined}>{value}</div>
      </div>
    </div>
  );
}

export default function Calculator() {
  const [horas, setHoras] = useState(12);
  const [personas, setPersonas] = useState(3);
  const [costo, setCosto] = useState(4000);

  const horasMes = Math.round(horas * personas * 4.33);
  const platames = horasMes * costo;
  const platanio = platames * 12;

  return (
    <section id="calculadora" className="relative py-16 md:py-24 overflow-hidden">
      <Mesh variant="soft" />
      <div className="relative max-w-[1100px] mx-auto px-5 md:px-8">
        <SectionTitle
          align="center"
          eyebrow="Calculadora"
          title={<>¿Cuánto te cuesta <span className="text-primary">no automatizar</span>?</>}
          kicker="Movés los valores y ves la plata y el tiempo que tu equipo pierde cada mes en tareas que un sistema haría solo."
        />

        <Reveal>
          <div className="mt-10 grid md:grid-cols-2 gap-5 items-stretch">
            {/* inputs */}
            <div className="grad-border p-6 md:p-8 flex flex-col gap-7 justify-center">
              <Slider label="Horas / semana en tareas repetitivas" value={horas} min={1} max={40} step={1}
                onChange={setHoras} fmt={(v) => `${v} hs`} />
              <Slider label="Personas que las hacen" value={personas} min={1} max={20} step={1}
                onChange={setPersonas} fmt={(v) => `${v}`} />
              <Slider label="Costo por hora (aprox)" value={costo} min={1500} max={15000} step={500}
                onChange={setCosto} fmt={(v) => ars(v)} />
            </div>

            {/* resultados */}
            <div className="rounded-2xl p-6 md:p-8 flex flex-col gap-5 justify-center"
              style={{ background: "linear-gradient(160deg, rgba(43,91,255,.12), rgba(13,21,38,.4))", border: "1px solid rgba(43,91,255,.3)" }}>
              <Result Icon={Clock} label="Horas perdidas / mes" value={`${horasMes} hs`} />
              <Result Icon={DollarSign} label="Plata perdida / mes" value={ars(platames)} size="lg" />
              <div className="h-px bg-line/70" />
              <Result Icon={TrendingDown} label="Lo que perdés al año" value={ars(platanio)} size="xl" danger />
              <PrimaryBtn as="a" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                className="!py-3.5 mt-2 w-full !justify-center" icon={<MessageCircle size={16} strokeWidth={1.75} />}>
                Quiero recuperar eso
              </PrimaryBtn>
              <p className="text-[11.5px] text-muted/60 text-center">Estimación orientativa. En una llamada corta lo vemos sobre tu caso real.</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
