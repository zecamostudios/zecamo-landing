import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { ContactSchema } from "@/lib/validations/contact";
import { createServiceClient } from "@/lib/supabase/server";

// In-memory rate limiter (resets on cold start — acceptable for basic spam prevention)
const rateMap = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT = 5;
const RATE_WINDOW_MS = 10 * 60 * 1000;

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;");
}

export async function POST(req: NextRequest) {
  // ── Rate limiting ───────────────────────────────────────────
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "anonymous";
  const now = Date.now();
  const entry = rateMap.get(ip);

  if (entry && now < entry.resetAt) {
    if (entry.count >= RATE_LIMIT) {
      return NextResponse.json(
        { error: "Demasiadas solicitudes. Intentá de nuevo en 10 minutos." },
        { status: 429 }
      );
    }
    entry.count++;
  } else {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
  }

  // ── Parse + validate ────────────────────────────────────────
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Solicitud inválida" }, { status: 400 });
  }

  const parsed = ContactSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Datos inválidos", details: parsed.error.flatten() },
      { status: 422 }
    );
  }

  const { nombre, email, empresa, servicio, mensaje } = parsed.data;
  const safe = {
    nombre:   escapeHtml(nombre),
    email:    escapeHtml(email),
    empresa:  escapeHtml(empresa),
    servicio: escapeHtml(servicio),
    mensaje:  escapeHtml(mensaje),
  };
  const userAgent = req.headers.get("user-agent") ?? "";

  let dbOk = false;
  let emailOk = false;

  // ── 1. Supabase INSERT ──────────────────────────────────────
  try {
    const supabase = createServiceClient();
    const { error } = await supabase.from("leads").insert({
      name:          nombre,
      email,
      company:       empresa,
      message:       mensaje,
      service:       servicio,
      consent_given: true,
      ip,
      user_agent:    userAgent,
    });
    if (error) console.error("[contact] Supabase error:", error);
    else dbOk = true;
  } catch (err) {
    console.error("[contact] Supabase exception:", err);
  }

  // ── 2. Resend email ─────────────────────────────────────────
  try {
    const resend = new Resend(process.env.RESEND_API_KEY!);
    const fromEmail =
      process.env.RESEND_FROM_EMAIL ?? "hola@zecamostudios.com";
    const toEmail =
      process.env.RESEND_TO_EMAIL ?? "joaquincajal85@gmail.com";

    const { error } = await resend.emails.send({
      from:    `Zecamo Studios <${fromEmail}>`,
      to:      [toEmail],
      replyTo: email,
      subject: `[Zecamo] Nuevo lead: ${safe.nombre} — ${safe.empresa}`,
      html: `
<div style="font-family:system-ui,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#111;">
  <h2 style="color:#2B5BFF;margin-bottom:20px;">Nuevo contacto desde Zecamo Studios</h2>
  <table style="width:100%;border-collapse:collapse;">
    <tr>
      <td style="padding:8px 0;color:#666;width:110px;vertical-align:top;">Nombre</td>
      <td style="padding:8px 0;font-weight:600;">${safe.nombre}</td>
    </tr>
    <tr>
      <td style="padding:8px 0;color:#666;vertical-align:top;">Email</td>
      <td style="padding:8px 0;">
        <a href="mailto:${safe.email}" style="color:#2B5BFF;">${safe.email}</a>
      </td>
    </tr>
    <tr>
      <td style="padding:8px 0;color:#666;vertical-align:top;">Empresa</td>
      <td style="padding:8px 0;">${safe.empresa}</td>
    </tr>
    <tr>
      <td style="padding:8px 0;color:#666;vertical-align:top;">Servicio</td>
      <td style="padding:8px 0;">${safe.servicio}</td>
    </tr>
  </table>
  <div style="margin-top:20px;padding:16px;background:#f5f7ff;border-radius:8px;border-left:3px solid #2B5BFF;">
    <p style="margin:0;white-space:pre-wrap;color:#333;">${safe.mensaje}</p>
  </div>
  <p style="margin-top:20px;font-size:12px;color:#999;">IP: ${ip} · Servicio: ${safe.servicio}</p>
</div>`,
    });

    if (error) console.error("[contact] Resend error:", error);
    else emailOk = true;
  } catch (err) {
    console.error("[contact] Resend exception:", err);
  }

  // ── Fault tolerance: at least one backend succeeded ─────────
  if (!dbOk && !emailOk) {
    return NextResponse.json(
      {
        error:
          "No se pudo procesar tu mensaje. Escribinos directamente a hola@zecamostudios.com.",
      },
      { status: 500 }
    );
  }

  return NextResponse.json({ ok: true });
}
