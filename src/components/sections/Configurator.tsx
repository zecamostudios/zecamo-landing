// src/components/sections/Configurator.tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dumbbell, Shirt, PartyPopper, UtensilsCrossed, Briefcase,
  MessageCircle, ChevronLeft, ChevronRight, type LucideIcon,
} from "lucide-react";
import {
  CalendarClock, Users, CreditCard, Bot, LayoutDashboard, Boxes,
  ShoppingBag, Camera, FileText, Bell, Receipt, Megaphone, QrCode,
} from "lucide-react";
import SectionTitle from "@/components/ui/SectionTitle";
import Mesh from "@/components/ui/Mesh";
import Reveal from "@/components/ui/Reveal";
import PrimaryBtn from "@/components/ui/PrimaryBtn";
import { WHATSAPP_URL } from "@/lib/constants";

interface Module { Icon: LucideIcon; name: string; desc: string }
interface Rubro { id: string; label: string; Icon: LucideIcon; modules: Module[] }

const RUBROS: Rubro[] = [
  {
    id: "gym", label: "Gym", Icon: Dumbbell, modules: [
      { Icon: CalendarClock, name: "Reservas de turnos", desc: "Clases y turnos que se agendan solos." },
      { Icon: Users, name: "Gestión de socios", desc: "Membresías, vencimientos y altas/bajas." },
      { Icon: CreditCard, name: "Cobros automáticos", desc: "Recordatorios y links de pago al socio." },
      { Icon: Bot, name: "Bot de WhatsApp", desc: "Responde horarios, precios y consultas 24/7." },
      { Icon: LayoutDashboard, name: "Dashboard de asistencia", desc: "Quién viene, cuándo y cuánto facturás." },
    ],
  },
  {
    id: "indumentaria", label: "Indumentaria", Icon: Shirt, modules: [
      { Icon: ShoppingBag, name: "Tienda + catálogo", desc: "Catálogo online con checkout a WhatsApp." },
      { Icon: Boxes, name: "Stock por talle", desc: "Control de stock en tiempo real por variante." },
      { Icon: LayoutDashboard, name: "Dashboard de ventas", desc: "Ventas, top productos y clientes." },
      { Icon: Bot, name: "Agente de ventas IA", desc: "Atiende, recomienda y arma el pedido." },
      { Icon: Camera, name: "Estudio de contenido IA", desc: "Generás posts y campañas con IA." },
    ],
  },
  {
    id: "eventos", label: "Eventos", Icon: PartyPopper, modules: [
      { Icon: CalendarClock, name: "Reservas + calendario", desc: "Disponibilidad y reservas confirmadas." },
      { Icon: FileText, name: "Presupuestos automáticos", desc: "Cotizaciones armadas en segundos." },
      { Icon: Bot, name: "Bot de consultas", desc: "Responde fechas, capacidad y servicios." },
      { Icon: Users, name: "Seguimiento de leads", desc: "Cada consulta queda registrada y se sigue." },
      { Icon: LayoutDashboard, name: "Dashboard del salón", desc: "Eventos, ingresos y ocupación." },
    ],
  },
  {
    id: "gastro", label: "Gastronomía", Icon: UtensilsCrossed, modules: [
      { Icon: QrCode, name: "Menú QR + pedidos", desc: "Pedidos desde la mesa o delivery." },
      { Icon: CalendarClock, name: "Reservas de mesa", desc: "Reservas que se confirman solas." },
      { Icon: Bot, name: "Bot de WhatsApp", desc: "Toma pedidos y responde consultas." },
      { Icon: Boxes, name: "Stock de insumos", desc: "Alertas cuando algo se agota." },
      { Icon: LayoutDashboard, name: "Reportes de ventas", desc: "Qué se vende y a qué hora." },
    ],
  },
  {
    id: "servicios", label: "Servicios", Icon: Briefcase, modules: [
      { Icon: CalendarClock, name: "Agenda de turnos", desc: "Tus clientes reservan sin llamarte." },
      { Icon: Users, name: "CRM de clientes", desc: "Historial y seguimiento de cada uno." },
      { Icon: Bell, name: "Recordatorios automáticos", desc: "Menos ausencias, más cumplimiento." },
      { Icon: Receipt, name: "Facturación", desc: "Comprobantes y cobros sin vueltas." },
      { Icon: Megaphone, name: "Bot de captación", desc: "Convierte consultas en clientes." },
    ],
  },
];

export default function Configurator() {
  const [active, setActive] = useState(0);
  const [card, setCard] = useState(0);
  const rubro = RUBROS[active];
  const n = rubro.modules.length;
  const goCard = (d: number) => setCard((c) => (c + d + n) % n);

  return (
    <section id="configurador" className="relative py-16 md:py-24 overflow-hidden">
      <Mesh variant="soft" />
      <div className="absolute inset-0 line-grid opacity-30" aria-hidden />
      <div className="relative max-w-[1100px] mx-auto px-5 md:px-8">
        <SectionTitle
          align="center"
          eyebrow="Armá tu sistema"
          title={<>¿Qué necesita <span className="text-primary">tu negocio</span>?</>}
          kicker="Elegí tu rubro y deslizá por los módulos que armaríamos para vos. Cada sistema es a medida — esto es el punto de partida."
        />

        {/* selector de rubro */}
        <Reveal>
          <div className="mt-9 flex flex-wrap justify-center gap-2.5">
            {RUBROS.map((r, i) => {
              const on = i === active;
              const Icon = r.Icon;
              return (
                <button key={r.id} type="button" onClick={() => { setActive(i); setCard(0); }}
                  className={`inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[14px] font-medium border transition-all ${
                    on ? "bg-primary/15 border-primary text-ink" : "border-line text-muted hover:text-ink hover:border-primary/50"
                  }`}
                  style={on ? { boxShadow: "0 0 24px -8px rgba(43,91,255,.6)" } : undefined}>
                  <Icon size={16} strokeWidth={1.75} className={on ? "text-primary" : ""} /> {r.label}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* ── abanico de módulos ── */}
        <div className="relative mt-10 md:mt-12 h-[320px] flex items-center justify-center select-none" style={{ perspective: 1400 }}>
          {rubro.modules.map((m, i) => {
            const offset = i - card;
            const abs = Math.abs(offset);
            const isActive = offset === 0;
            const hidden = abs > 1;
            const Icon = m.Icon;
            return (
              <motion.div key={i}
                onClick={() => (isActive ? undefined : setCard(i))}
                initial={false}
                animate={{
                  x: offset * 215, rotate: offset * 6, y: abs * 20,
                  scale: isActive ? 1 : 0.84, opacity: hidden ? 0 : 1, zIndex: 50 - abs,
                }}
                transition={{ type: "spring", stiffness: 260, damping: 30 }}
                className="absolute w-[280px] md:w-[300px] h-[290px] cursor-pointer"
                style={{ pointerEvents: hidden ? "none" : "auto" }}
                aria-hidden={hidden}
              >
                <div className="relative h-full rounded-3xl border p-6 flex flex-col overflow-hidden"
                  style={{
                    background: "linear-gradient(165deg, var(--color-surface), var(--color-bg))",
                    borderColor: isActive ? "var(--color-primary)" : "var(--color-line)",
                    boxShadow: isActive
                      ? "0 30px 80px -22px rgba(43,91,255,.5), inset 0 0 0 1px rgba(43,91,255,.3)"
                      : "0 20px 50px -28px rgba(0,0,0,.7)",
                  }}>
                  <div aria-hidden className="absolute -top-16 left-1/2 -translate-x-1/2 w-40 h-40 rounded-full blur-3xl transition-opacity duration-500"
                    style={{ background: "rgba(43,91,255,.3)", opacity: isActive ? 1 : 0 }} />

                  <span className="relative w-14 h-14 rounded-2xl bg-primary/15 border border-primary/40 flex items-center justify-center">
                    <Icon size={26} strokeWidth={1.6} className="text-primary" />
                  </span>
                  <h3 className="relative font-display font-semibold text-[20px] tracking-tight text-ink leading-[1.3] mt-5">{m.name}</h3>

                  <AnimatePresence mode="wait">
                    {isActive && (
                      <motion.div key="body"
                        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }} className="relative flex-1 flex flex-col">
                        <p className="mt-3 text-[14.5px] text-muted leading-relaxed">{m.desc}</p>
                        <span className="mt-auto inline-flex items-center gap-1.5 text-[12px] font-mono text-primary/80">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary" /> Incluido en tu sistema
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* controles */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button type="button" onClick={() => goCard(-1)} aria-label="Anterior"
            className="w-10 h-10 rounded-full border border-line flex items-center justify-center text-muted hover:text-ink hover:border-primary/50 transition-colors">
            <ChevronLeft size={18} />
          </button>
          <div className="flex items-center gap-1.5">
            {rubro.modules.map((m, i) => (
              <button key={m.name} type="button" onClick={() => setCard(i)} aria-label={m.name}
                className="h-1.5 rounded-full transition-all duration-300"
                style={{ width: i === card ? 24 : 8, background: i === card ? "var(--color-primary)" : "rgba(255,255,255,.18)" }} />
            ))}
          </div>
          <button type="button" onClick={() => goCard(1)} aria-label="Siguiente"
            className="w-10 h-10 rounded-full border border-line flex items-center justify-center text-muted hover:text-ink hover:border-primary/50 transition-colors">
            <ChevronRight size={18} />
          </button>
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-9">
          <PrimaryBtn as="a" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
            className="!px-8 !py-3.5" icon={<MessageCircle size={16} strokeWidth={1.75} />}>
            Armá el mío
          </PrimaryBtn>
        </div>
      </div>
    </section>
  );
}
