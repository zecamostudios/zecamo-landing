"use client";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, X, SendHorizontal, Sparkles } from "lucide-react";
import { WHATSAPP_URL } from "@/lib/constants";

type Msg = { role: "user" | "assistant"; content: string };
const GREETING =
  "¡Hola! 👋 Soy el asistente de Zecamo. Contame qué hacés o qué te gustaría automatizar y te digo cómo te podemos ayudar.";
const SUGGEST = ["Tengo un gym", "Quiero un bot de WhatsApp", "¿Cuánto cuesta una web?"];

export default function AiChat() {
  const [open, setOpen] = useState(false);
  const [msgs, setMsgs] = useState<Msg[]>([{ role: "assistant", content: GREETING }]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, loading, open]);

  async function send(text: string) {
    const t = text.trim();
    if (!t || loading) return;
    const next: Msg[] = [...msgs, { role: "user", content: t }];
    setMsgs(next);
    setInput("");
    setLoading(true);
    try {
      const r = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next.slice(-10) }),
      });
      const data = await r.json();
      setMsgs((m) => [...m, { role: "assistant", content: data.reply ?? "…" }]);
    } catch {
      setMsgs((m) => [...m, { role: "assistant", content: "Uy, no pude responder. Escribinos por WhatsApp 🙌" }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {/* botón flotante */}
      <button
        onClick={() => setOpen(true)}
        aria-label="Hablá con la IA"
        className={`fixed z-[1200] bottom-5 right-5 md:bottom-7 md:right-7 inline-flex items-center gap-2 rounded-full bg-primary hover:bg-primary-hover pl-4 pr-5 py-3.5 text-white font-display font-medium text-[14px] cta-glow transition-all duration-300 ${
          open ? "opacity-0 pointer-events-none translate-y-4" : "opacity-100"
        }`}
        style={{ boxShadow: "0 18px 50px -15px rgba(43,91,255,.7), 0 0 80px -10px rgba(43,91,255,.55)" }}
      >
        <Sparkles size={18} strokeWidth={2} />
        Hablá con la IA
      </button>

      {/* panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.22, ease: [0.2, 0.7, 0.2, 1] }}
            className="fixed z-[1200] bottom-5 right-5 md:bottom-7 md:right-7 w-[calc(100vw-2.5rem)] max-w-[380px] h-[min(72vh,560px)] flex flex-col rounded-2xl border border-line overflow-hidden"
            style={{ background: "var(--color-surface)", boxShadow: "0 30px 80px -20px rgba(0,0,0,.85), 0 0 60px -20px rgba(43,91,255,.4)" }}
          >
            {/* header */}
            <div className="flex items-center gap-2.5 px-4 py-3 border-b border-line" style={{ background: "var(--color-surface2)" }}>
              <span className="w-8 h-8 rounded-full bg-primary/20 border border-primary/40 flex items-center justify-center">
                <Bot size={16} className="text-primary" />
              </span>
              <div className="leading-tight flex-1">
                <div className="text-[13px] font-semibold text-ink">Asistente Zecamo</div>
                <div className="text-[10px] text-[#22C55E] flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#22C55E]" /> IA en línea
                </div>
              </div>
              <button onClick={() => setOpen(false)} aria-label="Cerrar" className="text-muted hover:text-ink transition-colors">
                <X size={18} />
              </button>
            </div>

            {/* mensajes */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 flex flex-col gap-2.5">
              {msgs.map((m, i) => (
                <div key={i}
                  className={`max-w-[85%] px-3 py-2 text-[13.5px] leading-snug rounded-2xl whitespace-pre-wrap ${
                    m.role === "user" ? "self-end bg-primary text-white rounded-br-sm" : "self-start text-ink rounded-bl-sm"
                  }`}
                  style={m.role === "user" ? {} : { background: "var(--color-surface2)" }}>
                  {m.content}
                </div>
              ))}
              {loading && (
                <div className="self-start flex gap-1 px-3 py-2.5 rounded-2xl" style={{ background: "var(--color-surface2)" }}>
                  {[0, 1, 2].map((i) => (
                    <motion.span key={i} className="w-1.5 h-1.5 rounded-full bg-muted"
                      animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity, delay: i * 0.2 }} />
                  ))}
                </div>
              )}
              {/* sugerencias (solo al inicio) */}
              {msgs.length === 1 && !loading && (
                <div className="flex flex-wrap gap-1.5 mt-1">
                  {SUGGEST.map((s) => (
                    <button key={s} onClick={() => send(s)}
                      className="rounded-full border border-line px-2.5 py-1 text-[12px] text-muted hover:text-ink hover:border-primary/50 transition-colors">
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* input */}
            <div className="border-t border-line p-2.5">
              <div className="flex items-center gap-2">
                <input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") send(input); }}
                  placeholder="Escribí tu consulta…"
                  className="field !py-2.5 !text-[13.5px] flex-1"
                />
                <button onClick={() => send(input)} disabled={loading || !input.trim()} aria-label="Enviar"
                  className="w-10 h-10 shrink-0 rounded-xl bg-primary hover:bg-primary-hover disabled:opacity-50 flex items-center justify-center text-white transition-colors">
                  <SendHorizontal size={16} />
                </button>
              </div>
              <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer"
                className="block text-center text-[11px] text-muted/70 hover:text-primary mt-2 transition-colors">
                o hablá directo por WhatsApp →
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
