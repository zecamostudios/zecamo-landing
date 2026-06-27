// src/components/sections/DashboardMock.tsx
"use client";
import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion, animate } from "framer-motion";
import { BarChart3, Bot, GitBranch, Users, Boxes, Check } from "lucide-react";
import {
  DASHBOARD_KPIS, DASHBOARD_SOURCES, DASHBOARD_TREND,
  formatKpi, type Kpi,
} from "@/lib/constants";

type TabId = "analytics" | "chatbot" | "pipeline" | "clientes" | "stock";
const NAV: { id: TabId; label: string; Icon: typeof BarChart3 }[] = [
  { id: "analytics", label: "Analytics", Icon: BarChart3 },
  { id: "chatbot",   label: "Chatbot",   Icon: Bot },
  { id: "pipeline",  label: "Pipeline",  Icon: GitBranch },
  { id: "clientes",  label: "Clientes",  Icon: Users },
  { id: "stock",     label: "Stock",     Icon: Boxes },
];

const MONTHS = ["E", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

/* ───────────────────────── helpers de Analytics ───────────────────────── */

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
        initial={{ opacity: 0 }} animate={play ? { opacity: 1 } : { opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }} />
      <motion.path d={line} fill="none" stroke="#4F7BFF" strokeWidth={2.5}
        strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }} animate={play ? { pathLength: 1 } : { pathLength: 1 }}
        transition={{ duration: 1.4, ease: "easeInOut" }}
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
      <div className="relative w-[60px] h-[60px] shrink-0">
        <div className="w-full h-full rounded-full" style={{ background: `conic-gradient(${segments})` }} />
        <div className="absolute inset-[10px] rounded-full" style={{ background: "var(--color-surface)" }} />
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

/* ───────────────────────────── vistas por tab ──────────────────────────── */

function AnalyticsView({ play }: { play: boolean }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        {DASHBOARD_KPIS.map((kpi) => (
          <div key={kpi.label} className="rounded-xl border border-line p-2.5" style={{ background: "var(--color-bg)" }}>
            <div className="font-mono text-[9.5px] uppercase tracking-wide text-muted truncate">{kpi.label}</div>
            <div className="font-display text-[16px] md:text-[18px] font-semibold text-ink tabular-nums leading-tight mt-0.5">
              <CountUp kpi={kpi} play={play} />
            </div>
            <div className={`text-[10px] font-medium ${kpi.up ? "text-[#22C55E]" : "text-[#EF4444]"}`}>
              {kpi.delta} <span className="text-muted">vs mes ant.</span>
            </div>
          </div>
        ))}
      </div>
      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-2">
        <div className="rounded-xl border border-line p-2.5" style={{ background: "var(--color-bg)" }}>
          <div className="flex items-center justify-between mb-1">
            <span className="font-mono text-[9.5px] uppercase tracking-wide text-muted">Ingresos anuales</span>
            <span className="font-mono text-[9px] text-[#22C55E]">▲ 2026</span>
          </div>
          <div className="h-[64px]"><TrendChart play={play} /></div>
          <div className="flex justify-between mt-1 font-mono text-[7px] text-muted/45">
            {MONTHS.map((m, i) => <span key={i}>{m}</span>)}
          </div>
        </div>
        <div className="rounded-xl border border-line p-2.5" style={{ background: "var(--color-bg)" }}>
          <div className="font-mono text-[9.5px] uppercase tracking-wide text-muted mb-2">Origen de ventas</div>
          <Donut />
        </div>
      </div>
    </div>
  );
}

function ChatbotView() {
  const msgs = [
    { me: false, t: "Hola! Atienden los sábados?" },
    { me: true,  t: "¡Hola! 🙌 Sí, de 9 a 13h. ¿Querés que te reserve un turno?" },
    { me: false, t: "Dale, a las 11" },
    { me: true,  t: "Listo ✅ Turno confirmado para el sábado 11:00. Te llega el recordatorio." },
  ];
  return (
    <div className="rounded-xl border border-line p-3 flex flex-col gap-2" style={{ background: "var(--color-bg)" }}>
      <div className="flex items-center gap-2 pb-2 border-b border-line/70">
        <span className="w-6 h-6 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
          <Bot size={13} className="text-primary" />
        </span>
        <div className="leading-none">
          <div className="text-[11.5px] font-semibold text-ink">Asistente IA</div>
          <div className="text-[9px] text-[#22C55E] flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" /> respondiendo por WhatsApp
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        {msgs.map((m, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            className={`max-w-[78%] px-2.5 py-1.5 text-[11px] leading-snug rounded-2xl ${
              m.me
                ? "self-end bg-primary/20 border border-primary/30 text-ink rounded-br-sm"
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

function PipelineView() {
  const cols = [
    { name: "Nuevo", n: 12, color: "#4F7BFF" },
    { name: "Contactado", n: 8, color: "#7E9BFF" },
    { name: "Propuesta", n: 5, color: "#F59E0B" },
    { name: "Ganado", n: 3, color: "#22C55E" },
  ];
  return (
    <div className="grid grid-cols-4 gap-2">
      {cols.map((c, ci) => (
        <div key={c.name} className="rounded-xl border border-line p-2 flex flex-col gap-1.5" style={{ background: "var(--color-bg)" }}>
          <div className="flex items-center justify-between">
            <span className="text-[9.5px] text-muted truncate">{c.name}</span>
            <span className="text-[9.5px] font-semibold tabular-nums" style={{ color: c.color }}>{c.n}</span>
          </div>
          {Array.from({ length: Math.min(c.n, 2) }).map((_, k) => (
            <motion.div key={k}
              initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: (ci * 2 + k) * 0.06 }}
              className="rounded-md border border-line h-7 flex items-center px-1.5 gap-1" style={{ background: "var(--color-surface2)" }}>
              <span className="w-1 h-4 rounded-full" style={{ background: c.color }} />
              <span className="flex-1">
                <span className="block h-1 w-4/5 rounded bg-white/15" />
                <span className="block h-1 w-1/2 rounded bg-white/8 mt-1" />
              </span>
            </motion.div>
          ))}
        </div>
      ))}
    </div>
  );
}

function ClientesView() {
  const rows = [
    { n: "Estudio Norte",   e: "Activo",     v: "$320.000", ok: true },
    { n: "Gimnasio Pulse",  e: "Activo",     v: "$185.000", ok: true },
    { n: "Café del Centro", e: "Pendiente",  v: "$92.000",  ok: false },
    { n: "Clínica Sur",     e: "Activo",     v: "$410.000", ok: true },
  ];
  return (
    <div className="rounded-xl border border-line overflow-hidden" style={{ background: "var(--color-bg)" }}>
      <div className="grid grid-cols-[1.4fr_1fr_1fr] gap-2 px-3 py-2 border-b border-line/70 font-mono text-[9px] uppercase tracking-wide text-muted/60">
        <span>Cliente</span><span>Estado</span><span className="text-right">Valor</span>
      </div>
      {rows.map((r, i) => (
        <motion.div key={r.n}
          initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.08 }}
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

function StockView() {
  const items = [
    { n: "Remera Oversize", pct: 82, u: 41 },
    { n: "Buzo Hoodie",     pct: 54, u: 27 },
    { n: "Gorra Trucker",   pct: 23, u: 11, low: true },
    { n: "Pantalón Cargo",  pct: 68, u: 34 },
  ];
  return (
    <div className="rounded-xl border border-line p-3 flex flex-col gap-2.5" style={{ background: "var(--color-bg)" }}>
      {items.map((it, i) => (
        <motion.div key={it.n}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.08 }}
          className="flex items-center gap-2">
          <span className="text-[11px] text-ink/90 w-[42%] truncate">{it.n}</span>
          <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: "var(--color-surface2)" }}>
            <motion.div className="h-full rounded-full"
              initial={{ width: 0 }} animate={{ width: `${it.pct}%` }} transition={{ duration: 0.8, delay: i * 0.08 }}
              style={{ background: it.low ? "#F59E0B" : "#2B5BFF" }} />
          </div>
          <span className={`text-[10px] tabular-nums w-8 text-right ${it.low ? "text-[#F59E0B]" : "text-muted"}`}>{it.u}</span>
        </motion.div>
      ))}
    </div>
  );
}

/* ───────────────────────────── componente raíz ─────────────────────────── */

export default function DashboardMock() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [tab, setTab] = useState<TabId>("analytics");
  const current = NAV.find((n) => n.id === tab)!;

  const titles: Record<TabId, string> = {
    analytics: "Dashboard analítico",
    chatbot: "Atención automática",
    pipeline: "Pipeline de ventas",
    clientes: "Tus clientes",
    stock: "Control de stock",
  };

  return (
    <div ref={ref}
      className="w-full rounded-2xl border border-line overflow-hidden text-left"
      style={{ background: "var(--color-surface)", boxShadow: "var(--shadow-card)" }}>
      {/* topbar */}
      <div className="flex items-center gap-2 px-3 py-2 border-b border-line/80" style={{ background: "var(--color-surface2)" }}>
        <span className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]/80" />
        </span>
        <span className="ml-2 font-mono text-[10px] tracking-tight text-muted/80">mi-negocio · panel</span>
      </div>

      <div className="flex">
        {/* sidebar interactivo */}
        <aside className="hidden sm:flex flex-col gap-1 w-[124px] shrink-0 p-2.5 border-r border-line/70">
          <div className="flex items-center gap-2 px-2 py-2 mb-1">
            <span className="w-5 h-5 rounded-md bg-primary/20 border border-primary/40 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            </span>
            <span className="font-display text-[12px] font-semibold text-ink">Mi Negocio</span>
          </div>
          {NAV.map(({ id, label, Icon }) => {
            const active = id === tab;
            return (
              <button key={id} type="button" onClick={() => setTab(id)}
                className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-[11.5px] text-left transition-colors ${
                  active ? "bg-primary/15 text-primary border border-primary/30"
                         : "text-muted border border-transparent hover:text-ink hover:bg-white/[.04]"
                }`}>
                <Icon size={13} strokeWidth={1.75} /> {label}
              </button>
            );
          })}
        </aside>

        {/* main */}
        <div className="flex-1 min-w-0 p-3 md:p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-display text-[13px] font-semibold text-ink flex items-center gap-1.5">
                <current.Icon size={13} className="text-primary" /> {titles[tab]}
              </div>
              <div className="font-mono text-[10px] text-muted">Junio 2026</div>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full border border-[#22C55E]/40 bg-[#22C55E]/10 px-2 py-0.5 text-[10px] font-semibold text-[#22C55E]">
              <Check size={10} /> en vivo
            </span>
          </div>

          {/* tabs mobile (sin sidebar) */}
          <div className="sm:hidden flex gap-1.5 overflow-x-auto -mx-1 px-1">
            {NAV.map(({ id, label }) => (
              <button key={id} type="button" onClick={() => setTab(id)}
                className={`shrink-0 px-2.5 py-1 rounded-full text-[10.5px] border ${
                  id === tab ? "bg-primary/15 text-primary border-primary/30" : "text-muted border-line"
                }`}>
                {label}
              </button>
            ))}
          </div>

          <div className="min-h-[176px]">
            <AnimatePresence mode="wait">
              <motion.div key={tab}
                initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}>
                {tab === "analytics" && <AnalyticsView play={inView} />}
                {tab === "chatbot"   && <ChatbotView />}
                {tab === "pipeline"  && <PipelineView />}
                {tab === "clientes"  && <ClientesView />}
                {tab === "stock"     && <StockView />}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
