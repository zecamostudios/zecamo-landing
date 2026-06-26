# Rediseño Landing Zecamo — Hero 3D + Timeline — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rediseñar la landing alrededor de "vendé el resultado, no la herramienta": Hero con dashboard demo flotante 3D animado + sección Timeline "Un día en tu negocio" (camino serpenteante que se dibuja al scrollear), condensar Services/Cases, y reemplazar el formulario de Contacto por un botón directo a WhatsApp.

**Architecture:** Next.js 15 App Router (componentes en `src/components/sections/`), Tailwind v4 con tokens en `globals.css` `@theme` (`--color-bg #090909`, `--color-primary #2B5BFF`, fuente Syne). Animaciones con `framer-motion` (ya instalado, `^12.40.0`) usando `useScroll`/`useTransform`/`useInView`/`animate`. Componentes nuevos presentacionales y aislados (`DashboardMock`, `TimelinePath`, `Timeline`). El form viejo se preserva renombrado, no se borra.

**Tech Stack:** Next.js 15, React 19, TypeScript, TailwindCSS v4, framer-motion, lucide-react.

**Verificación (no hay test runner):** este repo no tiene jest/vitest/playwright y agregar uno para una landing de marketing sería over-engineering (YAGNI). Cada tarea verifica con:
- `npm run typecheck` (debe pasar sin errores)
- `npm run build` (debe compilar)
- Chequeo visual en `npm run dev` (http://localhost:3000) cuando aplica.

**Paleta / tokens (usar SIEMPRE estas clases/vars, no hardcodear):**
`bg-bg #090909` · `bg-surface #111111` · `surface2 #181818` · `text-primary / bg-primary #2B5BFF` · `primary-hover #4F7BFF` · `text-ink #FFF` · `text-muted #8A8FA8` · `border-line #1E1E2A`. Clases utilitarias existentes: `grad-border`, `grad-border-strong`, `cta-glow`, `reveal`, `dot-grid`, `line-grid`, `field`.

---

## File Structure

| Archivo | Responsabilidad | Acción |
|---------|-----------------|--------|
| `src/lib/constants.ts` | `WHATSAPP_URL` + datos demo del dashboard | CREAR |
| `src/components/sections/DashboardMock.tsx` | Mockup de dashboard (KPIs count-up, gráfico, dona). Presentacional. | CREAR |
| `src/components/sections/Hero.tsx` | Hero split: texto+CTAs WhatsApp / dashboard 3D flotante | REESCRIBIR |
| `src/components/sections/TimelinePath.tsx` | SVG serpenteante: draw por scroll + cometa + nodos que encienden | CREAR |
| `src/components/sections/Timeline.tsx` | Sección "Un día en tu negocio": 5 paradas alternadas + TimelinePath + CTA | CREAR |
| `src/components/sections/Services.tsx` | Condensar: grid compacto, sin card gigante destacada | MODIFICAR |
| `src/components/sections/Cases.tsx` | Condensar: sacar badge extra, kicker más corto | MODIFICAR |
| `src/components/sections/Contact.tsx` | Nuevo bloque WhatsApp (sin form) | REEMPLAZAR (preservando el viejo) |
| `src/components/sections/ContactForm.tsx` | Copia del Contact viejo (form Supabase/Resend), fuera del flujo | CREAR (copia) |
| `src/app/page.tsx` | Nuevo orden de secciones | MODIFICAR |
| `src/components/layout/Navbar.tsx` | Links del menú + CTA a WhatsApp | MODIFICAR |

---

## Task 1: Constantes (WhatsApp + datos demo)

**Files:**
- Create: `src/lib/constants.ts`

- [ ] **Step 1: Crear el archivo de constantes**

```ts
// src/lib/constants.ts

// ── WhatsApp ───────────────────────────────────────────────
// Número local 3814405615 → internacional WhatsApp 54 9 381 440 5615
export const WHATSAPP_NUMBER = "5493814405615";
const WHATSAPP_MSG = "Hola Zecamo 👋 Quiero que me ayuden con mi negocio.";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MSG)}`;

// ── Dashboard demo (inventado, provisorio) ─────────────────
export type KpiFormat = "ars" | "int" | "pct";
export interface Kpi {
  label: string;
  to: number;
  format: KpiFormat;
  delta: string;
  up: boolean;
}

export const DASHBOARD_NAV = ["Analytics", "Chatbot", "Pipeline", "Clientes", "Stock"];

export const DASHBOARD_KPIS: Kpi[] = [
  { label: "Ingresos del mes", to: 1840000, format: "ars", delta: "+12%", up: true },
  { label: "Clientes nuevos",  to: 47,      format: "int", delta: "+8%",  up: true },
  { label: "Pedidos activos",  to: 23,      format: "int", delta: "-3%",  up: false },
  { label: "Conversión",       to: 68,      format: "pct", delta: "+5%",  up: true },
];

export interface Source { label: string; pct: number; color: string; }
export const DASHBOARD_SOURCES: Source[] = [
  { label: "Directo",  pct: 42, color: "#2B5BFF" },
  { label: "Orgánico", pct: 29, color: "#4F7BFF" },
  { label: "Referidos", pct: 18, color: "#7E9BFF" },
  { label: "Otros",    pct: 11, color: "#243460" },
];

// Puntos del gráfico de línea (0–100 en X y en Y, Y invertido al renderizar)
export const DASHBOARD_TREND = [8, 18, 14, 30, 26, 42, 38, 55, 60, 72, 68, 86];

export function formatKpi(v: number, format: KpiFormat): string {
  if (format === "ars") return "$" + Math.round(v).toLocaleString("es-AR");
  if (format === "pct") return Math.round(v) + "%";
  return Math.round(v).toLocaleString("es-AR");
}
```

- [ ] **Step 2: Verificar typecheck**

Run: `npm run typecheck`
Expected: PASS (sin errores).

- [ ] **Step 3: Commit**

```bash
git add src/lib/constants.ts
git commit -m "feat: constantes WhatsApp + datos demo del dashboard"
```

---

## Task 2: DashboardMock (el dashboard demo animado)

Dashboard presentacional con sidebar, 4 KPIs con count-up, gráfico de línea que se dibuja, y dona de origen de ventas. Se anima al entrar en viewport. Respeta `prefers-reduced-motion` (framer-motion `useReducedMotion`).

**Files:**
- Create: `src/components/sections/DashboardMock.tsx`

- [ ] **Step 1: Crear el componente**

```tsx
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

// Gráfico de línea: polyline que se dibuja con pathLength
function TrendChart({ play }: { play: boolean }) {
  const max = Math.max(...DASHBOARD_TREND);
  const pts = DASHBOARD_TREND.map((v, i) => {
    const x = (i / (DASHBOARD_TREND.length - 1)) * 100;
    const y = 100 - (v / max) * 90 - 5;
    return `${x},${y}`;
  }).join(" ");
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full">
      <defs>
        <linearGradient id="trendFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(43,91,255,.35)" />
          <stop offset="100%" stopColor="rgba(43,91,255,0)" />
        </linearGradient>
      </defs>
      <motion.polyline
        points={pts} fill="none" stroke="#4F7BFF" strokeWidth={2}
        strokeLinecap="round" strokeLinejoin="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={play ? { pathLength: 1, opacity: 1 } : {}}
        transition={{ duration: 1.6, ease: "easeInOut" }}
        style={{ filter: "drop-shadow(0 0 4px rgba(43,91,255,.6))" }}
      />
      <motion.polygon
        points={`0,100 ${pts} 100,100`} fill="url(#trendFill)"
        initial={{ opacity: 0 }} animate={play ? { opacity: 1 } : {}}
        transition={{ duration: 1.2, delay: 0.6 }}
      />
    </svg>
  );
}

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
              <div className="font-mono text-[9.5px] uppercase tracking-wide text-muted mb-1">Ingresos anuales</div>
              <div className="h-[80px]"><TrendChart play={inView} /></div>
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
```

- [ ] **Step 2: Verificar typecheck**

Run: `npm run typecheck`
Expected: PASS.

- [ ] **Step 3: Verificar build**

Run: `npm run build`
Expected: compila sin errores (la página todavía no lo usa; solo valida el componente).

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/DashboardMock.tsx
git commit -m "feat: DashboardMock — dashboard demo con KPIs count-up, gráfico y dona"
```

---

## Task 3: Reescribir Hero (split + dashboard 3D flotante)

Hero nuevo: columna izquierda con eyebrow, headline display, subhead, 2 CTAs (primario → WhatsApp, ghost → `#dia`), tira de prueba social. Columna derecha con `DashboardMock` en contenedor 3D (`perspective` + `rotateY`/`rotateX`) que entra con framer-motion + glow + badge flotante. Se elimina el marquee y el bloque grande de stats (condensar). Se mantiene `Reveal`, `Mesh`, `ZWatermark`, `PrimaryBtn`, `GhostBtn`.

**Files:**
- Modify (reescritura completa): `src/components/sections/Hero.tsx`

- [ ] **Step 1: Reemplazar TODO el contenido de `Hero.tsx`**

```tsx
// src/components/sections/Hero.tsx
"use client";
import { motion, useReducedMotion } from "framer-motion";
import { MessageCircle, ArrowDownRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Mesh from "@/components/ui/Mesh";
import ZWatermark from "@/components/ui/ZWatermark";
import PrimaryBtn from "@/components/ui/PrimaryBtn";
import GhostBtn from "@/components/ui/GhostBtn";
import DashboardMock from "@/components/sections/DashboardMock";
import { WHATSAPP_URL } from "@/lib/constants";

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="absolute inset-0 dot-grid opacity-70" aria-hidden />
      <Mesh variant="hero" />
      <ZWatermark className="-right-32 top-10 md:top-0 md:-right-20" size={760} opacity={0.06} />

      <div className="relative max-w-[1280px] mx-auto px-5 md:px-8">
        <div className="grid lg:grid-cols-[1fr_1.05fr] gap-12 lg:gap-10 items-center">

          {/* ── Columna izquierda: copy ── */}
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/40 backdrop-blur-md px-3 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                <span className="text-[12px] tracking-[.18em] uppercase text-muted font-mono">
                  Sistemas a medida con IA · B2B
                </span>
              </div>
            </Reveal>

            <Reveal delay={80}>
              <h1 className="mt-7 font-display font-semibold text-ink leading-[0.98] tracking-[-0.02em]"
                  style={{ fontSize: "clamp(2.6rem, 6vw, 5rem)" }}>
                Todo tu negocio,<br />
                <span className="text-primary">en una sola pantalla.</span>
              </h1>
            </Reveal>

            <Reveal delay={160}>
              <p className="mt-6 text-[17px] md:text-[19px] text-muted max-w-xl leading-relaxed">
                Dejá de saltar entre planillas, WhatsApp y mil pestañas. Centralizamos
                tu info y te la devolvemos clara, ordenada y en tiempo real.
              </p>
            </Reveal>

            <Reveal delay={240}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <PrimaryBtn as="a" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                  className="!px-7 !py-3.5" icon={<MessageCircle size={16} strokeWidth={1.75} />}>
                  Hablá con nosotros
                </PrimaryBtn>
                <GhostBtn as="a" href="#dia" className="!px-7 !py-3.5"
                  icon={<ArrowDownRight size={16} strokeWidth={1.75} />}>
                  Ver cómo funciona
                </GhostBtn>
              </div>
            </Reveal>

            <Reveal delay={320}>
              <div className="mt-9 flex items-center gap-3 text-[13px] text-muted">
                <div className="flex -space-x-2">
                  {["#2B5BFF", "#4F7BFF", "#7E9BFF"].map((c) => (
                    <span key={c} className="w-7 h-7 rounded-full border-2 border-bg"
                      style={{ background: c }} />
                  ))}
                </div>
                <span><span className="text-ink font-semibold">+18 negocios</span> ya trabajan así</span>
              </div>
            </Reveal>
          </div>

          {/* ── Columna derecha: dashboard 3D flotante ── */}
          <div className="relative" style={{ perspective: 1200 }}>
            {/* glow detrás */}
            <div className="absolute -inset-6 rounded-[32px] pointer-events-none"
              style={{ background: "radial-gradient(60% 60% at 60% 30%, rgba(43,91,255,.28), transparent 70%)", filter: "blur(20px)" }} />
            <motion.div
              initial={reduce ? false : { opacity: 0, y: 40, rotateY: -24, rotateX: 10 }}
              animate={reduce ? {} : { opacity: 1, y: 0, rotateY: -15, rotateX: 6 }}
              transition={{ duration: 1, ease: [0.2, 0.7, 0.2, 1] }}
              style={{
                transformStyle: "preserve-3d",
                transform: reduce ? undefined : "rotateY(-15deg) rotateX(6deg)",
                boxShadow: "-18px 30px 60px rgba(0,0,0,.55), 0 0 60px -10px rgba(43,91,255,.35)",
                borderRadius: 16,
              }}
              className="relative">
              <DashboardMock />
              {/* badge flotante */}
              <motion.div
                initial={reduce ? false : { opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
                className="absolute -top-4 -right-3 md:-right-5 rounded-xl border border-[#22C55E]/40 px-3 py-1.5 backdrop-blur-md"
                style={{ background: "rgba(34,197,94,.12)", boxShadow: "0 8px 24px rgba(0,0,0,.4)", transform: "translateZ(40px)" }}>
                <div className="text-[10px] text-muted">Ingresos</div>
                <div className="text-[15px] font-semibold text-[#22C55E] leading-none">+12% ▲</div>
              </motion.div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verificar typecheck**

Run: `npm run typecheck`
Expected: PASS. (Nota: `GhostBtn` debe aceptar `as="a"` + `href`; ya lo usa el código actual, así que el patrón es válido.)

- [ ] **Step 3: Verificar visual en dev**

Run: `npm run dev` y abrir http://localhost:3000
Expected: el Hero muestra texto a la izquierda y el dashboard inclinado en 3D a la derecha, con glow azul, badge "+12%", KPIs que cuentan desde 0 y la línea del gráfico dibujándose. CTA "Hablá con nosotros" abre WhatsApp.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Hero.tsx
git commit -m "feat: Hero rediseñado — split con dashboard 3D flotante + CTA WhatsApp"
```

---

## Task 4: TimelinePath (SVG serpenteante animado)

SVG decorativo detrás de la sección Timeline. Path que serpentea verticalmente, se **dibuja** según el progreso de scroll de la sección, con un **cometa** que viaja por la ruta (muestreado con `getPointAtLength`, independiente de resolución porque usa unidades del `viewBox`) y **nodos** que se encienden al ser superados por el cometa. En mobile se oculta (la sección usa una línea recta a la izquierda).

**Files:**
- Create: `src/components/sections/TimelinePath.tsx`

- [ ] **Step 1: Crear el componente**

```tsx
// src/components/sections/TimelinePath.tsx
"use client";
import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent, useReducedMotion, type MotionValue } from "framer-motion";

interface Props {
  /** progreso de scroll 0..1 de la sección contenedora */
  progress: MotionValue<number>;
  /** cantidad de paradas (para ubicar nodos) */
  stops: number;
}

const VIEW_W = 100;
const ROW_H = 100; // alto por parada en unidades de viewBox

// Construye un path serpenteante: alterna X entre 22 y 78, una curva suave por fila
function buildPath(stops: number): string {
  const xs = [22, 78];
  let d = `M 50 0`;
  for (let i = 0; i < stops; i++) {
    const y0 = i * ROW_H;
    const yMid = y0 + ROW_H / 2;
    const yEnd = y0 + ROW_H;
    const x = xs[i % 2];
    const xNext = xs[(i + 1) % 2];
    d += ` C 50 ${y0 + ROW_H * 0.3}, ${x} ${y0 + ROW_H * 0.2}, ${x} ${yMid}`;
    d += ` C ${x} ${yEnd - ROW_H * 0.2}, ${i === stops - 1 ? 50 : 50} ${yEnd - ROW_H * 0.3}, ${i === stops - 1 ? 50 : 50} ${yEnd}`;
    void xNext;
  }
  return d;
}

// Posición de cada nodo (centro de cada fila)
function nodePositions(stops: number) {
  const xs = [22, 78];
  return Array.from({ length: stops }, (_, i) => ({
    x: xs[i % 2],
    y: i * ROW_H + ROW_H / 2,
    at: (i + 0.5) / stops, // fracción de progreso a la que se enciende
  }));
}

export default function TimelinePath({ progress, stops }: Props) {
  const reduce = useReducedMotion();
  const pathRef = useRef<SVGPathElement>(null);
  const [comet, setComet] = useState({ x: 50, y: 0 });
  const d = buildPath(stops);
  const nodes = nodePositions(stops);
  const totalH = stops * ROW_H;

  // pathLength (draw) atado al progreso
  const pathLength = useTransform(progress, [0, 0.92], [0, 1]);

  // mover el cometa según getPointAtLength
  useMotionValueEvent(progress, "change", (v) => {
    const el = pathRef.current;
    if (!el) return;
    const L = el.getTotalLength();
    const p = el.getPointAtLength(Math.min(Math.max(v, 0), 1) * L);
    setComet({ x: p.x, y: p.y });
  });

  return (
    <svg
      className="absolute inset-0 w-full h-full pointer-events-none hidden md:block"
      viewBox={`0 0 ${VIEW_W} ${totalH}`} preserveAspectRatio="none" aria-hidden>
      <defs>
        <filter id="tlglow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="1.5" result="b" />
          <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* ruta base tenue */}
      <path d={d} fill="none" stroke="rgba(43,91,255,.16)" strokeWidth={0.6} vectorEffect="non-scaling-stroke" />

      {/* ruta encendida que se dibuja */}
      <motion.path
        ref={pathRef} d={d} fill="none" stroke="#2B5BFF" strokeWidth={0.8}
        vectorEffect="non-scaling-stroke" filter="url(#tlglow)"
        style={reduce ? { pathLength: 1 } : { pathLength }} />

      {/* nodos */}
      {nodes.map((n, i) => {
        const lit = useTransform(progress, [n.at - 0.06, n.at], [0, 1]);
        return (
          <g key={i}>
            <motion.circle cx={n.x} cy={n.y} r={2.6} fill="var(--color-bg)" stroke="#2B5BFF"
              strokeWidth={0.8} vectorEffect="non-scaling-stroke"
              style={reduce ? { opacity: 1 } : { scale: useTransform(lit, [0, 1], [0.6, 1]) }} />
            <motion.circle cx={n.x} cy={n.y} r={2.6} fill="none" stroke="#4F7BFF"
              strokeWidth={1.2} vectorEffect="non-scaling-stroke" filter="url(#tlglow)"
              style={reduce ? { opacity: 0.8 } : { opacity: lit }} />
          </g>
        );
      })}

      {/* cometa */}
      {!reduce && (
        <circle cx={comet.x} cy={comet.y} r={1.8} fill="#fff" filter="url(#tlglow)" />
      )}
    </svg>
  );
}
```

> **Nota para el implementador:** llamar `useTransform` dentro del `.map` de nodos es seguro acá porque `stops` es una constante fija (5) — el número de hooks nunca cambia entre renders. Mantené `stops` constante.

- [ ] **Step 2: Verificar typecheck**

Run: `npm run typecheck`
Expected: PASS.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/TimelinePath.tsx
git commit -m "feat: TimelinePath — camino SVG que se dibuja al scrollear con cometa y nodos"
```

---

## Task 5: Timeline (sección "Un día en tu negocio")

Sección que usa `useScroll` sobre su propio contenedor y pasa el progreso a `TimelinePath`. 5 paradas alternando "Vos sentís" ↔ "El sistema hizo solo". CTA final a WhatsApp. `id="dia"` (coincide con el ghost CTA del Hero y el link del navbar).

**Files:**
- Create: `src/components/sections/Timeline.tsx`

- [ ] **Step 1: Crear el componente**

```tsx
// src/components/sections/Timeline.tsx
"use client";
import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
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
    offset: ["start 70%", "end 80%"],
  });

  return (
    <section id="dia" className="relative py-24 md:py-36 overflow-hidden">
      <Mesh variant="soft" />
      <div className="relative max-w-[1100px] mx-auto px-5 md:px-8">
        <SectionTitle
          align="center"
          eyebrow="Un día en tu negocio"
          title={<>Así se siente <span className="text-primary">tenerlo todo resuelto</span>.</>}
          kicker="No te mostramos el sistema funcionando. Te mostramos tu día, mientras el sistema trabaja por detrás."
        />

        <div ref={ref} className="relative mt-16">
          {/* camino serpenteante (desktop) */}
          <TimelinePath progress={scrollYProgress} stops={STOPS.length} />

          {/* línea recta mobile */}
          <div className="md:hidden absolute left-[18px] top-0 bottom-0 w-px bg-gradient-to-b from-primary/60 to-primary/10" aria-hidden />

          <div className="flex flex-col gap-10 md:gap-20">
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

        <div className="flex justify-center mt-16">
          <PrimaryBtn as="a" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
            className="!px-8 !py-4 !text-[16px]" icon={<MessageCircle size={18} strokeWidth={1.75} />}>
            Quiero días así
          </PrimaryBtn>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Verificar typecheck**

Run: `npm run typecheck`
Expected: PASS.

- [ ] **Step 3: Commit** (la sección se monta en el page.tsx en la Task 8; acá solo se valida)

```bash
git add src/components/sections/Timeline.tsx
git commit -m "feat: Timeline — sección 'un día en tu negocio' con camino vivo + CTA WhatsApp"
```

---

## Task 6: Condensar Services

Sacar la card destacada gigante (`FeaturedServiceCard`) y dejar TODOS los servicios en un grid uniforme y compacto (ícono + título + 1 línea, sin chips, sin el bloque de "Empezamos acá"). Se mantiene el click → modal (la data `SERVICES` y `ServiceModal` no cambian). Esto recorta mucho texto sin perder profundidad.

**Files:**
- Modify: `src/components/sections/Services.tsx`

- [ ] **Step 1: Eliminar `FeaturedServiceCard`**

Borrar la función completa `FeaturedServiceCard` (líneas que van desde `function FeaturedServiceCard({ s, onOpen }...` hasta su `}` de cierre, justo antes de `function ServiceCard`).

- [ ] **Step 2: Simplificar `ServiceCard`**

Reemplazar la función `ServiceCard` completa por esta versión compacta (sin chips, sin footer "Conocé más"):

```tsx
function ServiceCard({ s, i, onOpen }: ServiceCardProps) {
  const [hover, setHover] = useState(false);
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen(s); }
  };
  const Icon = s.Icon;
  return (
    <Reveal delay={i * 60} className="h-full rounded-2xl overflow-hidden cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary/60">
      <div
        role="button" tabIndex={0} aria-label={`Ver servicio: ${s.title}`}
        onClick={() => onOpen(s)} onKeyDown={onKey}
        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        className="h-full flex items-start gap-4 p-5 rounded-2xl overflow-hidden"
        style={{
          background: "var(--color-surface)",
          border: `1px solid ${hover ? "rgba(43,91,255,.5)" : "var(--color-line)"}`,
          boxShadow: hover ? "0 8px 40px rgba(43,91,255,.22)" : "0 4px 20px rgba(0,0,0,.2)",
          transform: hover ? "translateY(-3px)" : "none",
          transition: "border-color .3s ease, box-shadow .3s ease, transform .3s ease",
        }}>
        <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: "rgba(43,91,255,.1)", border: "1px solid rgba(43,91,255,.25)" }}>
          <Icon size={20} strokeWidth={1.75} className="text-primary" />
        </div>
        <div className="min-w-0">
          <h3 className="font-display font-semibold text-[17px] tracking-tight leading-snug text-ink">{s.title}</h3>
          <p className="mt-1 text-[13.5px] text-muted leading-relaxed line-clamp-2">{s.desc}</p>
        </div>
      </div>
    </Reveal>
  );
}
```

- [ ] **Step 3: Simplificar el render de `Services` (default export)**

Reemplazar el bloque JSX que va desde `{/* Featured: Diagnóstico */}` hasta el cierre del grid de regulares por:

```tsx
        {/* Grid compacto: todos los servicios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.id} s={s} i={i} onOpen={setActive} />
          ))}
        </div>
```

Y eliminar las líneas `const featured = SERVICES[0];` y `const regular = SERVICES.slice(1);` (ya no se usan).

- [ ] **Step 4: Limpiar imports sin uso**

En el import de lucide-react, quitar `ArrowRight` (ya no se usa). Verificar que no queden imports muertos.

- [ ] **Step 5: Verificar typecheck + build**

Run: `npm run typecheck && npm run build`
Expected: PASS, sin warnings de variables/imports sin usar que rompan el build (ESLint está desactivado en build, pero `tsc` igual marca imports no usados solo si `noUnusedLocals` está activo; si marca error, eliminá el símbolo).

- [ ] **Step 6: Commit**

```bash
git add src/components/sections/Services.tsx
git commit -m "refactor: Services condensado — grid compacto sin card destacada gigante"
```

---

## Task 7: Condensar Cases

Cambio menor (ya son 3 cards). Sacar el badge intermedio "No hacemos solo sitios / Construimos operaciones" y acortar el kicker para aligerar.

**Files:**
- Modify: `src/components/sections/Cases.tsx`

- [ ] **Step 1: Acortar el kicker del `SectionTitle`**

Reemplazar:
```tsx
            kicker="Tres clientes, tres industrias. Una obsesión: que el sistema trabaje, no solo se vea bien."
```
por:
```tsx
            kicker="Tres clientes, tres industrias. El sistema trabaja, no solo se ve bien."
```

- [ ] **Step 2: Eliminar el badge intermedio**

Borrar el bloque completo `<Reveal delay={200} className="mb-12"> ... </Reveal>` (el que contiene "No hacemos solo sitios. Construimos operaciones.").

- [ ] **Step 3: Verificar typecheck**

Run: `npm run typecheck`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Cases.tsx
git commit -m "refactor: Cases condensado — kicker más corto, sin badge intermedio"
```

---

## Task 8: Contacto → WhatsApp (preservando el form viejo)

Renombrar el `Contact.tsx` actual a `ContactForm.tsx` (queda en el repo, fuera del flujo) y crear un `Contact.tsx` nuevo, simple, con CTA grande a WhatsApp.

**Files:**
- Create: `src/components/sections/ContactForm.tsx` (copia exacta del Contact actual)
- Replace: `src/components/sections/Contact.tsx`

- [ ] **Step 1: Preservar el form viejo**

```bash
git mv src/components/sections/Contact.tsx src/components/sections/ContactForm.tsx
```

En `ContactForm.tsx`, renombrar el componente exportado de `Contact` a `ContactForm` para evitar choque de nombres:
- Cambiar `export default function Contact() {` por `export default function ContactForm() {`.

(No se importa en ningún lado ahora; queda disponible para reusar.)

- [ ] **Step 2: Crear el nuevo `Contact.tsx`**

```tsx
// src/components/sections/Contact.tsx
"use client";
import { MessageCircle, Zap, ShieldCheck, Sparkles } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Mesh from "@/components/ui/Mesh";
import ZWatermark from "@/components/ui/ZWatermark";
import PrimaryBtn from "@/components/ui/PrimaryBtn";
import { WHATSAPP_URL } from "@/lib/constants";

const PERKS = [
  { Icon: Zap,         label: "Respuesta rápida" },
  { Icon: ShieldCheck, label: "Sin compromiso" },
  { Icon: Sparkles,    label: "Asesoría real" },
];

export default function Contact() {
  return (
    <section id="contacto" className="relative py-24 md:py-36 overflow-hidden">
      <Mesh variant="soft" />
      <ZWatermark className="-right-40 -top-20 hidden md:block" size={520} opacity={0.05} />

      <div className="relative max-w-[820px] mx-auto px-5 md:px-8 text-center">
        <Reveal>
          <div className="inline-flex items-center gap-2 text-[12px] tracking-[.22em] uppercase text-muted font-mono justify-center">
            <span className="w-6 h-px bg-primary/70" /> Contacto · directo
          </div>
        </Reveal>

        <Reveal delay={80}>
          <h2 className="mt-5 font-display font-semibold tracking-tight text-ink leading-[1.02]"
              style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.75rem)" }}>
            ¿Hablamos de <span className="text-primary">tu negocio</span>?
          </h2>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-5 text-[17px] md:text-[19px] text-muted max-w-xl mx-auto leading-relaxed">
            Contanos qué necesitás y te respondemos por WhatsApp. Si tu caso es claro,
            salimos con una propuesta concreta enseguida.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-9 flex justify-center">
            <PrimaryBtn as="a" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              className="!px-9 !py-4 !text-[17px]" icon={<MessageCircle size={20} strokeWidth={1.75} />}>
              Hablá con nosotros
            </PrimaryBtn>
          </div>
        </Reveal>

        <Reveal delay={320}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {PERKS.map(({ Icon, label }) => (
              <span key={label} className="inline-flex items-center gap-2 text-[13.5px] text-muted">
                <Icon size={15} strokeWidth={1.75} className="text-primary" /> {label}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Verificar typecheck + build**

Run: `npm run typecheck && npm run build`
Expected: PASS. (El `ContactForm.tsx` no se importa; no debe romper el build.)

- [ ] **Step 4: Commit**

```bash
git add src/components/sections/Contact.tsx src/components/sections/ContactForm.tsx
git commit -m "feat: Contacto directo por WhatsApp (form viejo preservado como ContactForm)"
```

---

## Task 9: Ensamblar page.tsx + Navbar

Nuevo orden de secciones y limpieza de links del menú.

**Files:**
- Modify: `src/app/page.tsx`
- Modify: `src/components/layout/Navbar.tsx`

- [ ] **Step 1: Reescribir `src/app/page.tsx`**

```tsx
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import StickyContactCTA from "@/components/layout/StickyContactCTA";
import Hero from "@/components/sections/Hero";
import Timeline from "@/components/sections/Timeline";
import Services from "@/components/sections/Services";
import Cases from "@/components/sections/Cases";
import Contact from "@/components/sections/Contact";

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Timeline />
        <Services />
        <Cases />
        <Contact />
      </main>
      <Footer />
      <StickyContactCTA />
    </>
  );
}
```

(Se quitan los imports y usos de `HowWeWork` y `ForWho`. Sus archivos quedan en el repo, sin usar.)

- [ ] **Step 2: Actualizar los links del Navbar**

En `src/components/layout/Navbar.tsx`, reemplazar el array `LINKS`:

```tsx
const LINKS: NavLink[] = [
  { href: "#dia",       label: "Un día" },
  { href: "#servicios", label: "Servicios" },
  { href: "#casos",     label: "Casos" },
  { href: "#contacto",  label: "Contacto" },
];
```

- [ ] **Step 3: Apuntar el CTA "Hablemos" del Navbar a WhatsApp**

En `Navbar.tsx`, agregar el import al inicio:
```tsx
import { WHATSAPP_URL } from "@/lib/constants";
```
Y en el `<PrimaryBtn as="a" ...>` del header, cambiar `href="#contacto"` por:
```tsx
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
```
(El botón del menú mobile que usa los `LINKS` no cambia.)

- [ ] **Step 4: Verificar typecheck + build**

Run: `npm run typecheck && npm run build`
Expected: PASS. Si `tsc` se queja de que `HowWeWork`/`ForWho`/`Method` quedaron sin importar, está bien — son archivos no referenciados, no rompen el build.

- [ ] **Step 5: Verificación visual completa en dev**

Run: `npm run dev` → http://localhost:3000
Checklist visual:
- [ ] Hero: dashboard 3D inclinado con glow, KPIs cuentan desde 0, gráfico se dibuja, badge "+12%". CTA abre WhatsApp (5493814405615).
- [ ] Timeline: al scrollear, el camino azul se dibuja, el cometa viaja, los nodos se encienden, las cards entran desde los costados. CTA "Quiero días así" abre WhatsApp.
- [ ] Services: grid compacto de cards (ícono + título + 1 línea); click abre el modal.
- [ ] Cases: 3 casos, sin el badge intermedio.
- [ ] Contacto: bloque centrado con botón grande a WhatsApp + 3 perks.
- [ ] Navbar: links "Un día / Servicios / Casos / Contacto"; botón "Hablemos" abre WhatsApp.
- [ ] Mobile (DevTools responsive): el Timeline muestra línea recta a la izquierda (no el zigzag), todo legible.
- [ ] `prefers-reduced-motion` (DevTools → Rendering → Emulate): sin animaciones que mareen; el dashboard y el path se ven estáticos pero completos.

- [ ] **Step 6: Commit**

```bash
git add src/app/page.tsx src/components/layout/Navbar.tsx
git commit -m "feat: ensamblar landing nueva (Hero→Timeline→Services→Cases→Contacto) + navbar"
```

---

## Task 10: Verificación final + cierre

- [ ] **Step 1: Build de producción limpio**

Run: `npm run build`
Expected: `✓ Compiled successfully`. Sin errores de tipos ni de runtime en prerender.

- [ ] **Step 2: Confirmar que nada quedó a medias**

Run: `git status`
Expected: working tree limpio (todo commiteado).

- [ ] **Step 3: (Opcional, si Joaco lo pide) push + deploy**

El repo está conectado a Vercel (push = deploy). NO pushear sin que Joaco lo confirme.
```bash
git push origin main
```

---

## Self-Review (cobertura del spec)

- **Hero 3D + dashboard demo** → Tasks 2, 3 ✓ (KPIs count-up, gráfico draw, dona, badge, perspectiva).
- **Timeline serpenteante (draw + cometa + nodos)** → Tasks 4, 5 ✓.
- **Condensar Services** → Task 6 ✓. **Condensar Cases** → Task 7 ✓.
- **Contacto WhatsApp `wa.me/5493814405615`** → Task 1 (`WHATSAPP_URL`) + Task 8 ✓.
- **Sacar HowWeWork/ForWho del page.tsx** → Task 9 ✓ (archivos preservados).
- **Tokens de `globals.css`, fuente Syne, sin hardcodear** → todas las tasks usan clases `bg-*/text-*/border-line` y vars `--color-*`.
- **prefers-reduced-motion** → Tasks 2, 3, 4 (vía `useReducedMotion`) + checklist Task 9 ✓.
- **Número provisorio / demo inventado** → Task 1, marcado como provisorio ✓.

**Consistencia de nombres:** `WHATSAPP_URL`, `DashboardMock`, `TimelinePath` (prop `progress: MotionValue<number>`, `stops: number`), `Timeline` (`id="dia"`), `Contact` (`id="contacto"`) — usados igual en todas las tasks. Sin placeholders.
