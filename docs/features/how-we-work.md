# Feature: HowWeWork — Cómo trabajamos

> Estado: ✅ Implementado (Fase B — 2026-05-23)
> Componente: `src/components/sections/HowWeWork.tsx`
> Posición en page.tsx: entre `<Services />` y `<ForWho />`

---

## Descripción

Sección que explica el método de dos fases de Zecamo en formato de tarjetas horizontales
conectadas por una flecha animada. Refuerza el posicionamiento "primero diagnosticamos,
después implementamos" y drive conversiones al Diagnóstico.

## Eyebrow / Título

- Eyebrow: "Cómo trabajamos · ZCM-02"
- Título: "Antes de automatizar, **ordenamos**."
- Kicker: "Dos fases simples. Una sola lógica: pensar antes de ejecutar."

## Fases

| # | Título | Icon | Tags |
|---|--------|------|------|
| 01 | Diagnóstico | `Compass` | 1-4 semanas · BPMN · Roadmap |
| 02 | Implementación | `Rocket` | Sprints cortos · Stack moderno · Operamos post-deploy |

## Componente PhaseCard

Cada card tiene:
- Ícono 56×56 con fondo azul tintado (intensifica en hover)
- Número grande en corner (text-primary/20, decorativo)
- Título + descripción
- Tags con bullet azul (monospace)
- Hover: translateY(-4px), border azul 0.5, glow azul

## Arrow animada

- **Desktop** (hidden md): `ArrowRight` con clase `.arrow-pulse` (pulsa horizontalmente)
- **Mobile** (flex md:hidden): `ArrowDown` con clase `.arrow-pulse-down` (pulsa verticalmente)
- Keyframes definidos en `src/app/globals.css`

## Bonus badge

```
Gift icon + "Si avanzás con la implementación en 30 días,
el 100% del diagnóstico se bonifica. Lógica de continuidad, no descuento."
```

Styled como: `border border-primary/35 bg-primary/[.05]` con inner glow.

## CTA

`PrimaryBtn` "Empezá por el Diagnóstico"

- Dispara `window.dispatchEvent(new CustomEvent("zcm:open-service", { detail: { id: "diagnostico" } }))`
- Hace `document.getElementById("servicios")?.scrollIntoView(...)` con delay 50ms

El evento es capturado por el `useEffect` en `Services.tsx` que abre el ServiceModal
del servicio con `id === "diagnostico"`.
