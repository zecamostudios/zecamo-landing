import Image from "next/image";
import { Globe, Camera, AtSign, Share2, type LucideIcon } from "lucide-react";

interface FooterColProps {
  title: string;
  items: { l: string; h: string }[];
}

function FooterCol({ title, items }: FooterColProps) {
  return (
    <div>
      <div className="text-[11px] tracking-[.22em] uppercase font-mono text-muted/80 mb-4">
        {title}
      </div>
      <ul className="space-y-2.5">
        {items.map((it, i) => (
          <li key={i}>
            <a href={it.h} className="text-[14.5px] text-ink/90 hover:text-primary transition">
              {it.l}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

interface SocialLinkProps {
  Icon: LucideIcon;
  label: string;
  href: string;
}

function SocialLink({ Icon, label, href }: SocialLinkProps) {
  const disabled = !href || href === "#";
  if (disabled) {
    return (
      <span
        title="Próximamente"
        className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-line text-muted/40 opacity-40 cursor-not-allowed"
        aria-label={`${label} — próximamente`}
      >
        <Icon size={16} strokeWidth={1.75} />
      </span>
    );
  }
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-line text-muted hover:border-primary/60 hover:text-white transition"
    >
      <Icon size={16} strokeWidth={1.75} />
    </a>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  const legalName = process.env.NEXT_PUBLIC_COMPANY_LEGAL_NAME ?? "Zecamo Studios S.A.S.";
  const taxId     = process.env.NEXT_PUBLIC_COMPANY_TAX_ID     ?? "En trámite";

  const socials: SocialLinkProps[] = [
    { Icon: Camera,  label: "Instagram",   href: process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM ?? "#" },
    { Icon: Globe,   label: "LinkedIn",    href: process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN  ?? "#" },
    { Icon: AtSign,  label: "X / Twitter", href: process.env.NEXT_PUBLIC_SOCIAL_X        ?? "#" },
    { Icon: Share2,  label: "Facebook",    href: process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK  ?? "#" },
  ];

  return (
    <footer className="relative pt-20 pb-10 overflow-hidden border-t border-line">
      <div className="relative max-w-[1280px] mx-auto px-5 md:px-8">
        <div className="grid md:grid-cols-[1.4fr_1fr_1fr_1fr] gap-10 md:gap-8">
          <div>
            <a href="#top" className="inline-flex items-center gap-3 group">
                <Image
                src="/brand/logo-z.png"
                alt="Zecamo Studios"
                width={48}
                height={48}
                quality={85}
                style={{
                  mixBlendMode: "screen",
                  filter: "drop-shadow(0 0 18px rgba(43,91,255,.35))",
                }}
              />
              <span className="font-display font-semibold tracking-tight text-[22px] md:text-[24px] text-white leading-none">
                zecamo studios
              </span>
            </a>
            <p className="mt-5 text-muted text-[15px] leading-relaxed max-w-sm">
              Diseñamos, construimos y operamos la capa de IA de tu empresa.
              IA que trabaja. Resultados que se miden.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {socials.map((s) => (
                <SocialLink key={s.label} {...s} />
              ))}
            </div>
          </div>

          <FooterCol
            title="Servicios"
            items={[
              { l: "Automatización IA", h: "#servicios" },
              { l: "Vibe Coding", h: "#servicios" },
              { l: "Agentes IA B2B", h: "#servicios" },
              { l: "Consultoría IA", h: "#servicios" },
            ]}
          />
          <FooterCol
            title="Estudio"
            items={[
              { l: "Método", h: "#metodo" },
              { l: "Casos", h: "#casos" },
              { l: "Para quién", h: "#para-quien" },
              { l: "Contacto", h: "#contacto" },
            ]}
          />
          <FooterCol
            title="Legal"
            items={[
              { l: "Privacidad", h: "/privacy" },
              { l: "Términos", h: "/terms" },
              { l: "Cookies", h: "/cookies" },
            ]}
          />
        </div>

        <div
          className="mt-12 pt-6 border-t border-line/70 text-center font-display text-[15px] md:text-[16px] text-muted"
          style={{ letterSpacing: ".04em" }}
        >
          Construido en <span className="text-primary">Tucumán</span>. Pensado para el mundo.
        </div>

        <div className="mt-6 pt-6 border-t border-line/70 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="text-[13px] text-muted font-mono">
            © {year} Zecamo Studios. Todos los derechos reservados.
          </div>
          <div className="text-[12px] text-muted/70 font-mono">
            {legalName} · CUIT {taxId}
          </div>
          <div className="text-[12.5px] text-muted/80 italic">
            Built &amp; operated in Argentina · Remote-first
          </div>
        </div>
      </div>
    </footer>
  );
}
