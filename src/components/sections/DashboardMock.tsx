// src/components/sections/DashboardMock.tsx
"use client";
import { useEffect, useRef } from "react";
import { motion, useInView, useReducedMotion, animate } from "framer-motion";
import { BarChart3, Bot, GitBranch, Users, Boxes } from "lucide-react";
import {
  DASHBOARD_NAV, DASHBOARD_KPIS, DASHBOARD_SOURCES, DASHBOARD_TREND,
  formatKpi, type Kpi,
} from "@/lib/constants";

const NAV_ICONS = [BarChart3, Bot, GitBranch, Users, Boxes];

function CountUp({ kpi, play }: { kpi: Kpi; play: boolean }) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!play || reduce) { el.textContent = formatKpi(kpi.to, kpi.format); return; }
    const controls = animate(0, kpi.to, {
      duration: 1.4, ease: "easeOut",
      onUpdate: (v) => { el.textContent = formatKpi(v, kpi.format); },
    });
    return () => controls.stop();
  }, [play, kpi, reduce]);
  return <span ref={ref}>{formatKpi(0, kpi.format)}</span>;
}

// Gráfico de línea: curva suave que se dibuja con pathLength (stroke uniforme)
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
        initial={{ opacity: 0 }} animate={play ? { opacity: 1 } : {}}
        transition={{ duration: 1, delay: 0.5 }} />
      <motion.path d={line} fill="none" stroke="#4F7BFF" strokeWidth={2.5}
        strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke"
        initial={{ pathLength: 0 }} animate={play ? { pathLength: 1 } : {}}
        transition={{ duration: 1.6, ease: "easeInOut" }}
        style={{ filter: "drop-shadow(0 0 3px rgba(79,123,255,.7))" }} />
      {/* halo que late (sensación de "en vivo") */}
      {play && (
        <motion.circle cx={last.x} cy={last.y} r={3.5} fill="#4F7BFF"
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0.5, 0, 0.5], scale: [1, 2.6, 1] }}
          transition={{ duration: 2.2, repeat: Infinity, delay: 1.6, ease: "easeInOut" }} />
      )}
      <motion.circle cx={last.x} cy={last.y} r={3.5} fill="#fff" stroke="#4F7BFF" strokeWidth={2}
        vectorEffect="non-scaling-stroke"
        initial={{ opacity: 0, scale: 0 }} animate={play ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 1.5, type: "spring", stiffness: 300 }} />
    </svg>
  );
}

const MONTHS = ["E", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

function Donut() {
  const stops = DASHBOARD_SOURCES;
  let acc = 0;
  const segments = stops.map((s) => {
    const start = acc; acc += s.pct;
    return `${s.color} ${start}% ${acc}%`;
  }).join(", ");
  return (
    <div className="flex items-center gap-3">
      <div className="relative w-[64px] h-[64px] shrink-0">
        <div className="w-full h-full rounded-full"
          style={{ background: `conic-gradient(${segments})` }} />
        <div className="absolute inset-[10px] rounded-full" style={{ background: "var(--color-surface)" }} />
      </div>
      <div className="flex flex-col gap-1">
        {stops.map((s) => (
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

export default function DashboardMock() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div ref={ref}
      className="w-full rounded-2xl border border-line overflow-hidden text-left"
      style={{ background: "var(--color-surface)", boxShadow: "var(--shadow-card)" }}
    >
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
        {/* sidebar */}
        <aside className="hidden sm:flex flex-col gap-1 w-[120px] shrink-0 p-2.5 border-r border-line/70">
          <div className="flex items-center gap-2 px-2 py-2 mb-1">
            <span className="w-5 h-5 rounded-md bg-primary/20 border border-primary/40 flex items-center justify-center">
              <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            </span>
            <span className="font-display text-[12px] font-semibold text-ink">Mi Negocio</span>
          </div>
          {DASHBOARD_NAV.map((item, i) => {
            const Icon = NAV_ICONS[i];
            const active = i === 0;
            return (
              <div key={item}
                className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-[11.5px] ${
                  active ? "bg-primary/15 text-primary border border-primary/30" : "text-muted"
                }`}>
                <Icon size={13} strokeWidth={1.75} /> {item}
              </div>
            );
          })}
        </aside>

        {/* main */}
        <div className="flex-1 min-w-0 p-3 md:p-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <div className="font-display text-[13px] font-semibold text-ink">Dashboard analítico</div>
              <div className="font-mono text-[10px] text-muted">Junio 2026</div>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full border border-[#22C55E]/40 bg-[#22C55E]/10 px-2 py-0.5 text-[10px] font-semibold text-[#22C55E]">
              +12% ▲
            </span>
          </div>

          {/* KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
            {DASHBOARD_KPIS.map((kpi, i) => (
              <motion.div key={kpi.label}
                className="rounded-xl border border-line p-2.5" style={{ background: "var(--color-bg)" }}
                initial={{ opacity: 0, y: 10 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}>
                <div className="font-mono text-[9.5px] uppercase tracking-wide text-muted truncate">{kpi.label}</div>
                <div className="font-display text-[16px] md:text-[18px] font-semibold text-ink tabular-nums leading-tight mt-0.5">
                  <CountUp kpi={kpi} play={inView} />
                </div>
                <div className={`text-[10px] font-medium ${kpi.up ? "text-[#22C55E]" : "text-[#EF4444]"}`}>
                  {kpi.delta} <span className="text-muted">vs mes ant.</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* graph + donut */}
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-2">
            <div className="rounded-xl border border-line p-2.5" style={{ background: "var(--color-bg)" }}>
              <div className="flex items-center justify-between mb-1">
                <span className="font-mono text-[9.5px] uppercase tracking-wide text-muted">Ingresos anuales</span>
                <span className="font-mono text-[9px] text-[#22C55E]">▲ 2026</span>
              </div>
              <div className="h-[72px]"><TrendChart play={inView} /></div>
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
      </div>
    </div>
  );
}
