import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#1a2e4a",
        "navy-dark": "#12223a",
        gold: "#c5973e",
        "gold-dark": "#a87f2f",
        cream: "#f5f3ef",
        "cream-dark": "#ecebe5",
        ink: "#1a1a1a",
        secondary: "#6b7280",
        muted: "#9ca3af",
        line: "#e5e1d7",
        redbrown: "#8f3a2a",
      },
      fontFamily: {
        serif: [
          "var(--font-serif)",
          "Source Serif 4",
          "Playfair Display",
          "ui-serif",
          "Georgia",
          "serif",
        ],
        sans: [
          "var(--font-sans)",
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1.25rem",
          md: "2rem",
          lg: "3rem",
        },
      },
    },
  },
  plugins: [],
};

export default config;
