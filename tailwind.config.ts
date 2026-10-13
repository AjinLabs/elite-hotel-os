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
        hotel: {
          bg: "#F7F9FC",
          card: "#FFFFFF",
          accent: "#245BDB",
          navy: "#17345C",
          ice: "#EAF3FF",
          secondary: "#6B9CFF",
          text: "#172033",
          muted: "#65738B",
          border: "#E1E8F2",
          success: "#16845B",
          warning: "#D98A16",
          error: "#D94343",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 2px 8px -2px rgba(23, 52, 92, 0.05), 0 4px 16px -4px rgba(23, 52, 92, 0.07)",
        cardHover: "0 6px 20px -2px rgba(36, 91, 219, 0.08), 0 10px 28px -6px rgba(23, 52, 92, 0.12)",
        dropdown: "0 10px 30px -4px rgba(23, 52, 92, 0.15)",
        glow: "0 0 20px rgba(36, 91, 219, 0.25)",
      },
    },
  },
  plugins: [],
};

export default config;
