# 02 — Arquitectura Técnica

> Proyecto: zecamo-landing
> Última actualización: 2026-05-23 (Fase B — Reposicionamiento Diagnóstico/Implementación)

---

## Estructura de Carpetas

```
zecamo-landing/
│
├── .github/
│   └── copilot-instructions.md     # Reglas para GitHub Copilot
│
├── docs/                           # Documentación del proyecto (Método Zecamo)
│   ├── 01-project-overview.md
│   ├── 02-architecture.md          (este archivo)
│   ├── 03-security.md
│   ├── 04-deployment.md
│   ├── 05-compliance.md
│   ├── DB_SCHEMA.md
│   ├── API_DOCS.md
│   ├── SKILLS.md
│   ├── ZECAMO_BRANDING.md
│   └── features/
│       ├── hero.md
│       ├── services.md
│       ├── diagnostico-service.md  # spec del servicio Diagnóstico IA & Cyber
│       ├── how-we-work.md          # spec de la sección HowWeWork
│       ├── method.md
│       ├── team.md
│       ├── cases.md
│       ├── contact-form.md
│       ├── cursor-blob.md
│       ├── legal-pages.md
│       ├── seo.md
│       └── lighthouse-audit.md
│
├── legal/                          # Templates legales
│   ├── privacy-policy.md
│   ├── terms-of-service.md
│   ├── cookies-policy.md
│   ├── copyright-notice.md
│   ├── data-processing.md
│   └── legal-checklist.md
│
├── public/
│   ├── brand/                      # Logo y assets (subir mañana)
│   └── legal/                      # PDFs legales si aplica
│
├── src/
│   ├── app/                        # Next.js 15 App Router
│   │   ├── layout.tsx              # Root layout (fuente, metadata, etc.)
│   │   ├── page.tsx                # Home page — orquesta todas las secciones
│   │   ├── privacy/
│   │   │   └── page.tsx            # Página /privacy (lee legal/privacy-policy.md)
│   │   ├── terms/
│   │   │   └── page.tsx            # Página /terms (lee legal/terms-of-service.md)
│   │   ├── cookies/
│   │   │   └── page.tsx            # Página /cookies (lee legal/cookies-policy.md)
│   │   ├── not-found.tsx           # Página 404 custom con dot-grid + CTA
│   │   ├── opengraph-image.tsx     # OG image 1200×630 (ImageResponse, edge runtime)
│   │   ├── sitemap.ts              # Sitemap dinámico (/sitemap.xml)
│   │   ├── robots.ts               # robots.txt (/robots.txt)
│   │   └── api/
│   │       └── contact/
│   │           └── route.ts        # POST /api/contact (formulario)
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── StickyContactCTA.tsx
│   │   ├── ui/
│   │   │   ├── CursorBlob.tsx      # Blob decorativo Framer Motion (desktop only)
│   │   │   ├── LegalPage.tsx       # Layout compartido páginas legales (react-markdown)
│   │   │   ├── Modal.tsx
│   │   │   ├── PrimaryBtn.tsx
│   │   │   ├── GhostBtn.tsx
│   │   │   ├── Reveal.tsx
│   │   │   ├── Mesh.tsx
│   │   │   ├── SectionTitle.tsx
│   │   │   └── ZWatermark.tsx
│   │   └── sections/
│   │       ├── Hero.tsx
│   │       ├── Services.tsx         # 5 servicios: 1 featured (Diagnóstico) + 4 regulares en 2×2
│   │       ├── ServiceModal.tsx     # ServiceData interface con tiers, bonification, ctaLabel
│   │       ├── HowWeWork.tsx        # 2 phase cards + arrow animada + bonus badge + CTA
│   │       ├── Method.tsx
│   │       ├── ForWho.tsx
│   │       ├── Cases.tsx            # exports: BrowserMockup, CaseImageBare, PROJECTS
│   │       ├── CaseModal.tsx        # usa CaseImageBare (sin doble frame)
│   │       └── Contact.tsx         # 6 SERVICE_OPTIONS, Diagnóstico featured
│   │
│   ├── lib/
│   │   └── supabase/
│   │       ├── client.ts           # Cliente browser (Client Components)
│   │       └── server.ts           # Cliente server (Server Components + API routes)
│   │
│   └── styles/
│       └── variables.css           # Design system completo (CSS custom properties)
│
├── supabase/
│   └── migrations/
│       ├── 00001_initial.sql       # Tabla leads + RLS
│       └── 00002_add_lead_fields.sql  # Agrega service + consent_given
│
├── .env.example                    # Template de variables (NUNCA .env.local)
├── .gitignore
├── CHANGELOG.md
├── CLAUDE.md
├── .cursorrules
├── .windsurfrules
├── .clinerules
├── .aider.conf.yml
├── METODO_ZECAMO.md
├── README.md
├── next.config.ts
├── package.json
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

---

## Convenciones de Nombres

| Tipo | Convención | Ejemplo |
|------|-----------|---------|
| Componentes React | PascalCase | `ContactForm.tsx` |
| Hooks personalizados | camelCase con `use` | `useContactForm.ts` |
| Funciones utilitarias | camelCase | `formatDate.ts` |
| Archivos de estilos | mismo nombre del componente | `ContactForm.module.css` |
| Rutas API | kebab-case en carpetas | `api/contact/route.ts` |
| Variables CSS | kebab-case con prefijo `--color-`, `--text-`, etc. | `--color-primary` |
| Variables de entorno | SCREAMING_SNAKE_CASE | `NEXT_PUBLIC_SITE_URL` |

---

## Flujo de Datos del Formulario de Contacto

```
Usuario llena form
  → Validación client-side con Zod
  → POST /api/contact
  → Validación server-side con Zod (independiente)
  → INSERT en tabla `leads` de Supabase (via service role, RLS bypass)
  → Resend envía email de notificación a Joaco
  → Response 200 / manejo de error
  → UI muestra estado de éxito o error
```

---

## Decisiones Técnicas

| Decisión | Alternativa descartada | Razón |
|----------|----------------------|-------|
| TailwindCSS v4 | CSS Modules | Velocidad + integración con design system via variables CSS |
| Supabase | Firebase | PostgreSQL real, RLS nativo, mejor para datos estructurados |
| Resend | SendGrid / Nodemailer | API simple, excelente DX, entregabilidad |
| Zod | Yup / Valibot | Estándar de facto en el ecosistema Next.js/TypeScript |
| App Router (Next.js 15) | Pages Router | Futuro del framework, Server Components, mejor performance |
| Framer Motion (Fase 2) | CSS animations | Animaciones declarativas más expresivas, ya conocido por el equipo |

---

## Componentes de visualización de Casos

| Componente | Archivo | Uso |
|-----------|---------|-----|
| `BrowserMockup` | `Cases.tsx` | Cards de la sección home — frame con puntitos macOS + URL bar. CSS `background-image: cover` para rellenar el área del screenshot. |
| `CaseImageBare` | `Cases.tsx` | Modal de detalle — imagen directa sin frame extra. Los screenshots de shots.so ya tienen browser baked in, se evita el doble frame. |
| `LegalPage` | `ui/LegalPage.tsx` | Layout compartido para `/privacy`, `/terms`, `/cookies`. Recibe `content` (markdown string) y lo renderiza con `react-markdown + prose-invert`. |
| `CursorBlob` | `ui/CursorBlob.tsx` | Blob decorativo Framer Motion. Solo desktop (`pointer: coarse` skip). Se renderiza en `layout.tsx`. |

## Eventos Globales (bus de comunicación cross-component)

| Evento | Emitido por | Escuchado por | Payload |
|--------|-------------|---------------|---------|
| `zcm:select-service` | `ServiceModal` | `Contact` | `{ id, title }` — preselecciona servicio + prerellena mensaje |
| `zcm:open-service` | `HowWeWork` | `Services` | `{ id }` — abre modal del servicio indicado |

## Notas de Arquitectura

- Las páginas legales (`/privacy`, `/terms`, `/cookies`) están implementadas en `src/app/`
- El formulario NO tiene sistema de autenticación — es público con rate limiting (5/IP/10min, in-memory)
- La tabla `leads` en Supabase tiene RLS de solo INSERT público (ver `docs/DB_SCHEMA.md`)
- **Framer Motion está instalado** — usado en `CursorBlob.tsx`. El resto de animaciones sigue siendo CSS + IntersectionObserver (ver TODOs en componentes Hero, Reveal, Method).
- `BrowserMockup` y `CaseImageBare` son exports nombrados de `Cases.tsx` — importar desde ahí
- El orden de secciones en `page.tsx`: Hero → Services → HowWeWork → ForWho → Cases → Method → Contact

---

*Actualizar este documento cada vez que cambie la estructura de carpetas o se tomen decisiones arquitectónicas relevantes.*
