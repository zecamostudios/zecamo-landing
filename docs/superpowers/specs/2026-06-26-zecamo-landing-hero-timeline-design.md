# Rediseño Landing Zecamo — Hero 3D + Timeline "Un día en tu negocio"

**Fecha:** 2026-06-26
**Proyecto:** `zecamo-landing` (Next.js 15 App Router · Tailwind v4 · framer-motion · tema dark navy)
**Inspiración:** minificando.ai (superarlo, no copiarlo)

---

## 1. Objetivo

Rediseñar la landing alrededor del ángulo **"vendé el resultado, no la herramienta"**. Dos piezas nuevas de alto impacto (Hero con dashboard flotante 3D + Timeline serpenteante animado) y **condensar** el resto de la página, que hoy tiene demasiada info.

## 2. Alcance (quirúrgico + condensado)

Flujo final de la página (`src/app/page.tsx`):

| # | Sección | Acción |
|---|---------|--------|
| 1 | **Hero + Dashboard** | REDISEÑADO (nuevo) |
| 2 | **Timeline "Un día en tu negocio"** | NUEVO componente |
| 3 | **Services** | CONDENSADO (de 7 cards de texto → 4-5 chips/íconos cortos) |
| 4 | **Cases** | CONDENSADO (logos + 1-2 casos, sin párrafos largos) |
| 5 | **Contact → WhatsApp** | SIMPLIFICADO (botón a wa.me, sin formulario) |
| — | **HowWeWork + ForWho** | ELIMINADOS de `page.tsx` (componentes quedan en repo por si se reusan) |

Fuera de alcance: tocar Supabase/Resend (el form queda en el código pero desconectado del flujo), legales, navbar/footer salvo ajustar anchors del menú a las secciones que quedan.

## 3. Sección 1 — Hero (forma B: dashboard flotante 3D)

**Layout:** split 2 columnas en desktop, apilado en mobile.
- **Izquierda:** eyebrow ("SISTEMAS A MEDIDA CON IA"), headline display grande, subhead corto, 2 CTAs (primario → WhatsApp, ghost → "Ver cómo funciona" scroll al Timeline), tira de prueba social (logos + "+N negocios ya trabajan así").
- **Derecha:** mockup de **dashboard demo** con `transform: perspective(800px) rotateY(-16deg) rotateX(6deg)`, sombra proyectada + glow azul. Badge flotante "+12% ▲".

**Dashboard demo (inventado, full chiches):**
- Sidebar: logo "Mi Negocio" + items (Analytics ✦activo, Chatbot, Pipeline, Clientes, Stock).
- Header: "Dashboard analítico · Junio 2026".
- 4 KPIs: Ingresos del mes `$1.840.000` (+12%), Clientes nuevos `47` (+8%), Pedidos activos `23` (-3%), Conversión `68%` (+5%).
- Gráfico de línea (ingresos anuales, tendencia ascendente) + dona "Origen de ventas" (Directo 42% / Orgánico 29% / Referidos 18% / Otros 11%).
- Micro-detalle abajo: "Reporte enviado · hoy 8:02 am".

**Animaciones (framer-motion + CSS):**
- Entrada del dashboard: fade + slide + el `rotateY` se asienta desde -22° → -16°.
- KPIs cuentan desde 0 (count-up) al entrar en viewport.
- La línea del gráfico se dibuja (stroke-dashoffset).
- Glow sutil que respira. Respeta `prefers-reduced-motion`.

**Copy propuesto (Joaco ajusta después):**
- Headline: **"Todo tu negocio, en una sola pantalla."**
- Subhead: "Dejá de saltar entre planillas, WhatsApp y mil pestañas. Centralizamos tu info y la devolvemos clara, ordenada y en tiempo real."
- CTA primario: "Hablá con nosotros" · CTA ghost: "Ver cómo funciona"

## 4. Sección 2 — Timeline "Un día en tu negocio" (forma A viva)

**Concepto:** camino **serpenteante** vertical que conecta paradas del día del dueño, alternando lados (zigzag con curvas, NO línea recta).

**Estructura por parada (5 paradas):** hora + título emocional del dueño (un lado) ↔ chip de lo que el sistema hizo solo (lado opuesto). Alternan.

| Hora | Vos (sentís) | El sistema (hizo solo) |
|------|--------------|------------------------|
| 8:00 | Tomás el primer café ☕ | El reporte de ayer ya está listo |
| 11:30 | Atendés a un cliente 🤝 | La IA contestó 8 consultas por WhatsApp |
| 14:00 | Almorzás tranquilo 🍝 | El stock se actualizó solo con cada venta |
| 18:00 | Cerrás el local 🔒 | Las facturas del día ya se emitieron |
| 22:00 | Cenás con tu familia 🌙 | Tu negocio funciona sin vos. Descansás. |

**Animación (la clave):**
- SVG con `<path>` curvo serpenteante. Dos paths superpuestos: base tenue + "lit" azul con glow.
- El path "lit" se **dibuja al scrollear** (stroke-dashoffset atado al scroll progress vía framer-motion `useScroll`/`useTransform`).
- Un **nodo cometa** viaja por el path siguiendo el scroll.
- Cada **nodo de parada se enciende** (escala + glow) cuando el cometa lo pasa.
- Cards entran con fade/slide desde su costado.
- Mobile: el zigzag se colapsa a una columna con línea a la izquierda; cards stack. Respeta `prefers-reduced-motion` (path aparece estático).
- Cierre: CTA "Quiero días así" → WhatsApp.

**Título sección:** eyebrow "UN DÍA EN TU NEGOCIO" + headline "Así se siente tenerlo todo resuelto." + subhead "No te mostramos el sistema funcionando. Te mostramos tu día, mientras el sistema trabaja por detrás."

## 5. Sección 3 — Services (condensado)

Reducir el componente actual a una grilla de **4-5 chips** con ícono (lucide) + label corto + 1 línea. Sin modales largos. Ejemplos: Sistemas a medida · Chatbots con IA · Automatizaciones · Dashboards/Analytics · Migración de Excel.

## 6. Sección 4 — Cases (condensado)

Banda de **logos de clientes** + 1-2 casos destacados en card compacta (cliente, una métrica/resultado, tag). Sin testimonios de párrafo largo (o máx. 1 frase).

## 7. Sección 5 — Contact (WhatsApp directo)

Reemplaza el formulario por un bloque CTA centrado:
- Headline: "¿Hablamos?" / "Contanos qué necesitás."
- Botón grande → `https://wa.me/5493814405615` (target _blank, rel noopener).
- Microcopy: "Te respondemos por WhatsApp." + 3 chips (Respuesta rápida · Sin compromiso · Asesoría real).
- El componente `Contact.tsx` actual con Supabase/Resend se conserva en el repo pero se saca de `page.tsx`.

**Número:** local `3814405615` → internacional WhatsApp `5493814405615`. Definir como constante reutilizable (ej. `src/lib/constants.ts → WHATSAPP_URL`).

## 8. Componentes (boundaries)

- `Hero.tsx` — reescrito. Sub-piezas: `DashboardMock.tsx` (el mockup 3D, aislado y testeable visualmente).
- `Timeline.tsx` — nuevo. Sub-pieza opcional: `TimelinePath.tsx` (el SVG animado) para mantener el archivo enfocado.
- `Services.tsx` — simplificado.
- `Cases.tsx` — simplificado.
- `Contact.tsx` — nuevo bloque WhatsApp (renombrar copia previa a `ContactForm.tsx` si se quiere preservar).
- `src/lib/constants.ts` — `WHATSAPP_URL`, datos demo del dashboard.

## 9. No-objetivos / riesgos

- No romper el build de Vercel (ESLint ya está desactivado en build — mantener).
- Performance: animaciones SVG/scroll deben ir con `will-change` acotado y `prefers-reduced-motion`.
- Mantener todo desde tokens de `variables.css` (sin valores hardcodeados).
- El número de WhatsApp y las cifras del demo son **provisorios** — Joaco confirma después.

## 10. Criterio de éxito

- La landing carga, se ve premium (dark + glow), y en < 5s comunica "tu negocio funciona solo".
- Hero con dashboard 3D animado funcionando en desktop y mobile.
- Timeline con camino que se dibuja al scrollear + cometa + nodos que encienden.
- Resto condensado y legible de un vistazo.
- Botón de contacto abre WhatsApp al número correcto.
- Build pasa y deploya en Vercel.
