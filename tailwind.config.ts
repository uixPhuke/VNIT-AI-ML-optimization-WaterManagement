import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        base: "var(--base)",
        surface: "var(--surface)",
        "surface-elevated": "var(--surface-elevated)",
        primary: "var(--primary)",
        "primary-light": "var(--primary-light)",
        secondary: "var(--secondary)",
        muted: "var(--muted)",
        border: "var(--border)"
      }
    }
  },
  plugins: []
};

export default config;
