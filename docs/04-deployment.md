# 04 — Deployment

> Proyecto: zecamo-landing
> Hosting: Vercel
> Última actualización: 2026-05-23

---

## Proceso de Deploy

### Setup inicial (una vez)

1. Conectar el repositorio a Vercel
2. Configurar todas las variables de entorno en el panel de Vercel (Settings → Environment Variables)
3. Verificar que el dominio `zecamostudios.com` apunta al proyecto
4. Activar HTTPS (automático en Vercel)

### Deploy regular

```bash
# Vercel detecta automáticamente el push a main y deploya

# Para un preview deploy (rama feature):
git push origin feature/nombre-feature
# Vercel crea una URL de preview automáticamente

# Para forzar un redeploy sin cambios:
# Ir a Vercel dashboard → Deployments → Redeploy
```

---

## Variables de Entorno en Producción

Todas las variables del `.env.example` deben estar configuradas en Vercel antes del go-live.

| Variable | Dónde obtenerla |
|----------|----------------|
| `NEXT_PUBLIC_SUPABASE_URL` | supabase.com → tu proyecto → Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | supabase.com → tu proyecto → Settings → API |
| `SUPABASE_SERVICE_ROLE_KEY` | supabase.com → tu proyecto → Settings → API |
| `RESEND_API_KEY` | resend.com → API Keys |
| `RESEND_NOTIFY_TO` | Email de Joaco |
| `RESEND_FROM` | Email verificado en Resend |
| `NEXT_PUBLIC_COMPANY_*` | Datos de Zecamo Studios |
| `NEXT_PUBLIC_SITE_URL` | https://zecamostudios.com |

---

## Checklist Pre-Deploy (OBLIGATORIO)

Completar este checklist ANTES de hacer el deploy a producción. Si algún punto no se cumple, documentar la razón en las excepciones.

### Compliance Legal
- [ ] Footer con copyright © 2026 Zecamo Studios. Todos los derechos reservados.
- [ ] Footer con email de contacto visible
- [ ] Página `/privacy` publicada y con contenido completo
- [ ] Página `/terms` publicada
- [ ] Página `/cookies` publicada
- [ ] Links a páginas legales visibles en el footer de todas las páginas

### Datos Personales
- [ ] Checkbox de consentimiento en el formulario de contacto
- [ ] Link a privacy policy en el checkbox
- [ ] Mensaje claro sobre qué datos se recolectan y para qué

### Seguridad
- [ ] Sin credenciales hardcodeadas (revisar git grep para API keys)
- [ ] Variables de entorno configuradas en Vercel
- [ ] RLS activo en tabla `leads` (verificar en Supabase dashboard)
- [ ] Rate limiting activo en `/api/contact`
- [ ] CSP configurada correctamente (sin errores en consola del browser)
- [ ] HTTPS forzado (automático en Vercel)

### Performance y UX
- [ ] Lighthouse Performance > 80
- [ ] Sin errores en consola del navegador
- [ ] Responsive probado en mobile, tablet y desktop
- [ ] Imágenes optimizadas (WebP, lazy loading)
- [ ] Página 404 personalizada

### SEO
- [ ] `<title>` y `<meta name="description">` en todas las páginas
- [ ] Open Graph tags
- [ ] `robots.txt` configurado
- [ ] favicon en todos los tamaños

### Documentación
- [ ] CHANGELOG.md con entrada "Initial release"
- [ ] Todos los docs/ actualizados
- [ ] README.md actualizado con URL de producción

---

## Post-Deploy

Después de un deploy exitoso a producción:
1. Verificar el sitio en el dominio real
2. Probar el formulario de contacto de punta a punta (envío → Supabase → email)
3. Verificar que los headers de seguridad están activos (usar `securityheaders.com`)
4. Verificar que las páginas legales son accesibles
5. Agregar entrada en CHANGELOG.md: "Deployed to production"

---

*Actualizar este documento cuando cambie el proceso de deploy o las variables de entorno necesarias.*
