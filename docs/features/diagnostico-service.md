# Feature: Diagnóstico Zecamo

> Estado: ✅ Implementado (Fase B — 2026-05-23)
> Componente principal: `src/components/sections/Services.tsx`
> Modal: `src/components/sections/ServiceModal.tsx`
> ID de servicio: `diagnostico`

---

## Qué es

Servicio featured (tag "00") que actúa como puerta de entrada al método Zecamo. Es el paso previo
a cualquier implementación: un diagnóstico de procesos, automatización e IA + auditoría de
seguridad básica. El resultado es un roadmap de 90 días accionable.

## Posicionamiento

- **Lógica de continuidad**: si el cliente avanza con implementación en 30 días, el 100% del
  diagnóstico se bonifica (no es un descuento, es una decisión de continuidad)
- Siempre es el primer servicio visible — en la sección Servicios (featured card), en el
  formulario de contacto (primera opción), y en la sección HowWeWork (CTA principal)

## Datos del servicio

```ts
{
  id: "diagnostico",
  tag: "00",
  featured: true,
  Icon: Compass,
  title: "Diagnóstico Zecamo",
  desc: "Antes de automatizar, ordenamos. Analizamos tu negocio...",
  chips: ["Auditoría de procesos", "Roadmap 90 días", "Gratis si continuás"],
  modal: {
    tiers: [
      { name: "Diagnóstico Express", desc: "..." },
      { name: "Diagnóstico Premium", desc: "..." },
    ],
    bonification: "Si avanzás con la implementación dentro de los 30 días del diagnóstico...",
    ctaLabel: "Hablemos del Diagnóstico",
    stack: ["Make", "n8n", "LangChain", "Claude AI", "Gemini", "GPT-4o", "OWASP", "Supabase", "Notion"],
  }
}
```

## Componente: FeaturedServiceCard

Componente exclusivo para este servicio. Diferencias respecto a `ServiceCard`:

| Aspecto | ServiceCard regular | FeaturedServiceCard |
|---------|---------------------|---------------------|
| Layout | Vertical, en grid 2×2 | Horizontal, full-width |
| Icono | 56×56 | 80×80 (desktop: 112×112) |
| Badge | Tag número | "Empezamos acá · 00" |
| Border | `rgba(43,91,255,.25)` base | `rgba(43,91,255,.4)` base |
| Posición | Debajo del featured | Arriba del grid |

## Integración con otras secciones

| Sección | Comportamiento |
|---------|----------------|
| HowWeWork | CTA "Empezá por el Diagnóstico" → `zcm:open-service {id:"diagnostico"}` + scroll a `#servicios` |
| Contact | Primera opción del ServiceRadio, con styling featured y placeholder especial |
| ServiceModal (Diagnóstico) | CTA "Hablemos del Diagnóstico" → `zcm:select-service {id:"diagnostico"}` → scroll a `#contacto` |

## Flujo de conversión

```
HowWeWork CTA / FeaturedServiceCard click
  → ServiceModal abre (Diagnóstico)
  → "Hablemos del Diagnóstico"
  → Modal cierra
  → Scroll a #contacto
  → Diagnóstico pre-seleccionado + mensaje pre-rellenado
  → Lead generado
```
