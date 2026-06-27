// src/components/sections/Timeline.tsx
"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion, type MotionValue } from "framer-motion";
import { MessageCircle, Check } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import Mesh from "@/components/ui/Mesh";
import PrimaryBtn from "@/components/ui/PrimaryBtn";
import { WHATSAPP_URL } from "@/lib/constants";

interface Stop { time: string; you: string; system: string }

const STOPS: Stop[] = [
  { time: "7:30",  you: "Todavía dormís.",        system: "Ya te dejó en el WhatsApp el reporte de ventas de ayer." },
  { time: "9:00",  you: "Abrís sin apuro.",       system: "Las consultas de anoche están respondidas y hay 3 reservas confirmadas." },
  { time: "13:00", you: "Almorzás afuera.",       system: "Cada venta descontó el stock y emitió su comprobante sola." },
  { time: "17:00", you: "Estás con un cliente.",  system: "El bot calificó 4 leads nuevos y agendó 2 reuniones." },
  { time: "20:00", you: "Bajás la persiana.",     system: "Cuadró la caja del día y te avisó qué hay que reponer." },
  { time: "23:00", you: "Dormís tranquilo.",      system: "Sigue atendiendo. Mañana arrancás con todo al día." },
];

function RailNode({ at, progress, reduce }: { at: number; progress: MotionValue<number>; reduce: boolean }) {
  const lit = useTransform(progress, [at - 0.06, at], [0, 1]);
  const bg = useTransform(lit, [0, 1], ["#0D1526", "#2B5BFF"]);
  const scale = useTransform(lit, [0, 1], [0.75, 1.1]);
  return (
    <motion.span
      className="absolute w-3.5 h-3.5 rounded-full border-2 border-primary z-10"
      style={{
        top: `${at * 100}%`, left: 16, x: "-50%", y: "-50%",
        background: reduce ? "#2B5BFF" : bg, scale: reduce ? 1 : scale,
        boxShadow: "0 0 12px rgba(43,91,255,.6)",
      }} />
  );
}

export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion() ?? false;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 78%", "end 62%"] });
  const fillScaleY = useTransform(scrollYProgress, [0, 0.95], [0, 1]);
  const cometTop = useTransform(scrollYProgress, [0, 0.95], ["0%", "100%"]);
  const cometOpacity = useTransform(scrollYProgress, [0, 0.01, 0.97, 1], [0, 1, 1, 0]);
  const n = STOPS.length;

  return (
    <section id="dia" className="relative py-16 md:py-24 overflow-hidden">
      <Mesh variant="soft" />
      <div className="relative max-w-[760px] mx-auto px-5 md:px-8">
        <SectionTitle
          align="center"
          eyebrow="Un día en tu negocio"
          title={<>Vos hacés tu vida. <span className="text-primary">El sistema, el laburo.</span></>}
          kicker="Así es un día cualquiera cuando tu negocio anda solo. Lo mejor: ni te enterás del trabajo que se hizo."
        />

        <div ref={ref} className="relative mt-14 pl-12">
          {/* rail (línea + rastro + cometa + nodos) */}
          <div className="absolute left-0 top-0 bottom-0 w-[34px]" aria-hidden>
            <div className="absolute left-4 top-0 bottom-0 w-[2px] rounded-full -translate-x-1/2" style={{ background: "rgba(43,91,255,.14)" }} />
            <motion.div className="absolute left-4 top-0 w-[2px] h-full origin-top rounded-full -translate-x-1/2"
              style={{ scaleY: reduce ? 1 : fillScaleY, background: "linear-gradient(180deg, #2B5BFF, #7E9BFF)", boxShadow: "0 0 10px rgba(43,91,255,.5)" }} />
            {STOPS.map((s, i) => (
              <RailNode key={s.time} at={(i + 0.5) / n} progress={scrollYProgress} reduce={reduce} />
            ))}
            {!reduce && (
              <motion.span className="absolute w-3.5 h-3.5 rounded-full z-20"
                style={{
                  top: cometTop, left: 16, x: "-50%", y: "-50%", opacity: cometOpacity,
                  background: "radial-gradient(circle, #eaf1ff 0%, #4F7BFF 70%)",
                  boxShadow: "0 0 16px 4px rgba(79,123,255,.85)",
                }} />
            )}
          </div>

          {/* cards (una sola columna) */}
          <div className="flex flex-col gap-5 md:gap-6">
            {STOPS.map((s) => (
              <motion.div key={s.time}
                initial={{ opacity: 0, x: 28 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true, margin: "-12%" }}
                transition={{ duration: 0.45, ease: [0.2, 0.7, 0.2, 1] }}
                className="rounded-2xl border border-line p-5" style={{ background: "rgba(13,21,38,.5)" }}>
                <div className="font-mono text-[12px] font-bold tracking-[.08em] text-primary-hover">{s.time}</div>
                <div className="font-display text-[19px] md:text-[21px] font-semibold text-ink leading-snug mt-1">{s.you}</div>
                <div className="mt-2.5 flex items-start gap-2.5 text-[14px] text-muted leading-relaxed">
                  <span className="mt-0.5 w-5 h-5 rounded-md bg-primary/15 border border-primary/40 flex items-center justify-center shrink-0">
                    <Check size={12} strokeWidth={3} className="text-primary" />
                  </span>
                  <span><span className="text-ink/75 font-medium">El sistema:</span> {s.system}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="flex justify-center mt-12">
          <PrimaryBtn as="a" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
            className="!px-8 !py-4 !text-[16px]" icon={<MessageCircle size={18} strokeWidth={1.75} />}>
            Quiero un día así
          </PrimaryBtn>
        </div>
      </div>
    </section>
  );
}
