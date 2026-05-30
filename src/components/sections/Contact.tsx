"use client";
import { useEffect, useState, FormEvent } from "react";
import {
  ArrowUpRight, Workflow, Code2, BotMessageSquare, Compass, HelpCircle,
  SendHorizontal, RotateCcw, Globe, Camera, X,
  Check, LayoutDashboard, Share2, BarChart3, type LucideIcon,
} from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Mesh from "@/components/ui/Mesh";
import ZWatermark from "@/components/ui/ZWatermark";
import SectionTitle from "@/components/ui/SectionTitle";
import PrimaryBtn from "@/components/ui/PrimaryBtn";

interface ServiceOption {
  id: "diagnostico" | "automatizacion" | "vibe" | "agentes" | "dashboards" | "integraciones" | "reportes" | "otra";
  label: string;
  Icon: LucideIcon;
  featured?: boolean;
}

const SERVICE_OPTIONS: ServiceOption[] = [
  { id: "diagnostico",    label: "Diagnóstico Zecamo",               Icon: Compass, featured: true },
  { id: "automatizacion", label: "Automatización con IA",            Icon: Workflow },
  { id: "vibe",           label: "Vibe Coding",                      Icon: Code2 },
  { id: "agentes",        label: "Agentes IA B2B",                   Icon: BotMessageSquare },
  { id: "dashboards",     label: "Dashboards & CRM a medida",        Icon: LayoutDashboard },
  { id: "integraciones",  label: "Integraciones entre sistemas",     Icon: Share2 },
  { id: "reportes",       label: "Reportes automáticos",             Icon: BarChart3 },
  { id: "otra",           label: "No estoy seguro / Otra consulta",  Icon: HelpCircle },
];

interface FormState {
  nombre: string;
  email: string;
  empresa: string;
  servicio: string;
  mensaje: string;
  consent: boolean;
}

type FormErrors = Partial<Record<keyof FormState, string>>;
type FormStatus = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [form, setForm] = useState<FormState>({
    nombre: "", email: "", empresa: "", servicio: "", mensaje: "", consent: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<FormStatus>("idle");

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  // Listener global del modal de servicios → preselecciona y prerellena.
  useEffect(() => {
    interface SelectDetail { id?: string; title?: string; }
    const onSelect = (e: Event) => {
      const ce = e as CustomEvent<SelectDetail>;
      const id = ce.detail?.id;
      const title = ce.detail?.title;
      if (!id) return;
      const defaultMsg =
        id === "diagnostico"
          ? "Quiero un Diagnóstico Zecamo para mi negocio. Tenemos [N] personas en el equipo y nuestro principal dolor es..."
          : `Me interesa ${title}. Mi caso es...`;
      setForm((f) => ({
        ...f,
        servicio: id,
        mensaje: f.mensaje.trim().length > 0 ? f.mensaje : defaultMsg,
      }));
      setErrors((prev) => ({ ...prev, servicio: undefined }));
    };
    window.addEventListener("zcm:select-service", onSelect);
    return () => window.removeEventListener("zcm:select-service", onSelect);
  }, []);

  const validate = (): FormErrors => {
    const e: FormErrors = {};
    if (!form.nombre.trim()) e.nombre = "Decinos cómo te llamás";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = "Email inválido";
    if (!form.empresa.trim()) e.empresa = "¿De qué empresa?";
    if (!form.servicio) e.servicio = "Elegí una opción";
    if (!form.mensaje.trim() || form.mensaje.trim().length < 10)
      e.mensaje = "Contanos un poco más (10+ caracteres)";
    if (!form.consent) e.consent = "Necesitamos tu consentimiento";
    return e;
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre:   form.nombre,
          email:    form.email,
          empresa:  form.empresa,
          servicio: form.servicio,
          mensaje:  form.mensaje,
          consent:  form.consent,
        }),
      });
      if (res.ok) {
        setStatus("success");
      } else {
        const data = await res.json().catch(() => ({}));
        console.error("[Contact] API error:", data);
        setStatus("error");
      }
    } catch (err) {
      console.error("[Contact] Network error:", err);
      setStatus("error");
    }
  };

  const onReset = () => {
    setForm({ nombre: "", email: "", empresa: "", servicio: "", mensaje: "", consent: false });
    setErrors({});
    setStatus("idle");
  };

  const socials = [
    { Icon: Globe, label: "LinkedIn", href: "#" },
    { Icon: Camera, label: "Instagram", href: "#" },
    { Icon: Code2, label: "GitHub", href: "#" },
    { Icon: X, label: "X", href: "#" },
  ];

  return (
    <section id="contacto" className="relative py-24 md:py-36 overflow-hidden">
      <Mesh variant="soft" />
      <ZWatermark className="-right-40 -top-20 hidden md:block" size={520} opacity={0.05} />

      <div className="relative max-w-[1280px] mx-auto px-5 md:px-8">
        <div className="grid md:grid-cols-[1fr_1.2fr] gap-8 md:gap-14 items-start">
          <div>
            <SectionTitle
              eyebrow="Contacto · 24h"
              title={<>Hablemos de <span className="text-primary">tu próximo</span> proyecto.</>}
              kicker="Te respondemos en menos de 24h hábiles. Si tu caso es claro, en la primera llamada salimos con una propuesta concreta."
            />

            <Reveal delay={200} className="mt-10 grad-border p-6">
              <div className="text-[12px] tracking-[.2em] uppercase font-mono text-muted mb-3">
                ¿Preferís email directo?
              </div>
              <a
                href="mailto:hola@zecamostudios.com"
                className="font-display text-[20px] md:text-[22px] tracking-tight text-ink hover:text-primary transition inline-flex items-center gap-2"
              >
                hola@zecamostudios.com
                <ArrowUpRight size={16} strokeWidth={1.75} />
              </a>

              <div className="mt-6 pt-6 border-t border-line/80">
                <div className="text-[12px] tracking-[.2em] uppercase font-mono text-muted mb-3">
                  Encontranos en
                </div>
                <div className="flex flex-wrap gap-2">
                  {socials.map(({ Icon, label, href }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-line bg-bg/40 hover:border-primary/60 hover:text-white text-muted text-[13px] transition"
                    >
                      <Icon size={14} strokeWidth={1.75} />
                      <span>{label}</span>
                    </a>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-line/80 grid grid-cols-2 gap-4">
                <div>
                  <div className="text-[12px] tracking-[.2em] uppercase font-mono text-muted">Base</div>
                  <div className="text-[15px] text-ink mt-1">Argentina · Remote-first</div>
                </div>
                <div>
                  <div className="text-[12px] tracking-[.2em] uppercase font-mono text-muted">Idiomas</div>
                  <div className="text-[15px] text-ink mt-1">ES · EN</div>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal delay={100} className="relative">
            <div
              className="grad-border grad-border-strong p-7 md:p-9 backdrop-blur-xl"
              style={{ background: "linear-gradient(180deg, rgba(15,23,48,.85), rgba(15,23,48,.55))" }}
            >
              {status === "success" ? (
                <SuccessBlock onReset={onReset} />
              ) : (
                <form onSubmit={onSubmit} noValidate className="flex flex-col gap-5">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-semibold text-[22px] tracking-tight">
                      Contanos qué necesitás
                    </h3>
                    <span className="font-mono text-[11px] tracking-[.18em] uppercase text-muted">
                      / form
                    </span>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Field label="Nombre" id="nombre" value={form.nombre}
                           onChange={(v) => set("nombre", v)} error={errors.nombre}
                           placeholder="Tu nombre" />
                    <Field label="Email" id="email" type="email" value={form.email}
                           onChange={(v) => set("email", v)} error={errors.email}
                           placeholder="vos@empresa.com" />
                  </div>
                  <Field label="Empresa" id="empresa" value={form.empresa}
                         onChange={(v) => set("empresa", v)} error={errors.empresa}
                         placeholder="Nombre de tu empresa" />

                  <ServiceRadio
                    value={form.servicio}
                    onChange={(id) => {
                      set("servicio", id);
                      setErrors((e) => ({ ...e, servicio: undefined }));
                    }}
                    error={errors.servicio}
                  />

                  <Field label="Mensaje" id="mensaje" textarea value={form.mensaje}
                         onChange={(v) => set("mensaje", v)} error={errors.mensaje}
                         placeholder={
                           form.servicio === "diagnostico"
                             ? "Quiero un diagnóstico para mi negocio. Tenemos [N] personas en el equipo y nuestro principal dolor es..."
                             : "Contanos en qué estás pensando, qué problema querés resolver y tu timeline ideal."
                         } />

                  <label className="flex items-start gap-3 cursor-pointer select-none">
                    <span
                      className={`relative mt-1 inline-flex w-[18px] h-[18px] rounded-[5px] border ${
                        form.consent ? "bg-primary border-primary" : "border-line bg-bg/40"
                      }`}
                    >
                      <input
                        type="checkbox"
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        checked={form.consent}
                        onChange={(e) => set("consent", e.target.checked)}
                      />
                      {form.consent && (
                        <svg viewBox="0 0 24 24" className="w-4 h-4 m-auto text-white" fill="none" stroke="currentColor" strokeWidth={3}>
                          <path d="M5 12l4 4L19 6" />
                        </svg>
                      )}
                    </span>
                    <span className="text-[13.5px] text-muted leading-relaxed">
                      Acepto que Zecamo Studios procese mis datos para responder a esta consulta.{" "}
                      <a href="/privacy" className="text-primary underline-offset-4 hover:underline">
                        Política de privacidad
                      </a>.
                    </span>
                  </label>
                  {errors.consent && (
                    <div className="text-[12.5px] text-red-400 -mt-2">{errors.consent}</div>
                  )}

                  {status === "error" && (
                    <div className="px-4 py-3 rounded-xl border border-red-500/30 bg-red-500/[.08] text-[13px] text-red-400">
                      No pudimos enviar tu mensaje. Escribinos a{" "}
                      <a href="mailto:hola@zecamostudios.com" className="underline underline-offset-2">
                        hola@zecamostudios.com
                      </a>.
                    </div>
                  )}

                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pt-2">
                    <div className="text-[12.5px] text-muted font-mono">
                      Respuesta &lt; 24h hábiles
                    </div>
                    <PrimaryBtn
                      type="submit"
                      className={`!px-8 !py-3.5 ${status === "loading" ? "opacity-80 cursor-wait" : ""}`}
                      icon={
                        status === "loading" ? (
                          <span className="inline-block w-4 h-4 border-2 border-white/70 border-t-transparent rounded-full animate-spin" />
                        ) : (
                          <SendHorizontal size={16} strokeWidth={1.75} />
                        )
                      }
                    >
                      {status === "loading" ? "Enviando…" : "Enviar mensaje"}
                    </PrimaryBtn>
                  </div>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

interface ServiceRadioProps {
  value: string;
  onChange: (id: string) => void;
  error?: string;
}

function ServiceRadio({ value, onChange, error }: ServiceRadioProps) {
  const featured = SERVICE_OPTIONS[0]; // Diagnóstico
  const main = SERVICE_OPTIONS.slice(1, 7); // 01–06
  const other = SERVICE_OPTIONS[7]; // No estoy seguro
  return (
    <div className="flex flex-col gap-2.5">
      <label className="text-[12px] tracking-[.18em] uppercase font-mono text-muted">
        ¿En qué te podemos ayudar?
      </label>
      {/* Featured: Diagnóstico */}
      <RadioCard
        option={featured}
        active={value === featured.id}
        onSelect={() => onChange(featured.id)}
        featured
      />
      {/* 2-col grid for regular services */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {main.map((o) => (
          <RadioCard
            key={o.id}
            option={o}
            active={value === o.id}
            onSelect={() => onChange(o.id)}
          />
        ))}
      </div>
      {/* Full-width last option */}
      <RadioCard
        option={other}
        active={value === other.id}
        onSelect={() => onChange(other.id)}
      />
      {error && <div className="text-[12.5px] text-red-400">{error}</div>}
    </div>
  );
}

function RadioCard({
  option, active, onSelect, featured = false,
}: { option: ServiceOption; active: boolean; onSelect: () => void; featured?: boolean }) {
  const Icon = option.Icon;
  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={active}
      className={`relative text-left rounded-xl border transition-all flex items-center gap-3 ${
        featured ? "px-4 py-3.5" : "px-3.5 py-3"
      } ${
        active
          ? "border-primary bg-primary/[.08] text-white"
          : featured
          ? "border-primary/25 bg-primary/[.03] text-ink/90 hover:border-primary/50 hover:bg-primary/[.06]"
          : "border-line bg-bg/40 text-ink/90 hover:border-primary/50 hover:bg-bg/60"
      }`}
      style={
        active
          ? {
              boxShadow:
                "0 0 0 1px rgba(43,91,255,.35), 0 10px 30px -10px rgba(43,91,255,.4), inset 0 0 40px -10px rgba(43,91,255,.35)",
            }
          : {}
      }
    >
      <span
        className={`rounded-lg flex items-center justify-center shrink-0 transition-colors ${
          featured ? "w-10 h-10" : "w-9 h-9"
        } ${
          active
            ? "bg-primary/20 border border-primary/50 text-primary"
            : "bg-bg/60 border border-line text-muted"
        }`}
      >
        <Icon size={featured ? 18 : 16} strokeWidth={1.85} />
      </span>
      <div className="flex-1 min-w-0">
        {featured && (
          <div className="text-[10.5px] font-mono tracking-[.18em] uppercase text-primary/70 mb-0.5">
            Recomendado · Empezá acá
          </div>
        )}
        <span className={`font-medium leading-snug ${featured ? "text-[15px]" : "text-[14px]"}`}>
          {option.label}
        </span>
      </div>
      <span
        className={`absolute top-2 right-2 inline-flex items-center justify-center w-5 h-5 rounded-full transition-all ${
          active ? "bg-primary text-white scale-100" : "scale-0"
        }`}
      >
        <Check size={11} strokeWidth={3} />
      </span>
    </button>
  );
}

interface FieldProps {
  label: string;
  id: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
  textarea?: boolean;
}

function Field({
  label, id, value, onChange, error, placeholder,
  type = "text", textarea = false,
}: FieldProps) {
  const baseProps = {
    id, name: id, placeholder,
    value,
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => onChange(e.target.value),
    className: `field ${error ? "!border-red-500/60 !shadow-[0_0_0_4px_rgba(239,68,68,.12)]" : ""}`,
  };
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-[12px] tracking-[.18em] uppercase font-mono text-muted">
        {label}
      </label>
      {textarea ? (
        <textarea {...baseProps} rows={5} style={{ resize: "vertical", minHeight: 120 }} />
      ) : (
        <input {...baseProps} type={type} />
      )}
      {error && <div className="text-[12.5px] text-red-400">{error}</div>}
    </div>
  );
}

function SuccessBlock({ onReset }: { onReset: () => void }) {
  return (
    <div className="text-center py-6">
      <div
        className="relative mx-auto w-16 h-16 rounded-full bg-primary/15 border border-primary/40 flex items-center justify-center mb-5"
        style={{ boxShadow: "0 0 40px -5px rgba(43,91,255,.5)" }}
      >
        <Check size={28} strokeWidth={2.5} className="text-primary" />
      </div>
      <h3 className="font-display font-semibold text-[24px] tracking-tight">Mensaje enviado.</h3>
      <p className="text-muted mt-2 max-w-md mx-auto">
        Lo recibimos. Te respondemos en menos de 24h hábiles desde{" "}
        <span className="text-ink">hola@zecamostudios.com</span>.
      </p>
      <button
        onClick={onReset}
        className="mt-6 inline-flex items-center gap-2 text-primary text-[14px] font-medium hover:text-primary-hover transition"
      >
        <RotateCcw size={14} strokeWidth={1.75} /> Enviar otro mensaje
      </button>
    </div>
  );
}
