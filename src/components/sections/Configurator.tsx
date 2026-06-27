// src/components/sections/Configurator.tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dumbbell, Shirt, PartyPopper, UtensilsCrossed, Briefcase,
  Check, MessageCircle, type LucideIcon,
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
  const rubro = RUBROS[active];

  return (
    <section id="configurador" className="relative py-16 md:py-24 overflow-hidden">
      <Mesh variant="soft" />
      <div className="absolute inset-0 line-grid opacity-40" aria-hidden />
      <div className="relative max-w-[1100px] mx-auto px-5 md:px-8">
        <SectionTitle
          align="center"
          eyebrow="Armá tu sistema"
          title={<>¿Qué necesita <span className="text-primary">tu negocio</span>?</>}
          kicker="Elegí tu rubro y mirá los módulos que armaríamos para vos. Cada sistema es a medida — esto es solo el punto de partida."
        />

        {/* selector de rubro */}
        <Reveal>
          <div className="mt-9 flex flex-wrap justify-center gap-2.5">
            {RUBROS.map((r, i) => {
              const on = i === active;
              const Icon = r.Icon;
              return (
                <button key={r.id} type="button" onClick={() => setActive(i)}
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

        {/* módulos del rubro */}
        <div className="mt-8 min-h-[300px]">
          <AnimatePresence mode="wait">
            <motion.div key={rubro.id}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {rubro.modules.map((m, i) => {
                const Icon = m.Icon;
                return (
                  <motion.div key={m.name}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                    className="rounded-2xl border border-line p-5 flex items-start gap-3.5"
                    style={{ background: "var(--color-surface)" }}>
                    <span className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: "rgba(43,91,255,.1)", border: "1px solid rgba(43,91,255,.25)" }}>
                      <Icon size={20} strokeWidth={1.75} className="text-primary" />
                    </span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5">
                        <h3 className="font-display font-semibold text-[15.5px] text-ink leading-snug">{m.name}</h3>
                        <Check size={13} strokeWidth={3} className="text-[#22C55E] shrink-0" />
                      </div>
                      <p className="mt-1 text-[13px] text-muted leading-relaxed">{m.desc}</p>
                    </div>
                  </motion.div>
                );
              })}

              {/* card CTA */}
              <motion.div
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: rubro.modules.length * 0.06 }}
                className="rounded-2xl p-5 flex flex-col justify-center items-start gap-3"
                style={{ background: "linear-gradient(160deg, rgba(43,91,255,.14), rgba(13,21,38,.4))", border: "1px solid rgba(43,91,255,.35)" }}>
                <h3 className="font-display font-semibold text-[16px] text-ink leading-snug">¿Tu negocio es de {rubro.label.toLowerCase()}?</h3>
                <p className="text-[13px] text-muted">Te armamos exactamente esto, conectado y a tu medida.</p>
                <PrimaryBtn as="a" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                  className="!py-3 mt-1" icon={<MessageCircle size={15} strokeWidth={1.75} />}>
                  Armá el mío
                </PrimaryBtn>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
