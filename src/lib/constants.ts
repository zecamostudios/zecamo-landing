// src/lib/constants.ts

// ── WhatsApp ───────────────────────────────────────────────
// Número local 3814405615 → internacional WhatsApp 54 9 381 440 5615
export const WHATSAPP_NUMBER = "5493814405615";
const WHATSAPP_MSG = "Hola Zecamo 👋 Quiero que me ayuden con mi negocio.";
export const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MSG)}`;

// ── Dashboard demo (inventado, provisorio) ─────────────────
export type KpiFormat = "ars" | "int" | "pct";
export interface Kpi {
  label: string;
  to: number;
  format: KpiFormat;
  delta: string;
  up: boolean;
}

export const DASHBOARD_NAV = ["Analytics", "Chatbot", "Pipeline", "Clientes", "Stock"];

export const DASHBOARD_KPIS: Kpi[] = [
  { label: "Ingresos del mes", to: 1840000, format: "ars", delta: "+12%", up: true },
  { label: "Clientes nuevos",  to: 47,      format: "int", delta: "+8%",  up: true },
  { label: "Pedidos activos",  to: 23,      format: "int", delta: "-3%",  up: false },
  { label: "Conversión",       to: 68,      format: "pct", delta: "+5%",  up: true },
];

export interface Source { label: string; pct: number; color: string; }
export const DASHBOARD_SOURCES: Source[] = [
  { label: "Directo",  pct: 42, color: "#2B5BFF" },
  { label: "Orgánico", pct: 29, color: "#4F7BFF" },
  { label: "Referidos", pct: 18, color: "#7E9BFF" },
  { label: "Otros",    pct: 11, color: "#243460" },
];

// Puntos del gráfico de línea (0–100 en X y en Y, Y invertido al renderizar)
export const DASHBOARD_TREND = [8, 18, 14, 30, 26, 42, 38, 55, 60, 72, 68, 86];

export function formatKpi(v: number, format: KpiFormat): string {
  if (format === "ars") return "$" + Math.round(v).toLocaleString("es-AR");
  if (format === "pct") return Math.round(v) + "%";
  return Math.round(v).toLocaleString("es-AR");
}
