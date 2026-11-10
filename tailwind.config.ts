import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: 'var(--bg)',
        surface: {
          DEFAULT: 'var(--surface)',
          subtle: 'var(--surface-subtle)',
          invert: 'var(--surface-invert)',
        },
        ink: {
          DEFAULT: 'var(--ink)',
          700: 'var(--ink-700)',
          500: 'var(--ink-500)',
          invert: 'var(--ink-invert)',
          'invert-muted': 'var(--ink-invert-muted)',
        },
        line: {
          DEFAULT: 'var(--line)',
          strong: 'var(--line-strong)',
          invert: 'var(--line-invert)',
        },
        primary: {
          DEFAULT: 'var(--accent)',
          hover: 'var(--accent-hover)',
          subtle: 'var(--accent-subtle)',
          fg: 'var(--accent-fg)',
        },
        gain: {
          DEFAULT: 'var(--gain)',
          bg: 'var(--gain-bg)',
          border: 'var(--gain-border)',
        },
        loss: {
          DEFAULT: 'var(--loss)',
          bg: 'var(--loss-bg)',
          border: 'var(--loss-border)',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-inter-tight)', 'system-ui', 'sans-serif'],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
      },
      transitionTimingFunction: {
        fintech: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
      },
    },
  },
  plugins: [],
};

export default config;
