"use client";
import { useEffect, useState } from "react";
import { MessageCircle } from "lucide-react";

export default function StickyContactCTA() {
  const [visible, setVisible] = useState(false);
  const [isHidden, setIsHidden] = useState(false);

  // Aparece después de scrollear 560px / 70vh
  useEffect(() => {
    const onScroll = () => {
      const threshold = Math.max(560, window.innerHeight * 0.7);
      setVisible(window.scrollY > threshold);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Se oculta cuando el formulario de contacto o el footer entran al viewport
  useEffect(() => {
    const target =
      document.getElementById("contacto") ?? document.querySelector("footer");
    if (!target) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsHidden(entry.isIntersecting),
      { threshold: 0.1 },
    );

    observer.observe(target);
    return () => observer.disconnect();
  }, []);

  const show = visible && !isHidden;

  return (
    <a
      href="#contacto"
      aria-label="Hablemos"
      className={`fixed z-40 bottom-5 right-5 md:bottom-7 md:right-7 inline-flex items-center gap-2 rounded-full bg-primary hover:bg-primary-hover px-5 py-3 md:px-6 md:py-3.5 font-display font-medium text-[14px] md:text-[15px] tracking-tight text-white transition-all duration-300 cta-glow ${
        show
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-6 pointer-events-none"
      }`}
      style={{
        boxShadow:
          "0 0 0 1px rgba(255,255,255,.08), 0 18px 50px -15px rgba(43,91,255,.7), 0 0 80px -10px rgba(43,91,255,.55)",
      }}
    >
      <MessageCircle size={16} strokeWidth={2} />
      <span>Hablemos</span>
    </a>
  );
}
