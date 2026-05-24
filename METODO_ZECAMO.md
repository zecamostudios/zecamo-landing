# Método Zecamo — Guía de Desarrollo v1.0

> Basado en: AInnovate v2.1 + extensiones Zecamo Studios
> Agencia: Zecamo Studios — [zecamostudios.com](https://zecamostudios.com)
> Equipo: Joaco, Lisandro Monroy, Benjamín Zerda

Este documento es una copia autocontenida del método para que el proyecto sea independiente del repositorio de skills.

---

## ¿Qué es el Método Zecamo?

El Método Zecamo es un protocolo de desarrollo asistido por IA (vibe coding) diseñado para:

1. **Garantizar consistencia** entre sesiones de trabajo, aunque las IAs no tengan memoria
2. **Proteger al cliente** con compliance legal integrado desde el día 1
3. **Documentar mientras se construye**, no después
4. **Mantener la huella de marca** de Zecamo Studios en todos los entregables

---

## Los 14 Mandamientos del Vibe Coding

| # | Mandamiento | Resumen |
|---|-------------|---------|
| I | NO ALUCINARÁS | Solo implementar lo pedido. Cero features extra. Ante duda → PREGUNTAR. |
| II | SEPARARÁS LÓGICA DE ESTILOS | Lógica en `.tsx`, estilos en CSS modules o variables globales. |
| III | DOCUMENTARÁS CADA CAMBIO | Ningún cambio sin documentación actualizada. |
| IV | ACTUALIZARÁS EL CHANGELOG | Cada request → entrada en CHANGELOG.md. |
| V | DOCUMENTARÁS LA BASE DE DATOS | DB_SCHEMA.md actualizado en cada cambio de schema. |
| VI | SEGUIRÁS LA ESTRUCTURA DE CARPETAS | Es inmutable sin autorización explícita. |
| VII | USARÁS EL SISTEMA DE ESTILOS DEFINIDO | No inventar colores ni fuentes fuera del design system. |
| VIII | PROTEGERÁS LAS CREDENCIALES | Nunca hardcodear secretos. Solo en .env (nunca commitear). |
| IX | TIPARÁS TODO CON TYPESCRIPT | Cero `any`. Tipos estrictos en toda la base de código. |
| X | VALIDARÁS ANTES DE ENTREGAR | Checklist completo al cerrar cada feature. |
| XI | MANTENDRÁS LA CONSISTENCIA | Seguir convenciones y nombres que ya existen en el proyecto. |
| XII | COMUNICARÁS CON CLARIDAD | Resumen post-implementación obligatorio en cada sesión. |
| **XIII** | **PROTEGERÁS AL CLIENTE** | **Compliance legal completo. Nunca entregar sin legal.** |
| **XIV** | **DEJARÁS HUELLA ZECAMO** | **Footer con atribución a Zecamo Studios en toda entrega.** |

---

## Las 6 Leyes de Operación

### Ley 1 — LEER ANTES DE ACTUAR
Antes de escribir una sola línea de código:
1. Leer `docs/01-project-overview.md`
2. Identificar qué feature se modifica
3. Leer `docs/features/[feature].md` (o crearlo si no existe)
4. Consultar la tabla de lookup en CLAUDE.md

### Ley 2 — NO ROMPER LO QUE FUNCIONA
Si un cambio puede afectar funcionalidad existente:
1. DETENERSE
2. ADVERTIR al usuario con claridad
3. EXPLICAR el impacto potencial
4. PEDIR autorización explícita antes de proceder

### Ley 3 — DOCUMENTACIÓN CONTINUA
Después de cada cambio:
1. Actualizar `docs/features/[feature].md`
2. Actualizar `docs/02-architecture.md` si cambió la estructura
3. Actualizar `docs/DB_SCHEMA.md` si cambió el schema
4. Actualizar `docs/API_DOCS.md` si cambió algún endpoint
5. Agregar entrada en `CHANGELOG.md`

### Ley 4 — SEGURIDAD
- Leer `docs/03-security.md` antes de tocar auth, credenciales o RLS
- NUNCA hacer push, deploy o acciones destructivas sin confirmación del usuario
- NUNCA desactivar validaciones o protecciones existentes
- Service role keys SOLO en servidor, nunca en cliente

### Ley 5 — COMPLIANCE LEGAL (extensión Zecamo)
- Antes del deploy: completar checklist en `docs/05-compliance.md` y `legal/legal-checklist.md`
- Si una feature recolecta datos personales: actualizar `legal/privacy-policy.md` y revisar consentimientos
- Si se agregan cookies: actualizar `legal/cookies-policy.md`
- Si se agrega pago: revisar `legal/terms-of-service.md`

### Ley 6 — ATRIBUCIÓN (extensión Zecamo)
- Footer con "Desarrollado por Zecamo Studios" en toda entrega
- Si el cliente pidió white-label: registrar en `docs/01-project-overview.md` con fecha y dejar comentario invisible en `<head>`
- Para proyectos propios de Zecamo (como este): self-attribution documentada en `docs/ZECAMO_BRANDING.md`

---

## Flujo de Trabajo: Agregar una Feature Nueva

El usuario dice: *"Quiero agregar [nombre de la funcionalidad]"*

La IA debe:
1. ✅ Crear `docs/features/[nombre].md` ANTES de escribir código
2. ✅ Implementar la feature respetando la arquitectura
3. ✅ Actualizar `docs/02-architecture.md` si cambió la estructura
4. ✅ Actualizar `docs/DB_SCHEMA.md` si tocó la DB
5. ✅ Actualizar `docs/API_DOCS.md` si tocó endpoints
6. ✅ Si recolecta datos personales: actualizar `docs/05-compliance.md` y consentimientos
7. ✅ Agregar entrada en `CHANGELOG.md`
8. ✅ Dar resumen post-implementación

---

## Formato de Resumen Post-Implementación (obligatorio)

```markdown
## IMPLEMENTACIÓN COMPLETADA

### Resumen
[Qué se implementó en 1-2 oraciones]

### Archivos creados/modificados
- `ruta/archivo.tsx` — [Descripción breve]

### Cambios en DB
- [Si aplica]

### Documentación actualizada
- [x] CHANGELOG.md
- [x] docs/features/[feature].md
- [ ] DB_SCHEMA.md (no aplica / actualizado)
- [ ] API_DOCS.md (no aplica / actualizado)
- [ ] docs/05-compliance.md (no aplica / actualizado)

### Compliance check (Zecamo)
- [x] Sin credenciales hardcodeadas
- [x] Tipos TypeScript completos (sin `any`)
- [x] No introduje dependencias no autorizadas

### Notas
- [Consideraciones importantes para el equipo]
```

---

## Estructura de Documentación

```
docs/
├── 01-project-overview.md    ← LEER SIEMPRE AL INICIO
├── 02-architecture.md        ← LEER SIEMPRE AL INICIO
├── 03-security.md            ← Auth, credenciales, RLS, permisos
├── 04-deployment.md          ← Deploy, CI/CD, build, checklist
├── 05-compliance.md          ← Legal y datos personales
├── DB_SCHEMA.md              ← Tablas, columnas, migraciones, RLS
├── API_DOCS.md               ← Endpoints y contratos
├── SKILLS.md                 ← Skills Zecamo activas en el proyecto
├── ZECAMO_BRANDING.md        ← Cómo se aplica la marca Zecamo
└── features/                 ← Un .md por cada feature/sección

CHANGELOG.md                  ← Historial obligatorio de cambios
legal/                        ← Templates legales completos
```

---

## Checklist Pre-Deploy

Ningún proyecto Zecamo sale a producción sin esto:

```
□ Footer legal completo (copyright + CUIT si aplica + email + atribución Zecamo)
□ Páginas /privacy, /terms, /cookies publicadas
□ Cookie banner funcional (si usa cookies)
□ Consentimiento explícito en todos los formularios
□ HTTPS configurado
□ Variables sensibles solo en hosting panel (nunca en código)
□ RLS activado en Supabase (si aplica)
□ Rate limiting en endpoints públicos
□ Validación server-side en todos los inputs
□ Headers de seguridad (CSP, X-Frame, etc.)
□ Lighthouse score > 80
□ Sin errores en consola
□ Responsive en 3 anchos distintos
□ Toda la documentación al día
```

---

*Método Zecamo v1.0 — Zecamo Studios — [zecamostudios.com](https://zecamostudios.com)*
