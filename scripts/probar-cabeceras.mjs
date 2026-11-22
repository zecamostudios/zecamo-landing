// node scripts/probar-cabeceras.mjs [--url https://www.zecamostudios.com]
// COD-07: mide lo SERVIDO (no la config) en la home, una ruta que no existe y /privacy. Solo lectura.
// Sale con 1 si a alguna le falta una de las cuatro. Para después de que Vercel publique main.
import { parseArgs } from 'node:util';
import { OBLIGATORIAS, faltantes } from './cabeceras.mjs';

const { values } = parseArgs({ options: { url: { type: 'string', default: 'https://www.zecamostudios.com' } } });
const base = values.url.replace(/\/$/, '');
let mal = 0;
for (const ruta of ['/', '/no-existe-cod07', '/privacy']) {
  const r = await fetch(base + ruta, { redirect: 'manual' });
  const faltan = faltantes((k) => r.headers.get(k));
  mal += faltan.length;
  console.log(`${faltan.length ? '✗' : '✓'} ${ruta} (${r.status}): ${OBLIGATORIAS.length - faltan.length}/${OBLIGATORIAS.length}${faltan.length ? ` — falta ${faltan.join(', ')}` : ''}`);
}
process.exitCode = mal ? 1 : 0;
