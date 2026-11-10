import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';

/**
 * The production build is served from https://<user>.github.io/Final_Project/,
 * so assets need that prefix. During `npm run dev` the app is served from the
 * root instead, which keeps local URLs short and predictable.
 */
const REPO_NAME = 'Final_Project';

export default defineConfig(({ command }) => ({
  base: command === 'build' ? `/${REPO_NAME}/` : '/',
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
