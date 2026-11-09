import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontWeight: {
      normal: "400",
      medium: "500",
      semibold: "600",
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: "#1D4ED8",
          hover: "#1E40AF",
          pressed: "#1E3A8A",
          pale: "#EFF4FF",
          border: "#DBE6FD",
        },
        navy: {
          DEFAULT: "#0B1B33",
          elevated: "#122645",
          border: "#223859",
        },
        body: "#334155",
        caption: "#5B6B82",
        page: "#F6F8FB",
        line: {
          DEFAULT: "#E3E8F0",
          strong: "#C9D3E3",
        },
        ink: {
          900: "#0B1B33",
          700: "#334155",
          500: "#5B6B82",
        },
        gain: {
          DEFAULT: "#047857",
          text: "#047857",
          bg: "#ECFDF5",
          border: "#A7F3D0",
        },
        loss: {
          DEFAULT: "#B91C1C",
          text: "#B91C1C",
          bg: "#FEF2F2",
          border: "#FECACA",
        },
        surface: {
          200: "#E3E8F0",
          300: "#C9D3E3",
        },
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "sans-serif",
        ],
        heading: [
          "var(--font-inter-tight)",
          "var(--font-inter)",
          "-apple-system",
          "BlinkMacSystemFont",
          "'Segoe UI'",
          "sans-serif",
        ],
      },
      transitionTimingFunction: {
        fintech: "cubic-bezier(0.2, 0.8, 0.2, 1)",
      },
    },
  },
  plugins: [],
};

export default config;
