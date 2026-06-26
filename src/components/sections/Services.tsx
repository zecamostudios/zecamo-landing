"use client";
import { useEffect, useState, KeyboardEvent } from "react";
import {
  Workflow, Code2, BotMessageSquare, Compass,
  LayoutDashboard, Share2, BarChart3,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Mesh from "@/components/ui/Mesh";
import SectionTitle from "@/components/ui/SectionTitle";
import ServiceModal, { type ServiceData } from "./ServiceModal";

export const SERVICES: ServiceData[] = [
  {
    id: "diagnostico",
    Icon: Compass,
    tag: "00",
    title: "Diagnóstico Zecamo",
    desc: "Mapeamos tu negocio, encontramos oportunidades reales de IA, evaluamos riesgos y te entregamos un roadmap accionable de 90 días. Antes de automatizar, ordenamos.",
    chips: ["Sabés dónde estás parado", "Plan claro de 90 días", "Bonificable 100%"],
    featured: true,
    modal: {
      subtitle: "Por dónde empezamos. Antes de automatizar, ordenamos.",
      ctaLabel: "Hablemos del Diagnóstico",
      howItWorks: [
        "El error más común en proyectos de IA: implementar sin entender el proceso. Eso genera automatizaciones inútiles, dependencias, riesgos y dinero mal invertido.",
        "Nuestro Diagnóstico arranca al revés: primero analizamos las áreas clave de tu negocio (marketing, ventas, atención al cliente, administración), dibujamos cómo funcionan hoy tus procesos, detectamos dónde la IA y la automatización meten diferencia real, revisamos los riesgos de seguridad, y te entregamos un plan claro y accionable. Recién después, si te conviene, implementamos.",
      ],
      benefits: [
        "Entendés tu empresa mejor que antes",
        "Sabés qué procesos están mal y cuáles funcionan",
        "Ves oportunidades reales (no humo de IA)",
        "Conocés los riesgos antes de asumirlos",
        "Roadmap accionable de 90 días en manos",
        "Aunque no contrates implementación, el diagnóstico tiene valor",
      ],
      useCases: [
        "Auditoría de las áreas críticas de tu negocio",
        "Dibujo claro de cómo funcionan hoy tus procesos",
        "Detección de oportunidades de optimización + IA",
        "Análisis del stack tecnológico actual",
        "Revisión de riesgos de ciberseguridad",
        "Roadmap de implementación por fases priorizadas",
        "Entregable en Notion + llamada de presentación",
      ],
      tiers: [
        {
          name: "Express",
          desc: "Para negocios chicos locales (1–5 empleados). 1 semana, enfocado en 1–2 áreas críticas.",
        },
        {
          name: "Premium",
          desc: "Para PyMEs y empresas (10+ empleados). 3–4 semanas, cubre las 4 áreas + ciberseguridad profunda.",
        },
      ],
      bonification:
        "Si avanzás con la implementación en los próximos 30 días, el 100% del diagnóstico se descuenta de la inversión total. El diagnóstico deja de ser un gasto y pasa a ser parte del proyecto.",
      stack: ["BPMN · Miro", "Notion", "Auditoría 4 áreas", "Ciberseguridad", "Roadmap"],
    },
  },
  {
    id: "automatizacion",
    Icon: Workflow,
    tag: "01",
    title: "Automatización con IA",
    desc: "Las tareas repetitivas que te comen el día pasan a hacerse solas. Tu equipo recupera tiempo para lo que de verdad mueve la aguja.",
    chips: ["Ahorrá +40h al mes", "Cero errores manuales", "Funciona 24/7"],
    modal: {
      subtitle: "Convertimos tareas repetitivas en workflows que se ejecutan solos.",
      howItWorks: [
        "Identificamos los procesos manuales que más tiempo te consumen —envío de emails, carga de datos, seguimiento de leads, notificaciones, reportes— y los convertimos en flujos automáticos que conectan todas tus herramientas. Tu equipo deja de copiar y pegar entre apps y empieza a enfocarse en lo que realmente mueve el negocio.",
        "Conectamos las herramientas que ya usás para que la información fluya sola, sin costos ocultos por cada proceso. Y sumamos inteligencia artificial cuando hace falta decidir, clasificar o redactar algo automáticamente.",
      ],
      benefits: [
        "Ahorrá entre 20 y 60 horas mensuales por equipo",
        "Eliminá errores humanos en tareas repetitivas",
        "Disponibilidad 24/7 sin agregar costo laboral",
        "Escalabilidad real: si crecés 10×, el workflow no se cansa",
        "Visibilidad total: cada paso queda registrado y auditable",
      ],
      useCases: [
        "Centralizar leads de Instagram, WhatsApp y formularios en una sola base",
        "Generar reportes diarios automáticos con datos cruzados",
        "Clasificar y responder consultas iniciales con IA",
        "Onboarding automatizado de clientes nuevos",
        "Sincronización entre CRM, hojas de cálculo y herramientas internas",
      ],
      stack: ["n8n", "Make", "Zapier", "OpenAI", "Claude", "APIs custom", "Webhooks", "RAG"],
    },
  },
  {
    id: "vibe",
    Icon: Code2,
    tag: "02",
    title: "Webs y software a medida",
    desc: "Webs, tiendas online y sistemas internos hechos a tu medida. Profesionales, rápidos y pensados para vender.",
    chips: ["De idea a online en 2 semanas", "Diseño profesional", "100% tuyo, sin ataduras"],
    modal: {
      subtitle: "Software hecho a tu medida, en tiempo récord y sin perder calidad.",
      howItWorks: [
        "Usamos inteligencia artificial para construir tu web, tienda o sistema interno en una fracción del tiempo que tarda el desarrollo tradicional. Menos espera, menos costo, mismo resultado profesional.",
        "No son páginas armadas a las apuradas: es software serio, documentado, legalmente en regla y pensado para escalar con tu negocio. La diferencia está en lo rápido que lo tenés funcionando.",
      ],
      benefits: [
        "De idea a algo funcionando en menos de 2 semanas",
        "Tecnología actual: rápida, segura y escalable",
        "Todo documentado: no es una caja negra",
        "Cambios visibles el mismo día",
        "Fácil de mantener y hacer crecer con el tiempo",
      ],
      useCases: [
        "Webs y landings que convierten (como esta misma)",
        "Paneles internos con tus números en tiempo real",
        "Herramientas a medida (mini-CRM, control de stock, etc.)",
        "Versiones iniciales para validar una idea antes de invertir grande",
        "Pasar tus planillas de Excel a un sistema web de verdad",
      ],
      stack: ["Next.js 15", "TypeScript", "React", "Tailwind", "Supabase", "PostgreSQL", "Vercel", "Claude Code"],
    },
  },
  {
    id: "agentes",
    Icon: BotMessageSquare,
    tag: "03",
    title: "Agentes IA B2B",
    desc: "Agentes conversacionales y de tareas que trabajan 24/7 en WhatsApp, email y web. Atienden, califican y operan.",
    chips: ["Atiende por WhatsApp", "No se le escapa un cliente", "Responde al instante"],
    modal: {
      subtitle: "Agentes conversacionales que trabajan, no solo responden.",
      howItWorks: [
        "Construimos agentes que conversan con tus clientes en WhatsApp, email o web, pero que además ejecutan tareas reales: consultan tu calendario, registran leads en tu sistema, generan presupuestos, buscan en tu base de datos, mandan notificaciones.",
        "Usamos la inteligencia artificial más avanzada del momento, con memoria y conexión real a tus herramientas. No son chatbots con respuestas pregrabadas: son asistentes que deciden y resuelven de verdad.",
      ],
      benefits: [
        "Atención 24/7 sin contratar más personal",
        "Reducción del 60–80% en tiempo de respuesta inicial",
        "Captura de leads sin perder ninguno por tardanza",
        "Calificación automática: el agente filtra antes de pasarte el lead",
        "Aprende y mejora con cada conversación",
      ],
      useCases: [
        "Bot de reservas en WhatsApp (como el de Finca Cajal)",
        "Asistente de ventas que califica y agenda demos",
        "Soporte técnico de primer nivel con escalado a humano",
        "Agente que consulta stock, precios y arma pedidos",
        "Onboarding interactivo para clientes nuevos",
      ],
      stack: ["Claude API", "OpenAI", "WhatsApp Business", "n8n", "Supabase", "Vector DB", "Tool-use"],
    },
  },
  {
    id: "dashboards",
    Icon: LayoutDashboard,
    tag: "04",
    title: "Dashboards & CRM a medida",
    desc: "Paneles internos con todo lo que necesita tu negocio: clientes, leads, finanzas, proyectos y métricas en tiempo real. Sin depender de un dev para cada cambio.",
    chips: ["Todo en una pantalla", "Datos en tiempo real", "Sin depender de un dev"],
    modal: {
      subtitle: "Paneles internos que te dan visibilidad total de tu negocio en tiempo real.",
      howItWorks: [
        "Las planillas de Excel y los dashboards genéricos no escalan con tu negocio. Construimos CRMs y paneles internos hechos exactamente para lo que necesitás: tus procesos, tus métricas, tu lógica de negocio.",
        "Cada panel incluye acceso seguro, permisos por persona, datos en tiempo real y la posibilidad de que tu equipo lo opere sin depender de nosotros para cada cambio.",
      ],
      benefits: [
        "Visibilidad total de tu negocio desde un solo lugar",
        "Datos en tiempo real: sin refreshes manuales",
        "Sin dependencia de un dev para cambios operativos",
        "CRM a medida de tu proceso de ventas real",
        "Roles y permisos para cada integrante del equipo",
      ],
      useCases: [
        "CRM de ventas con pipeline, leads y seguimiento",
        "Panel de finanzas: ingresos, egresos y proyecciones",
        "Gestión de stock y control de pedidos",
        "Dashboard de métricas del negocio en tiempo real",
        "Herramientas internas de gestión de proyectos o tareas",
      ],
      stack: ["Next.js", "Supabase", "PostgreSQL", "TailwindCSS", "Vercel", "Auth"],
    },
  },
  {
    id: "integraciones",
    Icon: Share2,
    tag: "05",
    title: "Integraciones entre sistemas",
    desc: "Conectamos WhatsApp, Instagram, formularios, CRMs y cualquier herramienta que ya uses. Un lead que entra por cualquier canal llega solo a donde tiene que estar.",
    chips: ["Tus apps conectadas", "Cero copiar y pegar", "Ningún lead se pierde"],
    modal: {
      subtitle: "Un lead que entra por WhatsApp llega solo a tu CRM, tu agenda y tu notificación.",
      howItWorks: [
        "Cada empresa tiene un ecosistema de herramientas diferente. El problema es que no hablan entre sí. Un lead llega por Instagram, se responde por WhatsApp, se anota en una planilla y se olvida en el CRM. Eso se termina.",
        "Conectamos todas tus herramientas para que hablen entre sí. El resultado: tus datos fluyen solos, sin que nadie tenga que copiar y pegar entre apps.",
      ],
      benefits: [
        "Cero duplicación manual de datos entre herramientas",
        "Leads de cualquier canal caen en el mismo lugar",
        "Notificaciones en tiempo real en WhatsApp o Slack",
        "Sincronización bidireccional entre sistemas",
        "Flujos auditables: cada operación queda registrada",
      ],
      useCases: [
        "Instagram Lead Ads → CRM → WhatsApp de bienvenida",
        "Formulario de la web → tu base de datos → aviso al instante",
        "WooCommerce ↔ sistema de stock ↔ contabilidad",
        "Agenda ↔ WhatsApp Bot ↔ confirmación automática",
        "Múltiples canales → una única bandeja de entrada",
      ],
      stack: ["n8n", "Make", "Webhooks", "REST APIs", "WhatsApp API", "Supabase"],
    },
  },
  {
    id: "reportes",
    Icon: BarChart3,
    tag: "06",
    title: "Reportes automáticos",
    desc: "Cada semana o mes, el dueño recibe en WhatsApp o email un resumen de sus métricas clave: ventas, leads, conversión y más. Sin pedirle nada a nadie.",
    chips: ["Llega a tu WhatsApp", "Cada semana o mes", "Sin pedirle a nadie"],
    modal: {
      subtitle: "Tus métricas clave, en tu WhatsApp, sin que tengas que pedirle nada a nadie.",
      howItWorks: [
        "Los dueños de negocios no tienen tiempo de entrar a cada plataforma para ver cómo va el mes. Diseñamos reportes automáticos que consolidan datos de múltiples fuentes y los entregan donde ya estás: WhatsApp, email o Telegram.",
        "Cada reporte es personalizado a tu negocio: qué métricas importan, con qué frecuencia, en qué formato.",
      ],
      benefits: [
        "Decisiones basadas en datos, no en intuición",
        "Sin entrar a múltiples plataformas para ver el estado",
        "Recibís el reporte cuando y donde querés",
        "Detectás problemas antes de que se vuelvan crisis",
        "Todo el equipo habla el mismo idioma de métricas",
      ],
      useCases: [
        "Reporte semanal de ventas en WhatsApp cada lunes a las 8am",
        "Resumen mensual con leads, conversión y facturación",
        "Alertas automáticas cuando una métrica baja del umbral",
        "Reporte de performance de campañas publicitarias",
        "Estado de stock crítico en tiempo real",
      ],
      stack: ["n8n", "Make", "WhatsApp API", "Resend", "Supabase", "Google Sheets"],
    },
  },
];

interface ServiceCardProps {
  s: ServiceData;
  i: number;
  onOpen: (s: ServiceData) => void;
}

function ServiceCard({ s, i, onOpen }: ServiceCardProps) {
  const [hover, setHover] = useState(false);
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen(s); }
  };
  const Icon = s.Icon;
  return (
    <Reveal delay={i * 60} className="h-full rounded-2xl overflow-hidden cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary/60">
      <div
        role="button" tabIndex={0} aria-label={`Ver servicio: ${s.title}`}
        onClick={() => onOpen(s)} onKeyDown={onKey}
        onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}
        className="h-full flex items-start gap-4 p-5 rounded-2xl overflow-hidden"
        style={{
          background: "var(--color-surface)",
          border: `1px solid ${hover ? "rgba(43,91,255,.5)" : "var(--color-line)"}`,
          boxShadow: hover ? "0 8px 40px rgba(43,91,255,.22)" : "0 4px 20px rgba(0,0,0,.2)",
          transform: hover ? "translateY(-3px)" : "none",
          transition: "border-color .3s ease, box-shadow .3s ease, transform .3s ease",
        }}
      >
        <div className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: "rgba(43,91,255,.1)", border: "1px solid rgba(43,91,255,.25)" }}>
          <Icon size={20} strokeWidth={1.75} className="text-primary" />
        </div>
        <div className="min-w-0">
          <h3 className="font-display font-semibold text-[17px] tracking-tight leading-snug text-ink">{s.title}</h3>
          <p className="mt-1 text-[13.5px] text-muted leading-relaxed line-clamp-2">{s.desc}</p>
        </div>
      </div>
    </Reveal>
  );
}

export default function Services() {
  const [active, setActive] = useState<ServiceData | null>(null);

  useEffect(() => {
    const onOpen = (e: Event) => {
      const ce = e as CustomEvent<{ id: string }>;
      const svc = SERVICES.find((s) => s.id === ce.detail.id);
      if (svc) setActive(svc);
    };
    window.addEventListener("zcm:open-service", onOpen);
    return () => window.removeEventListener("zcm:open-service", onOpen);
  }, []);

  return (
    <section id="servicios" className="relative py-16 md:py-24">
      <Mesh variant="soft" />
      <div className="absolute inset-0 line-grid opacity-50" aria-hidden />

      <div className="relative max-w-[1280px] mx-auto px-5 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <SectionTitle
            eyebrow="Servicios · 07"
            title={
              <>
                Primero, ordenamos.
                <br className="hidden md:block" /> Después,{" "}
                <span className="text-primary">ejecutamos</span>.
              </>
            }
          />
          <Reveal delay={200}>
            <p className="text-muted max-w-sm text-[15px]">
              Empezamos con un diagnóstico, construimos sobre certezas y operamos
              lo entregado. Cero humo, resultados medibles.
            </p>
          </Reveal>
        </div>

        {/* Grid compacto: todos los servicios */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
          {SERVICES.map((s, i) => (
            <ServiceCard key={s.id} s={s} i={i} onOpen={setActive} />
          ))}
        </div>
      </div>

      <ServiceModal service={active} onClose={() => setActive(null)} />
    </section>
  );
}
