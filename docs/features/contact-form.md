# Feature: Formulario de Contacto

> Estado: ✅ Implementado (Fase A — 2026-05-23)
> Componente: `src/components/sections/Contact.tsx`
> API Route: `src/app/api/contact/route.ts`

---

## Archivos involucrados

| Archivo | Rol |
|---------|-----|
| `src/components/sections/Contact.tsx` | UI del formulario (Client Component) |
| `src/app/api/contact/route.ts` | API Route — validación, rate limiting, DB, email |
| `src/lib/validations/contact.ts` | Schema Zod compartido |
| `supabase/migrations/00002_add_lead_fields.sql` | Agrega `service` y `consent_given` a `leads` |

## Opciones de servicio (SERVICE_OPTIONS)

| Orden | ID | Label | Icon | Tipo |
|-------|----|-------|------|------|
| 1 | `diagnostico` | Diagnóstico IA & Cyber | `Compass` | **Featured** |
| 2 | `automatizacion` | Automatización con IA | `Workflow` | Regular |
| 3 | `vibe` | Vibe Coding | `Code2` | Regular |
| 4 | `agentes` | Agentes IA B2B | `BotMessageSquare` | Regular |
| 5 | `consultoria` | Consultoría IA | `Lightbulb` | Regular |
| 6 | `otra` | No estoy seguro / Otra consulta | `HelpCircle` | Regular |

Layout del ServiceRadio:
- Diagnóstico: RadioCard featured, full-width (badge "Recomendado · Empezá acá")
- Automatización, Vibe, Agentes, Consultoría: grid 2×2
- Otra consulta: RadioCard regular, full-width

## Campos del formulario

| Campo | Validación | Descripción |
|-------|-----------|-------------|
| `nombre` | min 1, max 100 | Nombre del contacto |
| `email` | email válido, max 200 | Email de contacto |
| `empresa` | min 1, max 200 | Empresa del contacto |
| `servicio` | enum (6 opciones) | Servicio de interés |
| `mensaje` | min 10, max 2000 | Descripción del caso |
| `consent` | literal `true` | Consentimiento GDPR/Ley 25.326 |

## Estados del formulario

- `idle` — estado inicial
- `loading` — enviando (spinner en botón)
- `success` — enviado correctamente (muestra `SuccessBlock`)
- `error` — fallo de red o servidor (muestra mensaje de error, form sigue visible)

## Flujo completo

```
1. Usuario completa el form
2. Validación client-side (Zod) → errores inline
3. POST /api/contact
4. Servidor:
   a. Rate limiting (5/IP/10min, in-memory Map)
   b. Validación server-side (Zod)
   c. HTML escape de todos los inputs
   d. INSERT en Supabase leads (service_role)
   e. Envío de email via Resend (con Reply-To al email del lead)
5. Si ok → status "success"
6. Si error → status "error" + mensaje fallback con email directo
```

## Integración con ServiceModal

El evento global `zcm:select-service` (emitido por `ServiceModal`) preselecciona el
servicio en el formulario y pre-rellena el mensaje con un placeholder si el campo está
vacío. Ver `Contact.tsx` → `useEffect`.

Comportamiento especial para Diagnóstico:
- Mensaje prerellenado: "Quiero un diagnóstico para mi negocio. Mi situación es..."
- Placeholder del textarea cuando `servicio === "diagnostico"`: "Quiero un diagnóstico para mi negocio. Tenemos [N] personas en el equipo y nuestro principal dolor es..."

## Variables de entorno requeridas

```
RESEND_API_KEY
RESEND_FROM_EMAIL   # dominio verificado en Resend
RESEND_TO_EMAIL     # destino de notificaciones
NEXT_PUBLIC_SUPABASE_URL
SUPABASE_SERVICE_ROLE_KEY
```

## Compliance

- Checkbox de consentimiento explícito (Ley 25.326 / GDPR)
- IP y User-Agent guardados en `leads` para prevención de spam
- `consent_given = true` guardado con cada lead

## TODOs futuros

- [ ] Activar dominio verificado en Resend (hola@zecamostudios.com)
- [ ] Agregar honeypot field anti-spam
- [ ] Persistir rate limit en Redis/Upstash para entornos multi-instancia
