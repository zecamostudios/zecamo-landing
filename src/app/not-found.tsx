import ZWatermark from "@/components/ui/ZWatermark";
import PrimaryBtn from "@/components/ui/PrimaryBtn";
import GhostBtn from "@/components/ui/GhostBtn";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — Página no encontrada",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <main className="relative min-h-screen bg-bg flex flex-col items-center justify-center px-5 text-center overflow-hidden">
      <div className="absolute inset-0 dot-grid opacity-40" aria-hidden />
      <ZWatermark />

      <div className="relative z-10 flex flex-col items-center gap-6">
        <span
          className="font-display font-semibold leading-none select-none"
          style={{
            fontSize: "clamp(7rem, 22vw, 14rem)",
            color: "var(--color-primary)",
            opacity: 0.85,
            letterSpacing: "-0.04em",
            textShadow: "0 0 80px rgba(43,91,255,.45)",
          }}
        >
          404
        </span>

        <div className="flex flex-col gap-2 max-w-md">
          <h1 className="font-display font-semibold text-[1.6rem] md:text-[2rem] tracking-tight text-ink">
            Esta página no existe — pero tu próximo proyecto sí.
          </h1>
          <p className="text-muted text-[16px] leading-relaxed">
            Volvé al inicio o contactanos directamente.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <PrimaryBtn as="a" href="/">
            Volver al inicio
          </PrimaryBtn>
          <GhostBtn as="a" href="/#contacto">
            Contactanos
          </GhostBtn>
        </div>
      </div>
    </main>
  );
}
