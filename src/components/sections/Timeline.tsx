// src/components/sections/Timeline.tsx
"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MessageCircle, Coffee, Handshake, UtensilsCrossed, Lock, Moon } from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import Mesh from "@/components/ui/Mesh";
import PrimaryBtn from "@/components/ui/PrimaryBtn";
import TimelinePath from "@/components/sections/TimelinePath";
import { WHATSAPP_URL } from "@/lib/constants";

interface Stop {
  time: string;
  Icon: typeof Coffee;
  feel: string;     // lo que SENTÍS (el dueño)
  system: string;   // lo que el sistema hizo solo
}

const STOPS: Stop[] = [
  { time: "8:00",  Icon: Coffee,           feel: "Tomás el primer café",   system: "El reporte de ayer ya está listo en el sistema." },
  { time: "11:30", Icon: Handshake,        feel: "Atendés a un cliente",   system: "La IA contestó 8 consultas por WhatsApp." },
  { time: "14:00", Icon: UtensilsCrossed,  feel: "Almorzás tranquilo",     system: "El stock se actualizó solo con cada venta." },
  { time: "18:00", Icon: Lock,             feel: "Cerrás el local",        system: "Las facturas del día ya se emitieron." },
  { time: "22:00", Icon: Moon,             feel: "Cenás con tu familia",   system: "Tu negocio funciona sin vos. Descansás." },
];

export default function Timeline() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    // rango largo = el camino se dibuja lento a medida que scrolleás
    offset: ["start 90%", "end 35%"],
  });
  // rail animado para mobile
  const mobileFill = useTransform(scrollYProgress, [0, 0.9], [0, 1]);
  const mobileTop = useTransform(scrollYProgress, [0, 0.9], ["0%", "100%"]);

  return (
    <section id="dia" className="relative py-16 md:py-24 overflow-hidden">
      <Mesh variant="soft" />
      <div className="relative max-w-[1100px] mx-auto px-5 md:px-8">
        <SectionTitle
          align="center"
          eyebrow="Un día en tu negocio"
          title={<>Así se siente <span className="text-primary">tenerlo todo resuelto</span>.</>}
          kicker="No te mostramos el sistema funcionando. Te mostramos tu día, mientras el sistema trabaja por detrás."
        />

        <div ref={ref} className="relative mt-10 md:mt-12">
          {/* camino serpenteante (desktop) */}
          <TimelinePath progress={scrollYProgress} stops={STOPS.length} />

          {/* rail animado mobile: se rellena al scrollear + punto brillante */}
          <div className="md:hidden absolute left-[18px] top-0 bottom-0 w-[2px]" aria-hidden>
            <div className="absolute inset-0 rounded-full bg-line" />
            <motion.div
              className="absolute inset-x-0 top-0 h-full rounded-full origin-top"
              style={{
                scaleY: mobileFill,
                background: "linear-gradient(#2B5BFF, #7E9BFF)",
                boxShadow: "0 0 10px rgba(43,91,255,.6)",
              }} />
            <motion.div
              className="absolute -left-[6px] w-3.5 h-3.5 rounded-full bg-white"
              style={{
                top: mobileTop, marginTop: -7,
                boxShadow: "0 0 14px 3px rgba(79,123,255,.9)",
              }} />
          </div>

          <div className="relative z-10 flex flex-col gap-8 md:gap-14">
            {STOPS.map((s, i) => {
              const right = i % 2 === 1; // alterna: pares izquierda, impares derecha (desktop)
              const Icon = s.Icon;
              return (
                <div key={s.time} className="relative md:grid md:grid-cols-[1fr_80px_1fr] md:items-center">
                  {/* FEEL card */}
                  <motion.div
                    initial={{ opacity: 0, x: right ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-15%" }}
                    transition={{ duration: 0.5 }}
                    className={`pl-12 md:pl-0 ${right ? "md:col-start-3" : "md:col-start-1 md:text-right"}`}>
                    <div className="font-mono text-[11px] font-bold tracking-[.06em] text-primary-hover">{s.time}</div>
                    <h3 className="font-display text-[20px] md:text-[24px] font-semibold text-ink leading-snug mt-1 inline-flex items-center gap-2">
                      <Icon size={18} strokeWidth={1.75} className="text-muted md:hidden" />{s.feel}
                    </h3>
                  </motion.div>

                  {/* centro (solo desktop, el SVG dibuja el nodo) */}
                  <div className="hidden md:block" aria-hidden />

                  {/* SYSTEM chip */}
                  <motion.div
                    initial={{ opacity: 0, x: right ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-15%" }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className={`pl-12 md:pl-0 mt-2 md:mt-0 ${right ? "md:col-start-1 md:row-start-1 md:text-right md:flex md:justify-end" : "md:col-start-3 md:row-start-1"}`}>
                    <span className="inline-flex items-start gap-2 rounded-xl border border-primary/30 bg-surface px-3.5 py-2.5 text-[13px] text-muted"
                      style={{ boxShadow: "0 0 18px -6px rgba(43,91,255,.35)" }}>
                      <span className="mt-0.5 w-3.5 h-3.5 rounded bg-primary/80 shrink-0" style={{ boxShadow: "0 0 8px rgba(43,91,255,.7)" }} />
                      {s.system}
                    </span>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex justify-center mt-10 md:mt-12">
          <PrimaryBtn as="a" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
            className="!px-8 !py-4 !text-[16px]" icon={<MessageCircle size={18} strokeWidth={1.75} />}>
            Quiero días así
          </PrimaryBtn>
        </div>
      </div>
    </section>
  );
}
