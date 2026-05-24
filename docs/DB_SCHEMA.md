# DB Schema

> Proyecto: zecamo-landing
> Base de datos: Supabase (PostgreSQL)
> Última actualización: 2026-05-23

---

## Tablas

### `leads`

Almacena los contactos enviados desde el formulario de la landing page.

| Columna | Tipo | Nullable | Default | Descripción |
|---------|------|----------|---------|-------------|
| `id` | `uuid` | NO | `gen_random_uuid()` | PK, generado automáticamente |
| `name` | `text` | NO | — | Nombre del contacto |
| `email` | `text` | NO | — | Email del contacto |
| `company` | `text` | NO | — | Nombre de la empresa |
| `message` | `text` | NO | — | Mensaje enviado |
| `created_at` | `timestamptz` | NO | `now()` | Timestamp de creación |
| `ip` | `text` | SÍ | `null` | IP del cliente (para prevención de spam) |
| `user_agent` | `text` | SÍ | `null` | User agent del cliente |
| `service` | `text` | SÍ | `null` | Servicio seleccionado en el formulario |
| `consent_given` | `boolean` | NO | `false` | Consentimiento GDPR/Ley 25.326 explícito |

**Migración:** `supabase/migrations/00001_initial.sql`, `supabase/migrations/00002_add_lead_fields.sql`

---

## Row Level Security (RLS)

### Tabla `leads`

| Política | Rol | Operación | Condición |
|----------|-----|-----------|-----------|
| `leads_insert_public` | `anon` | `INSERT` | Siempre (formulario público) |
| (ninguna) | `anon` | `SELECT` | Bloqueado por defecto |
| (ninguna) | `anon` | `UPDATE` | Bloqueado por defecto |
| (ninguna) | `anon` | `DELETE` | Bloqueado por defecto |

El rol `service_role` bypasea RLS automáticamente. Se usa en el API route para leer/gestionar leads.

---

## Índices

| Índice | Tabla | Columna | Tipo | Razón |
|--------|-------|---------|------|-------|
| `leads_pkey` | `leads` | `id` | PRIMARY KEY | — |
| `leads_created_at_idx` | `leads` | `created_at DESC` | BTREE | Ordenar por recientes en el futuro dashboard |
| `leads_email_idx` | `leads` | `email` | BTREE | Evitar duplicados y búsquedas por email |

---

## Notas

- La tabla `leads` es de solo escritura pública. Los leads se leen solo desde el panel de Supabase o via `service_role`.
- En el futuro se puede agregar una tabla `leads_status` para tracking de follow-up, pero por ahora no es necesario.
- No hay autenticación de usuarios en este proyecto. No hay tabla `users`.

---

## Migraciones

| # | Archivo | Descripción |
|---|---------|-------------|
| 1 | `00001_initial.sql` | Tabla `leads` + RLS + índices |
| 2 | `00002_add_lead_fields.sql` | Agrega `service` y `consent_given` a `leads` |

---

*Actualizar este documento cada vez que se modifique el schema de la base de datos.*
