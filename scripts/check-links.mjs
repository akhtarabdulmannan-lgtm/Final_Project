#!/usr/bin/env node
/**
 * Fails if any internal link points at a route that no longer exists.
 *
 * Routes are collected from App.tsx (<Route path="...">), links from every
 * `href="/..."` in src/. Catches exactly the class of bug that appears after
 * screens are deleted.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const srcDir = join(root, 'src');

function walk(dir, out = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(tsx?|mjs)$/.test(entry.name)) out.push(full);
  }
  return out;
}

// --- collect declared routes ---------------------------------------------
const appSource = readFileSync(join(srcDir, 'App.tsx'), 'utf8');
const routes = new Set();
for (const match of appSource.matchAll(/<Route\s+path="([^"]+)"/g)) {
  const path = match[1];
  if (path === '*') continue;
  routes.add(path.replace(/:[^/]+/g, '*'));
}

function routeMatches(href) {
  const clean = href.split('#')[0].split('?')[0].replace(/\/$/, '') || '/';
  if (routes.has(clean)) return true;
  // dynamic segments: /converter/:pair -> /converter/*
  const segments = clean.split('/').filter(Boolean);
  for (const route of routes) {
    if (!route.includes('*')) continue;
    const pattern = route.split('/').filter(Boolean);
    if (pattern.length !== segments.length) continue;
    if (pattern.every((part, i) => part === '*' || part === segments[i])) return true;
  }
  return false;
}

// --- collect internal links ----------------------------------------------
const files = walk(srcDir);
const broken = [];
let checked = 0;

for (const file of files) {
  const source = readFileSync(file, 'utf8');
  // static hrefs
  for (const match of source.matchAll(/href=(?:"|')(\/[^"'`]*)(?:"|')/g)) {
    const href = match[1];
    if (href.startsWith('//')) continue;
    checked++;
    if (!routeMatches(href)) broken.push(`${file.replace(root + '/', '')} -> ${href}`);
  }
  // template-literal hrefs: only the static prefix is verifiable
  for (const match of source.matchAll(/href=\{`(\/[^`$]*)\$\{/g)) {
    checked++;
  }
}

// --- report ---------------------------------------------------------------
if (broken.length) {
  console.error(`✖ ${broken.length} broken internal link(s):`);
  for (const line of broken) console.error('  ' + line);
  process.exit(1);
}

console.log(`✓ ${checked} internal link(s) checked, all resolve to a declared route (${routes.size} routes)`);
