#!/usr/bin/env node
/**
 * One-off codemod: Next.js App Router screens -> plain React Router screens.
 *
 * - drops the `'use client'` directive (meaningless outside Next)
 * - swaps next/link, next/navigation hooks for the local shims
 * - strips App Router special files (loading.tsx, sitemap.ts, robots.ts)
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..', 'src');
const dirs = ['routes', 'components', 'hooks', 'lib'];

function walk(dir, out = []) {
  if (!fs.existsSync(dir)) return out;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, out);
    else if (/\.(tsx?|jsx?)$/.test(entry.name)) out.push(full);
  }
  return out;
}

const report = { link: 0, params: 0, router: 0, useClient: 0, deleted: [] };

for (const d of dirs) {
  for (const file of walk(path.join(ROOT, d))) {
    // App Router special files have no meaning in a client-only SPA.
    if (/\/(loading|robots|sitemap)\.tsx?$/.test(file)) {
      fs.unlinkSync(file);
      report.deleted.push(path.relative(ROOT, file));
      continue;
    }

    let src = fs.readFileSync(file, 'utf8');
    const before = src;

    src = src.replace(/^['"]use client['"];\r?\n(\r?\n)?/m, '');
    if (src !== before) report.useClient++;

    src = src.replace(/from ['"]next\/link['"]/g, "from '@/router/Link'");
    if (src.includes("@/router/Link")) report.link++;

    src = src.replace(
      /import\s*\{\s*useParams\s*\}\s*from\s*['"]next\/navigation['"];?/g,
      "import { useParams } from '@/router/hooks';"
    );
    src = src.replace(
      /import\s*\{\s*useRouter\s*\}\s*from\s*['"]next\/navigation['"];?/g,
      "import { useRouter } from '@/router/hooks';"
    );
    if (src.includes("@/router/hooks")) report.params++;

    fs.writeFileSync(file, src);
  }
}

console.log(JSON.stringify(report, null, 2));
