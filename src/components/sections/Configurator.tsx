// src/components/sections/Configurator.tsx
"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Dumbbell, Shirt, PartyPopper, UtensilsCrossed, Briefcase,
  MessageCircle, type LucideIcon,
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

const R = 172; // radio de la constelación (desktop)

export default function Configurator() {
  const [active, setActive] = useState(0);
  const [sel, setSel] = useState(0);
  const rubro = RUBROS[active];
  const n = rubro.modules.length;
  const selModule = rubro.modules[sel] ?? rubro.modules[0];

  return (
    <section id="configurador" className="relative py-16 md:py-24 overflow-hidden">
      <Mesh variant="soft" />
      <div className="absolute inset-0 line-grid opacity-30" aria-hidden />
      <div className="relative max-w-[1100px] mx-auto px-5 md:px-8">
        <SectionTitle
          align="center"
          eyebrow="Armá tu sistema"
          title={<>¿Qué necesita <span className="text-primary">tu negocio</span>?</>}
          kicker="Elegí tu rubro y mirá cómo se arma tu sistema: cada módulo se conecta a tu negocio. Es a medida — esto es el punto de partida."
        />

        {/* selector de rubro */}
        <Reveal>
          <div className="mt-9 flex flex-wrap justify-center gap-2.5">
            {RUBROS.map((r, i) => {
              const on = i === active;
              const Icon = r.Icon;
              return (
                <button key={r.id} type="button" onClick={() => { setActive(i); setSel(0); }}
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

        {/* ── DESKTOP: constelación que se ensambla ── */}
        <div className="hidden lg:block">
          <div className="relative mx-auto mt-6 h-[440px] w-[440px]">
            {/* spokes + nodos (se rearman al cambiar de rubro) */}
            <AnimatePresence mode="wait">
              <motion.div key={rubro.id} className="absolute inset-0"
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                {rubro.modules.map((m, i) => {
                  const angle = (-90 + (i * 360) / n) * (Math.PI / 180);
                  const x = Math.cos(angle) * R;
                  const y = Math.sin(angle) * R;
                  const deg = (angle * 180) / Math.PI;
                  const Icon = m.Icon;
                  const isHot = sel === i;
                  return (
                    <div key={m.name}>
                      {/* línea al centro */}
                      <div className="absolute left-1/2 top-1/2 h-[2px] origin-left"
                        style={{ width: R, transform: `rotate(${deg}deg)` }}>
                        <motion.div className="h-full w-full origin-left rounded-full"
                          style={{ background: isHot
                            ? "linear-gradient(90deg, rgba(43,91,255,.9), rgba(43,91,255,.2))"
                            : "linear-gradient(90deg, rgba(43,91,255,.5), rgba(43,91,255,.08))" }}
                          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
                          transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease: "easeOut" }} />
                      </div>
                      {/* nodo */}
                      <motion.button type="button"
                        onMouseEnter={() => setSel(i)}
                        onClick={() => setSel(i)}
                        className="absolute left-1/2 top-1/2 w-[124px] -ml-[62px] -mt-[34px] rounded-2xl border px-3 py-2.5 text-left backdrop-blur-md"
                        style={{
                          transform: `translate(${x}px, ${y}px)`,
                          background: isHot ? "rgba(43,91,255,.14)" : "var(--color-surface)",
                          borderColor: isHot ? "var(--color-primary)" : "var(--color-line)",
                          boxShadow: isHot ? "0 10px 30px -10px rgba(43,91,255,.6)" : "0 8px 24px -12px rgba(0,0,0,.6)",
                        }}
                        initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.25 + i * 0.08, type: "spring", stiffness: 280, damping: 20 }}>
                        <span className="w-8 h-8 rounded-lg flex items-center justify-center mb-1.5"
                          style={{ background: "rgba(43,91,255,.12)", border: "1px solid rgba(43,91,255,.25)" }}>
                          <Icon size={16} strokeWidth={1.75} className="text-primary" />
                        </span>
                        <span className="block font-display font-semibold text-[12.5px] text-ink leading-[1.25]">{m.name}</span>
                      </motion.button>
                    </div>
                  );
                })}
              </motion.div>
            </AnimatePresence>

            {/* hub central: tu negocio */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
              <div className="absolute -inset-6 rounded-full blur-2xl pointer-events-none" style={{ background: "rgba(43,91,255,.25)" }} />
              <div className="relative w-[128px] h-[128px] rounded-full border border-primary/50 flex flex-col items-center justify-center text-center"
                style={{ background: "linear-gradient(160deg, var(--color-surface), var(--color-bg))", boxShadow: "0 0 50px -10px rgba(43,91,255,.6), inset 0 0 30px -10px rgba(43,91,255,.35)" }}>
                <AnimatePresence mode="wait">
                  <motion.div key={rubro.id} className="flex flex-col items-center"
                    initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                    <span className="w-11 h-11 rounded-xl bg-primary/20 border border-primary/40 flex items-center justify-center mb-1.5">
                      <rubro.Icon size={22} strokeWidth={1.6} className="text-primary" />
                    </span>
                    <span className="font-display font-semibold text-[13px] text-ink">Tu negocio</span>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-muted/70">{rubro.label}</span>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* panel de info del módulo seleccionado (siempre visible) */}
          <div className="mx-auto mt-3 max-w-lg">
            <AnimatePresence mode="wait">
              <motion.div key={rubro.id + selModule.name}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}
                className="flex items-center gap-3.5 rounded-2xl border border-primary/30 px-5 py-4 backdrop-blur-md"
                style={{ background: "rgba(43,91,255,.06)" }}>
                <span className="w-11 h-11 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0">
                  <selModule.Icon size={20} strokeWidth={1.75} className="text-primary" />
                </span>
                <div className="min-w-0">
                  <div className="font-display font-semibold text-[15px] text-ink leading-[1.3]">{selModule.name}</div>
                  <div className="text-[13.5px] text-muted leading-relaxed">{selModule.desc}</div>
                </div>
              </motion.div>
            </AnimatePresence>
            <p className="text-center text-[12px] text-muted/60 mt-3">Pasá por cada módulo para ver qué hace · todos conectados a tu negocio</p>
          </div>
        </div>

        {/* ── MOBILE: lista de módulos ── */}
        <div className="lg:hidden mt-8">
          <AnimatePresence mode="wait">
            <motion.div key={rubro.id}
              initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.25 }}
              className="grid sm:grid-cols-2 gap-3">
              {rubro.modules.map((m, i) => {
                const Icon = m.Icon;
                return (
                  <motion.div key={m.name}
                    initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }}
                    className="rounded-2xl border border-line p-5 flex items-start gap-3.5" style={{ background: "var(--color-surface)" }}>
                    <span className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                      style={{ background: "rgba(43,91,255,.1)", border: "1px solid rgba(43,91,255,.25)" }}>
                      <Icon size={20} strokeWidth={1.75} className="text-primary" />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display font-semibold text-[15.5px] text-ink leading-[1.3]">{m.name}</h3>
                      <p className="mt-2 text-[13px] text-muted leading-relaxed">{m.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* CTA */}
        <div className="flex justify-center mt-10">
          <PrimaryBtn as="a" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
            className="!px-8 !py-3.5" icon={<MessageCircle size={16} strokeWidth={1.75} />}>
            Armá el mío
          </PrimaryBtn>
        </div>
      </div>
    </section>
  );
}
