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
        milk: "#080808",
        "milk-dark": "#101010",
        ink: "#F0EDE8",
        orange: {
          DEFAULT: "#FF5A1F",
          light: "#FF6A1A",
          bg: "rgba(255,90,31,0.10)",
          hover: "#E64E18",
        },
        charcoal: "#171717",
        surface: "#111111",
        "surface-2": "#1A1A1A",
        muted: "#666260",
        border: "#252222",
        success: "#2E7D5B",
        danger: "#D9472B",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      animation: {
        "stamp-in": "stampIn 0.5s cubic-bezier(0.175,0.885,0.32,1.275) forwards",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "glow-pulse": "glowPulse 3s ease-in-out infinite",
      },
      keyframes: {
        stampIn: {
          "0%": { opacity: "0", transform: "scale(1.4) rotate(-8deg)" },
          "60%": { transform: "scale(0.95) rotate(2deg)" },
          "100%": { opacity: "1", transform: "scale(1) rotate(-3deg)" },
        },
        glowPulse: {
          "0%,100%": { opacity: "0.06" },
          "50%": { opacity: "0.14" },
        },
      },
      boxShadow: {
        card: "0 2px 16px 0 rgba(0,0,0,0.4), 0 1px 3px 0 rgba(0,0,0,0.3)",
        "card-hover": "0 8px 32px 0 rgba(0,0,0,0.5), 0 2px 8px 0 rgba(255,90,31,0.08)",
        orange: "0 4px 24px 0 rgba(255,90,31,0.25)",
        "orange-lg": "0 8px 40px 0 rgba(255,90,31,0.30)",
      },
    },
  },
  plugins: [],
};
export default config;
