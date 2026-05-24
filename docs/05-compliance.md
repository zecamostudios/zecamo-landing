# 05 — Compliance Legal (Zecamo)

> Proyecto: zecamo-landing
> Responsable: Zecamo Studios — Tucumán, Argentina
> CUIT: TODO: Completar con CUIT real
> Email legal: hola@zecamostudios.com
> Última actualización: 2026-05-23

---

## Marco Legal Aplicable

- [x] **Argentina:** Ley 25.326 de Protección de Datos Personales
- [x] **Unión Europea:** RGPD/GDPR — aplicable porque el sitio puede recibir leads de Europa
- [ ] España (LOPDGDD): por determinar si se apunta específicamente al mercado español
- [ ] California (CCPA): por determinar
- [ ] Brasil (LGPD): por determinar

---

## Datos Personales Recolectados

| Categoría | Datos específicos | Finalidad | Base legal | Plazo de conservación |
|-----------|-------------------|-----------|-----------|------------------------|
| Contacto | Nombre, email | Responder consultas B2B | Consentimiento | Hasta revocación o 3 años |
| Empresa | Nombre de empresa | Cualificar lead | Consentimiento | Hasta revocación o 3 años |
| Mensaje | Texto libre del mensaje | Entender la consulta | Consentimiento | Hasta revocación o 3 años |
| Técnico | IP, User Agent | Seguridad y prevención de spam | Interés legítimo | 90 días |

---

## Documentos Legales

| Documento | Archivo fuente | URL pública | Estado |
|-----------|---------------|-------------|--------|
| Política de Privacidad | `legal/privacy-policy.md` | `/privacy` | [ ] Pendiente de implementar |
| Términos y Condiciones | `legal/terms-of-service.md` | `/terms` | [ ] Pendiente de implementar |
| Política de Cookies | `legal/cookies-policy.md` | `/cookies` | [ ] Pendiente de implementar |
| Aviso de Copyright | `legal/copyright-notice.md` | (footer) | [ ] Pendiente de implementar |
| Tratamiento de Datos | `legal/data-processing.md` | (interno) | [x] Creado |

---

## Mecanismos a Implementar (Fase 3-4)

### Consentimiento
- [ ] Checkbox de consentimiento explícito en el formulario de contacto
- [ ] Link a `/privacy` en el texto del checkbox
- [ ] Registro del consentimiento en la tabla `leads` (timestamp + confirmación)

### Ejercicio de Derechos
- [ ] Email visible: hola@zecamostudios.com
- [ ] Procedimiento documentado: responder en 10 días (AR) / 30 días (UE)

### Seguridad de Datos
- [ ] HTTPS (automático en Vercel)
- [ ] RLS en Supabase (configurado en migración inicial)
- [ ] Logs sin datos sensibles
- [ ] Backups de Supabase habilitados

---

## Encargados de Tratamiento (Terceros)

| Proveedor | Servicio | Datos que reciben | Ubicación | DPA |
|-----------|----------|-------------------|-----------|-----|
| Vercel | Hosting | Todos los datos en tránsito | EE.UU. / Edge | Sí (ToS) |
| Supabase | Base de datos | Datos de leads | EE.UU. (AWS) | Sí |
| Resend | Email transaccional | Email del lead (para notificar a Joaco) | EE.UU. | Sí |

---

## Pendientes (TODO para Joaco)

- [ ] Completar CUIT real en todos los documentos de `legal/` y `.env.example`
- [ ] Verificar dominio hola@zecamostudios.com cuando esté activo
- [ ] Implementar páginas `/privacy`, `/terms`, `/cookies` (Fase 4)
- [ ] Agregar checkbox de consentimiento al formulario (Fase 3)
- [ ] Considerar si aplica registro en AAIP (Ley 25.326, art. 21)

---

## Histórico de Revisiones

| Fecha | Cambio | Por |
|-------|--------|-----|
| 2026-05-23 | Documento creado por Método Zecamo | Joaco |

---

*Debe ser revisado por un asesor legal antes del go-live en producción.*
