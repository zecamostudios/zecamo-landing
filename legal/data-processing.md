# Aviso de Tratamiento de Datos Personales

**Cliente/Responsable:** Zecamo Studios
**CUIT:** TODO: Completar con CUIT real
**Última actualización:** 23 de mayo de 2026

---

## Registro Nacional de Bases de Datos Personales (Argentina)

> Zecamo Studios recolecta datos personales de manera sistemática a través del formulario de contacto. Según la **Ley 25.326**, debe inscribir su base de datos en el Registro Nacional de Bases de Datos Personales de la AAIP.

**Estado del registro:** Pendiente de inscripción
**Número de inscripción:** Pendiente

Más info: [argentina.gob.ar/aaip/datospersonales](https://www.argentina.gob.ar/aaip/datospersonales)

---

## Registro de Tratamientos (GDPR Art. 30)

| Categoría | Detalle |
|-----------|---------|
| **Responsable** | Zecamo Studios |
| **Contacto** | hola@zecamostudios.com |
| **DPO** | No aplica (empresa pequeña) |
| **Finalidades** | Recepción y gestión de leads B2B, comunicación comercial |
| **Categorías de interesados** | Prospectos y clientes potenciales (empresas B2B) |
| **Categorías de datos** | Nombre, email, empresa, mensaje, IP, User Agent |
| **Destinatarios** | Supabase (DB), Resend (email), Vercel (hosting) |
| **Transferencias internacionales** | EE.UU. (Supabase/AWS, Resend, Vercel) bajo Cláusulas Contractuales Tipo |
| **Plazos de conservación** | 3 años para contacto; 90 días para datos técnicos |
| **Medidas técnicas** | HTTPS, RLS en Supabase, control de acceso por rol |

---

## Encargados de Tratamiento

| Proveedor | Servicio | Datos | Ubicación | DPA |
|-----------|----------|-------|-----------|-----|
| Vercel | Hosting | En tránsito | EE.UU. / Edge | Sí (ToS) |
| Supabase | Base de datos | Todos los datos del form | EE.UU. (AWS) | Sí |
| Resend | Email transaccional | Email del contacto (notificación interna) | EE.UU. | Sí |

---

## Medidas de Seguridad

### Técnicas
- HTTPS/TLS obligatorio
- Row Level Security (RLS) en Supabase
- Acceso por roles (service_role solo en servidor)
- Backups automáticos de Supabase
- Rate limiting en el endpoint del formulario

### Organizativas
- Acceso a datos restringido al equipo Zecamo
- Variables de entorno seguras (no commiteadas)

---

## Derechos ARCO / GDPR

Los titulares de datos pueden ejercer sus derechos enviando un email a **hola@zecamostudios.com** con asunto "Ejercicio de derechos – Datos".

**Plazos:**
- Argentina (Ley 25.326): 10 días corridos para acceso, 5 días para rectificación
- UE (GDPR): 30 días, prorrogables 60 en casos complejos

---

## Pendientes

- [ ] TODO: Completar CUIT cuando esté disponible
- [ ] Inscribir base de datos en AAIP antes del go-live (art. 21, Ley 25.326)
- [ ] Revisar con asesor legal si aplica DPO formal

---

*Documento interno generado siguiendo el Método Zecamo. Revisar con asesor legal antes del go-live.*
