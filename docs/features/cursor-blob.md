# Feature: Cursor Blob

> Fecha: 2026-05-23
> Estado: Implementado

## Descripción

Cursor blob decorativo que sigue al mouse en desktop. Círculo de 30px (52px sobre interactivos) con glow azul semitransparente (`rgba(43,91,255,.28)`) y blur de 22–30px. Usa `mix-blend-mode: screen` para integrarse con el fondo oscuro.

## Archivos

- `src/components/ui/CursorBlob.tsx` — Componente cliente
- `src/app/layout.tsx` — Render global (antes de `{children}`)

## Stack

- **Framer Motion** — `useMotionValue + useSpring` para smooth follow; `animate` para transición de tamaño en hover
- Detecta `pointer: coarse` para no renderizar en touch/mobile

## Comportamiento

| Estado | Tamaño | Blur |
|--------|--------|------|
| Normal | 30px | 22px |
| Hover sobre interactivo | 52px | 30px |

Interactivos detectados: `button, a, [role="button"], input, textarea, select, label`.

## Restricciones

- `pointer-events: none` — no interfiere con clicks
- Solo visible en desktop (`pointer: coarse` → no render)
- `z-index: 9999` — por encima de todo excepto dev tools
