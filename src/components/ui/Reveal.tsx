"use client";
import {
  ElementType,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  as?: ElementType;
  className?: string;
}

// TODO: migrar a Framer Motion (motion.div con whileInView + variants)
export default function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: RevealProps) {
  const ref = useRef<HTMLElement | null>(null);
  const [seen, setSeen] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            setTimeout(() => setSeen(true), delay);
            io.disconnect();
          }
        });
      },
      { rootMargin: "-8% 0px -8% 0px", threshold: 0.05 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [delay]);

  return (
    <Tag ref={ref as never} className={`reveal ${seen ? "in " : ""}${className}`}>
      {children}
    </Tag>
  );
}
