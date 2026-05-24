"use client";
import { useEffect, useState, KeyboardEvent } from "react";
import {
  Workflow, Code2, BotMessageSquare, Compass, Lightbulb, ArrowRight,
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
    chips: ["Auditoría · BPMN", "Roadmap por fases", "Bonificable 100%"],
    featured: true,
    modal: {
      subtitle: "Por dónde empezamos. Antes de automatizar, ordenamos.",
      ctaLabel: "Hablemos del Diagnóstico",
      howItWorks: [
        "El error más común en proyectos de IA: implementar sin entender el proceso. Eso genera automatizaciones inútiles, dependencias, riesgos y dinero mal invertido.",
        "Nuestro Diagnóstico arranca al revés: primero analizamos las áreas clave de tu negocio (marketing, ventas, delivery, administración), mapeamos los procesos reales con BPMN, detectamos oportunidades de IA y automatización, evaluamos riesgos de ciberseguridad, y te entregamos un roadmap claro y accionable. Recién después, si te conviene, implementamos.",
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
        "Dibujo de procesos reales con BPMN (Miro)",
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
    desc: "Workflows en n8n, integraciones y procesos repetitivos que se ejecutan solos. Liberá tiempo de tu equipo.",
    chips: ["n8n · Make · Zapier", "APIs custom", "RAG sobre tus datos"],
    modal: {
      subtitle: "Convertimos tareas repetitivas en workflows que se ejecutan solos.",
      howItWorks: [
        "Identificamos los procesos manuales que más tiempo te consumen —envío de emails, carga de datos, seguimiento de leads, notificaciones, reportes— y los convertimos en flujos automáticos que conectan todas tus herramientas. Tu equipo deja de copiar y pegar entre apps y empieza a enfocarse en lo que realmente mueve el negocio.",
        "Trabajamos con n8n (autohospedado, sin costos mensuales por workflow), Make o Zapier según tu caso. Conectamos cualquier API existente y sumamos capa de IA cuando el proceso necesita decisión, clasificación o generación de contenido.",
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
    title: "Vibe Coding",
    desc: "Desarrollo de software a velocidad IA. Webs, SaaS, dashboards en tiempo récord.",
    chips: ["Next.js · React · TS", "Supabase · Postgres", "Deploy en Vercel"],
    modal: {
      subtitle: "Desarrollo de software a velocidad IA, sin sacrificar calidad.",
      howItWorks: [
        "Vibe coding es desarrollo profesional asistido por IA. Combinamos herramientas como Claude Code, Cursor y nuestro Método Zecamo para construir landings, SaaS, dashboards y herramientas internas en una fracción del tiempo tradicional.",
        "No es «hacer apps con prompts»: es desarrollo serio con TypeScript, arquitectura escalable, documentación obligatoria, compliance legal y deploy a producción. La diferencia está en la velocidad de iteración.",
      ],
      benefits: [
        "De idea a prototipo funcional en menos de 2 semanas",
        "Stack moderno: Next.js, TypeScript, Supabase, Tailwind",
        "Código documentado siguiendo el Método Zecamo (no caja negra)",
        "Iteración rápida: cambios visibles el mismo día",
        "Mantenimiento simple: tu equipo puede tocar el código sin nosotros",
      ],
      useCases: [
        "Landing pages que convierten (como esta misma)",
        "Dashboards internos con métricas en tiempo real",
        "Herramientas internas custom (CRM mini, gestión de stock, etc.)",
        "MVPs para validar ideas antes de invertir grande",
        "Migración de procesos en Excel a apps web",
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
    chips: ["WhatsApp Business", "Voice + Chat", "Tool-use real"],
    modal: {
      subtitle: "Agentes conversacionales que trabajan, no solo responden.",
      howItWorks: [
        "Construimos agentes que conversan con tus clientes en WhatsApp, email o web, pero que además ejecutan tareas reales: consultan tu calendario, registran leads en tu sistema, generan presupuestos, buscan en tu base de datos, mandan notificaciones.",
        "Usamos modelos de última generación (Claude, GPT, Gemini) con tool-use real, memoria persistente y conexión a tus herramientas. No son chatbots tontos con respuestas pregrabadas: son agentes que deciden y actúan.",
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
    id: "consultoria",
    Icon: Lightbulb,
    tag: "04",
    title: "Consultoría IA",
    desc: "Auditoría, estrategia y capacitación para implementar IA en tu empresa sin tirarla por la ventana en 3 meses.",
    chips: ["Roadmap 90 días", "Capacitación a equipos", "Gobierno & costos"],
    modal: {
      subtitle: "Estrategia, auditoría y capacitación para implementar IA sin perder plata.",
      howItWorks: [
        "Muchas empresas se entusiasman con la IA, gastan en herramientas que no usan, contratan cursos genéricos y terminan más frustradas que antes. Nosotros venimos primero, auditamos, te decimos qué SÍ y qué NO conviene, y te dejamos un roadmap concreto de 90 días.",
        "Si te conviene implementar, lo hacemos juntos. Si no, te lo decimos también. La consultoría incluye capacitación a tu equipo para que la IA sea una herramienta, no una dependencia.",
      ],
      benefits: [
        "Roadmap claro de 90 días con prioridades y costos",
        "Auditoría de procesos: dónde la IA mete diferencia real",
        "Capacitación práctica a tu equipo (no teoría)",
        "Gobierno de costos: evitar gastos descontrolados en tokens",
        "Decisiones basadas en datos, no en hype",
      ],
      useCases: [
        "Empresas que probaron ChatGPT y quieren ir más allá",
        "Equipos que necesitan aprender a trabajar con IA día a día",
        "Founders que quieren saber qué priorizar",
        "Organizaciones grandes con políticas de uso de IA",
        "Diagnóstico antes de contratar a una agencia (sí, te decimos si te conviene Zecamo o no)",
      ],
      stack: ["Diagnóstico", "Workshops", "Documentación", "Métricas", "Frameworks"],
    },
  },
];

interface ServiceCardProps {
  s: ServiceData;
  i: number;
  onOpen: (s: ServiceData) => void;
}

function FeaturedServiceCard({ s, onOpen }: { s: ServiceData; onOpen: () => void }) {
  const [hover, setHover] = useState(false);
  const Icon = s.Icon;

  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen(); }
  };

  return (
    <Reveal delay={0} className="rounded-2xl overflow-hidden cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary/60">
      <div
        role="button"
        tabIndex={0}
        aria-label={`Ver servicio: ${s.title}`}
        className="flex flex-col md:flex-row gap-8 md:gap-10 p-7 md:p-10 rounded-2xl overflow-hidden"
        onClick={onOpen}
        onKeyDown={onKey}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          background: "var(--color-surface)",
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: hover ? "rgba(43,91,255,.75)" : "rgba(43,91,255,.4)",
          boxShadow: hover
            ? "0 12px 50px rgba(43,91,255,.35), 0 4px 20px rgba(0,0,0,.3)"
            : "0 0 50px -15px rgba(43,91,255,.3), 0 4px 20px rgba(0,0,0,.2)",
          transform: hover ? "translateY(-4px)" : "none",
          transition: "border-color .3s ease, box-shadow .3s ease, transform .3s ease",
        }}
      >
        {/* Left: content */}
        <div className="flex-1 min-w-0">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/50 bg-primary/10 px-3 py-1 mb-5">
            <span
              className="w-1.5 h-1.5 rounded-full bg-primary"
              style={{ boxShadow: "0 0 8px rgba(43,91,255,.8)" }}
            />
            <span className="font-mono text-[10.5px] tracking-[.22em] uppercase text-primary">
              Empezamos acá · 00
            </span>
          </div>

          <h3 className="font-display font-semibold text-[26px] md:text-[32px] tracking-tight leading-tight">
            {s.title}
          </h3>
          <p className="mt-3 text-[15.5px] md:text-[16px] text-muted leading-relaxed max-w-xl">
            {s.desc}
          </p>

          <div className="mt-6 flex flex-wrap gap-x-4 gap-y-2">
            {s.chips.map((b, bi) => (
              <span key={bi} className="text-[12px] font-mono tracking-wide text-muted/80 inline-flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-primary" /> {b}
              </span>
            ))}
          </div>

          <div
            className={`mt-7 inline-flex items-center gap-2 text-[14px] font-medium transition-colors ${
              hover ? "text-primary" : "text-muted"
            }`}
          >
            <span>Conocé el diagnóstico</span>
            <ArrowRight size={14} strokeWidth={2} />
          </div>
        </div>

        {/* Right: icon */}
        <div className="flex items-center justify-start md:justify-end shrink-0">
          <div
            className="w-20 h-20 md:w-28 md:h-28 rounded-2xl flex items-center justify-center"
            style={{
              background: hover ? "rgba(43,91,255,.2)" : "rgba(43,91,255,.12)",
              border: `1px solid ${hover ? "rgba(43,91,255,.5)" : "rgba(43,91,255,.3)"}`,
              boxShadow: hover
                ? "0 0 50px -5px rgba(43,91,255,.5) inset"
                : "0 0 20px -10px rgba(43,91,255,.4) inset",
              transition: "background .3s ease, border-color .3s ease, box-shadow .3s ease",
            }}
          >
            <Icon size={44} strokeWidth={1.4} className="text-primary" />
          </div>
        </div>
      </div>
    </Reveal>
  );
}

function ServiceCard({ s, i, onOpen }: ServiceCardProps) {
  const [hover, setHover] = useState(false);
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen(s);
    }
  };
  const Icon = s.Icon;
  return (
    <Reveal delay={i * 80} className="h-full rounded-2xl overflow-hidden cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary/60">
      <div
        role="button"
        tabIndex={0}
        aria-label={`Ver servicio: ${s.title}`}
        className="h-full flex flex-col p-6 md:p-7 rounded-2xl overflow-hidden"
        onClick={() => onOpen(s)}
        onKeyDown={onKey}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
        style={{
          background: "var(--color-surface)",
          borderWidth: 1,
          borderStyle: "solid",
          borderColor: hover ? "rgba(43,91,255,.5)" : "var(--color-line)",
          boxShadow: hover
            ? "0 8px 40px rgba(43,91,255,.25), 0 4px 20px rgba(0,0,0,.25)"
            : "0 4px 20px rgba(0,0,0,.2)",
          transform: hover ? "translateY(-4px)" : "none",
          transition: "border-color .3s ease, box-shadow .3s ease, transform .3s ease",
        }}
      >
        <div className="flex items-center justify-between mb-6">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{
              background: hover ? "rgba(43,91,255,.18)" : "rgba(43,91,255,.1)",
              border: "1px solid rgba(43,91,255,.25)",
              transition: "background .3s ease",
            }}
          >
            <Icon size={22} strokeWidth={1.75} className="text-primary" />
          </div>
          <span className="font-mono text-[11px] tracking-[.2em] text-muted/60">{s.tag} / 04</span>
        </div>

        <h3 className="font-display font-semibold text-[20px] md:text-[22px] tracking-tight leading-tight">
          {s.title}
        </h3>
        <p className="mt-3 text-[14.5px] text-muted leading-relaxed flex-1">{s.desc}</p>

        <div className="mt-6 pt-5 border-t border-line/60 flex flex-wrap gap-x-3 gap-y-2">
          {s.chips.map((b, bi) => (
            <span key={bi} className="text-[12px] font-mono tracking-wide text-muted/80 inline-flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-primary" /> {b}
            </span>
          ))}
        </div>

        <div
          className={`mt-5 flex items-center gap-2 text-[13px] font-medium transition-colors ${
            hover ? "text-primary" : "text-muted"
          }`}
        >
          <span>Conocé más</span>
          <ArrowRight size={14} strokeWidth={2} />
        </div>
      </div>
    </Reveal>
  );
}

export default function Services() {
  const [active, setActive] = useState<ServiceData | null>(null);

  const featured = SERVICES[0];
  const regular = SERVICES.slice(1);

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
    <section id="servicios" className="relative py-24 md:py-36">
      <Mesh variant="soft" />
      <div className="absolute inset-0 line-grid opacity-50" aria-hidden />

      <div className="relative max-w-[1280px] mx-auto px-5 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <SectionTitle
            eyebrow="Servicios · 05"
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

        {/* Featured: Diagnóstico */}
        <div className="mb-5">
          <FeaturedServiceCard s={featured} onOpen={() => setActive(featured)} />
        </div>

        {/* Regular: 4 services in 2x2 grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 items-stretch">
          {regular.map((s, i) => (
            <ServiceCard key={s.id} s={s} i={i} onOpen={setActive} />
          ))}
        </div>
      </div>

      <ServiceModal service={active} onClose={() => setActive(null)} />
    </section>
  );
}
