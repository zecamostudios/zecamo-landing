"use client";
import { useState, KeyboardEvent } from "react";
import Image from "next/image";
import { ArrowRight, Plus } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Mesh from "@/components/ui/Mesh";
import SectionTitle from "@/components/ui/SectionTitle";
import CaseModal, { type Project } from "./CaseModal";

export const PROJECTS: Project[] = [
  {
    id: "level",
    category: "Streetwear · Drop",
    longTag: "Streetwear · E-commerce + Backoffice",
    name: "LEVEL",
    desc: "Drop limitado con 13 piezas y reservas por WhatsApp. Identidad bold, tap-to-flip en cada producto, conversión directa sin checkout.",
    subtitle: "Drop limitado con sitio público bold y dashboard interno de gestión.",
    chips: ["Next.js", "Mobile-first", "WhatsApp Flow"],
    fullStack: ["Next.js 15", "React", "Tailwind", "Supabase", "WhatsApp API", "Vercel"],
    challenge:
      "LEVEL necesitaba un sitio que reflejara la identidad bold de la marca y un canal directo de reservas por WhatsApp. Pero también un backoffice robusto para que el equipo pudiera operar productos, precios y métricas sin depender de un dev cada vez que hay un cambio.",
    built: {
      publico: [
        "Landing del Drop 00 con tap-to-flip en cada producto (frente / dorso)",
        "Stock en tiempo real visible en cada talle",
        "Reserva directa por WhatsApp con producto y talle prearmados",
        "Mobile-first con animaciones de scroll y micro-interacciones",
        "Identidad oscura, tipografía bold, fotografía de producto integrada",
      ],
      backoffice: [
        "Dashboard de finanzas con métricas en tiempo real",
        "Gestión de productos: agregar nuevos, editar info, dar de baja",
        "Control de precios y stock por talle desde un panel",
        "Tracking de reservas entrantes por WhatsApp",
        "Métricas: ventas, ingresos, productos más reservados",
      ],
    },
    url: "https://www.levelstudios.site/",
    domain: "levelstudios.site",
    image: "/cases/level.png",
    alt: "LEVEL Studios — preview",
    imagePosition: "right center",
    imageZoom: 1,
  },
  {
    id: "finca",
    category: "Eventos · Reservas",
    longTag: "Eventos · Reservas + Dashboard end-to-end",
    name: "Finca Cajal",
    desc: "Predio de eventos y fútbol en Tafí Viejo. Sitio completo con galería, reseñas reales integradas desde Google y formulario de reservas.",
    subtitle: "Predio de eventos con sitio público y dashboard interno completo para operar todo el negocio.",
    chips: ["Web institucional", "Reseñas Google", "WhatsApp"],
    fullStack: ["Next.js", "Supabase", "PostgreSQL", "WhatsApp", "Google Maps", "Vercel"],
    challenge:
      "Finca Cajal recibía consultas constantes por WhatsApp y formularios pero no tenía forma de centralizar leads, gestionar reservas, controlar el calendario ni ver las finanzas del negocio. Construimos el sistema operativo completo del local.",
    built: {
      publico: [
        "Web institucional completa con galería, video y reseñas reales integradas desde Google",
        "Formulario de reservas con captura de fecha, cantidad de invitados y tipo de evento",
        "Integración con WhatsApp directo para consultas rápidas",
        "Mapa con ubicación, accesos y secciones de servicios",
      ],
      backoffice: [
        "Centralización de leads: cada formulario llega automáticamente al dashboard",
        "Gestión de eventos: calendario con disponibilidad, reservas confirmadas, depósitos",
        "Panel de finanzas: ingresos por evento, balance mensual, proyecciones",
        "Seguimiento individual de cada lead: estado, último contacto, conversión a reserva",
        "Vista 360° del negocio desde un solo lugar",
      ],
    },
    url: "https://www.fincacajal.com.ar/",
    domain: "fincacajal.com.ar",
    image: "/cases/finca-cajal.png",
    alt: "Finca Cajal — preview",
    imagePosition: "65% top",
    imageZoom: 1,
  },
  {
    id: "suplementos",
    category: "E-commerce · Suplementos",
    longTag: "E-commerce · Suplementos + Panel de operaciones",
    name: "Suplementos Tucumán",
    desc: "Catálogo de suplementos deportivos con flujo de pedido por WhatsApp. Optimizado para conversión mobile y SEO local.",
    subtitle: "E-commerce de suplementos con flujo de pedido por WhatsApp y panel completo para operar las ventas.",
    chips: ["E-commerce", "Catálogo dinámico", "SEO local"],
    fullStack: ["Next.js", "Tailwind", "Supabase", "WhatsApp API", "Vercel"],
    challenge:
      "El cliente vendía suplementos por Instagram y WhatsApp pero perdía tiempo respondiendo precios y stock todo el día. Necesitaba un catálogo online con flujo de pedido directo y un backoffice para operar las ventas sin tocar código.",
    built: {
      publico: [
        "Catálogo de suplementos con filtros por categoría",
        "Carrito con productos seleccionados",
        "Checkout directo a WhatsApp con pedido prearmado (producto, cantidad, precio)",
        "Optimizado para conversión mobile (donde compra el target)",
        "SEO local para Tucumán",
      ],
      backoffice: [
        "Gestión de productos: alta, edición, baja, precios",
        "Control de stock por producto",
        "Tracking de clicks al carrito (engagement real, no solo views)",
        "Tracking de pedidos enviados por WhatsApp",
        "Aprobación / gestión de ventas",
        "Métricas: productos más vistos, más vendidos, tasa de conversión",
      ],
    },
    url: "https://suplementos-tucuman.vercel.app/",
    domain: "suplementos-tucuman.vercel.app",
    image: "/cases/suplementos.png",
    alt: "Suplementos Tucumán — preview",
    imagePosition: "40% top",
    imageZoom: 1,
  },
];

export function BrowserMockup({
  src, alt, domain, hover, objectPosition = "center center", imageZoom = 1,
}: {
  src: string; alt: string; domain: string; hover: boolean; objectPosition?: string; imageZoom?: number;
}) {
  return (
    <div
      className="relative rounded-xl overflow-hidden border border-line"
      style={{
        background: "var(--color-bg)",
        boxShadow: hover
          ? "0 20px 60px -20px rgba(43,91,255,.45), 0 0 60px -10px rgba(43,91,255,.25)"
          : "0 1px 0 0 rgba(255,255,255,.04) inset, 0 24px 50px -25px rgba(0,0,0,.5)",
        transition: "box-shadow .35s ease",
      }}
    >
      {/* Browser chrome */}
      <div className="flex items-center gap-2 px-3 py-2 bg-surface/80 border-b border-line/80 backdrop-blur-sm">
        <span className="flex gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F57]/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#FEBC2E]/80" />
          <span className="w-2.5 h-2.5 rounded-full bg-[#28C840]/80" />
        </span>
        <div
          className={`ml-2 flex-1 h-6 rounded-md border border-line/80 flex items-center justify-center text-[11px] font-mono tracking-tight transition-colors ${
            hover ? "text-primary bg-primary/[.08]" : "text-muted/80 bg-bg/40"
          }`}
        >
          <span className="opacity-70 mr-1">↳</span> {domain}
        </div>
        <span className="w-6 h-6 hidden md:block" />
      </div>

      {/* Screenshot area */}
      <div
        style={{
          aspectRatio: "16 / 10",
          backgroundImage: `url(${src})`,
          backgroundSize: "cover",
          backgroundPosition: objectPosition,
          backgroundRepeat: "no-repeat",
          backgroundColor: "var(--color-bg)",
          transform: `scale(${hover ? imageZoom * 1.02 : imageZoom})`,
          transition: "transform 500ms ease",
          transformOrigin: "center center",
        }}
        role="img"
        aria-label={alt}
      />
    </div>
  );
}

/** Modal preview — imagen directa sin frame extra (el screenshot ya tiene browser baked in) */
export function CaseImageBare({ src, alt }: { src: string; alt: string }) {
  return (
    <div
      className="w-full overflow-hidden"
      style={{
        borderRadius: 12,
        border: "1px solid rgba(43,91,255,.2)",
        boxShadow:
          "0 0 0 1px rgba(43,91,255,.12), 0 20px 60px -15px rgba(43,91,255,.45), 0 0 80px -20px rgba(43,91,255,.2)",
      }}
    >
      <Image
        src={src}
        alt={alt}
        width={1920}
        height={1080}
        quality={85}
        sizes="(max-width: 900px) 100vw, 900px"
        className="w-full h-auto block"
      />
    </div>
  );
}

interface ProjectCardProps { p: Project; i: number; onOpen: () => void; }

function ProjectCard({ p, i, onOpen }: ProjectCardProps) {
  const [hover, setHover] = useState(false);
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpen();
    }
  };

  return (
    <Reveal
      delay={i * 100}
      className="h-full cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-primary/60 rounded-[20px] overflow-hidden"
    >
      <div
        role="button"
        tabIndex={0}
        aria-label={`Ver caso completo: ${p.name}`}
        onClick={onOpen}
        onKeyDown={onKey}
        className="flex flex-col gap-5 h-full p-5 md:p-6 rounded-[20px] overflow-hidden"
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
        <div className="relative">
          <BrowserMockup src={p.image} alt={p.alt} domain={p.domain} hover={hover} objectPosition={p.imagePosition} imageZoom={p.imageZoom} />

          <div
            className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 pointer-events-none rounded-xl ${
              hover ? "opacity-100" : "opacity-0"
            }`}
            style={{
              background:
                "radial-gradient(circle at center, rgba(43,91,255,.20) 0%, rgba(10,15,31,0) 65%)",
            }}
          >
            <div
              className="w-14 h-14 rounded-full bg-primary/90 border border-white/15 flex items-center justify-center"
              style={{
                boxShadow:
                  "0 0 0 8px rgba(43,91,255,.12), 0 0 50px -5px rgba(43,91,255,.7)",
              }}
            >
              <Plus size={22} strokeWidth={2.25} className="text-white" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 flex-1">
          <div className="inline-flex items-center gap-2 self-start rounded-full border border-line bg-bg/40 px-2.5 py-1">
            <span className="w-1 h-1 rounded-full bg-primary" />
            <span className="font-mono text-[11px] tracking-[.18em] uppercase text-muted">
              {p.category}
            </span>
          </div>

          <h3 className="font-display font-semibold text-[24px] md:text-[26px] tracking-tight leading-tight">
            {p.name}
          </h3>
          <p className="text-muted text-[14.5px] leading-relaxed">{p.desc}</p>

          <div className="flex flex-wrap gap-1.5 mt-1">
            {p.chips.map((c, ci) => (
              <span
                key={ci}
                className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface/60 px-2.5 py-1 text-[11.5px] text-muted font-mono"
              >
                {c}
              </span>
            ))}
          </div>

          <div className="mt-auto pt-4 border-t border-line/70 flex items-center justify-between">
            <span className="text-[11.5px] font-mono tracking-[.18em] uppercase text-muted/70">
              Caso 0{i + 1}
            </span>
            <span
              className={`inline-flex items-center gap-1.5 text-[13.5px] font-medium transition-colors ${
                hover ? "text-primary" : "text-muted"
              }`}
            >
              Ver caso completo
              <ArrowRight size={14} strokeWidth={2} />
            </span>
          </div>
        </div>
      </div>
    </Reveal>
  );
}

export default function Cases() {
  const [activeIndex, setActiveIndex] = useState(-1);

  return (
    <section id="casos" className="relative py-24 md:py-32">
      <div className="absolute inset-0 line-grid opacity-40" aria-hidden />
      <Mesh variant="soft" />

      <div className="relative max-w-[1280px] mx-auto px-5 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <SectionTitle
            eyebrow="Casos · ZCM-04"
            title={
              <>
                Trabajos <span className="text-primary">recientes</span>.
              </>
            }
            kicker="Tres clientes, tres industrias. Una sola obsesión: que el sitio venda, no que solo se vea."
          />
          <Reveal delay={150}>
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/40 backdrop-blur-md px-3 py-1.5 self-start md:self-end">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
              </span>
              <span className="text-[12px] tracking-[.18em] uppercase text-muted font-mono">
                3 sitios en vivo
              </span>
            </div>
          </Reveal>
        </div>

        <Reveal delay={200} className="mb-12">
          <div className="inline-flex items-center gap-3 rounded-full border border-primary/30 bg-primary/[.05] px-4 py-2">
            <span
              className="w-1.5 h-1.5 rounded-full bg-primary"
              style={{ boxShadow: "0 0 10px rgba(43,91,255,.7)" }}
            />
            <span className="font-mono text-[11.5px] md:text-[12px] tracking-[.22em] uppercase text-muted">
              No hacemos solo sitios. <span className="text-ink">Construimos operaciones.</span>
            </span>
          </div>
        </Reveal>

        <div className="grid md:grid-cols-3 gap-5">
          {PROJECTS.map((p, i) => (
            <ProjectCard key={p.id} p={p} i={i} onOpen={() => setActiveIndex(i)} />
          ))}
        </div>
      </div>

      <CaseModal
        projects={PROJECTS}
        activeIndex={activeIndex}
        onClose={() => setActiveIndex(-1)}
        onChange={setActiveIndex}
      />
    </section>
  );
}
