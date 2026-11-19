
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        garimpo: {
          dark: "#080d16",
          navy: "#111c2b",
          gold: "#f5b82e"
        }
      }
    }
  },
  plugins: []
};

export default config;
