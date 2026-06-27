// src/components/sections/DashboardMock.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion, animate } from "framer-motion";
import {
  LayoutGrid, ShoppingBag, Users, Boxes, MessageCircle,
  Search, Bell, Settings,
} from "lucide-react";
import {
  DASHBOARD_KPIS, DASHBOARD_SOURCES, DASHBOARD_TREND,
  formatKpi, type Kpi,
} from "@/lib/constants";

type TabId = "resumen" | "ventas" | "clientes" | "stock" | "consultas";
const NAV: { id: TabId; label: string; Icon: typeof LayoutGrid }[] = [
  { id: "resumen",   label: "Resumen",   Icon: LayoutGrid },
  { id: "ventas",    label: "Ventas",    Icon: ShoppingBag },
  { id: "clientes",  label: "Clientes",  Icon: Users },
  { id: "stock",     label: "Stock",     Icon: Boxes },
  { id: "consultas", label: "Consultas", Icon: MessageCircle },
];
const TITLES: Record<TabId, string> = {
  resumen: "Resumen", ventas: "Ventas", clientes: "Clientes", stock: "Stock", consultas: "Consultas",
};
const MONTHS = ["E", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

/* ───────────── Resumen (KPIs + gráfico + dona) ───────────── */

function CountUp({ kpi, play }: { kpi: Kpi; play: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!play || reduce) { el.textContent = formatKpi(kpi.to, kpi.format); return; }
    const controls = animate(0, kpi.to, {
      duration: 1.2, ease: "easeOut",
      onUpdate: (v) => { el.textContent = formatKpi(v, kpi.format); },
    });
    return () => controls.stop();
  }, [play, kpi, reduce]);
  return <span ref={ref}>{formatKpi(0, kpi.format)}</span>;
}

function TrendChart({ play }: { play: boolean }) {
  const max = Math.max(...DASHBOARD_TREND);
  const W = 300, H = 100;
  const points = DASHBOARD_TREND.map((v, i) => ({
    x: (i / (DASHBOARD_TREND.length - 1)) * W,
    y: H - (v / max) * (H - 18) - 9,
  }));
  let line = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i], p1 = points[i + 1];
    const cx = (p0.x + p1.x) / 2;
    line += ` C ${cx} ${p0.y}, ${cx} ${p1.y}, ${p1.x} ${p1.y}`;
  }
  const area = `${line} L ${W} ${H} L 0 ${H} Z`;
  const last = points[points.length - 1];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="w-full h-full overflow-visible">
      <defs>
        <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(43,91,255,.40)" />
          <stop offset="100%" stopColor="rgba(43,91,255,0)" />
        </linearGradient>
      </defs>
      {[0.33, 0.66].map((g) => (
        <line key={g} x1={0} x2={W} y1={H * g} y2={H * g}
          stroke="rgba(255,255,255,.05)" strokeWidth={1} vectorEffect="non-scaling-stroke" />
      ))}
      <motion.path d={area} fill="url(#trendFill)"
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.4 }} />
      <motion.path d={line} fill="none" stroke="#4F7BFF" strokeWidth={2.5}
        strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.4, ease: "easeInOut" }}
        style={{ filter: "drop-shadow(0 0 3px rgba(79,123,255,.7))" }} />
      <motion.circle cx={last.x} cy={last.y} r={3.5} fill="#4F7BFF"
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        animate={{ opacity: [0.5, 0, 0.5], scale: [1, 2.6, 1] }}
        transition={{ duration: 2.2, repeat: Infinity, delay: 1.2, ease: "easeInOut" }} />
      <motion.circle cx={last.x} cy={last.y} r={3.5} fill="#fff" stroke="#4F7BFF" strokeWidth={2}
        vectorEffect="non-scaling-stroke"
        initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, type: "spring", stiffness: 300 }} />
    </svg>
  );
}

function Donut() {
  let acc = 0;
  const segments = DASHBOARD_SOURCES.map((s) => {
    const start = acc; acc += s.pct;
    return `${s.color} ${start}% ${acc}%`;
  }).join(", ");
  return (
    <div className="flex items-center gap-3">
      <div className="relative w-[56px] h-[56px] shrink-0">
        <div className="w-full h-full rounded-full" style={{ background: `conic-gradient(${segments})` }} />
        <div className="absolute inset-[9px] rounded-full" style={{ background: "var(--color-surface)" }} />
      </div>
      <div className="flex flex-col gap-1">
        {DASHBOARD_SOURCES.map((s) => (
          <div key={s.label} className="flex items-center gap-1.5 text-[10px] text-muted">
            <span className="w-2 h-2 rounded-[3px]" style={{ background: s.color }} />
            <span className="text-ink/80">{s.label}</span>
            <span className="ml-auto tabular-nums">{s.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResumenView({ play }: { play: boolean }) {
  return (
    <div className="flex flex-col gap-2.5">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {DASHBOARD_KPIS.map((kpi) => (
          <div key={kpi.label} className="rounded-xl border border-line p-2.5" style={{ background: "var(--color-bg)" }}>
            <div className="font-mono text-[9px] uppercase tracking-wide text-muted truncate">{kpi.label}</div>
            <div className="font-display text-[15px] lg:text-[17px] font-semibold text-ink tabular-nums leading-tight mt-0.5">
              <CountUp kpi={kpi} play={play} />
            </div>
            <div className={`text-[9.5px] font-medium ${kpi.up ? "text-[#22C55E]" : "text-[#EF4444]"}`}>{kpi.delta}</div>
          </div>
        ))}
      </div>
      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-2">
        <div className="rounded-xl border border-line p-2.5" style={{ background: "var(--color-bg)" }}>
          <div className="flex items-center justify-between mb-1">
            <span className="font-mono text-[9px] uppercase tracking-wide text-muted">Ingresos anuales</span>
            <span className="font-mono text-[9px] text-[#22C55E]">▲ 2026</span>
          </div>
          <div className="h-[58px]"><TrendChart play={play} /></div>
          <div className="flex justify-between mt-1 font-mono text-[7px] text-muted/45">
            {MONTHS.map((m, i) => <span key={i}>{m}</span>)}
          </div>
        </div>
        <div className="rounded-xl border border-line p-2.5 hidden lg:block" style={{ background: "var(--color-bg)" }}>
          <div className="font-mono text-[9px] uppercase tracking-wide text-muted mb-2">Origen de ventas</div>
          <Donut />
        </div>
      </div>
    </div>
  );
}

/* ───────────── Ventas (tabla) ───────────── */

function VentasView() {
  const rows = [
    { p: "Remera Oversize", c: "Lucas A.",   m: "$28.000", e: "Pagado",   ok: true },
    { p: "Buzo Hoodie",     c: "Estudio N.", m: "$45.000", e: "Pagado",   ok: true },
    { p: "Gorra Trucker",   c: "Mia R.",     m: "$12.000", e: "Pendiente", ok: false },
    { p: "Pantalón Cargo",  c: "Clínica S.", m: "$38.000", e: "Pagado",   ok: true },
  ];
  return (
    <div className="rounded-xl border border-line overflow-hidden" style={{ background: "var(--color-bg)" }}>
      <div className="grid grid-cols-[1.4fr_1fr_.9fr_.9fr] gap-2 px-3 py-2 border-b border-line/70 font-mono text-[9px] uppercase tracking-wide text-muted/60">
        <span>Producto</span><span>Cliente</span><span>Estado</span><span className="text-right">Monto</span>
      </div>
      {rows.map((r, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
          className="grid grid-cols-[1.4fr_1fr_.9fr_.9fr] gap-2 px-3 py-2 items-center border-b border-line/40 last:border-0">
          <span className="text-[11px] text-ink truncate">{r.p}</span>
          <span className="text-[11px] text-muted truncate">{r.c}</span>
          <span className={`text-[9.5px] ${r.ok ? "text-[#22C55E]" : "text-[#F59E0B]"}`}>● {r.e}</span>
          <span className="text-[11px] text-ink/90 tabular-nums text-right">{r.m}</span>
        </motion.div>
      ))}
    </div>
  );
}

/* ───────────── Clientes (tabla) ───────────── */

function ClientesView() {
  const rows = [
    { n: "Estudio Norte",   e: "Activo",    v: "$320.000", ok: true },
    { n: "Gimnasio Pulse",  e: "Activo",    v: "$185.000", ok: true },
    { n: "Café del Centro", e: "Pendiente", v: "$92.000",  ok: false },
    { n: "Clínica Sur",     e: "Activo",    v: "$410.000", ok: true },
  ];
  return (
    <div className="rounded-xl border border-line overflow-hidden" style={{ background: "var(--color-bg)" }}>
      <div className="grid grid-cols-[1.4fr_1fr_1fr] gap-2 px-3 py-2 border-b border-line/70 font-mono text-[9px] uppercase tracking-wide text-muted/60">
        <span>Cliente</span><span>Estado</span><span className="text-right">Valor</span>
      </div>
      {rows.map((r, i) => (
        <motion.div key={r.n}
          initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }}
          className="grid grid-cols-[1.4fr_1fr_1fr] gap-2 px-3 py-2 items-center border-b border-line/40 last:border-0">
          <span className="text-[11px] text-ink truncate">{r.n}</span>
          <span>
            <span className={`inline-flex items-center gap-1 text-[9.5px] px-1.5 py-0.5 rounded-full ${
              r.ok ? "bg-[#22C55E]/15 text-[#22C55E]" : "bg-[#F59E0B]/15 text-[#F59E0B]"
            }`}>
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: "currentColor" }} /> {r.e}
            </span>
          </span>
          <span className="text-[11px] text-ink/90 tabular-nums text-right">{r.v}</span>
        </motion.div>
      ))}
    </div>
  );
}

/* ───────────── Stock (barras) ───────────── */

function StockView() {
  const items = [
    { n: "Remera Oversize", pct: 82, u: 41 },
    { n: "Buzo Hoodie",     pct: 54, u: 27 },
    { n: "Gorra Trucker",   pct: 23, u: 11, low: true },
    { n: "Pantalón Cargo",  pct: 68, u: 34 },
  ];
  return (
    <div className="rounded-xl border border-line p-3 flex flex-col gap-3" style={{ background: "var(--color-bg)" }}>
      {items.map((it, i) => (
        <motion.div key={it.n}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.07 }}
          className="flex items-center gap-2">
          <span className="text-[11px] text-ink/90 w-[42%] truncate">{it.n}</span>
          <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "var(--color-surface2)" }}>
            <motion.div className="h-full rounded-full"
              initial={{ width: 0 }} animate={{ width: `${it.pct}%` }} transition={{ duration: 0.8, delay: i * 0.07 }}
              style={{ background: it.low ? "#F59E0B" : "#2B5BFF" }} />
          </div>
          <span className={`text-[10px] tabular-nums w-8 text-right ${it.low ? "text-[#F59E0B]" : "text-muted"}`}>{it.u}</span>
        </motion.div>
      ))}
    </div>
  );
}

/* ───────────── Consultas (chat WhatsApp) ───────────── */

function ConsultasView() {
  const msgs = [
    { me: false, t: "Hola! Atienden los sábados?" },
    { me: true,  t: "¡Hola! 🙌 Sí, de 9 a 13h. ¿Querés que te reserve un turno?" },
    { me: false, t: "Dale, a las 11" },
    { me: true,  t: "Listo ✅ Turno confirmado para el sábado 11:00." },
  ];
  return (
    <div className="rounded-xl border border-line p-3 flex flex-col gap-2" style={{ background: "var(--color-bg)" }}>
      <div className="flex items-center gap-2 pb-2 border-b border-line/70">
        <span className="w-6 h-6 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
          <MessageCircle size={12} className="text-primary" />
        </span>
        <div className="leading-none">
          <div className="text-[11.5px] font-semibold text-ink">Consulta · WhatsApp</div>
          <div className="text-[9px] text-[#22C55E] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" /> respondida por la IA
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        {msgs.map((m, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.12 }}
            className={`max-w-[80%] px-2.5 py-1.5 text-[11px] leading-snug rounded-2xl ${
              m.me ? "self-end bg-primary/20 border border-primary/30 text-ink rounded-br-sm"
                   : "self-start text-muted rounded-bl-sm"
            }`}
            style={m.me ? {} : { background: "var(--color-surface2)" }}>
            {m.t}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

/* ───────────────────────── shell (estructura Máximo B) ───────────────────────── */

export default function DashboardMock() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [tab, setTab] = useState<TabId>("resumen");

  return (
    <div ref={ref}
      className="w-full rounded-2xl border border-line overflow-hidden text-left flex"
      style={{ background: "var(--color-surface)", boxShadow: "var(--shadow-card)" }}>

      {/* ── sidebar ── */}
      <aside className="hidden sm:flex flex-col w-[152px] shrink-0 border-r border-line/70" style={{ background: "#0c0c0d" }}>
        <div className="flex items-center gap-2 h-[44px] px-3 border-b border-line/70">
          <span className="w-5 h-5 rounded-md bg-primary/20 border border-primary/40 flex items-center justify-center">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
          </span>
          <span className="font-display text-[12.5px] font-semibold text-ink">Mi Negocio</span>
        </div>
        <div className="px-3 pt-3 pb-1 text-[9px] font-medium uppercase tracking-[0.18em] text-muted/50">Tienda</div>
        <nav className="flex-1 px-2 space-y-0.5">
          {NAV.map(({ id, label, Icon }) => {
            const active = id === tab;
            return (
              <button key={id} type="button" onClick={() => setTab(id)}
                className={`group relative flex w-full items-center gap-2.5 rounded-lg px-2.5 py-2 text-[12px] font-medium text-left transition-colors ${
                  active ? "text-ink" : "text-muted hover:text-ink hover:bg-white/[.04]"
                }`}
                style={{ background: active ? "rgba(255,255,255,.06)" : "transparent" }}>
                {active && <span className="absolute left-0 top-1/2 h-4 w-[3px] -translate-y-1/2 rounded-r-full bg-primary" />}
                <Icon size={15} strokeWidth={1.75} className={active ? "text-primary" : "text-muted/70"} /> {label}
              </button>
            );
          })}
        </nav>
        <div className="border-t border-line/70 p-2">
          <div className="flex items-center gap-2 rounded-lg px-2 py-1.5">
            <span className="w-7 h-7 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center text-[10px] font-bold text-primary">MB</span>
            <div className="min-w-0 leading-tight">
              <div className="truncate text-[11px] font-medium text-ink">Maxi B.</div>
              <div className="truncate text-[9px] text-muted/60">Dueño</div>
            </div>
            <Settings size={13} className="text-muted/50 ml-auto" />
          </div>
        </div>
      </aside>

      {/* ── main ── */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* topbar */}
        <div className="flex items-center gap-2 h-[44px] px-3 border-b border-line/70" style={{ background: "rgba(10,10,11,.6)" }}>
          <div className="flex items-center gap-1.5 flex-1 max-w-[220px] rounded-lg border border-line px-2 py-1" style={{ background: "var(--color-bg)" }}>
            <Search size={12} className="text-muted/60" />
            <span className="text-[10.5px] text-muted/50 truncate">Buscar productos, ventas…</span>
          </div>
          <span className="ml-auto font-display text-[12px] font-semibold text-ink">{TITLES[tab]}</span>
          <div className="relative ml-1">
            <Bell size={15} className="text-muted/70" />
            <span className="absolute -right-0.5 -top-0.5 w-1.5 h-1.5 rounded-full bg-primary" />
          </div>
        </div>

        {/* tabs mobile */}
        <div className="sm:hidden flex gap-1.5 overflow-x-auto px-2.5 py-2 border-b border-line/70">
          {NAV.map(({ id, label }) => (
            <button key={id} type="button" onClick={() => setTab(id)}
              className={`shrink-0 px-2.5 py-1 rounded-full text-[10.5px] border ${
                id === tab ? "bg-primary/15 text-primary border-primary/30" : "text-muted border-line"
              }`}>
              {label}
            </button>
          ))}
        </div>

        {/* contenido — ALTURA FIJA para que no cambie de tamaño */}
        <div className="p-3 h-[206px] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.div key={tab}
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.22 }}>
              {tab === "resumen"   && <ResumenView play={inView} />}
              {tab === "ventas"    && <VentasView />}
              {tab === "clientes"  && <ClientesView />}
              {tab === "stock"     && <StockView />}
              {tab === "consultas" && <ConsultasView />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
