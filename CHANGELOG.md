# CHANGELOG

> Historial de todos los cambios del proyecto zecamo-landing.
> Sigue el [Método Zecamo](./METODO_ZECAMO.md) — Mandamiento IV.

---

## [2026-05-23] — Fase B — Reposicionamiento método Diagnóstico/Implementación

### Tipo de cambio
- **CHANGED**: Hero subtitle reposicionado — "Diseñamos" → "Diagnosticamos"
- **ADDED**: Servicio "Diagnóstico IA & Cyber" como featured full-width (tag 00)
- **CHANGED**: Servicios renumerados 01–04, eyebrow actualizado a "Servicios · 05"
- **CHANGED**: Sección title: "Primero, ordenamos. Después, ejecutamos."
- **ADDED**: Nueva sección `HowWeWork.tsx` (entre Services y ForWho)
- **ADDED**: Diagnóstico como primera opción en formulario de contacto (con styling featured)
- **CHANGED**: CursorBlob más brillante (opacity 0.28→0.55)
- **CHANGED**: Icono Consultoría IA: Compass → Lightbulb (Compass ahora es exclusivo del Diagnóstico)

### CAMBIO 0 — CursorBlob más brillante
- `src/components/ui/CursorBlob.tsx`: opacity `0.28 → 0.55`, blur `24 → 20px` (base + animate hover `22 → 18px`)

### CAMBIO 1 — Hero subtitle
- `src/components/sections/Hero.tsx`: "Diseñamos, construimos y operamos" → "Diagnosticamos, construimos y operamos"

### CAMBIO 2 — Reestructura sección Servicios
- `src/components/sections/ServiceModal.tsx`:
  - `ServiceData` interface: agrega `featured?`, `modal.tiers?`, `modal.bonification?`, `modal.ctaLabel?`
  - Modal eyebrow: distingue "Servicio destacado" vs "Servicio"
  - Nueva sección `tiers` (dos formatos en grid 2 cols)
  - Nuevo bloque `bonification` con Gift icon
  - CTA button usa `modal.ctaLabel` cuando definido
- `src/components/sections/Services.tsx`:
  - **NUEVO servicio destacado**: Diagnóstico IA & Cyber (id: "diagnostico", tag: "00", featured: true, Icon: Compass)
  - Modal Diagnóstico: 2 howItWorks, 6 benefits, 7 useCases, 2 tiers (Express/Premium), bonification, stack (Make/n8n/LangChain/Claude/Gemini/GPT-4o/OWASP/Supabase/Notion)
  - Consultoría: cambia Icon de Compass → Lightbulb
  - Todos los servicios regulares renumerados: 01–04
  - **NUEVO** `FeaturedServiceCard`: full-width, layout horizontal, badge "Empezamos acá · 00", icono 80–112px, border rgba(43,91,255,.4)
  - Layout: featured full-width → grid 2×2 regulares
  - `useEffect` escucha `zcm:open-service` para abrir modal específico
  - Eyebrow: "Servicios · 05" | Title: "Primero, ordenamos. Después, ejecutamos."

### CAMBIO 3 — Nueva sección HowWeWork
- **NUEVO** `src/components/sections/HowWeWork.tsx`:
  - Dos PhaseCards: Diagnóstico (Compass) + Implementación (Rocket)
  - Arrow animada: horizontal desktop (`.arrow-pulse`) / vertical mobile (`.arrow-pulse-down`)
  - Bonus badge: "Si avanzás con la implementación en 30 días, el 100% del diagnóstico se bonifica."
  - CTA "Empezá por el Diagnóstico" → `zcm:open-service {id:"diagnostico"}` + scroll a `#servicios`
  - Eyebrow "Cómo trabajamos · ZCM-02" | Title: "Antes de automatizar, ordenamos."
- `src/app/globals.css`: keyframes `arrowPulse` (horizontal) + `arrowPulseDown` (vertical), clases `.arrow-pulse` + `.arrow-pulse-down`
- `src/app/page.tsx`: `<HowWeWork />` insertado entre `<Services />` y `<ForWho />`

### CAMBIO 4 — Diagnóstico en formulario de contacto
- `src/components/sections/Contact.tsx`:
  - `SERVICE_OPTIONS[0]` = Diagnóstico IA & Cyber (Icon: Compass, featured: true)
  - Consultoría usa Lightbulb (evita duplicado con Diagnóstico)
  - `zcm:select-service` con `id === "diagnostico"` → prerrellena mensaje con "Quiero un diagnóstico para mi negocio. Mi situación es..."
  - Placeholder dinámico de mensaje cuando `servicio === "diagnostico"`: "Quiero un diagnóstico para mi negocio. Tenemos [N] personas en el equipo y nuestro principal dolor es..."
  - `ServiceRadio`: Diagnóstico (featured, full-width) → 4 regulares en 2×2 → "Otra consulta" (full-width)
  - `RadioCard`: prop `featured` → padding mayor, icono 40×40, label "Recomendado · Empezá acá", tint azul sutil en inactivo

### Documentación actualizada
- `docs/features/diagnostico-service.md` — spec del servicio Diagnóstico
- `docs/features/how-we-work.md` — spec de la sección HowWeWork
- `docs/features/services.md` — actualizada con nueva estructura
- `docs/features/contact-form.md` — actualizada con opción Diagnóstico
- `docs/01-project-overview.md` — propuesta de valor actualizada
- `docs/02-architecture.md` — HowWeWork.tsx agregado

---

## [2026-05-23] — Fase B.0 — Polish Técnico (6 mejoras)

### Tipo de cambio
- **ADDED**: 5 features nuevas — CursorBlob, 404, OG image, sitemap, robots
- **CHANGED**: páginas legales reescritas con react-markdown + prose-invert
- **IMPROVED**: metadata global expandida, optimización de imágenes
- **AUDIT**: reporte Lighthouse (sin fixes, pendiente aprobación)

### MEJORA 1 — CursorBlob (Framer Motion)
- **NUEVO** `src/components/ui/CursorBlob.tsx`: blob decorativo azul (`rgba(43,91,255,.28)`) que sigue al mouse con spring physics. `useMotionValue + useSpring` (stiffness: 120, damping: 22). Pulsa a 52px en hover sobre interactivos (30px por defecto). Solo desktop (`pointer: coarse` → no render). `mix-blend-mode: screen`, `pointer-events: none`, `z-index: 9999`.
- `src/app/layout.tsx`: `<CursorBlob />` renderizado antes de `{children}`.
- **Dependencia instalada**: `framer-motion`

### MEJORA 2 — Páginas legales con react-markdown
- **NUEVO** `src/components/ui/LegalPage.tsx`: componente servidor compartido. Recibe `content` (string markdown), `eyebrow`, `backLinks`. Renderiza con `ReactMarkdown + remarkGfm` dentro de `prose prose-invert`.
- `src/app/privacy/page.tsx`: reescrita. Lee `legal/privacy-policy.md` via `fs.readFileSync`. Metadata con `robots: { index: true, follow: false }`.
- `src/app/terms/page.tsx`: reescrita. Lee `legal/terms-of-service.md`.
- `src/app/cookies/page.tsx`: reescrita. Lee `legal/cookies-policy.md`.
- **Dependencias instaladas**: `react-markdown`, `remark-gfm`, `@tailwindcss/typography`
- `src/app/globals.css`: agregado `@plugin "@tailwindcss/typography"`.

### MEJORA 3 — 404 page
- **NUEVO** `src/app/not-found.tsx`: dot-grid background, "404" bold en `--color-primary` (clamp 7–14rem), copy "Esta página no existe — pero tu próximo proyecto sí.", dos CTAs (`PrimaryBtn → /` y `GhostBtn → /#contacto`), `ZWatermark` decorativo. `robots: { index: false }`.

### MEJORA 4 — SEO completo
- `src/app/layout.tsx`: metadata expandida — `title.template`, `keywords`, `authors`, `robots`, `alternates.canonical`, OG image apunta a `/opengraph-image` (dinámico).
- **NUEVO** `src/app/opengraph-image.tsx`: `ImageResponse` 1200×630, edge runtime. Dot-grid bg, glow azul, "Z" en azul, eyebrow, headline bold, tagline, dominio.
- **NUEVO** `src/app/sitemap.ts`: `MetadataRoute.Sitemap` — home (priority 1, monthly) + 3 legales (priority 0.3, yearly).
- **NUEVO** `src/app/robots.ts`: allow /, disallow /api/, apunta a sitemap.

### MEJORA 5 — Optimización de imágenes
- `src/components/ui/ZWatermark.tsx`: `quality={85}` en Image.
- `src/components/layout/Navbar.tsx`: `priority` + `quality={85}` en logo (LCP candidate).
- `src/components/layout/Footer.tsx`: `quality={85}` en logo.
- `src/components/sections/Method.tsx`: `quality={85}` en logo Z.
- `src/components/sections/Cases.tsx` (`CaseImageBare`): `quality={85}` + `sizes="(max-width: 900px) 100vw, 900px"`.
- **⚠️ TODO imagenes pesadas** (pendiente optimización/compresión o formato webp):
  - `public/cases/finca-cajal.png` — 1.1 MB (>500 KB)
  - `public/cases/suplementos.png` — 0.9 MB (>500 KB)

### MEJORA 6 — Reporte Lighthouse / Accesibilidad (SOLO REPORTE)
Ver `docs/features/lighthouse-audit.md`. Issues identificados, pendiente aprobación para fixes.

### Documentación actualizada
- `docs/02-architecture.md`: estructura actualizada con nuevos archivos, componentes y dependencias
- `docs/features/cursor-blob.md` — spec del componente
- `docs/features/legal-pages.md` — spec de páginas legales
- `docs/features/seo.md` — spec SEO
- `docs/features/lighthouse-audit.md` — reporte de accesibilidad

---

## [2026-05-23] — Fase A.2 — Fix object-fit en cards de Casos

### Tipo de cambio
- **FIXED**: 1 corrección visual en BrowserMockup

### FIX — BrowserMockup: `object-cover` en cards (no `object-contain`)
- `src/components/sections/Cases.tsx`: `BrowserMockup` cambiado de `object-contain` → `object-cover object-top`. Las cards de home ahora llenan el área del screenshot correctamente. El modal (`CaseImageBare`) se mantiene con `object-contain` para mostrar el screenshot completo.

---

## [2026-05-23] — Fase A.1 — Hotfixes visuales

### Tipo de cambio
- **FIXED**: 3 correcciones visuales sobre Fase A

### FIX 1 — Navbar: isotipo azul, texto todo blanco
- `src/components/layout/Navbar.tsx`: restaurado el filtro original del isotipo Z (`mixBlendMode: screen + drop-shadow azul`). El texto "zecamo studios" completo (incluida la "z") ahora es `text-white` via `className` en el `<span>` padre — sin span interno coloreado.

### FIX 2 — BrowserMockup + doble frame en modal
- `src/components/sections/Cases.tsx`:
  - `BrowserMockup`: cambiado `object-cover` → `object-contain`; background oscuro (`var(--color-bg)`) para llenar el espacio vacío; `min-height: 220px mobile / 280px desktop`; removida la prop `large` (ya no se usa en el modal).
  - **NUEVO export** `CaseImageBare`: imagen directa sin frame de browser. Para el modal, donde los screenshots de shots.so ya tienen el frame baked in — evita el doble frame visual.
- `src/components/sections/CaseModal.tsx`: reemplazado `BrowserMockup` por `CaseImageBare`. El modal ahora muestra la imagen limpia con border + glow azul, sin wrapper de browser adicional.

### FIX 3 — Rediseño completo de Service cards (estilo Linear/Vercel)
- `src/components/sections/Services.tsx`:
  - Removido `grad-border` (gradiente sutil, difícil de percibir).
  - Nueva card: `bg-surface`, `border 1px solid var(--color-line)` → hover: `rgba(43,91,255,.5)`; `border-radius: 16px`; `box-shadow` base + glow azul en hover; `translateY(-4px)` en hover; transiciones suaves 300ms.
  - Icono: `bg rgba(43,91,255,.1)` + `border rgba(43,91,255,.25)` + `border-radius: 12px`.
  - Grid: `items-stretch` explícito.
  - Padding: `p-6 md:p-8` (24px mobile / 32px desktop).

### Documentación
- `docs/02-architecture.md`: estructura actualizada con nuevos archivos y tabla de componentes de Casos.

---

## [2026-05-23] — Fase A — Fixes críticos + form conectado

### Tipo de cambio
- **FIXED**: 6 fixes visuales y funcionales post-integración inicial

### FIX 1 — Logo navbar a blanco
- `src/components/layout/Navbar.tsx`: logo Z cambiado de `text-primary` (azul) a `text-white`; filtro del logo PNG actualizado a `brightness(0) invert(1)`. Footer queda sin cambios (Z azul).

### FIX 2 — Screenshots cases con hover scale
- `src/components/sections/Cases.tsx`: `BrowserMockup` — imagen con `transition-transform duration-500` y `scale-[1.02]` al hacer hover sobre la card.
- TODO: reemplazar `/cases/*.png` con screenshots HD de los proyectos reales.

### FIX 3 — Cards de servicios: flexbox correcto
- `src/components/sections/Services.tsx`: div interior `role="button"` recibe `h-full flex flex-col`; descripción `<p>` recibe `flex-1` para distribuir espacio correctamente entre cards de altura variable.

### FIX 4 — Formulario de contacto conectado
- **NUEVO** `src/lib/validations/contact.ts`: schema Zod compartido (campos: nombre, email, empresa, servicio, mensaje, consent).
- **NUEVO** `src/app/api/contact/route.ts`: rate limiting (5/IP/10min), sanitización HTML, Supabase INSERT via `createServiceClient()`, email via Resend, fault tolerance.
- **NUEVO** `supabase/migrations/00002_add_lead_fields.sql`: agrega columnas `service TEXT` y `consent_given BOOLEAN NOT NULL DEFAULT false`.
- `src/components/sections/Contact.tsx`: `onSubmit` migrado a async/fetch real; `FormStatus` agrega `"error"`; se muestra bloque de error con fallback email.

### FIX 5 — Favicon
- `src/app/layout.tsx`: `metadata.icons` apunta a `/brand/logo-z.png` (PNG nativo, soportado por todos los browsers modernos); agrega `manifest.json`.
- **NUEVO** `public/manifest.json`: PWA manifest con colores del design system.

### FIX 6 — Placeholders legales y redes sociales
- `.env.example`: agrega `RESEND_FROM_EMAIL`, `RESEND_TO_EMAIL`, `NEXT_PUBLIC_COMPANY_LEGAL_NAME`, `NEXT_PUBLIC_COMPANY_TAX_ID`, `NEXT_PUBLIC_COMPANY_ADDRESS`, `NEXT_PUBLIC_SOCIAL_*`.
- **NUEVO** `.env.local`: valores placeholder para desarrollo local (CUIT "En trámite", redes "#").
- `src/components/layout/Footer.tsx`: iconos de redes sociales (Instagram, LinkedIn, X, Facebook) leídos de env vars; estado deshabilitado (`opacity-40`, `cursor-not-allowed`, tooltip "Próximamente") cuando URL == "#"; CUIT y razón social leídos de env vars.
- `legal/legal-checklist.md`: excepciones actualizadas para CUIT y redes sociales.

### Archivos de documentación actualizados
- `docs/features/contact-form.md` — spec completa de implementación
- `docs/DB_SCHEMA.md` — columnas `service` y `consent_given` + migración 00002
- `docs/API_DOCS.md` — `POST /api/contact` documentado con todos los contratos
- `docs/03-security.md` — rate limiting, sanitización HTML, uso de `createServiceClient()`

---

## [2026-05-23] — Integración Frontend Completo (Fase 2)

### Tipo de cambio
- **ADDED**: Frontend completo de la landing page — todos los componentes UI, layout y secciones

### Archivos creados (21 nuevos componentes + 3 páginas legales)

#### App
- `src/app/globals.css` — Design system TailwindCSS v4 con `@theme` block, clases custom (dot-grid, line-grid, grad-border, blob, reveal, word, marquee-track, field)
- `src/app/layout.tsx` — Space Grotesk + Inter (next/font/google), metadata OG/Twitter completa
- `src/app/page.tsx` — Composición de todas las secciones

#### Componentes UI
- `src/components/ui/PrimaryBtn.tsx` — Botón polimórfico button/anchor con cta-glow
- `src/components/ui/GhostBtn.tsx` — Botón polimórfico ghost/outline
- `src/components/ui/Reveal.tsx` — IntersectionObserver scroll reveal (TODO: Framer Motion)
- `src/components/ui/Mesh.tsx` — Blobs animados CSS hero/soft (TODO: Framer Motion)
- `src/components/ui/ZWatermark.tsx` — Watermark del logo Z con mixBlendMode
- `src/components/ui/SectionTitle.tsx` — eyebrow + h2 + kicker con Reveal integrado
- `src/components/ui/Modal.tsx` — Modal accesible con nav arrows, dot pagination, ESC/teclado

#### Layout
- `src/components/layout/Navbar.tsx` — Fija, scroll-aware, mobile hamburger, CTA "Hablemos"
- `src/components/layout/Footer.tsx` — 4 columnas, links legales, copyright
- `src/components/layout/StickyContactCTA.tsx` — Pill flotante, aparece a 560px/70vh

#### Secciones
- `src/components/sections/Hero.tsx` — Taglines animados word-by-word, stats grid, marquee stack
- `src/components/sections/Services.tsx` — 4 cards de servicio con modal detail
- `src/components/sections/ServiceModal.tsx` — Modal con howItWorks, benefits, useCases, stack; emite zcm:select-service
- `src/components/sections/ForWho.tsx` — 3 perfiles de audiencia con signals
- `src/components/sections/Cases.tsx` — 3 proyectos con BrowserMockup, ProjectCard
- `src/components/sections/CaseModal.tsx` — Modal con challenge, built (público/backoffice), stack, link en vivo
- `src/components/sections/Method.tsx` — 3 pasos: Diagnosticamos · Construimos · Operamos
- `src/components/sections/Contact.tsx` — Formulario con validación, ServiceRadio, consentimiento GDPR

#### Páginas legales
- `src/app/privacy/page.tsx` — Política de privacidad (Ley 25.326 + GDPR)
- `src/app/terms/page.tsx` — Términos y condiciones
- `src/app/cookies/page.tsx` — Política de cookies

#### Assets
- `public/brand/logo-z.svg` — Placeholder SVG del logo Z (TODO: reemplazar con logo real)

### Dependencias instaladas
- `lucide-react` — librería de iconos

### Notas técnicas
- Design system: nuevo `@theme` block en globals.css (Tailwind v4 nativo, sin tailwind.config.ts necesario)
- Eventos globales: `zcm:select-service` conecta ServiceModal → Contact
- TypeScript: zero errores (`npm run typecheck`)
- TODO pendientes: Framer Motion migration (5 hotspots), logos y screenshots reales en public/, CUIT en Footer

---

## [2026-05-23] — Inicialización del Proyecto (Método Zecamo)

### Tipo de cambio
- **ADDED**: Setup inicial completo del proyecto

### Archivos creados (41 total)

#### Configuración del proyecto
- `package.json` — Next.js 15, TypeScript, TailwindCSS v4, Supabase, Resend, Zod
- `tsconfig.json` — TypeScript strict mode, path alias `@/*`
- `next.config.ts` — Headers de seguridad (CSP, X-Frame, Referrer-Policy, etc.)
- `tailwind.config.ts` — Design system integrado con CSS variables
- `postcss.config.js` — @tailwindcss/postcss para TailwindCSS v4
- `.gitignore` — Exclusión de .env, node_modules, .next, etc.
- `.env.example` — Template de variables: Supabase, Resend, datos legales del footer

#### Documentación raíz
- `README.md` — Descripción del proyecto, quick start, estructura
- `CHANGELOG.md` — Este archivo
- `METODO_ZECAMO.md` — Copia del método completo (autocontenido)

#### Reglas IA (todos los IDEs)
- `CLAUDE.md` — Reglas para Claude Code
- `.windsurfrules` — Reglas para Windsurf
- `.cursorrules` — Reglas para Cursor
- `.clinerules` — Reglas para Cline
- `.aider.conf.yml` — Configuración para Aider
- `.github/copilot-instructions.md` — Instrucciones para GitHub Copilot

#### Documentación `docs/`
- `docs/01-project-overview.md` — Visión, stack, estado del proyecto, equipo
- `docs/02-architecture.md` — Estructura de carpetas, decisiones técnicas
- `docs/03-security.md` — Seguridad, RLS, credenciales, validaciones
- `docs/04-deployment.md` — Proceso de deploy, checklist pre-go-live
- `docs/05-compliance.md` — Cumplimiento legal Argentina (Ley 25.326) + GDPR
- `docs/DB_SCHEMA.md` — Tabla `leads`: esquema, columnas, RLS
- `docs/API_DOCS.md` — Endpoints API Routes (placeholder)
- `docs/SKILLS.md` — Skills Zecamo usadas en este proyecto
- `docs/ZECAMO_BRANDING.md` — Self-attribution, branding, paleta de colores

#### Features (placeholders para mañana)
- `docs/features/hero.md`
- `docs/features/services.md`
- `docs/features/method.md`
- `docs/features/team.md`
- `docs/features/cases.md`
- `docs/features/contact-form.md`

#### Legal `legal/`
- `legal/privacy-policy.md` — Política de Privacidad (Ley 25.326 + GDPR)
- `legal/terms-of-service.md` — Términos y Condiciones
- `legal/cookies-policy.md` — Política de Cookies
- `legal/copyright-notice.md` — Aviso de derechos de autor (self-attribution)
- `legal/data-processing.md` — Tratamiento de datos y registro AAIP
- `legal/legal-checklist.md` — Checklist pre-deploy

#### Código fuente base
- `src/styles/variables.css` — Design system completo: colores, tipografía, spacing, sombras, radii, transiciones
- `src/lib/supabase/client.ts` — Cliente Supabase para componentes del lado cliente
- `src/lib/supabase/server.ts` — Cliente Supabase para Server Components y API Routes

#### Base de datos
- `supabase/migrations/00001_initial.sql` — Tabla `leads` con RLS de solo INSERT público

#### Carpetas vacías (estructura reservada)
- `public/brand/` — Logo y assets (Joaco los sube mañana)
- `public/legal/` — PDFs legales si aplica

### Descripción
Setup completo siguiendo el Método Zecamo (basado en AInnovate v2.1 + extensiones de agencia).
Proyecto especial: Zecamo Studios es tanto la agencia como el cliente (self-branding).
La base de infraestructura queda 100% lista para que mañana se arranque con diseño y animaciones.

### Compliance check inicial
- [x] Estructura `docs/` completa (9 archivos)
- [x] Estructura `legal/` completa (6 documentos)
- [x] Reglas IA para 6 IDEs distintos
- [x] Design system con variables CSS
- [x] Variables sensibles SOLO en .env.example (no en código)
- [x] RLS configurado en migración inicial
- [x] Self-attribution documentada en ZECAMO_BRANDING.md

---

<!-- Próximas entradas debajo de esta línea -->

## [2026-05-24] — Fase B.3 — Padding ForWho cards

### Tipo de cambio
- **CHANGED**: Padding interno de ProfileCard aumentado para dar más aire

### Cambios en `src/components/sections/ForWho.tsx`

- Padding del Reveal/card: `p-7 md:p-8` → `p-7 md:p-10` (mobile 28px → desktop 40px)
- Espaciado título → descripción: `mt-2` → `mt-3` (8px → 12px, estaba muy apretado)
- El resto del spacing interno se mantuvo: `mb-6` (icono↔título), `mt-6 pt-5` (descripción↔bullets), `space-y-3` (bullets entre sí) — todos en rango correcto

### Decisión autónoma
- Desktop: `p-10` (valor pedido). Mobile: `p-7` (mantenido del estado anterior, 28px es adecuado para mobile).
- No se bajó a `p-8` desktop porque el contenido no se ve perdido — hay 3 elementos bien diferenciados (icono+badge / título+descripción / bullets) que llenan bien el espacio.

### Archivos modificados
- `src/components/sections/ForWho.tsx`

### Validación
- TypeScript: 0 errores
- Dev server: OK

## [2026-05-24] — Fase B.2 — Hotfixes UX nocturnos round 2

### Tipo de cambio
- **FIXED**: Border-radius hover en cards de ForWho.tsx (se había escapado del round anterior)
- **FIXED**: Sticky CTA ahora se oculta cuando la sección de Contact / Footer entra al viewport

---

### FIX 1 — Border-radius en cards de ForWho.tsx

Causa raíz identificada: el hover (`boxShadow`, `transform`) se aplicaba al `<div>` interior del `AudienceCard`, que NO tiene `border-radius`. La clase `grad-border` (con `border-radius: 20px`) está en el Reveal exterior. El anillo `0 0 0 1px rgba(43,91,255,.5)` del hover salía cuadrado porque seguía el shape del div interior.

Cambios en `src/components/sections/ForWho.tsx`:
- Reveal: añadido `overflow-hidden` (clipea contenido a los bordes redondeados)
- Inner hover div: añadido `borderRadius: 20` en el style inline — el ring del hover ahora sigue la misma curva que el contenedor `grad-border`
- Non-hover boxShadow: cambiado de `"0 1px 0 0 rgba(255,255,255,.04) inset"` a `"none"` — el inset era invisible y redundante

---

### FIX 2 — Sticky CTA se oculta al llegar a #contacto

`src/components/layout/StickyContactCTA.tsx`:
- Añadido estado `isHidden` (boolean)
- Nuevo `useEffect` con `IntersectionObserver` que observa `#contacto` (con fallback a `footer` si no existe el id)
- Threshold: `0.1` (se oculta cuando el 10% de la sección Contact es visible)
- Show logic: `show = visible && !isHidden`
- La clase de visibilidad usa `show` en lugar del anterior `visible`
- El comportamiento de aparición en scroll se mantiene intacto (no cambiado)

Decisión autónoma: observar `#contacto` (no el footer) como primer target — porque `#contacto` aparece antes que el footer y es el trigger semánticamente correcto. Si el id no existiera, fallback a `footer`. Documentado en código.

---

### Decisiones autónomas
- FIX 1: El inset `0 1px 0 0` (estado no-hover) fue removido — era inperceptible visualmente y no aportaba nada al diseño; simplifica el estado de reposo de la card.
- FIX 2: Target primario `#contacto`, fallback `footer`. El threshold 0.1 (10%) da una respuesta rápida sin necesitar que el form esté completamente visible.

### TODOs para Joaco
- Ninguno.

### Archivos modificados
- `src/components/sections/ForWho.tsx`
- `src/components/layout/StickyContactCTA.tsx`

### Validación
- TypeScript: 0 errores (`npx tsc --noEmit` → exit 0)
- Dev server: ✓ Running (puerto 3004)

## [2026-05-24 00:00] — Fase B.1 — Hotfixes UX nocturnos

### Tipo de cambio
- **REMOVED**: CTA redundante al pie de página
- **RENAMED**: Servicio destacado renombrado en todo el proyecto
- **CHANGED**: CursorBlob con valores de brillo aumentados
- **FIXED**: Border-radius de hover en cards ahora respeta esquinas redondeadas

---

### FIX 1 — CTA redundante eliminado del Footer

- `src/components/layout/Footer.tsx`: eliminado el link "Agendar llamada" + ícono `ArrowUpRight` del bloque de identidad del footer (línea ~98). Ya existían el sticky CTA flotante ("Hablemos"), el botón del navbar y el botón del Hero. El footer era redundante.
- Eliminado `ArrowUpRight` del import (quedaba sin uso).
- El ítem "Contacto" en la columna "Estudio" del footer se mantiene.

---

### FIX 2 — Renombrado "Diagnóstico IA & Cyber" → "Diagnóstico Zecamo"

Archivos de código:
- `src/components/sections/Services.tsx`: `title: "Diagnóstico Zecamo"` (era "Diagnóstico IA & Cyber")
- `src/components/sections/Contact.tsx`:
  - `label: "Diagnóstico Zecamo"` en `SERVICE_OPTIONS[0]`
  - `defaultMsg` para el flujo diagnostico actualizado: "Quiero un Diagnóstico Zecamo para mi negocio. Tenemos [N] personas en el equipo y nuestro principal dolor es..."

Documentación:
- `docs/features/diagnostico-service.md`: título y data de ejemplo actualizados
- `docs/features/services.md`: tabla de servicios actualizada
- `docs/01-project-overview.md`: menciones en "Propuesta de Valor" y tabla de secciones actualizadas

NO modificado: contenido del modal, beneficios, stack, ctaLabel ("Hablemos del Diagnóstico"), HowWeWork (ya solo decía "Diagnóstico").

---

### FIX 3 — CursorBlob más brillante

- `src/components/ui/CursorBlob.tsx`:
  - Tamaño: 30→34px (base), 52→56px (hover)
  - Background: `rgba(43,91,255,0.55)` plana → `radial-gradient(circle, rgba(43,91,255,0.9) 0%, rgba(43,91,255,0.5) 50%, transparent 70%)`
  - Blur: 18→8px (base), 28→16px (hover) — núcleo más brillante, menos difuso
  - Opacity: 0.55→0.75 (base), nueva: 0.9 (hover)
  - BoxShadow: añadido glow exterior — `0 0 24px rgba(43,91,255,0.6), 0 0 48px rgba(43,91,255,0.3)` (base) / más intenso en hover

Decisión autónoma: valores finales opacity 0.75/0.9 (no 0.85) — el gradiente radial ya suaviza el centro, la opacity 0.75 da buena presencia sin saturar.

---

### FIX 4 — Border-radius en hover de cards

Causa identificada: falta de `overflow: hidden` en contenedores con border-radius + anillo `0 0 0 1px` del BrowserMockup (rounded-xl / 12px) visible contra card padre (rounded-[20px] / 20px).

Cambios:
- `src/components/sections/Services.tsx`:
  - `FeaturedServiceCard` Reveal: añadido `overflow-hidden`; inner div: añadido `overflow-hidden`
  - `FeaturedServiceCard` hover boxShadow: eliminado `0 0 0 1px rgba(43,91,255,.15) inset` (creaba segunda capa visual cuadrada)
  - `ServiceCard` Reveal: añadido `overflow-hidden`; inner div: añadido `overflow-hidden`
- `src/components/sections/Cases.tsx`:
  - `ProjectCard` Reveal: añadido `overflow-hidden`; inner div: añadido `overflow-hidden`
  - `BrowserMockup` hover boxShadow: eliminado anillo `0 0 0 1px rgba(43,91,255,.55)` (radio 12px vs card 20px generaba "squareness" relativa); mantenidos los glows difusos
- `src/components/sections/HowWeWork.tsx`:
  - `PhaseCard` Reveal: añadido `rounded-2xl overflow-hidden` (era solo `flex-1 min-w-0`); inner div: añadido `overflow-hidden`

---

### Decisiones autónomas (Joaco durmiendo)
- FIX 1: El CTA eliminado no decía "Hablemos" exacto sino "Agendar llamada" — es el único CTA redundante en zona de pie, que Joaco describió. Decisión conservadora: eliminar.
- FIX 3: Opacity final 0.75/0.9 (no 0.85) — el gradiente radial ya provee suavidad natural en los bordes; la opacity más alta da visibilidad sin saturación excesiva.
- FIX 4: `overflow: hidden` no afecta las box-shadows propias del elemento (solo las de hijos); es safe para todos los efectos hover existentes.

### TODOs para Joaco
- Ninguno. Los 4 fixes están completos y funcionan sin cambios de Joaco.

### Archivos modificados
- `src/components/layout/Footer.tsx`
- `src/components/sections/Services.tsx`
- `src/components/sections/Contact.tsx`
- `src/components/sections/Cases.tsx`
- `src/components/sections/HowWeWork.tsx`
- `src/components/ui/CursorBlob.tsx`
- `docs/features/diagnostico-service.md`
- `docs/features/services.md`
- `docs/01-project-overview.md`

### Validación
- TypeScript: 0 errores (`npx tsc --noEmit` → exit 0)
- Dev server: ✓ Running (puerto 3003 — 3000 en uso por otro proceso)
