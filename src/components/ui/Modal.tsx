"use client";
import {
  ReactNode,
  useEffect,
  useState,
} from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  ariaLabel?: string;
  hasNav?: boolean;
  onPrev?: () => void;
  onNext?: () => void;
  count?: number;
  activeIndex?: number;
  onJump?: (i: number) => void;
}

// TODO: migrar animaciones a Framer Motion (AnimatePresence + motion.div con variants).
export default function Modal({
  open,
  onClose,
  children,
  ariaLabel,
  hasNav = false,
  onPrev,
  onNext,
  count = 0,
  activeIndex = 0,
  onJump,
}: ModalProps) {
  const [mount, setMount] = useState(open);
  const [anim, setAnim] = useState(false);

  useEffect(() => {
    if (open) {
      setMount(true);
      requestAnimationFrame(() => requestAnimationFrame(() => setAnim(true)));
    } else if (mount) {
      setAnim(false);
      const t = setTimeout(() => setMount(false), 280);
      return () => clearTimeout(t);
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (hasNav && e.key === "ArrowLeft" && onPrev) onPrev();
      if (hasNav && e.key === "ArrowRight" && onNext) onNext();
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, hasNav, onPrev, onNext]);

  if (!mount) return null;

  return (
    <div
      className="fixed inset-0 z-[80] flex items-center justify-center p-3 md:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={ariaLabel}
    >
      <div
        onClick={onClose}
        className={`absolute inset-0 transition-opacity duration-300 ${anim ? "opacity-100" : "opacity-0"}`}
        style={{
          background: "rgba(5,8,18,.7)",
          backdropFilter: "blur(14px)",
          WebkitBackdropFilter: "blur(14px)",
        }}
      />

      {hasNav && (
        <>
          <button
            onClick={onPrev}
            aria-label="Anterior"
            className={`hidden md:flex absolute left-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full items-center justify-center transition-all border border-line bg-bg/70 backdrop-blur-md text-muted hover:text-white hover:border-primary/60 hover:bg-primary/15 ${anim ? "opacity-100" : "opacity-0"}`}
          >
            <ChevronLeft size={18} strokeWidth={2} />
          </button>
          <button
            onClick={onNext}
            aria-label="Siguiente"
            className={`hidden md:flex absolute right-3 top-1/2 -translate-y-1/2 z-10 w-11 h-11 rounded-full items-center justify-center transition-all border border-line bg-bg/70 backdrop-blur-md text-muted hover:text-white hover:border-primary/60 hover:bg-primary/15 ${anim ? "opacity-100" : "opacity-0"}`}
          >
            <ChevronRight size={18} strokeWidth={2} />
          </button>
        </>
      )}

      <div
        className={`relative w-full md:max-w-[960px] md:rounded-[20px] rounded-2xl overflow-hidden border border-primary/30 bg-surface transition-all duration-300 ${anim ? "opacity-100 scale-100" : "opacity-0 scale-[.96]"}`}
        style={{
          maxHeight: "92vh",
          boxShadow:
            "0 0 0 1px rgba(43,91,255,.4), 0 40px 120px -20px rgba(0,0,0,.7), 0 0 140px -20px rgba(43,91,255,.45)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full border border-line bg-bg/70 backdrop-blur-md text-muted hover:text-white hover:border-primary/60 hover:bg-primary/10 transition flex items-center justify-center"
        >
          <X size={16} strokeWidth={2} />
        </button>

        <div className="overflow-y-auto" style={{ maxHeight: "92vh" }}>
          {children}

          {hasNav && count > 1 && (
            <div className="px-6 md:px-10 pb-6 pt-2 flex items-center justify-between gap-4 border-t border-line/70">
              <button
                onClick={onPrev}
                aria-label="Anterior"
                className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-line bg-bg/40 text-muted hover:text-white hover:border-primary/60 transition"
              >
                <ChevronLeft size={16} strokeWidth={2} />
              </button>

              <div className="flex items-center gap-2 mx-auto">
                <span className="text-[12px] font-mono tracking-[.18em] uppercase text-muted mr-2">
                  {String(activeIndex + 1).padStart(2, "0")} /{" "}
                  {String(count).padStart(2, "0")}
                </span>
                {Array.from({ length: count }).map((_, i) => (
                  <button
                    key={i}
                    aria-label={`Ir al ${i + 1}`}
                    onClick={() => onJump?.(i)}
                    className="group p-1"
                  >
                    <span
                      className={`block rounded-full transition-all ${
                        i === activeIndex
                          ? "w-6 h-1.5 bg-primary"
                          : "w-1.5 h-1.5 bg-muted/40 group-hover:bg-muted/80"
                      }`}
                      style={
                        i === activeIndex
                          ? { boxShadow: "0 0 10px rgba(43,91,255,.6)" }
                          : {}
                      }
                    />
                  </button>
                ))}
              </div>

              <button
                onClick={onNext}
                aria-label="Siguiente"
                className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full border border-line bg-bg/40 text-muted hover:text-white hover:border-primary/60 transition"
              >
                <ChevronRight size={16} strokeWidth={2} />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function ModalSection({
  title,
  children,
  className = "",
}: {
  title: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mt-10 pt-8 border-t border-line/70 ${className}`}>
      <div className="font-mono text-[11px] tracking-[.22em] uppercase text-muted mb-4">
        {title}
      </div>
      {children}
    </div>
  );
}
