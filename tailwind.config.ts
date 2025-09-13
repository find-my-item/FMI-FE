import type { Config } from "tailwindcss";
import tokens from "./tailwind.tokens.js";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        ...tokens.colors,
        "light-bg-default": "var(--light-bg-default)",
        "dark-bg-default": "var(--dark-bg-default)",
        "light-fg-default": "var(--light-fg-default)",
        "dark-fg-default": "var(--dark-fg-default)",
        "light-accent-default": "var(--light-accent-default)",
        "light-accent-onaccent": "var(--light-accent-onaccent)",
        "dark-accent-default": "var(--dark-accent-default)",
        "dark-accent-onaccent": "var(--dark-accent-onaccent)",
      },
    },
  },
  plugins: [],
};

export default config;
