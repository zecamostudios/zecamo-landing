"use client";
import { ArrowRight, Check, Gift, type LucideIcon } from "lucide-react";
import Modal, { ModalSection } from "@/components/ui/Modal";
import PrimaryBtn from "@/components/ui/PrimaryBtn";
import GhostBtn from "@/components/ui/GhostBtn";

export interface ServiceData {
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
    useCases: string[];
    stack: string[];
    tiers?: { name: string; desc: string }[];
    bonification?: string;
    ctaLabel?: string;
  };
}

interface ServiceModalProps {
  service: ServiceData | null;
  onClose: () => void;
}

export default function ServiceModal({ service, onClose }: ServiceModalProps) {
  const handleCTA = () => {
    if (!service) return;
    onClose();
    setTimeout(() => {
      window.dispatchEvent(
        new CustomEvent("zcm:select-service", {
          detail: { id: service.id, title: service.title },
        }),
      );
      document.getElementById("contacto")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 320);
  };

  const Icon = service?.Icon;
  return (
    <Modal
      open={!!service}
      onClose={onClose}
      ariaLabel={service ? `Servicio: ${service.title}` : "Servicio"}
    >
      {service && Icon && (
        <div className="px-6 md:px-10 pt-10 md:pt-12 pb-8 md:pb-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/[.08] px-3 py-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary" />
            <span className="font-mono text-[11px] tracking-[.18em] uppercase text-primary">
              {service.featured ? "Servicio destacado" : "Servicio"} · {service.tag}
            </span>
          </div>

          <div className="mt-5 flex items-start gap-4">
            <div
              className="w-14 h-14 rounded-xl bg-primary-dark/60 border border-primary/30 text-primary flex items-center justify-center shrink-0"
              style={{ boxShadow: "0 0 30px -5px rgba(43,91,255,.45) inset" }}
            >
              <Icon size={26} strokeWidth={1.75} />
            </div>
            <div>
              <h2
                className="font-display font-semibold tracking-tight leading-[1.05]"
                style={{ fontSize: "clamp(1.9rem, 4.6vw, 3rem)" }}
              >
                {service.title}
              </h2>
              <p className="mt-2 text-[16.5px] md:text-[17.5px] text-muted leading-relaxed max-w-2xl">
                {service.modal.subtitle}
              </p>
            </div>
          </div>

          <ModalSection title="¿Cómo funciona?">
            <div className="flex flex-col gap-4 max-w-[68ch]">
              {service.modal.howItWorks.map((p, i) => (
                <p key={i} className="text-muted text-[15.5px] leading-relaxed">
                  {p}
                </p>
              ))}
            </div>
          </ModalSection>

          <ModalSection title="Beneficios">
            <ul className="grid md:grid-cols-2 gap-x-6 gap-y-3">
              {service.modal.benefits.map((b, i) => (
                <li key={i} className="flex items-start gap-3 text-[14.5px] text-ink/95 leading-relaxed">
                  <span
                    className="mt-0.5 inline-flex items-center justify-center w-5 h-5 rounded-full bg-primary/15 border border-primary/40 text-primary shrink-0"
                    style={{ boxShadow: "0 0 10px rgba(43,91,255,.35)" }}
                  >
                    <Check size={11} strokeWidth={3} />
                  </span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </ModalSection>

          <ModalSection title="Qué incluye">
            <ul className="space-y-2.5">
              {service.modal.useCases.map((u, i) => (
                <li key={i} className="flex items-start gap-2.5 text-[14.5px] text-ink/90 leading-relaxed">
                  <span
                    className="mt-[8px] inline-block w-1.5 h-1.5 rounded-full bg-primary shrink-0"
                    style={{ boxShadow: "0 0 8px rgba(43,91,255,.55)" }}
                  />
                  <span>{u}</span>
                </li>
              ))}
            </ul>
          </ModalSection>

          {service.modal.tiers && service.modal.tiers.length > 0 && (
            <ModalSection title="Dos formatos">
              <div className="grid md:grid-cols-2 gap-4">
                {service.modal.tiers.map((t, i) => (
                  <div
                    key={i}
                    className="rounded-xl border border-line/80 bg-bg/40 p-5"
                  >
                    <div className="font-display font-semibold text-[15px] text-primary mb-2">
                      {t.name}
                    </div>
                    <p className="text-[13.5px] text-muted leading-relaxed">{t.desc}</p>
                  </div>
                ))}
              </div>
            </ModalSection>
          )}

          {service.modal.bonification && (
            <div
              className="mt-8 rounded-2xl border border-primary/35 bg-primary/[.06] p-5 md:p-6 flex items-start gap-4"
              style={{ boxShadow: "0 0 30px -10px rgba(43,91,255,.2) inset" }}
            >
              <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center shrink-0 text-primary">
                <Gift size={18} strokeWidth={1.75} />
              </div>
              <div>
                <div className="font-display font-semibold text-[13.5px] text-primary mb-1 tracking-wide uppercase">
                  La bonificación
                </div>
                <p className="text-[14px] text-muted leading-relaxed">
                  {service.modal.bonification}
                </p>
              </div>
            </div>
          )}

          <ModalSection title="Stack & herramientas">
            <div className="flex flex-wrap gap-2">
              {service.modal.stack.map((t, i) => (
                <span
                  key={i}
                  className="inline-flex items-center gap-1.5 rounded-full border border-line bg-bg/40 px-3 py-1.5 text-[12.5px] text-ink/90 font-mono"
                >
                  <span className="w-1 h-1 rounded-full bg-primary" /> {t}
                </span>
              ))}
            </div>
          </ModalSection>

          <div className="mt-10 flex flex-col sm:flex-row gap-3">
            <PrimaryBtn onClick={handleCTA} className="!px-6 !py-3" icon={<ArrowRight size={14} strokeWidth={2} />}>
              {service.modal.ctaLabel ?? `Hablemos de ${service.title}`}
            </PrimaryBtn>
            <GhostBtn onClick={onClose} className="!px-6 !py-3">
              Cerrar
            </GhostBtn>
          </div>
        </div>
      )}
    </Modal>
  );
}
