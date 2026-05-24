import { ReactNode } from "react";
import Reveal from "./Reveal";

interface SectionTitleProps {
  eyebrow?: ReactNode;
  title: ReactNode;
  kicker?: ReactNode;
  align?: "left" | "center";
  id?: string;
}

export default function SectionTitle({
  eyebrow,
  title,
  kicker,
  align = "left",
  id,
}: SectionTitleProps) {
  return (
    <div
      id={id}
      className={`flex flex-col gap-4 ${align === "center" ? "items-center text-center" : ""}`}
    >
      {eyebrow && (
        <Reveal>
          <div className="inline-flex items-center gap-2 text-[12px] tracking-[.22em] uppercase text-muted font-mono">
            <span className="w-6 h-px bg-primary/70" />
            <span>{eyebrow}</span>
          </div>
        </Reveal>
      )}
      <Reveal delay={60}>
        <h2
          className="font-display font-semibold tracking-tight text-ink leading-[1.02]"
          style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.75rem)" }}
        >
          {title}
        </h2>
      </Reveal>
      {kicker && (
        <Reveal delay={120}>
          <p
            className={`text-muted text-[17px] leading-relaxed ${
              align === "center" ? "max-w-2xl mx-auto" : "max-w-2xl"
            }`}
          >
            {kicker}
          </p>
        </Reveal>
      )}
    </div>
  );
}
