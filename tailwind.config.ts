import type { Config } from "tailwindcss";
const typedConfig: Config = require("./src/tokens/build/tailwind.config");

const {
  dimension, // check
  fontFamilies, // check
  lineHeights, // check
  letterSpacing, // check
  fontWeights, // check
  fontSizes, // check
  fg, // check
  bg, // check
  accent, // check
  boxShadow, // check
  ...validExtend
} = typedConfig.theme?.extend ?? {};

const config: Config = {
  mode: "jit",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      ...validExtend, // 나머지 정상작동 값
      fontFamily: fontFamilies, // check
      lineHeight: lineHeights, // check
      fontWeight: fontWeights, // check
      fontSize: fontSizes, // check
      boxShadow: boxShadow, // check
      backgroundColor: bg, // check
      letterSpacing: letterSpacing, // check
      accentColor: accent, // check
      textColor: fg, // check
      width: dimension, // check
      height: dimension, // check
    },
  },
};

export default config;
