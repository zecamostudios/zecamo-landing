# API Docs

> Proyecto: zecamo-landing
> Última actualización: 2026-05-23

---

## Endpoints

### POST `/api/contact`

Recibe el formulario de contacto, guarda el lead en Supabase y envía notificación por email via Resend.

**Estado:** ✅ Implementado (Fase A)

**Archivo:** `src/app/api/contact/route.ts`

**Request body:**
```json
{
  "nombre":   "string (1-100 chars)",
  "email":    "string (valid email, max 200 chars)",
  "empresa":  "string (1-200 chars)",
  "servicio": "'automatizacion' | 'vibe' | 'agentes' | 'consultoria' | 'otra'",
  "mensaje":  "string (10-2000 chars)",
  "consent":  true
}
```

**Validación:** Zod — `src/lib/validations/contact.ts`

**Response exitosa (200):**
```json
{ "ok": true }
```

**Response de error — validación (422):**
```json
{
  "error": "Datos inválidos",
  "details": { "fieldErrors": { "email": ["Email inválido"] }, "formErrors": [] }
}
```

**Response de error — rate limit (429):**
```json
{ "error": "Demasiadas solicitudes. Intentá de nuevo en 10 minutos." }
```

**Response de error — servidor (500):**
```json
{
  "error": "No se pudo procesar tu mensaje. Escribinos directamente a hola@zecamostudios.com."
}
```

**Rate limiting:** 5 requests por IP cada 10 minutos — `Map<ip, {count, resetAt}>` en memoria (se resetea en cold start).

**Seguridad:**
- Validación server-side con Zod (no se confía en el cliente)
- HTML sanitization (`escapeHtml`) sobre todos los inputs antes de incluirlos en el email
- IP obtenida de `x-forwarded-for` (header de Vercel)
- `service_role` key SOLO en servidor — no expuesta al cliente
- Fault tolerance: si Supabase falla pero Resend OK (o viceversa), retorna 200

**Side effects:**
1. `INSERT` en tabla `leads` (Supabase, via `service_role`)
2. Email HTML enviado a `RESEND_TO_EMAIL` via Resend, con `Reply-To: <email del lead>`

**Variables de entorno requeridas:**
- `RESEND_API_KEY`
- `RESEND_FROM_EMAIL` (dominio verificado en Resend)
- `RESEND_TO_EMAIL` (email destino de notificaciones)
- `NEXT_PUBLIC_SUPABASE_URL`
- `SUPABASE_SERVICE_ROLE_KEY`

---

*Este proyecto no tiene más endpoints por ahora. Actualizar cuando se agreguen.*
