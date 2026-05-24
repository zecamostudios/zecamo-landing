# zecamo-landing — Instrucciones para GitHub Copilot (Método Zecamo v1.0)

## Contexto del Proyecto

Este es el repositorio de **zecamo-landing**, la landing page institucional de Zecamo Studios.
Zecamo Studios es una agencia B2B de IA y automatización con sede en Tucumán, Argentina.
Este es un proyecto de self-branding: Zecamo es tanto la agencia como el cliente.

**Stack:** Next.js 15 (App Router) + TypeScript (strict) + TailwindCSS v4 + Supabase + Resend + Zod
**Hosting:** Vercel
**Equipo:** Joaco, Lisandro Monroy, Benjamín Zerda

## Protocolo de Desarrollo (Documentation-Driven Development)

ANTES de sugerir o completar código, tener en cuenta:

1. La arquitectura está documentada en `docs/02-architecture.md`
2. Cada sección de la landing tiene su doc en `docs/features/`
3. El schema de la DB está en `docs/DB_SCHEMA.md`
4. Los endpoints están en `docs/API_DOCS.md`
5. Las reglas de seguridad en `docs/03-security.md`
6. El compliance legal en `docs/05-compliance.md`

## Reglas de Código (INVIOLABLES)

### TypeScript
- Mode: STRICT. Nunca sugerir `any`.
- Siempre tipar props de componentes con interfaces o types.
- Inferir tipos cuando sea obvio, pero no en funciones públicas/API.

### Estilos
- Los colores, tipografía y spacing SOLO deben venir de `src/styles/variables.css`.
- Usar las clases de Tailwind que mapean a las variables (brand-primary, bg-base, text-secondary, etc.).
- NO usar valores hexadecimales hardcodeados en Tailwind o CSS.

### Seguridad
- API keys y tokens: NUNCA en código. Solo en .env.local.
- `SUPABASE_SERVICE_ROLE_KEY`: SOLO en archivos de servidor (no en rutas `app/` sin `'use server'`).
- Validar inputs con Zod tanto en cliente como en server.
- Rate limiting en todas las API routes públicas.

### Supabase
- Cliente: `src/lib/supabase/client.ts` (para Client Components)
- Servidor: `src/lib/supabase/server.ts` (para Server Components y API Routes)
- Nunca hacer queries sin considerar RLS.

### Componentes
- Naming: PascalCase para componentes, camelCase para funciones y hooks.
- Un componente por archivo.
- No mezclar lógica de negocio con presentación visual.

## Lo que NO debe sugerir Copilot

- Features o funcionalidades no pedidas explícitamente
- Colores o valores de diseño fuera del design system
- Dependencias nuevas sin autorización
- Código que exponga credenciales o datos de usuarios
- Queries SQL sin considerar RLS de Supabase
