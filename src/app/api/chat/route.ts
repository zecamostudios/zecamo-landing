import { NextRequest, NextResponse } from "next/server";

export const runtime = "nodejs";

const SYSTEM = `Sos el asistente virtual de Zecamo Studios, una agencia argentina de IA, automatización y desarrollo a medida.

Tono: español rioplatense, cercano y claro. Respuestas CORTAS (2 a 4 oraciones máximo). Nada de párrafos largos.

Qué hace Zecamo:
- Automatización con IA (workflows con n8n: leads, emails, reportes, sincronización entre apps).
- Webs, tiendas y software a medida (rápido, profesional, pensado para vender).
- Agentes de IA que atienden por WhatsApp, web y email (responden, califican, agendan).
- Dashboards y CRM a medida (todo el negocio en una pantalla, datos en tiempo real).
- Integraciones entre sistemas y reportes automáticos.

Cómo trabajás:
- Escuchás qué hace el visitante y qué problema tiene, y le explicás en criollo qué solución le conviene.
- Siempre orientás a dejar la consulta por WhatsApp para una propuesta concreta o una llamada corta.
- NO inventes precios exactos. Si preguntan, decí que depende del alcance y que en una llamada de 15 min se cotiza.
- Si preguntan algo que no tiene que ver con Zecamo, redirigí amablemente al tema.`;

interface InMsg { role: "user" | "assistant"; content: string }

export async function POST(req: NextRequest) {
  let messages: InMsg[] = [];
  try {
    const body = await req.json();
    messages = Array.isArray(body?.messages) ? body.messages.slice(-10) : [];
  } catch {
    return NextResponse.json({ reply: "No te entendí, ¿lo repetís?" });
  }

  const key = process.env.OPENAI_API_KEY;
  if (!key) {
    return NextResponse.json({
      reply:
        "El chat con IA todavía no está conectado (falta cargar la API key). Mientras tanto, escribinos por WhatsApp y te respondemos al toque 🙌",
    });
  }

  try {
    const r = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${key}` },
      body: JSON.stringify({
        model: process.env.OPENAI_MODEL || "gpt-4o-mini",
        temperature: 0.6,
        max_tokens: 320,
        messages: [{ role: "system", content: SYSTEM }, ...messages],
      }),
    });

    if (!r.ok) {
      console.error("[chat] OpenAI error:", await r.text());
      return NextResponse.json({
        reply: "Uy, tuve un problema para responder. Probá de nuevo o escribinos por WhatsApp 🙏",
      });
    }

    const data = await r.json();
    const reply: string = data?.choices?.[0]?.message?.content?.trim() || "…";
    return NextResponse.json({ reply });
  } catch (err) {
    console.error("[chat] error:", err);
    return NextResponse.json({
      reply: "Uy, se me cruzaron los cables. Escribinos por WhatsApp y lo vemos 🙌",
    });
  }
}
