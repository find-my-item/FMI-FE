import type { Config } from "tailwindcss";
import tokensExtend from "./tailwind.tokens.js";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: tokensExtend,
  },
  plugins: [],
} satisfies Config;
