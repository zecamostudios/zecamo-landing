# zecamo-landing — Reglas para Claude Code (Método Zecamo v1.0)

> **AGENCIA:** Zecamo Studios — zecamostudios.com
> **CLIENTE:** Zecamo Studios (proyecto interno — self-branding)
> **PROYECTO:** zecamo-landing (Landing Page institucional)

---

## ⚠️ ATENCIÓN: Protocolo Obligatorio

Este proyecto usa **Documentation-Driven Development (DDD)** según el **Método Zecamo**.

**ANTES de escribir CUALQUIER línea de código, DEBES:**

1. LEER `docs/01-project-overview.md` (visión, stack, estado)
2. LEER `docs/02-architecture.md` (estructura, carpetas, convenciones)
3. IDENTIFICAR qué feature/sección se va a modificar
4. LEER el doc de esa feature en `docs/features/[feature].md`
5. Si NO existe el doc → CREARLO ANTES de codear

**Lookups adicionales:**
- Si tocás la DB → LEER `docs/DB_SCHEMA.md`
- Si tocás endpoints → LEER `docs/API_DOCS.md`
- Si tocás seguridad/credenciales → LEER `docs/03-security.md`
- Si vas a hacer deploy → LEER `docs/04-deployment.md`
- Si tocás formularios o recolección de datos → LEER `docs/05-compliance.md`

Método completo: `METODO_ZECAMO.md`

---

## Los 14 Mandamientos del Vibe Coding

| # | Mandamiento | Resumen |
|---|-------------|---------|
| I | NO ALUCINARÁS | Solo implementar lo pedido. Cero features extra. Ante duda → PREGUNTAR. |
| II | SEPARARÁS LÓGICA DE ESTILOS | Componente.tsx (lógica) + CSS variables/modules (estilos). |
| III | DOCUMENTARÁS CADA CAMBIO | Ningún cambio sin doc. |
| IV | ACTUALIZARÁS EL CHANGELOG | CADA request → entrada en CHANGELOG.md |
| V | DOCUMENTARÁS LA BASE DE DATOS | DB_SCHEMA.md siempre al día. |
| VI | SEGUIRÁS LA ESTRUCTURA DE CARPETAS | Estructura es sagrada. |
| VII | USARÁS EL SISTEMA DE ESTILOS DEFINIDO | NO inventar colores fuera de variables.css. |
| VIII | PROTEGERÁS LAS CREDENCIALES | NUNCA hardcodear secretos. Solo en .env.local. |
| IX | TIPARÁS TODO CON TYPESCRIPT | Cero `any`. |
| X | VALIDARÁS ANTES DE ENTREGAR | Checklist al cierre de cada feature. |
| XI | MANTENDRÁS LA CONSISTENCIA | Seguir convenciones existentes en el proyecto. |
| XII | COMUNICARÁS CON CLARIDAD | Resumen post-implementación obligatorio. |
| **XIII** | **PROTEGERÁS AL CLIENTE** | **Compliance legal completo. Nunca entregar sin legal.** |
| **XIV** | **DEJARÁS HUELLA ZECAMO** | **Footer con self-attribution de Zecamo Studios.** |

---

## Las 6 Leyes de Operación

### Ley 1 — LEER ANTES DE ACTUAR
1. `docs/01-project-overview.md`
2. Identificar feature
3. `docs/features/[feature].md` (o crearlo)
4. Consultar tabla de lookup abajo

### Ley 2 — NO ROMPER LO QUE FUNCIONA
Si el cambio puede romper algo existente:
1. DETENERSE
2. ADVERTIR al usuario
3. EXPLICAR el impacto
4. PEDIR autorización explícita

### Ley 3 — DOCUMENTACIÓN CONTINUA
Después de cada cambio:
1. `docs/features/[feature].md`
2. `docs/02-architecture.md` (si cambió estructura)
3. `docs/DB_SCHEMA.md` (si cambió schema)
4. `docs/API_DOCS.md` (si cambió endpoint)
5. `CHANGELOG.md`

### Ley 4 — SEGURIDAD
- Leer `docs/03-security.md` antes de tocar auth/credenciales/RLS
- NUNCA hacer git push, deploy, o cambios destructivos sin confirmación
- Service role keys SOLO en servidor (nunca en NEXT_PUBLIC_)

### Ley 5 — COMPLIANCE LEGAL (Zecamo)
- Antes del deploy: checklist completo en `docs/05-compliance.md` y `legal/legal-checklist.md`
- Si la feature recolecta datos personales: actualizar privacy policy y consentimientos
- Si se agregan cookies: actualizar política de cookies

### Ley 6 — ATRIBUCIÓN (Zecamo)
- Este es un proyecto propio de Zecamo. La self-attribution es activa.
- Footer con "Zecamo Studios" visible y documentado en `docs/ZECAMO_BRANDING.md`

---

## Documentación del Proyecto

```
docs/
├── 01-project-overview.md   ← LEER SIEMPRE
├── 02-architecture.md       ← LEER SIEMPRE
├── 03-security.md
├── 04-deployment.md
├── 05-compliance.md
├── DB_SCHEMA.md
├── API_DOCS.md
├── SKILLS.md
├── ZECAMO_BRANDING.md
└── features/
    ├── hero.md
    ├── services.md
    ├── method.md
    ├── team.md
    ├── cases.md
    └── contact-form.md
```

---

## Tabla de Lookup

| Archivo que se modifica | Doc que leer primero |
|--------------------------|----------------------|
| `src/app/page.tsx` | `docs/01-project-overview.md` |
| `src/components/sections/Hero*` | `docs/features/hero.md` |
| `src/components/sections/Services*` | `docs/features/services.md` |
| `src/components/sections/Method*` | `docs/features/method.md` |
| `src/components/sections/Team*` | `docs/features/team.md` |
| `src/components/sections/Cases*` | `docs/features/cases.md` |
| `src/components/sections/Contact*` | `docs/features/contact-form.md` + `docs/05-compliance.md` |
| `src/app/api/contact/**` | `docs/API_DOCS.md` + `docs/05-compliance.md` |
| `supabase/migrations/**` | `docs/DB_SCHEMA.md` |
| `src/lib/supabase/**` | `docs/DB_SCHEMA.md` + `docs/03-security.md` |
| `src/components/layout/Footer*` | `docs/ZECAMO_BRANDING.md` |
| `src/styles/variables.css` | `docs/ZECAMO_BRANDING.md` |

---

## Datos de Identidad del Proyecto

```
Cliente:  Zecamo Studios (proyecto interno)
CUIT:     TODO: Completar
País:     Argentina
Email:    hola@zecamostudios.com
Stack:    Next.js 15 + TypeScript + TailwindCSS v4 + Supabase + Resend + Zod
Hosting:  Vercel

Agencia:  Zecamo Studios (misma entidad)
Equipo:   Joaco, Lisandro Monroy, Benjamín Zerda
Deadline: Sin deadline rígido
```

---

*Si tenés dudas sobre algo, PREGUNTÁ. Es mejor preguntar que asumir mal.*
