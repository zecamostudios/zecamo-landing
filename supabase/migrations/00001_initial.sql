-- ============================================================
-- Migration: 00001_initial
-- Proyecto: zecamo-landing
-- Fecha: 2026-05-23
-- Descripción: Tabla leads para el formulario de contacto + RLS
-- Docs: docs/DB_SCHEMA.md
-- ============================================================

-- ── TABLA LEADS ──────────────────────────────────────────────

CREATE TABLE IF NOT EXISTS public.leads (
  id          UUID        PRIMARY KEY DEFAULT gen_random_uuid(),
  name        TEXT        NOT NULL CHECK (char_length(name) BETWEEN 2 AND 100),
  email       TEXT        NOT NULL CHECK (char_length(email) BETWEEN 5 AND 255),
  company     TEXT        NOT NULL CHECK (char_length(company) BETWEEN 1 AND 200),
  message     TEXT        NOT NULL CHECK (char_length(message) BETWEEN 10 AND 2000),
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now(),
  ip          TEXT,
  user_agent  TEXT
);

COMMENT ON TABLE  public.leads               IS 'Contactos recibidos desde el formulario de la landing page de Zecamo Studios';
COMMENT ON COLUMN public.leads.id            IS 'Identificador único del lead';
COMMENT ON COLUMN public.leads.name          IS 'Nombre del contacto';
COMMENT ON COLUMN public.leads.email         IS 'Email del contacto';
COMMENT ON COLUMN public.leads.company       IS 'Empresa del contacto';
COMMENT ON COLUMN public.leads.message       IS 'Mensaje enviado desde el formulario';
COMMENT ON COLUMN public.leads.created_at    IS 'Timestamp de creación (UTC)';
COMMENT ON COLUMN public.leads.ip            IS 'IP del cliente — solo para prevención de spam';
COMMENT ON COLUMN public.leads.user_agent    IS 'User agent del cliente — solo para prevención de spam';

-- ── ÍNDICES ───────────────────────────────────────────────────

CREATE INDEX IF NOT EXISTS leads_created_at_idx ON public.leads (created_at DESC);
CREATE INDEX IF NOT EXISTS leads_email_idx      ON public.leads (email);

-- ── ROW LEVEL SECURITY ────────────────────────────────────────

ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- INSERT público: cualquier usuario anónimo puede enviar un contacto (formulario)
CREATE POLICY leads_insert_public
  ON public.leads
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- SELECT bloqueado para anon: los leads solo los lee el equipo Zecamo (service_role bypasea RLS)
-- No se necesita política explícita — RLS habilitado bloquea SELECT por defecto para anon.

-- ── NOTAS ─────────────────────────────────────────────────────
-- El endpoint /api/contact usa createServiceClient() que bypasea RLS para hacer el INSERT
-- controlado desde el servidor. El cliente browser NUNCA necesita leer esta tabla.
-- Ver src/lib/supabase/server.ts → createServiceClient()
