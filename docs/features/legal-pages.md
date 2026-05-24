# Feature: Páginas Legales

> Fecha: 2026-05-23
> Estado: Implementado

## Descripción

Tres páginas legales renderizadas desde los `.md` de `legal/` usando `react-markdown` + `remark-gfm`. Estilizadas con `@tailwindcss/typography` (`prose-invert`).

## Rutas

| Ruta | Fuente | Título |
|------|--------|--------|
| `/privacy` | `legal/privacy-policy.md` | Política de Privacidad |
| `/terms` | `legal/terms-of-service.md` | Términos y Condiciones |
| `/cookies` | `legal/cookies-policy.md` | Política de Cookies |

## Archivos

- `src/components/ui/LegalPage.tsx` — Componente compartido (lee content + eyebrow + backLinks)
- `src/app/privacy/page.tsx`
- `src/app/terms/page.tsx`
- `src/app/cookies/page.tsx`

## Stack

- `react-markdown` — parsing de markdown a JSX
- `remark-gfm` — soporte para tables, strikethrough, task lists
- `@tailwindcss/typography` — clases `prose prose-invert`
- `fs.readFileSync` — lectura server-side (Server Component, cero JS en cliente)

## Metadata por página

Cada página tiene su propia `export const metadata` con `robots: { index: true, follow: false }` (indexable pero sin seguir links, estándar para legales).
