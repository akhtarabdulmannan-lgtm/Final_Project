import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#E6EDFF",
          100: "#CCDBff",
          200: "#99B7FF",
          300: "#668FFF",
          400: "#336BFF",
          500: "#0052FF",
          600: "#0042CC",
          700: "#003199",
          800: "#002166",
          900: "#0A1628",
          950: "#060D17",
        },
        teal: {
          50: "#E6FFF8",
          100: "#B3FFEC",
          200: "#80FFE0",
          300: "#4DFFD4",
          400: "#1AFFC8",
          500: "#00D4AA",
          600: "#00AA88",
          700: "#008066",
          800: "#005544",
          900: "#002B22",
        },
        accent: {
          50: "#FFF0E8",
          100: "#FFD4BA",
          200: "#FFB88C",
          300: "#FF9C5E",
          400: "#FF8347",
          500: "#FF6B35",
          600: "#CC5628",
          700: "#99401E",
          800: "#662B14",
          900: "#33150A",
        },
        surface: {
          50: "#F7F9FC",
          100: "#EEF2F7",
          200: "#E2E8F0",
          300: "#CBD5E1",
          400: "#94A3B8",
          500: "#64748B",
          600: "#475569",
          700: "#334155",
          800: "#1E293B",
          900: "#0F172A",
        },
      },
      fontFamily: {
        sans: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        heading: ["system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "Monaco", "Consolas", "monospace"],
      },
      animation: {
        "fade-up": "fadeUp 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "fade-in": "fadeIn 0.5s ease-out forwards",
        "slide-in-right": "slideInRight 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "slide-in-left": "slideInLeft 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "scale-in": "scaleIn 0.3s ease-out forwards",
        "spin-slow": "spin 3s linear infinite",
        "bounce-gentle": "bounceGentle 2s ease-in-out infinite",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
        "draw-line": "drawLine 1.5s ease-out forwards",
        "counter-up": "counterUp 2s ease-out forwards",
        "swap-rotate": "swapRotate 0.4s ease-in-out",
        "marquee": "marquee 30s linear infinite",
        "marquee-reverse": "marquee 30s linear infinite reverse",
        "shimmer": "shimmer 2s infinite",
        "accordion-down": "accordionDown 0.3s ease-out",
        "accordion-up": "accordionUp 0.3s ease-out",
        "toast-in": "toastIn 0.3s ease-out",
        "toast-out": "toastOut 0.3s ease-in",
        "hero-float": "heroFloat 6s ease-in-out infinite",
        "progress-fill": "progressFill 1s ease-out forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        slideInLeft: {
          "0%": { opacity: "0", transform: "translateX(-20px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        bounceGentle: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
        drawLine: {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
        counterUp: {
          "0%": { opacity: "0", transform: "translateY(10px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        swapRotate: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(180deg)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        accordionDown: {
          "0%": { height: "0", opacity: "0" },
          "100%": { height: "var(--accordion-height)", opacity: "1" },
        },
        accordionUp: {
          "0%": { height: "var(--accordion-height)", opacity: "1" },
          "100%": { height: "0", opacity: "0" },
        },
        toastIn: {
          "0%": { opacity: "0", transform: "translateX(100%)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
        toastOut: {
          "0%": { opacity: "1", transform: "translateX(0)" },
          "100%": { opacity: "0", transform: "translateX(100%)" },
        },
        heroFloat: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        progressFill: {
          "0%": { width: "0%" },
          "100%": { width: "var(--progress-width)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-gradient": "linear-gradient(135deg, #0A1628 0%, #0052FF 50%, #00D4AA 100%)",
        "card-gradient": "linear-gradient(135deg, rgba(0,82,255,0.05) 0%, rgba(0,212,170,0.05) 100%)",
        "cta-gradient": "linear-gradient(135deg, #0052FF 0%, #00D4AA 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
