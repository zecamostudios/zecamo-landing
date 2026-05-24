# Reporte Lighthouse / Accesibilidad

> Fecha: 2026-05-23
> Tipo: Auditoría manual de código — sin fixes aplicados (pendiente aprobación)
> Metodología: Revisión de source code contra WCAG 2.1 AA + Lighthouse best practices

---

## Resumen ejecutivo

La base es sólida. El sitio tiene `lang="es"` en `<html>`, `<main>` landmark, todos los icon-only buttons tienen `aria-label`, y el contraste del color `--color-muted` (`#93A4D1`) sobre `--color-bg` (`#0A0F1F`) es ≈ 8.3:1 (pasa AA y AAA). Los issues encontrados son de prioridad media-baja.

---

## Issues encontrados

### 🔴 Alta prioridad

#### 1. Footer — `href="#"` en links de redes sociales deshabilitados
- **Archivo**: `src/components/layout/Footer.tsx`
- **Descripción**: Cuando las URLs de redes sociales son `"#"` (no configuradas), los links se renderizan con `href="#"`. Al hacer click navegan al top de la página (comportamiento no intencional). El estilo `cursor-not-allowed` no es suficiente — los screen readers los anuncian como links activos.
- **Fix sugerido**: Usar `href={url === "#" ? undefined : url}` y `aria-disabled="true"` cuando no está configurado. O bien `<span>` en lugar de `<a>` cuando está deshabilitado.
- **WCAG**: 4.1.2 Name, Role, Value

#### 2. Modal — Sin focus trap ni focus inicial
- **Archivo**: `src/components/ui/Modal.tsx`
- **Descripción**: Cuando el modal abre, el foco no se mueve al modal ni a su primer elemento focusable. Los usuarios de teclado (Tab) y screen readers no reciben señal de que hay contenido nuevo. ESC para cerrar sí está implementado (OK).
- **Fix sugerido**: Al abrir, hacer `ref.current.focus()` en el contenedor del modal (con `tabIndex={-1}`). Al cerrar, retornar el foco al elemento que abrió el modal.
- **WCAG**: 2.4.3 Focus Order, 2.1.2 No Keyboard Trap

### 🟡 Media prioridad

#### 3. Contraste borderline en texto decorativo pequeño con opacidad
- **Archivos**: múltiples secciones
- **Descripción**: Varias etiquetas usan `text-muted/70` (opacity 70% sobre `#93A4D1`). El color efectivo resultante (`≈ #6A7799`) sobre el fondo `#0A0F1F` tiene contraste ≈ 4.6:1, que pasa AA (4.5:1 requerido) pero por margen mínimo. Para texto de 11px sin bold, Lighthouse puede flaggearlo.
- **Contexto**: Afecta eyebrows tipo "Casos · ZCM-04" (11px uppercase tracking) y "Caso 01" labels en ProjectCard.
- **Fix sugerido**: Subir a `text-muted/80` o `text-muted` en los elementos de 11px más críticos.

#### 4. Ping animation sin `aria-hidden`
- **Archivos**: `src/components/sections/Hero.tsx`, `src/components/sections/Cases.tsx`
- **Descripción**: El span con `animate-ping` dentro del status indicator es puramente decorativo pero no tiene `aria-hidden="true"`. Screen readers pueden anunciarlo como un elemento.
- **Fix sugerido**: Agregar `aria-hidden` al span exterior del status dot (`<span className="relative flex h-2 w-2">`).
- **WCAG**: 1.3.1 Info and Relationships (minor)

#### 5. Modal backdrop div sin role/keyboard
- **Archivo**: `src/components/ui/Modal.tsx`
- **Descripción**: El backdrop tiene `onClick={onClose}` pero no tiene `role` ni `onKeyDown`. Sin embargo, el ESC global en `window` sí maneja el cierre por teclado, así que el impacto real es bajo.
- **Fix sugerido**: Agregar `aria-hidden="true"` al backdrop (es visual, no tiene significado semántico).

### 🟢 Baja prioridad / Info

#### 6. `<title>` duplicado potencial en `<head>`
- **Archivo**: `src/app/layout.tsx`
- **Descripción**: El `metadata.title.template` usa `%s | Zecamo Studios`. Si alguna subpágina usa el `title` default completo, puede resultar en "Zecamo Studios — IA que trabaja. Resultados que se miden. | Zecamo Studios". La home page actualmente usa `default` (sin template), lo que está bien.
- **Estado**: No es un bug activo, solo precaución para futuras páginas.

#### 7. Imágenes de casos sin WebP
- **Archivos**: `public/cases/finca-cajal.png` (1.1MB), `public/cases/suplementos.png` (0.9MB)
- **Descripción**: Lighthouse penaliza PNG de alto peso. Conversión a WebP ahorraría ~60-70% de peso.
- **Fix sugerido**: Convertir a WebP (o dejar que Next.js Image optimization sirva WebP automáticamente — ya está habilitado por defecto en producción).
- **Nota**: La `CaseImageBare` ya tiene `quality={85}` y `sizes` correctos. En producción, Next.js Image servirá WebP automáticamente. El issue solo aplica si se sirven las imágenes directamente (sin Next.js Image).

---

## Lo que está bien ✅

| Check | Estado |
|-------|--------|
| `<html lang="es">` | ✓ |
| `<main>` landmark en home y legales | ✓ |
| Todos los icon-only buttons con `aria-label` | ✓ (Menú, Cerrar, Anterior, Siguiente, Ir al N) |
| Contraste `text-muted` (#93A4D1) vs bg | ✓ 8.3:1 (pasa AAA) |
| Contraste `text-ink` (#FFFFFF) vs bg | ✓ 21:1 |
| Nav links con texto descriptivo | ✓ |
| ProjectCard y ServiceCard con `role="button"` + `tabIndex={0}` + `onKeyDown` Enter/Space | ✓ |
| ESC para cerrar modal | ✓ |
| `aria-modal="true"` + `aria-label` en modal | ✓ |
| Alt descriptivos en imágenes de contenido | ✓ |
| Alt vacío (`alt=""`) en imágenes decorativas (ZWatermark, logos decorativos) | ✓ |
| StickyContactCTA con `aria-label` | ✓ |
| `<form>` elements con labels (Contact) | Por verificar |
| Skip-to-content link | ✗ No implementado (nice-to-have) |

---

## Acción requerida

Para proceder con los fixes, necesito aprobación en:

1. **Fix #1** (Footer href="#") — cambio de comportamiento de links
2. **Fix #2** (Modal focus trap) — cambio de UX, puede afectar animaciones existentes
3. **Fix #3** (contraste /70) — cambio visual en eyebrows y labels

Los fixes #4 y #5 son triviales (1 línea cada uno) y pueden incluirse sin riesgo si se aprueba.

---

*Auditoría manual de código. Para validación completa, ejecutar Lighthouse en Chrome DevTools sobre build de producción (`npm run build && npm start`).*
