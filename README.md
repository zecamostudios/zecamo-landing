# zecamo-landing

> Landing page institucional de Zecamo Studios — agencia B2B de IA y automatización.

[![Made by Zecamo Studios](https://img.shields.io/badge/made%20by-Zecamo%20Studios-000000?style=flat-square)](https://zecamostudios.com)
[![Método Zecamo](https://img.shields.io/badge/método-Zecamo%20v1-2B5BFF?style=flat-square)](./METODO_ZECAMO.md)

---

## Sobre el Proyecto

**Cliente:** Zecamo Studios (proyecto interno — self-attribution)
**Tipo:** Web / Landing Page institucional
**Stack:** Next.js 15 + TypeScript + TailwindCSS v4 + Supabase + Resend

Landing page B2B para que empresas conozcan los servicios de Zecamo Studios, vean casos de uso y se pongan en contacto. El objetivo principal es generar leads calificados de empresas que quieran automatizar procesos con IA o desarrollar productos con vibe coding.

Zecamo Studios es la agencia y también el cliente de este proyecto.

---

## Quick Start

```bash
# 1. Instalar dependencias
npm install

# 2. Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con los valores reales

# 3. Levantar en local
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador.

---

## Estructura del Proyecto

```
zecamo-landing/
├── docs/                   # Documentación (Método Zecamo)
│   └── features/           # Un .md por sección de la landing
├── legal/                  # Templates legales (privacidad, cookies, etc.)
├── src/
│   ├── app/                # App Router de Next.js 15
│   ├── components/         # Componentes React (se crean mañana)
│   ├── lib/                # Utilidades y clientes externos
│   └── styles/             # Design system (variables.css)
├── supabase/
│   └── migrations/         # Migraciones de Supabase
├── public/
│   ├── brand/              # Logo y assets de marca (subir mañana)
│   └── legal/              # PDFs legales (si aplica)
├── CLAUDE.md               # Reglas para Claude Code
├── METODO_ZECAMO.md        # Método de desarrollo Zecamo
└── CHANGELOG.md            # Historial de cambios
```

Detalle completo en [`docs/02-architecture.md`](./docs/02-architecture.md).

---

## Documentación

| Doc | Para qué sirve |
|-----|----------------|
| [`docs/01-project-overview.md`](./docs/01-project-overview.md) | Visión, objetivos, estado del proyecto |
| [`docs/02-architecture.md`](./docs/02-architecture.md) | Estructura técnica y decisiones de diseño |
| [`docs/03-security.md`](./docs/03-security.md) | Reglas de seguridad y credenciales |
| [`docs/04-deployment.md`](./docs/04-deployment.md) | Deploy a Vercel, checklist pre-go-live |
| [`docs/05-compliance.md`](./docs/05-compliance.md) | Cumplimiento legal Argentina + GDPR |
| [`docs/DB_SCHEMA.md`](./docs/DB_SCHEMA.md) | Esquema de la base de datos (tabla `leads`) |
| [`METODO_ZECAMO.md`](./METODO_ZECAMO.md) | El método completo de desarrollo Zecamo |

---

## Trabajando con IA

Este proyecto está optimizado para Claude Code, Cursor, Windsurf y Copilot.

**Antes de cualquier cambio, la IA debe:**
1. Leer `docs/01-project-overview.md`
2. Leer `docs/02-architecture.md`
3. Identificar la feature a modificar
4. Leer el `.md` correspondiente en `docs/features/`

Los archivos `CLAUDE.md`, `.windsurfrules`, `.cursorrules`, `.clinerules`, `.aider.conf.yml` y `.github/copilot-instructions.md` tienen las reglas detalladas.

---

## Equipo

**Zecamo Studios** — [zecamostudios.com](https://zecamostudios.com)

- **Joaco** — Vibe Coder principal
- **Lisandro Monroy** — Cofundador
- **Benjamín Zerda** — Cofundador

---

## Licencia

Propietaria — todos los derechos reservados.

Copyright © 2026 Zecamo Studios — Tucumán, Argentina. Todos los derechos reservados.
Ver [`legal/copyright-notice.md`](./legal/copyright-notice.md).

---

<sub>Desarrollado con el [Método Zecamo](./METODO_ZECAMO.md) por [Zecamo Studios](https://zecamostudios.com) — proyecto de self-branding</sub>
