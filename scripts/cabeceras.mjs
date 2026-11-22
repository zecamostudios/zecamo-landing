// COD-07 (nucleo#32): las cuatro cabeceras de seguridad que toda web de Zecamo tiene que mandar, con el valor
// mínimo de cada una. Una sola lista para la prueba (tests/cabeceras.test.mjs, sobre next.config.ts) y para
// la medición de lo publicado (scripts/probar-cabeceras.mjs). Misma regla que zecamo-sites/scripts/lib/cabeceras.mjs.
const UN_ANIO = 31536000;

export const OBLIGATORIAS = [
  // frame-ancestors no anda en un <meta>: tiene que venir en la cabecera.
  ['Content-Security-Policy', (v) => v.split(';').some((d) => d.trim() === "frame-ancestors 'none'")],
  ['Strict-Transport-Security', (v) => Number(v.match(/max-age=(\d+)/i)?.[1] ?? 0) >= UN_ANIO],
  ['X-Frame-Options', (v) => /^DENY$/i.test(v)],
  ['X-Content-Type-Options', (v) => /^nosniff$/i.test(v)],
];

/** Qué obligatorias faltan o vienen flojas. valor(nombre) → el valor de esa cabecera, o ''/undefined/null. */
export function faltantes(valor) {
  return OBLIGATORIAS.filter(([k, ok]) => !ok(String(valor(k) ?? '').trim())).map(([k]) => k);
}

/** valor(nombre) sobre la lista de headers() de next.config para un `source`, sin distinguir mayúsculas. */
export function desdeNext(reglas, source = '/(.*)') {
  const regla = reglas.find((r) => r.source === source);
  const mapa = new Map((regla?.headers ?? []).map((h) => [h.key.toLowerCase(), h.value]));
  return (k) => mapa.get(k.toLowerCase());
}
