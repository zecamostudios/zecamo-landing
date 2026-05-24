# Feature: SEO & Metadata

> Fecha: 2026-05-23
> Estado: Implementado

## Descripción

Metadata completa en Next.js 15 App Router para home + páginas legales. OG image dinámica con `ImageResponse`, sitemap y robots.txt automáticos.

## Archivos

| Archivo | Función |
|---------|---------|
| `src/app/layout.tsx` | Metadata global: title template, description, keywords, OG, Twitter, robots, canonical |
| `src/app/opengraph-image.tsx` | OG image dinámica 1200×630 con `ImageResponse` (runtime: edge) |
| `src/app/sitemap.ts` | `MetadataRoute.Sitemap` — /, /privacy, /terms, /cookies |
| `src/app/robots.ts` | Allow all, disallow /api/, apunta a sitemap |

## Metadatos en layout.tsx

```ts
title: { default: "Zecamo Studios — ...", template: "%s | Zecamo Studios" }
description: "..."
keywords: [...]
robots: { index: true, follow: true }
alternates: { canonical: "https://zecamostudios.com" }
openGraph: { images: [{ url: "/opengraph-image", width: 1200, height: 630 }] }
twitter: { card: "summary_large_image" }
```

## OG Image

Renderiza en edge runtime. Contenido: dot-grid bg, glow azul, "Z" logo, eyebrow, headline bold, tagline, dominio.

## Sitemap

Generado dinámicamente en `/sitemap.xml`. Prioridades: home=1.0, legales=0.3. Frecuencia: monthly / yearly.
