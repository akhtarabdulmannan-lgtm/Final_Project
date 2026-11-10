import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

/**
 * Asset base path.
 *
 * GitHub Pages serves this repo from /Final_Project/, so that prefix is the
 * production default. Hosts that serve from the domain root (Vercel, previews)
 * set VITE_BASE=/ in their environment. `npm run dev` always uses the root.
 */
const REPO_NAME = 'Final_Project';
const buildBase = process.env.VITE_BASE ?? `/${REPO_NAME}/`;

export default defineConfig(({ command }) => ({
  base: command === 'build' ? buildBase : '/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    host: '0.0.0.0',
    // Allows preview/dev hosts outside localhost (sandbox preview domains).
    allowedHosts: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
}));
