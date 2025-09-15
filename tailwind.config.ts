import type { Config } from "tailwindcss";
const typedConfig: Config = require("./src/tokens/build/tailwind.config");

const config: Config = {
  mode: "jit",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      ...typedConfig.theme?.extend,
    },
  },
};

export default config;
