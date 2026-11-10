#!/usr/bin/env node
/**
 * GitHub Pages serves a static 404 for unknown paths. Copying the built
 * index.html to 404.html means a hard refresh on any deep link still boots
 * the SPA, which then routes client-side via the hash.
 */
import { copyFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const dist = join(dirname(fileURLToPath(import.meta.url)), '..', 'dist');
const index = join(dist, 'index.html');
const fallback = join(dist, '404.html');

if (!existsSync(index)) {
  console.error('dist/index.html not found — run `npm run build` first.');
  process.exit(1);
}

copyFileSync(index, fallback);
console.log('✓ dist/404.html written (SPA deep-link fallback)');
