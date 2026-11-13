import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { fileURLToPath, URL } from 'node:url';

/**
 * Build a single self-contained index.html that runs from the file system.
 *
 * The normal build (`npm run build`) produces a `dist/` folder whose index.html
 * references `/assets/index-*.js`. That only works when served over HTTP from a
 * server root: opening it with a double-click resolves `/assets/...` to the root
 * of the hard drive and the page stays blank.
 *
 * This config inlines every script and stylesheet into the HTML and uses
 * relative asset paths, so the result can be opened directly from disk.
 *
 * Known limits, by design:
 * - Hash routing works (the app already uses HashRouter), so deep links and the
 *   back button still behave.
 * - Live rates need `fetch`, which works from file:// in the browsers that
 *   allow it, but the rate APIs may refuse cross-origin requests from a null
 *   origin. The app falls back to its bundled snapshot and says so in the
 *   header. To guarantee live data, serve the folder instead: `npm run preview`.
 */
export default defineConfig({
  base: './',
  plugins: [react(), viteSingleFile({ removeViteModuleLoader: true })],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  build: {
    outDir: 'standalone',
    // Emitted as a plain <script>, not <script type="module">, so file:// treats
    // it as a classic inline script.
    modulePreload: false,
    sourcemap: false,
    // One chunk, no separate CSS file: both are inlined into the HTML.
    cssCodeSplit: false,
    assetsInlineLimit: 100_000_000,
    rollupOptions: {
      output: {
        // A classic script instead of an ES module: module scripts are also
        // subject to the null origin that file:// gives you, whereas a plain
        // inline script is not. It also keeps the result runnable in older
        // browsers and in headless DOMs used for testing.
        format: 'iife',
        inlineDynamicImports: true,
      },
    },
  },
});
