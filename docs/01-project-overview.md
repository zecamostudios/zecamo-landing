# 01 — Project Overview

> **Proyecto Zecamo Studios**
> Cliente: Zecamo Studios (proyecto interno — self-branding)
> Fecha de inicio: 2026-05-23

---

## Visión

Landing page institucional de Zecamo Studios, agencia B2B de IA y automatización con sede en Tucumán, Argentina. El sitio sirve para que empresas conozcan los servicios de la agencia, vean casos de uso y se pongan en contacto. Es el primer punto de contacto digital de Zecamo con el mundo.

## Propuesta de Valor

**Método de dos fases:** primero diagnosticamos, después implementamos. Antes de automatizar, ordenamos. El Diagnóstico Zecamo (servicio 00) es la puerta de entrada — un roadmap de 90 días accionable con auditoría de procesos y ciberseguridad básica. Si el cliente avanza con la implementación en 30 días, el diagnóstico se bonifica al 100%.

## Objetivo de Negocio

Generar leads B2B calificados de empresas que quieran automatizar procesos con IA o desarrollar productos digitales mediante vibe coding. El formulario de contacto alimenta directamente una tabla en Supabase y notifica al equipo por email via Resend. El Diagnóstico es el servicio de entrada de menor fricción para convertir prospectos en clientes.

## Objetivos Técnicos

- Construir una base de código limpia, tipada y con design system sólido
- Tener la infraestructura lista para sumar animaciones (Framer Motion) en la siguiente fase
- Garantizar compliance legal Argentina + GDPR desde el día 1
- Desplegar en Vercel con headers de seguridad correctos

## Stack Técnico

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Framework | Next.js (App Router) | 15 |
| Lenguaje | TypeScript | 5 (strict) |
| UI | React | 19 |
| Estilos | TailwindCSS | v4 |
| Animaciones | Framer Motion (motion) | Fase 2 — no instalado aún |
| Base de datos | Supabase (PostgreSQL) | Latest |
| Email | Resend | Latest |
| Validación | Zod | Latest |
| Hosting | Vercel | — |
| Lenguaje del producto | Español (inglés: Fase 3) | — |

## Secciones Implementadas

| Sección | Feature doc | Estado |
|---------|-------------|--------|
| Hero | `docs/features/hero.md` | ✅ Implementado |
| Servicios (5 servicios + featured) | `docs/features/services.md` | ✅ Implementado |
| Cómo trabajamos (HowWeWork) | `docs/features/how-we-work.md` | ✅ Implementado |
| Para quién es esto (ForWho) | — | ✅ Implementado |
| Casos | `docs/features/cases.md` | ✅ Implementado |
| Método (3 pasos compactos) | `docs/features/method.md` | ✅ Implementado |
| Formulario de contacto | `docs/features/contact-form.md` | ✅ Implementado |
| Footer legal | (parte de layout) | ✅ Implementado |
| Diagnóstico Zecamo | `docs/features/diagnostico-service.md` | ✅ Implementado |

## Estado del Proyecto

| Fase | Descripción | Estado |
|------|-------------|--------|
| 1 | Setup inicial — infraestructura y docs | ✅ Completado |
| 2 | Frontend completo + form + integración | ✅ Completado |
| A | Fixes visuales + form conectado + casos | ✅ Completado |
| B.0 | Polish Técnico (CursorBlob, OG, SEO, 404, legales) | ✅ Completado |
| B | Reposicionamiento Diagnóstico/Implementación | ✅ Completado |
| C | Deploy a producción + dominio + Resend real | ⏳ Pendiente |

## Equipo Zecamo Asignado

- **Joaco** — Vibe Coder principal / Arquitecto del proyecto
- **Lisandro Monroy** — Cofundador
- **Benjamín Zerda** — Cofundador

## Deadline

Sin deadline rígido. El objetivo es algo profesional cuanto antes.

## Principio Fundamental

> HOY solo infra. Mañana diseño y animaciones.

## Notas Especiales

- Este es un proyecto de **self-branding**: Zecamo Studios es tanto la agencia como el cliente
- La self-attribution en el footer es activa y está documentada en `docs/ZECAMO_BRANDING.md`
- **TODO:** Joaco debe completar CUIT real en `.env.example` y archivos legales cuando esté disponible

## Acuerdo de Atribución

- **Atribución Zecamo:** Sí (self-attribution — Zecamo es el cliente)
- **White-label:** No aplica
- **Mantenimiento:** Interno

---

*Generado por la skill `zecamo-init` el 2026-05-23. Mantener actualizado conforme avanza el proyecto.*
