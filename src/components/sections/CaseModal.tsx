"use client";
import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import Modal, { ModalSection } from "@/components/ui/Modal";
import PrimaryBtn from "@/components/ui/PrimaryBtn";
import { CaseImageBare } from "./Cases";

export interface Project {
  id: string;
  category: string;
  longTag: string;
  name: string;
  desc: string;
  subtitle: string;
  chips: string[];
  fullStack: string[];
  challenge: string;
  built: { publico: string[]; backoffice: string[] };
  url: string;
  domain: string;
  image: string;
  alt: string;
  imagePosition?: string;
  imageZoom?: number;
}

interface CaseModalProps {
  projects: Project[];
  activeIndex: number;
  onClose: () => void;
  onChange: (i: number) => void;
}

function SubBuilt({
  title, items, highlight = false,
}: { title: string; items: string[]; highlight?: boolean }) {
  return (
    <div
      className={`rounded-2xl p-5 md:p-6 border ${
        highlight ? "border-primary/40 bg-primary/[.06]" : "border-line/80 bg-bg/40"
      }`}
      style={highlight ? { boxShadow: "0 0 30px -10px rgba(43,91,255,.25) inset" } : {}}
    >
      <div className="font-display text-[16px] tracking-tight font-semibold text-primary mb-3">
        {title}
      </div>
      <ul className="space-y-2.5">
        {items.map((it, i) => (
          <li key={i} className="flex items-start gap-2.5 text-[14px] text-ink/90 leading-relaxed">
            <span
              className="mt-[7px] inline-block w-1.5 h-1.5 rounded-full bg-primary shrink-0"
              style={{ boxShadow: "0 0 8px rgba(43,91,255,.55)" }}
            />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CaseContent({ p }: { p: Project }) {
  return (
    <div className="px-6 md:px-10 pt-10 md:pt-12 pb-8 md:pb-10">
      <div className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/[.08] px-3 py-1.5">
        <span className="w-1.5 h-1.5 rounded-full bg-primary" />
        <span className="font-mono text-[11px] tracking-[.18em] uppercase text-primary">
          {p.longTag}
        </span>
      </div>

      <h2
        className="mt-5 font-display font-semibold tracking-tight leading-[1.02]"
        style={{ fontSize: "clamp(2rem, 5vw, 3.4rem)" }}
      >
        {p.name}
      </h2>
      <p className="mt-3 text-[17px] md:text-[18px] text-muted leading-relaxed max-w-2xl">
        {p.subtitle}
      </p>

      <div className="mt-8">
        <CaseImageBare src={p.image} alt={p.alt} />
      </div>

      <ModalSection title="El desafío">
        <p className="text-muted text-[15.5px] leading-relaxed max-w-[68ch]">{p.challenge}</p>
      </ModalSection>

      <ModalSection title="Lo que construimos">
        <div className="grid md:grid-cols-2 gap-5 md:gap-6">
          <SubBuilt title="Sitio público" items={p.built.publico} />
          <SubBuilt title="Backoffice / Panel interno" items={p.built.backoffice} highlight />
        </div>
      </ModalSection>

      <ModalSection title="Stack">
        <div className="flex flex-wrap gap-2">
          {p.fullStack.map((s, si) => (
            <span
              key={si}
              className="inline-flex items-center gap-1.5 rounded-full border border-line bg-bg/40 px-3 py-1.5 text-[12.5px] text-ink/90 font-mono"
            >
              <span className="w-1 h-1 rounded-full bg-primary" /> {s}
            </span>
          ))}
        </div>
      </ModalSection>

      <div className="mt-10 flex flex-col sm:flex-row gap-3">
        <PrimaryBtn
          as="a"
          href={p.url}
          target="_blank"
          rel="noopener noreferrer"
          className="!px-6 !py-3"
          icon={<ArrowUpRight size={14} strokeWidth={2} />}
        >
          Ver sitio en vivo
        </PrimaryBtn>
      </div>
    </div>
  );
}

export default function CaseModal({
  projects, activeIndex, onClose, onChange,
}: CaseModalProps) {
  const open = activeIndex >= 0;
  const [fading, setFading] = useState(false);
  const count = projects.length;
  const p = open ? projects[activeIndex] : null;

  const goto = (i: number) => {
    const next = ((i % count) + count) % count;
    if (next === activeIndex) return;
    setFading(true);
    setTimeout(() => {
      onChange(next);
      requestAnimationFrame(() => requestAnimationFrame(() => setFading(false)));
    }, 180);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      ariaLabel={p ? `Caso: ${p.name}` : "Caso"}
      hasNav
      count={count}
      activeIndex={activeIndex < 0 ? 0 : activeIndex}
      onPrev={() => goto(activeIndex - 1)}
      onNext={() => goto(activeIndex + 1)}
      onJump={goto}
    >
      <div className="transition-opacity duration-200" style={{ opacity: fading ? 0 : 1 }}>
        {p && <CaseContent p={p} />}
      </div>
    </Modal>
  );
}
