import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./features/**/*.{ts,tsx}",
    "./stores/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#0B2545",
        "navy-soft": "#1B3A5C",
        accent: "#2B7FFF",
        cream: "#FBFAF7",
        paper: "#FFFFFF",
        mist: "#EEF3FA",
        "mist-deep": "#DCE7F5",
        "accent-soft": "#7AA8F5",
        "accent-pale": "#B9CFF0",
        sky: "#C9DDFB",
        "sky-soft": "#E3EEFF",
        sun: "#FFE9A8",
        "sun-deep": "#FFE39A",
        "sun-soft": "#FFF3CF",
        hairline: "#E7E5DF",
        text: "#0B2545",
        body: "#4A5C70",
        muted: "#8A97A5",
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
