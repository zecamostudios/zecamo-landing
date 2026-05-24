# 03 — Seguridad

> Proyecto: zecamo-landing
> Última actualización: 2026-05-23

---

## Credenciales y Variables de Entorno

### Regla absoluta
**NUNCA hardcodear secretos en el código.** Ni en comentarios, ni en strings, ni en console.log.

### Variables públicas (NEXT_PUBLIC_)
Solo pueden contener datos que están bien que sean públicos en el bundle del browser:
- `NEXT_PUBLIC_SUPABASE_URL` — URL del proyecto Supabase
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` — Anon key (limitada por RLS)
- `NEXT_PUBLIC_COMPANY_*` — Datos del footer (nombre, email, etc.)
- `NEXT_PUBLIC_SITE_URL` — URL del sitio

### Variables de servidor (sin NEXT_PUBLIC_)
Solo accesibles en server-side code:
- `SUPABASE_SERVICE_ROLE_KEY` — NUNCA en Client Components. Solo en API routes y Server Components
- `RESEND_API_KEY` — Solo en `/api/contact/route.ts` o Server Actions
- `RESEND_NOTIFY_TO` — Email de destino (no es secreto, pero tampoco necesita ser público)

---

## Supabase — Row Level Security (RLS)

### Tabla `leads`
- **RLS habilitado:** Sí
- **INSERT:** Permitido para roles `anon` (público) — el form es público
- **SELECT:** Bloqueado para `anon`. Solo `service_role` puede leer
- **UPDATE/DELETE:** Bloqueados para `anon`

Ver políticas exactas en `supabase/migrations/00001_initial.sql`.

### Uso de clientes
```typescript
// Client Component o browser → siempre este
import { createClient } from '@/lib/supabase/client'

// Server Component, API route, o Server Action → siempre este
import { createClient } from '@/lib/supabase/server'
```

El cliente de server usa la `SERVICE_ROLE_KEY` para las operaciones de escritura del formulario (bypass de RLS controlado). El cliente de browser usa la `ANON_KEY` respetando RLS.

---

## Validación de Inputs

### Regla: validar SIEMPRE en ambos lados

1. **Client-side:** Validación con Zod antes de enviar el formulario (UX inmediata)
2. **Server-side:** Validación con Zod en el API route (no confiar nunca en el cliente)

Nunca asumir que el input del usuario es seguro. Nunca asumir que la validación del cliente llegará al servidor intacta.

### Schema del formulario de contacto
```typescript
// src/lib/validations/contact.ts — ✅ implementado (Fase A)
import { z } from 'zod'

export const ContactSchema = z.object({
  nombre:   z.string().min(1).max(100),
  email:    z.string().email().max(200),
  empresa:  z.string().min(1).max(200),
  servicio: z.enum(["automatizacion", "vibe", "agentes", "consultoria", "otra"]),
  mensaje:  z.string().min(10).max(2000),
  consent:  z.literal(true),
})
```

### HTML Sanitization (XSS prevention)

Antes de incluir inputs del usuario en el HTML del email, se aplica `escapeHtml()` en `src/app/api/contact/route.ts`:
```typescript
function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}
```

---

## Rate Limiting

El endpoint `POST /api/contact` usa rate limiting in-memory:

```typescript
// src/app/api/contact/route.ts
const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;          // máximo 5 requests
const RATE_WINDOW_MS = 600_000; // por IP por 10 minutos
```

**Limitaciones:** se resetea en cold start de Vercel. Suficiente para MVP. Para producción con mucho tráfico, migrar a `@upstash/ratelimit` + Vercel KV.

### Uso de `createServiceClient()` en el API route

```typescript
// ✅ CORRECTO — solo en server-side (route.ts, Server Component)
const supabase = createServiceClient(); // usa SUPABASE_SERVICE_ROLE_KEY
await supabase.from("leads").insert({...});
```

La función es **síncrona** (no requiere `await` en la llamada). El `await` va en la operación `.insert()`.

---

## Headers de Seguridad

Configurados en `next.config.ts`:
- `Content-Security-Policy`
- `X-Frame-Options: SAMEORIGIN`
- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `Permissions-Policy`

Revisar y ajustar la CSP cuando se integren servicios externos (fuentes de Google, analytics, etc.).

---

## Checklist de Seguridad Pre-Deploy

- [ ] Ninguna API key o secreto en el código
- [ ] `.env.local` en `.gitignore` (verificar)
- [ ] Variables de producción configuradas en Vercel dashboard
- [ ] RLS habilitado y probado en todas las tablas
- [ ] Rate limiting en `/api/contact`
- [ ] Validación Zod en cliente Y servidor
- [ ] CSP configurada y probada (sin errores en consola)
- [ ] HTTPS obligatorio (Vercel lo hace por defecto)
- [ ] Service role key NO aparece en ningún bundle del cliente
- [ ] No hay `console.log` con datos sensibles en producción

---

*Leer este documento antes de tocar auth, credenciales, RLS, o endpoints.*
