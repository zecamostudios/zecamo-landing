# Feature: Servicios

> Estado: ✅ Implementado (Fase B — 2026-05-23)
> Componente: `src/components/sections/Services.tsx`
> Modal: `src/components/sections/ServiceModal.tsx`

---

## Estructura actual (5 servicios)

| Tag | ID | Título | Icon | Tipo |
|-----|----|--------|------|------|
| 00 | `diagnostico` | Diagnóstico Zecamo | `Compass` | **Featured (full-width)** |
| 01 | `automatizacion` | Automatización con IA | `Workflow` | Regular |
| 02 | `vibe` | Vibe Coding | `Code2` | Regular |
| 03 | `agentes` | Agentes IA B2B | `BotMessageSquare` | Regular |
| 04 | `consultoria` | Consultoría IA | `Lightbulb` | Regular |

## Layout

```
[FeaturedServiceCard — Diagnóstico — full-width]
[ServiceCard — Automatización] [ServiceCard — Vibe Coding]
[ServiceCard — Agentes IA]    [ServiceCard — Consultoría]
```

- Grid regular: `grid-cols-1 sm:grid-cols-2`
- FeaturedServiceCard: fuera del grid, siempre full-width

## Eyebrow / Título

- Eyebrow: "Servicios · 05"
- Título: "Primero, ordenamos. Después, ejecutamos."
- Kicker: "Cinco servicios, una sola lógica: antes de correr, caminar."

## Eventos globales

- **Emite** `zcm:select-service {id, title}` cuando el usuario hace click en CTA del modal
  → escuchado por `Contact.tsx` para preseleccionar el servicio y prerellenar el mensaje
- **Escucha** `zcm:open-service {id}` para abrir el modal del servicio correspondiente
  → usado por `HowWeWork.tsx` (CTA "Empezá por el Diagnóstico")

## ServiceModal — campos del interface ServiceData

```ts
interface ServiceData {
  id: string;
  Icon: LucideIcon;
  tag: string;
  title: string;
  desc: string;
  chips: string[];
  featured?: boolean;
  modal: {
    subtitle: string;
    howItWorks: string[];
    benefits: string[];
    useCases: string[];   // mostrado como "Qué incluye"
    stack: string[];
    tiers?: { name: string; desc: string }[];   // solo Diagnóstico
    bonification?: string;                       // solo Diagnóstico
    ctaLabel?: string;                           // override del botón CTA
  };
}
```

## Ver también

- `docs/features/diagnostico-service.md` — spec completa del servicio Diagnóstico
- `docs/features/how-we-work.md` — sección HowWeWork que enlaza con servicios
- `docs/features/contact-form.md` — integración ServiceModal → Contact
