import { ArrowLeft } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface LegalPageProps {
  eyebrow: string;
  content: string;
  backLinks: { href: string; label: string }[];
}

export default function LegalPage({ eyebrow, content, backLinks }: LegalPageProps) {
  return (
    <main className="min-h-screen bg-bg py-24 px-5 md:px-8">
      <div className="max-w-3xl mx-auto">
        <a
          href="/"
          className="inline-flex items-center gap-2 text-muted hover:text-primary transition text-[14px] mb-10"
        >
          <ArrowLeft size={14} strokeWidth={2} /> Volver al inicio
        </a>

        <div className="font-mono text-[11px] tracking-[.22em] uppercase text-muted mb-8">
          Legal · {eyebrow}
        </div>

        <article className="prose prose-invert prose-headings:font-display prose-headings:tracking-tight prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-hr:border-line prose-strong:text-ink prose-code:text-primary/90 max-w-none text-[15.5px] leading-relaxed">
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{content}</ReactMarkdown>
        </article>

        <div className="mt-16 pt-8 border-t border-line/60 text-[13px] text-muted/70 font-mono flex flex-wrap gap-x-3 gap-y-1">
          <span>© {new Date().getFullYear()} Zecamo Studios · Argentina</span>
          {backLinks.map((l) => (
            <a key={l.href} href={l.href} className="hover:text-primary transition">
              · {l.label}
            </a>
          ))}
        </div>
      </div>
    </main>
  );
}
