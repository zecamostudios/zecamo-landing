// src/components/sections/Contact.tsx
"use client";
import { MessageCircle, Zap, ShieldCheck, Sparkles } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import Mesh from "@/components/ui/Mesh";
import ZWatermark from "@/components/ui/ZWatermark";
import PrimaryBtn from "@/components/ui/PrimaryBtn";
import { WHATSAPP_URL } from "@/lib/constants";

const PERKS = [
  { Icon: Zap,         label: "Respuesta rápida" },
  { Icon: ShieldCheck, label: "Sin compromiso" },
  { Icon: Sparkles,    label: "Asesoría real" },
];

export default function Contact() {
  return (
    <section id="contacto" className="relative py-16 md:py-24 overflow-hidden">
      <Mesh variant="soft" />
      <ZWatermark className="-right-40 -top-20 hidden md:block" size={520} opacity={0.05} />

      <div className="relative max-w-[820px] mx-auto px-5 md:px-8 text-center">
        <Reveal>
          <div className="inline-flex items-center gap-2 text-[12px] tracking-[.22em] uppercase text-muted font-mono justify-center">
            <span className="w-6 h-px bg-primary/70" /> Contacto · directo
          </div>
        </Reveal>

        <Reveal delay={80}>
          <h2 className="mt-5 font-display font-semibold tracking-tight text-ink leading-[1.02]"
              style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.75rem)" }}>
            ¿Hablamos de <span className="text-primary">tu negocio</span>?
          </h2>
        </Reveal>

        <Reveal delay={160}>
          <p className="mt-5 text-[17px] md:text-[19px] text-muted max-w-xl mx-auto leading-relaxed">
            Contanos qué necesitás y te respondemos por WhatsApp. Si tu caso es claro,
            salimos con una propuesta concreta enseguida.
          </p>
        </Reveal>

        <Reveal delay={240}>
          <div className="mt-9 flex justify-center">
            <PrimaryBtn as="a" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
              className="!px-9 !py-4 !text-[17px]" icon={<MessageCircle size={20} strokeWidth={1.75} />}>
              Hablá con nosotros
            </PrimaryBtn>
          </div>
        </Reveal>

        <Reveal delay={320}>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            {PERKS.map(({ Icon, label }) => (
              <span key={label} className="inline-flex items-center gap-2 text-[13.5px] text-muted">
                <Icon size={15} strokeWidth={1.75} className="text-primary" /> {label}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
