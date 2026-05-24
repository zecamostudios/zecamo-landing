"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Menu, X } from "lucide-react";
import PrimaryBtn from "@/components/ui/PrimaryBtn";

interface NavLink { href: string; label: string; }

const LINKS: NavLink[] = [
  { href: "#servicios",  label: "Servicios" },
  { href: "#para-quien", label: "Para quién" },
  { href: "#metodo",     label: "Método" },
  { href: "#casos",      label: "Casos" },
  { href: "#contacto",   label: "Contacto" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-bg/70 border-b border-line/80"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-[1280px] mx-auto px-5 md:px-8">
        <div className="h-16 md:h-[72px] flex items-center justify-between">
          <a href="#top" className="flex items-center gap-2.5 group">
            <Image
              src="/brand/logo-z.png"
              alt="Zecamo Studios"
              width={32}
              height={32}
              priority
              quality={85}
              style={{
                mixBlendMode: "screen",
                filter: "drop-shadow(0 0 10px rgba(43,91,255,.25))",
              }}
              className="group-hover:scale-105 transition-transform"
            />
            <span className="hidden sm:inline font-display font-semibold tracking-tight text-[15px] leading-none text-white">
              zecamo studios
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="px-3 py-2 text-[14px] text-muted hover:text-white font-medium transition-colors rounded-full hover:bg-white/[.04]"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <PrimaryBtn
              as="a"
              href="#contacto"
              className="!px-5 !py-2.5 !text-[14px] ring-1 ring-white/10"
              icon={<ArrowUpRight size={16} strokeWidth={1.75} />}
              style={{
                boxShadow:
                  "0 0 0 1px rgba(255,255,255,.06), 0 8px 30px -8px rgba(43,91,255,.65), 0 0 40px -10px rgba(43,91,255,.55)",
              } as React.CSSProperties}
            >
              Hablemos
            </PrimaryBtn>
            <button
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-line text-white"
              onClick={() => setOpen((o) => !o)}
              aria-label="Menú"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {open && (
          <div className="md:hidden pb-4">
            <div className="grad-border p-2 flex flex-col">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="px-4 py-3 text-[15px] text-muted hover:text-white hover:bg-white/[.04] rounded-xl transition-colors"
                >
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
