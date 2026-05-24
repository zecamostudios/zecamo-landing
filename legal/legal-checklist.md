# Checklist Legal Pre-Deploy — zecamo-landing

> Documento obligatorio Zecamo Studios. Completar al 100% antes del go-live.

**Proyecto:** zecamo-landing
**Responsable:** Zecamo Studios — Tucumán, Argentina (CUIT: pendiente — ver TODO en `.env.local`)
**Dominio destino:** https://zecamostudios.com
**Fecha de revisión:** ________________
**Aprobado por:** ________________ (Joaco / Lisandro / Benjamín)

---

## 1. Compliance Visual

- [ ] Footer con copyright: `© 2026 Zecamo Studios. Todos los derechos reservados.`
- [ ] Footer con CUIT de Zecamo Studios (completar cuando esté disponible)
- [ ] Footer con email de contacto: hola@zecamostudios.com
- [ ] Página `/privacy` publicada y accesible
- [ ] Página `/terms` publicada y accesible
- [ ] Página `/cookies` publicada y accesible
- [ ] Links a páginas legales visibles en el footer de todas las páginas

---

## 2. Datos Personales

- [ ] Formulario de contacto con checkbox de consentimiento explícito
- [ ] Checkbox enlaza a `/privacy`
- [ ] Consentimiento separado (no agrupado con "acepto términos")
- [ ] Se indica claramente qué datos se recolectan y para qué
- [ ] Email hola@zecamostudios.com visible para ejercicio de derechos

---

## 3. Seguridad Técnica

- [ ] HTTPS obligatorio (automático en Vercel)
- [ ] RLS activo en tabla `leads` de Supabase (verificar en dashboard)
- [ ] Sin API keys ni secretos en el código (revisar con `git grep`)
- [ ] Variables de producción configuradas en Vercel dashboard
- [ ] Rate limiting activo en `/api/contact`
- [ ] Validación server-side en el endpoint de contacto
- [ ] Headers de seguridad activos (verificar con securityheaders.com)
- [ ] Service role key NO aparece en bundles del cliente

---

## 4. SEO Básico

- [ ] `<title>` y `<meta name="description">` en todas las páginas
- [ ] Open Graph tags (og:title, og:description, og:image, og:url)
- [ ] favicon completo (16px, 32px, apple-touch-icon, etc.)
- [ ] `robots.txt` configurado

---

## 5. Performance y UX

- [ ] Lighthouse Performance > 80
- [ ] Sin errores en consola del navegador
- [ ] Responsive en mobile, tablet y desktop
- [ ] Formulario probado de punta a punta (form → Supabase → email)

---

## 6. Documentación Zecamo

- [ ] CHANGELOG.md con entrada "Initial release"
- [ ] docs/01-project-overview.md actualizado
- [ ] docs/02-architecture.md actualizado
- [ ] docs/03-security.md completo
- [ ] docs/04-deployment.md con URL de producción
- [ ] docs/05-compliance.md completo y revisado
- [ ] docs/DB_SCHEMA.md actualizado
- [ ] README.md con URL de producción

---

## Excepciones y Notas

Si algún punto no se cumple, documentar la razón:

| Punto | Razón | Decisión | Fecha |
|-------|-------|----------|-------|
| CUIT en footer | Pendiente formalización S.A.S. | Placeholder "En trámite" via `NEXT_PUBLIC_COMPANY_TAX_ID` en `.env.local`; actualizar cuando disponible | 2026-05-23 |
| Redes sociales en footer | Perfiles aún no creados | Iconos deshabilitados con tooltip "Próximamente"; activar via env vars cuando los perfiles estén activos | 2026-05-23 |

---

## Aprobación Final

**Yo, ________________**, miembro de Zecamo Studios, declaro que revisé este checklist y autorizo el deploy a producción del proyecto **zecamo-landing**.

**Fecha:** ________________

**Firma:** ________________

---

*Generado por la skill `zecamo-init` el 2026-05-23.*
