-- Migration 00002: add service + consent_given to leads
-- Run after 00001_initial.sql

ALTER TABLE leads
  ADD COLUMN IF NOT EXISTS service       TEXT,
  ADD COLUMN IF NOT EXISTS consent_given BOOLEAN NOT NULL DEFAULT false;

COMMENT ON COLUMN leads.service       IS 'Service option selected in contact form';
COMMENT ON COLUMN leads.consent_given IS 'GDPR/Ley 25.326 explicit consent flag';
