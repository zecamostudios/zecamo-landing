import Image from "next/image";
import Reveal from "@/components/ui/Reveal";
import SectionTitle from "@/components/ui/SectionTitle";

interface Step { n: string; title: string; desc: string; }

const STEPS: Step[] = [
  { n: "01", title: "Diagnosticamos", desc: "Mapeamos tus procesos y encontramos dónde la IA mete diferencia real." },
  { n: "02", title: "Construimos",    desc: "Diseñamos, codeamos y deployamos la solución. Sprints cortos, sin sorpresas." },
  { n: "03", title: "Operamos",       desc: "Monitoreamos, optimizamos y escalamos según uso real." },
];

function StepCompact({ s, i }: { s: Step; i: number }) {
  return (
    <Reveal delay={i * 100} className="relative">
      <div
        className="absolute -top-4 -left-3 w-[120px] h-[120px] opacity-[.08] pointer-events-none select-none"
        aria-hidden
      >
        <Image
          src="/brand/logo-z.png"
          alt=""
          width={120}
          height={120}
          quality={85}
          style={{ width: "100%", height: "100%", objectFit: "contain", mixBlendMode: "screen" }}
        />
      </div>

      <div className="relative">
        <div
          className="font-display font-semibold text-primary tracking-tight leading-none"
          style={{ fontSize: "clamp(3.2rem, 6vw, 5rem)" }}
        >
          {s.n}
        </div>
        <h3 className="mt-4 font-display font-semibold text-[22px] md:text-[24px] tracking-tight">
          {s.title}
        </h3>
        <p className="mt-2 text-muted text-[15px] leading-relaxed max-w-[36ch]">{s.desc}</p>
      </div>
    </Reveal>
  );
}

export default function Method() {
  return (
    <section id="metodo" className="relative py-20 md:py-24 overflow-hidden">
      <div className="relative max-w-[1280px] mx-auto px-5 md:px-8">
        <SectionTitle
          eyebrow="Método · ZCM-03"
          title={
            <>
              Diagnosticamos · Construimos · <span className="text-primary">Operamos</span>.
            </>
          }
        />

        <div className="mt-12 md:mt-14 grid md:grid-cols-3 gap-x-8 gap-y-10 md:gap-x-12">
          {STEPS.map((s, i) => (
            <StepCompact key={s.n} s={s} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
