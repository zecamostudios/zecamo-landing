// src/components/sections/DashboardMock.tsx
"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion, animate } from "framer-motion";
import {
  Home, Package, Layers, ShoppingBag, Users, MessageCircle,
  Search, Bell, Settings, LogOut, ImageIcon, Plus,
} from "lucide-react";

// Acento "voltage" del dashboard de Máximo B (verde). Cambiar a "#2B5BFF" para azul Zecamo.
const G = "#3DDC84";
const G_SOFT = "rgba(61,220,132,.14)";
const G_BORDER = "rgba(61,220,132,.35)";

type TabId = "resumen" | "productos" | "stock" | "ventas" | "clientes" | "consultas";
const NAV: { id: TabId; label: string; Icon: typeof Home; badge?: number }[] = [
  { id: "resumen",   label: "Resumen",   Icon: Home },
  { id: "productos", label: "Productos", Icon: Package },
  { id: "stock",     label: "Stock",     Icon: Layers },
  { id: "ventas",    label: "Ventas",    Icon: ShoppingBag },
  { id: "clientes",  label: "Clientes",  Icon: Users },
  { id: "consultas", label: "Consultas", Icon: MessageCircle, badge: 5 },
];

/* ───────── header reutilizable de cada vista ───────── */
function ViewHeader({ eyebrow, title, sub, action }: { eyebrow: string; title: string; sub: string; action?: string }) {
  return (
    <div className="flex items-start justify-between mb-2.5">
      <div className="min-w-0">
        <div className="font-mono text-[8.5px] font-bold tracking-[.16em] uppercase mb-0.5" style={{ color: G }}>{eyebrow}</div>
        <div className="font-serif text-[20px] leading-none text-ink">{title}</div>
        <div className="text-[9.5px] text-muted mt-1 truncate">{sub}</div>
      </div>
      {action && (
        <span className="shrink-0 inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-[9.5px] font-semibold text-black"
          style={{ background: G }}>
          <Plus size={10} strokeWidth={3} /> {action}
        </span>
      )}
    </div>
  );
}

/* ───────── Resumen (KPIs + evolución + canales) ───────── */
function CountUp({ to, prefix = "", play }: { to: number; prefix?: string; play: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const fmt = (v: number) => prefix + Math.round(v).toLocaleString("es-AR");
    if (!play || reduce) { el.textContent = fmt(to); return; }
    const c = animate(0, to, { duration: 1.1, ease: "easeOut", onUpdate: (v) => { el.textContent = fmt(v); } });
    return () => c.stop();
  }, [play, to, prefix, reduce]);
  return <span ref={ref}>{prefix}0</span>;
}

const TREND = [10, 26, 14, 60, 22, 30, 18, 44, 20, 16, 52, 24, 18, 38];
function MiniChart({ play }: { play: boolean }) {
  const max = Math.max(...TREND), W = 300, H = 100;
  const pts = TREND.map((v, i) => ({ x: (i / (TREND.length - 1)) * W, y: H - (v / max) * (H - 12) - 6 }));
  let d = `M ${pts[0].x} ${pts[0].y}`;
  pts.slice(1).forEach((p) => { d += ` L ${p.x} ${p.y}`; });
  const area = `${d} L ${W} ${H} L 0 ${H} Z`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="w-full h-full">
      <defs>
        <linearGradient id="gFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(61,220,132,.35)" /><stop offset="100%" stopColor="rgba(61,220,132,0)" />
        </linearGradient>
      </defs>
      <motion.path d={area} fill="url(#gFill)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }} />
      <motion.path d={d} fill="none" stroke={G} strokeWidth={2} strokeLinejoin="round" vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.3, ease: "easeInOut" }}
        style={{ filter: `drop-shadow(0 0 3px ${G})` }} />
    </svg>
  );
}

function ResumenView({ play }: { play: boolean }) {
  const kpis = [
    { l: "Ingresos del período", v: 7062000, p: "$ ", d: "+8,1%" },
    { l: "Ticket promedio",      v: 461056,  p: "$ ", d: "+3,2%" },
    { l: "Operaciones",          v: 18,       p: "",   d: "en total" },
    { l: "Unidades vendidas",    v: 39,       p: "",   d: "top 6" },
  ];
  const canales = [{ n: "Local", h: 100, on: true }, { n: "Web", h: 42 }, { n: "WhatsApp", h: 30 }];
  return (
    <div className="flex flex-col gap-2">
      <div className="grid grid-cols-4 gap-1.5">
        {kpis.map((k) => (
          <div key={k.l} className="rounded-lg border border-line p-1.5" style={{ background: "var(--color-bg)" }}>
            <div className="font-mono text-[7px] uppercase tracking-wide text-muted/70 truncate">{k.l}</div>
            <div className="font-serif text-[13px] text-ink tabular-nums leading-tight mt-0.5"><CountUp to={k.v} prefix={k.p} play={play} /></div>
            <div className="text-[7.5px]" style={{ color: G }}>{k.d}</div>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-[1.7fr_1fr] gap-1.5">
        <div className="rounded-lg border border-line p-2" style={{ background: "var(--color-bg)" }}>
          <div className="text-[8px] text-muted mb-1">Evolución de ventas</div>
          <div className="h-[70px]"><MiniChart play={play} /></div>
        </div>
        <div className="rounded-lg border border-line p-2 flex flex-col" style={{ background: "var(--color-bg)" }}>
          <div className="text-[8px] text-muted mb-1">Ingresos por canal</div>
          <div className="flex-1 flex items-end justify-around gap-1.5 pb-0.5">
            {canales.map((c) => (
              <div key={c.n} className="flex flex-col items-center gap-1 flex-1">
                <motion.div className="w-full rounded-t" style={{ background: c.on ? G : "rgba(255,255,255,.12)" }}
                  initial={{ height: 0 }} animate={{ height: `${c.h * 0.6}px` }} transition={{ duration: 0.7, delay: 0.3 }} />
                <span className="text-[6.5px] text-muted/70">{c.n}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────── Productos (grilla) ───────── */
function ProductosView() {
  const prods = [
    { n: "Pantalón Sastre Carbón", c: "Pantalones", price: "$ 124.000", stock: "10 u.", dest: true },
    { n: "Sweater Merino Humo",    c: "Sweaters",   price: "$ 87.000",  stock: "17 u.", dest: true },
    { n: "Sobretodo Lana Onyx",    c: "Abrigos",    price: "$ 345.000", stock: "6 u.",  dest: true },
    { n: "Remera Pima Grafito",    c: "Remeras",    price: "$ 42.000",  stock: "27 u." },
    { n: "Blazer Lino Arena",      c: "Sacos",      price: "$ 198.000", stock: "8 u." },
    { n: "Camisa Lino Hueso",      c: "Camisas",    price: "$ 96.000",  stock: "14 u." },
  ];
  return (
    <div className="grid grid-cols-3 gap-1.5">
      {prods.map((p, i) => (
        <motion.div key={p.n} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}
          className="rounded-lg border border-line overflow-hidden" style={{ background: "var(--color-bg)" }}>
          <div className="relative h-[48px] flex items-center justify-center"
            style={{ background: "repeating-linear-gradient(45deg, rgba(255,255,255,.03) 0 6px, transparent 6px 12px)" }}>
            {p.dest && <span className="absolute top-1 left-1 rounded px-1 py-px text-[6.5px] font-semibold text-black" style={{ background: G }}>● Destacado</span>}
            <ImageIcon size={16} className="text-muted/30" />
            <span className="absolute bottom-1 right-1 rounded bg-black/50 px-1 py-px text-[6.5px] text-muted">{p.stock}</span>
          </div>
          <div className="p-1.5">
            <div className="text-[9px] text-ink truncate leading-tight">{p.n}</div>
            <div className="flex items-center justify-between mt-0.5">
              <span className="text-[7px] text-muted/60 truncate">{p.c}</span>
              <span className="text-[8.5px] font-semibold tabular-nums" style={{ color: G }}>{p.price}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

/* ───────── Stock (barras) ───────── */
function StockView() {
  const items = [
    { n: "Remera Pima Grafito", pct: 82, u: 27 },
    { n: "Sweater Merino Humo", pct: 54, u: 17 },
    { n: "Sobretodo Lana Onyx", pct: 23, u: 6, low: true },
    { n: "Pantalón Sastre Carbón", pct: 68, u: 10 },
    { n: "Camisa Lino Hueso", pct: 90, u: 14 },
  ];
  return (
    <div className="rounded-lg border border-line p-3 flex flex-col gap-3" style={{ background: "var(--color-bg)" }}>
      {items.map((it, i) => (
        <motion.div key={it.n} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.06 }} className="flex items-center gap-2">
          <span className="text-[10px] text-ink/90 w-[42%] truncate">{it.n}</span>
          <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--color-surface2)" }}>
            <motion.div className="h-full rounded-full" initial={{ width: 0 }} animate={{ width: `${it.pct}%` }}
              transition={{ duration: 0.7, delay: i * 0.06 }} style={{ background: it.low ? "#F59E0B" : G }} />
          </div>
          <span className="text-[9px] tabular-nums w-7 text-right" style={{ color: it.low ? "#F59E0B" : "var(--color-muted)" }}>{it.u}u</span>
        </motion.div>
      ))}
    </div>
  );
}

/* ───────── Ventas (tabla) ───────── */
function ChannelPill({ c }: { c: "Local" | "Web" | "WhatsApp" }) {
  if (c === "Web") return <span className="rounded-full px-1.5 py-px text-[7.5px] font-semibold text-black" style={{ background: G }}>Web</span>;
  return <span className="rounded-full border border-line px-1.5 py-px text-[7.5px] text-muted">{c}</span>;
}
function VentasView() {
  const rows: { f: string; n: string; ini: string; c: "Local" | "Web" | "WhatsApp"; t: string }[] = [
    { f: "#8bcc6b", n: "Iván Domínguez", ini: "ID", c: "Local",    t: "$ 1.375.000" },
    { f: "#716dd9", n: "Mateo Ríos",     ini: "MR", c: "Web",      t: "$ 192.000" },
    { f: "#97c3ea", n: "Venta mostrador", ini: "VM", c: "WhatsApp", t: "$ 316.000" },
    { f: "#bdccce", n: "Iván Domínguez", ini: "ID", c: "WhatsApp", t: "$ 441.000" },
    { f: "#7a7132", n: "Federico Luna",  ini: "FL", c: "Local",    t: "$ 842.000" },
  ];
  return (
    <div className="rounded-lg border border-line overflow-hidden" style={{ background: "var(--color-bg)" }}>
      <div className="grid grid-cols-[auto_1fr_auto_auto] gap-2 px-2.5 py-1.5 border-b border-line/70 font-mono text-[7.5px] uppercase tracking-wide text-muted/50">
        <span className="w-9">Folio</span><span>Cliente</span><span>Canal</span><span className="text-right">Total</span>
      </div>
      {rows.map((r, i) => (
        <motion.div key={i} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
          className="grid grid-cols-[auto_1fr_auto_auto] gap-2 px-2.5 py-1.5 items-center border-b border-line/40 last:border-0">
          <span className="font-mono text-[8px] text-muted/60 w-9">{r.f}</span>
          <span className="flex items-center gap-1.5 min-w-0">
            <span className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-[6.5px] text-muted shrink-0">{r.ini}</span>
            <span className="text-[9.5px] text-ink truncate">{r.n}</span>
          </span>
          <ChannelPill c={r.c} />
          <span className="text-[9.5px] tabular-nums text-right" style={{ color: G }}>{r.t}</span>
        </motion.div>
      ))}
    </div>
  );
}

/* ───────── Clientes (tabla) ───────── */
function ClientesView() {
  const rows = [
    { n: "Bruno Sosa",     ini: "BS", tel: "+54 9 381 339-5510", o: "WhatsApp", mk: false },
    { n: "Mateo Ríos",     ini: "MR", tel: "+54 9 381 367-9001", o: "Web",      mk: false },
    { n: "Iván Domínguez", ini: "ID", tel: "+54 9 381 745-1209", o: "WhatsApp", mk: true },
    { n: "Nahuel Méndez",  ini: "NM", tel: "+54 9 381 622-0145", o: "Local",    mk: true },
    { n: "Agustín Vera",   ini: "AV", tel: "+54 9 381 480-2255", o: "Web",      mk: true },
  ];
  return (
    <div className="rounded-lg border border-line overflow-hidden" style={{ background: "var(--color-bg)" }}>
      <div className="grid grid-cols-[1.3fr_1fr_auto_auto] gap-2 px-2.5 py-1.5 border-b border-line/70 font-mono text-[7.5px] uppercase tracking-wide text-muted/50">
        <span>Cliente</span><span>Teléfono</span><span>Origen</span><span>Mkt</span>
      </div>
      {rows.map((r, i) => (
        <motion.div key={r.n} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
          className="grid grid-cols-[1.3fr_1fr_auto_auto] gap-2 px-2.5 py-1.5 items-center border-b border-line/40 last:border-0">
          <span className="flex items-center gap-1.5 min-w-0">
            <span className="w-4 h-4 rounded-full bg-white/10 flex items-center justify-center text-[6.5px] text-muted shrink-0">{r.ini}</span>
            <span className="text-[9.5px] text-ink truncate">{r.n}</span>
          </span>
          <span className="font-mono text-[8px] text-muted/70 truncate">{r.tel}</span>
          <span className="rounded-full border border-line px-1.5 py-px text-[7.5px] text-muted">{r.o}</span>
          {r.mk
            ? <span className="rounded-full px-1.5 py-px text-[7.5px] font-semibold text-black" style={{ background: G }}>Aceptado</span>
            : <span className="rounded-full border border-line px-1.5 py-px text-[7.5px] text-muted/60">No</span>}
        </motion.div>
      ))}
    </div>
  );
}

/* ───────── Consultas (bandeja WhatsApp) ───────── */
function ConsultasView() {
  const convos = [
    { n: "Tomás Aguirre",  ini: "TA", m: "Hola! Tienen el saco cruzado en talle 50?", t: "13:26", on: true },
    { n: "Nahuel Méndez",  ini: "NM", m: "Hacen envíos a Yerba Buena? cuánto sale", t: "12:10" },
    { n: "Iván Domínguez", ini: "ID", m: "La parka técnica está disponible en L?", t: "11:02" },
    { n: "Federico Luna",  ini: "FL", m: "Aceptan Mercado Pago en cuotas?", t: "hace 3 h" },
  ];
  return (
    <div className="rounded-lg border border-line overflow-hidden" style={{ background: "var(--color-bg)" }}>
      <div className="flex items-center gap-2 px-2.5 py-1.5 border-b border-line/70">
        <span className="font-mono text-[8px] uppercase tracking-wide text-muted/60">Bandeja · WhatsApp</span>
        <span className="ml-auto rounded-full px-1.5 py-px text-[7.5px] font-semibold text-black" style={{ background: G }}>● 1 pendiente</span>
      </div>
      {convos.map((c, i) => (
        <motion.div key={c.n} initial={{ opacity: 0, x: -6 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}
          className="flex items-center gap-2 px-2.5 py-1.5 border-b border-line/40 last:border-0">
          <span className="relative w-5 h-5 rounded-full bg-white/10 flex items-center justify-center text-[7px] text-muted shrink-0">
            {c.ini}{c.on && <span className="absolute -top-0.5 -right-0.5 w-1.5 h-1.5 rounded-full" style={{ background: G }} />}
          </span>
          <span className="min-w-0 flex-1">
            <span className="text-[9.5px] text-ink">{c.n}</span>
            <span className="block text-[8px] text-muted/70 truncate">{c.m}</span>
          </span>
          <span className="text-[7px] text-muted/50 shrink-0">{c.t}</span>
        </motion.div>
      ))}
    </div>
  );
}

const VIEWS: Record<TabId, { eyebrow: string; title: string; sub: string; action?: string; node: (play: boolean) => ReactNode }> = {
  resumen:   { eyebrow: "Finanzas",     title: "Resumen",   sub: "Ventas, canales y clientes del período.", node: (p) => <ResumenView play={p} /> },
  productos: { eyebrow: "13 artículos", title: "Productos", sub: "Catálogo, precios y disponibilidad.",     action: "Nuevo", node: () => <ProductosView /> },
  stock:     { eyebrow: "Inventario",   title: "Stock",     sub: "Unidades por producto en tiempo real.",   node: () => <StockView /> },
  ventas:    { eyebrow: "18 operaciones", title: "Ventas",  sub: "Historial por local, web y WhatsApp.",     action: "Nueva", node: () => <VentasView /> },
  clientes:  { eyebrow: "8 registros",  title: "Clientes",  sub: "CRM liviano con consentimiento (Ley 25.326).", action: "Nuevo", node: () => <ClientesView /> },
  consultas: { eyebrow: "WhatsApp",     title: "Consultas", sub: "Bandeja entrante atendida por la IA.",     node: () => <ConsultasView /> },
};

/* ───────────────────── shell (estructura Máximo B) ───────────────────── */
export default function DashboardMock() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [tab, setTab] = useState<TabId>("resumen");
  const view = VIEWS[tab];

  return (
    <div ref={ref}
      className="w-full rounded-2xl border border-line overflow-hidden text-left flex"
      style={{ background: "var(--color-surface)", boxShadow: "var(--shadow-card)" }}>

      {/* sidebar */}
      <aside className="hidden sm:flex flex-col w-[150px] shrink-0 border-r border-line/70" style={{ background: "#0c0c0d" }}>
        <div className="h-[42px] flex items-center px-3 border-b border-line/70">
          <span className="font-display text-[12.5px] font-bold tracking-wide text-ink">MI NEGOCIO</span>
        </div>
        <div className="px-3 pt-2.5 pb-1 text-[8px] font-medium uppercase tracking-[0.18em] text-muted/45">Tienda</div>
        <nav className="flex-1 px-2 space-y-0.5">
          {NAV.map(({ id, label, Icon, badge }) => {
            const active = id === tab;
            return (
              <button key={id} type="button" onClick={() => setTab(id)}
                className={`flex w-full items-center gap-2 rounded-lg px-2 py-1.5 text-[11.5px] font-medium text-left transition-colors ${
                  active ? "text-ink border border-white/15 bg-white/[.03]" : "text-muted border border-transparent hover:text-ink hover:bg-white/[.04]"
                }`}>
                <Icon size={14} strokeWidth={1.75} className={active ? "text-ink" : "text-muted/70"} />
                <span className="flex-1">{label}</span>
                {badge && <span className="flex h-3.5 min-w-3.5 items-center justify-center rounded-full px-1 text-[8px] font-bold text-black" style={{ background: G }}>{badge}</span>}
              </button>
            );
          })}
        </nav>
        <div className="border-t border-line/70 p-2 space-y-1">
          <div className="flex items-center gap-2 px-1 text-[10px] text-muted/70"><Settings size={12} /> Configuración</div>
          <div className="flex items-center gap-2 px-1 py-1">
            <span className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center text-[9px] font-bold text-ink">N</span>
            <div className="min-w-0 leading-tight flex-1">
              <div className="truncate text-[10px] font-medium text-ink">Maxi Benítez</div>
              <div className="truncate text-[8px] text-muted/50">Dueño · Admin</div>
            </div>
            <LogOut size={11} className="text-muted/50" />
          </div>
        </div>
      </aside>

      {/* main */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* topbar */}
        <div className="h-[42px] flex items-center gap-2 px-3 border-b border-line/70" style={{ background: "rgba(10,10,11,.55)" }}>
          <div className="flex items-center gap-1.5 flex-1 max-w-[230px] rounded-md border border-line px-2 py-1" style={{ background: "var(--color-bg)" }}>
            <Search size={11} className="text-muted/60" />
            <span className="text-[10px] text-muted/45 truncate">Buscar productos, ventas, clientes…</span>
          </div>
          <div className="relative ml-auto">
            <Bell size={14} className="text-muted/70" />
            <span className="absolute -right-0.5 -top-0.5 w-1.5 h-1.5 rounded-full" style={{ background: G }} />
          </div>
          <span className="w-6 h-6 rounded-full" style={{ background: "linear-gradient(135deg,#7c5cff,#4f7bff)" }} />
        </div>

        {/* tabs mobile */}
        <div className="sm:hidden flex gap-1.5 overflow-x-auto px-2.5 py-2 border-b border-line/70">
          {NAV.map(({ id, label }) => (
            <button key={id} type="button" onClick={() => setTab(id)}
              className={`shrink-0 px-2.5 py-1 rounded-full text-[10px] border ${id === tab ? "text-black font-semibold" : "text-muted border-line"}`}
              style={id === tab ? { background: G, borderColor: G } : undefined}>
              {label}
            </button>
          ))}
        </div>

        {/* contenido — ALTURA FIJA anti-resize */}
        <div className="p-3 h-[244px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div key={tab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.22 }}>
              <ViewHeader eyebrow={view.eyebrow} title={view.title} sub={view.sub} action={view.action} />
              {view.node(inView)}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
