// npm test (node --test "tests/**/*.test.mjs")
// COD-07 (nucleo#32): next.config.ts manda las cuatro cabeceras a TODAS las rutas. Si alguien saca o afloja una,
// esta prueba se pone roja. El control (cada una sacada de a una) prueba que la prueba mide.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import config from '../next.config.ts';
import { OBLIGATORIAS, faltantes, desdeNext } from '../scripts/cabeceras.mjs';

const reglas = await config.headers();
const todas = reglas.find((r) => r.source === '/(.*)');

test('hay una regla de cabeceras para todas las rutas', () => {
  assert.ok(todas, 'falta la regla source: "/(.*)" en headers()');
});

test('next.config.ts manda las cuatro de COD-07', () => {
  assert.deepEqual(faltantes(desdeNext(reglas)), []);
});

for (const [nombre] of OBLIGATORIAS) {
  test(`control: sin ${nombre}, la prueba se pone roja`, () => {
    const sin = [{ source: '/(.*)', headers: todas.headers.filter((h) => h.key.toLowerCase() !== nombre.toLowerCase()) }];
    assert.deepEqual(faltantes(desdeNext(sin)), [nombre]);
  });
}

test('control: valores flojos no pasan', () => {
  const flojo = { 'Content-Security-Policy': "default-src 'self'; frame-ancestors 'self'", 'Strict-Transport-Security': 'max-age=0',
    'X-Frame-Options': 'SAMEORIGIN', 'X-Content-Type-Options': 'sniff' };
  assert.deepEqual(faltantes((k) => flojo[k]), OBLIGATORIAS.map(([k]) => k));
});

test('lo de hoy en producción (20/11: SAMEORIGIN y sin frame-ancestors) no pasa', () => {
  const vivo = { 'Content-Security-Policy': "default-src 'self'; script-src 'self'", 'Strict-Transport-Security': 'max-age=63072000',
    'X-Frame-Options': 'SAMEORIGIN', 'X-Content-Type-Options': 'nosniff' };
  assert.deepEqual(faltantes((k) => vivo[k]), ['Content-Security-Policy', 'X-Frame-Options']);
});
