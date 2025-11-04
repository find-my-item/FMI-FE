import type { Config } from "tailwindcss";
const typedConfig: Config = require("./src/utils/tokens/tailwind.config");
import {
  flexCenter,
  flexColCenter,
  mouseHover,
  uEllipsis,
} from "./src/utils/customStylePlugins/customStylePlugins";
import customFonts from "./src/utils/customFonts/customFonts";
import plugin from "tailwindcss/plugin";

const flatten = (obj: Record<string, any>, path: string[] = []): [string, string][] =>
  Object.entries(obj).flatMap(([k, v]) =>
    v && typeof v === "object"
      ? flatten(v, path.concat(k))
      : [[path.concat(k).join("-"), v as string]]
  );

const fillBgUtilities = plugin(({ addUtilities, theme }) => {
  const tokens = (theme("fill") || {}) as Record<string, any>;
  const utils = Object.fromEntries(
    flatten(tokens).map(([k, v]) => [`.bg-fill-${k}`, { backgroundColor: v }])
  );
  addUtilities(utils);
});

const {
  dimension,
  lineHeights,
  color,
  border,
  letterSpacing,
  fontWeights,
  fg,
  bg,
  accent,
  boxShadow,
  ...validExtend
} = typedConfig.theme?.extend ?? {};

const config: Config = {
  mode: "jit",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  darkMode: "class",
  theme: {
    screens: {
      mobile: { min: "320px", max: "390px" },
      tablet: { min: "391px", max: "810px" },
      pc: "811px",
    },
    extend: {
      fill: (typedConfig.theme?.extend as any)?.fill ?? {},
      ...validExtend,
      colors: color,
      fontFamily: { sans: ["var(--font-pretendard)", "Inter", "sans-serif"] },
      lineHeight: lineHeights,
      fontWeight: fontWeights,
      fontSize: customFonts,
      boxShadow: boxShadow,
      backgroundColor: bg,
      letterSpacing: letterSpacing,
      accentColor: accent,
      textColor: fg,
      width: dimension,
      height: dimension,
      borderColor: border,
    },
  },
  plugins: [fillBgUtilities, flexCenter, flexColCenter, mouseHover, uEllipsis],
  safelist: ["flex-center", "flex-col-center", "mouse-hover", "u-ellipsis"],
};

export default config;
