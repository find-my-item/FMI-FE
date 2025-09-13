// scripts/generate-tailwind-from-tokens.js
import fs from "fs";
import path from "path";

const INPUT = "src/tokens/tokens.sd.json";
const OUTPUT = "tailwind.tokens.js";

// tokens path → CSS var 이름으로 변환: core.colors.gray.100 → --core-colors-gray-100
const toCssVar = (dotPath) => `var(--${dotPath.replace(/\./g, "-").toLowerCase()})`;

// 안전 접근
const get = (obj, path) =>
  path.split(".").reduce((o, k) => (o && o[k] !== undefined ? o[k] : undefined), obj);

// 존재하면 key에 바인딩
const maybe = (obj, key, dotPath) => {
  const exists = get(flat, dotPath) !== undefined;
  if (exists) obj[key] = toCssVar(dotPath);
};

const tokens = JSON.parse(fs.readFileSync(INPUT, "utf8"));

// DTCG 구조를 납작하게: path → $value
const flat = {};
(function flatten(node, prefix = []) {
  if (!node || typeof node !== "object") return;
  if (Object.hasOwn(node, "$value")) {
    flat[prefix.join(".")] = node.$value;
  }
  for (const [k, v] of Object.entries(node)) {
    if (k === "$value" || k === "$type" || k === "$description" || k === "$extensions") continue;
    if (v && typeof v === "object") flatten(v, prefix.concat(k));
  }
})(tokens);

// 색 팔레트 자동 수집: core.colors.*
function collectColorScale(name) {
  const base = `core.colors.${name}`;
  const entries = Object.entries(flat)
    .filter(([k]) => k.startsWith(base + "."))
    .map(([k]) => k.split(".").slice(-1)[0]) // 마지막 step (ex: "500")
    .filter((step) => /^\d+$/.test(step))
    .sort((a, b) => Number(a) - Number(b));
  if (!entries.length) return undefined;
  const scale = {};
  for (const step of entries) {
    scale[step] = toCssVar(`${base}.${step}`);
  }
  return scale;
}

const extend = {};

// 1) colors (코어 팔레트)
extend.colors = {};
for (const name of [
  "gray",
  "indigo",
  "blue",
  "green",
  "red",
  "orange",
  "yellow",
  "teal",
  "pink",
  "purple",
]) {
  const scale = collectColorScale(name);
  if (scale) extend.colors[name] = scale;
}
maybe(extend.colors, "black", "core.colors.black");
maybe(extend.colors, "white", "core.colors.white");

// 2) 의미론적 라이트 테마 색
extend.colors.accent = {};
maybe(extend.colors.accent, "DEFAULT", "light.accent.default");
maybe(extend.colors.accent, "fg", "light.accent.onaccent");
maybe(extend.colors.accent, "bg", "light.accent.bg");

extend.colors.bg = {};
maybe(extend.colors.bg, "DEFAULT", "light.bg.default");
maybe(extend.colors.bg, "muted", "light.bg.muted");
maybe(extend.colors.bg, "subtle", "light.bg.subtle");

extend.colors.fg = {};
maybe(extend.colors.fg, "DEFAULT", "light.fg.default");
maybe(extend.colors.fg, "muted", "light.fg.muted");
maybe(extend.colors.fg, "subtle", "light.fg.subtle");

// 3) spacing / radius / etc.
extend.spacing = {};
for (const key of ["xs", "sm", "md", "lg", "xl"]) {
  const p = `core.spacing.${key}`;
  if (flat[p] !== undefined) extend.spacing[key] = toCssVar(p);
}

extend.borderRadius = {};
for (const key of ["sm", "lg", "xl"]) {
  const p = `core.borderRadius.${key}`;
  if (flat[p] !== undefined) extend.borderRadius[key] = toCssVar(p);
}

// 4) font family / sizes / line-height / letter-spacing
extend.fontFamily = {};
maybe(extend.fontFamily, "heading", "core.fontFamilies.heading");
maybe(extend.fontFamily, "body", "core.fontFamilies.body");

extend.fontSize = {};
for (const key of ["xs", "sm", "body", "h1", "h2", "h3", "h4", "h5", "h6"]) {
  const p = `core.fontSizes.${key}`;
  if (flat[p] !== undefined) {
    // Tailwind fontSize는 배열([size, { lineHeight }])도 허용
    const lineKey = key.startsWith("h") ? "core.lineHeights.heading" : "core.lineHeights.body";
    const size = toCssVar(p);
    const lh = flat[lineKey] !== undefined ? toCssVar(lineKey) : undefined;
    extend.fontSize[key] = lh ? [size, { lineHeight: lh }] : size;
  }
}

extend.lineHeight = {};
maybe(extend.lineHeight, "heading", "core.lineHeights.heading");
maybe(extend.lineHeight, "body", "core.lineHeights.body");

extend.letterSpacing = {};
maybe(extend.letterSpacing, "tight", "core.letterSpacing.decreased");
maybe(extend.letterSpacing, "normal", "core.letterSpacing.default");
maybe(extend.letterSpacing, "wide", "core.letterSpacing.increased");

extend.opacity = {};
maybe(extend.opacity, "low", "core.opacity.low");
maybe(extend.opacity, "md", "core.opacity.md");
maybe(extend.opacity, "high", "core.opacity.high");

// 5) shadow / button
extend.boxShadow = {};
maybe(extend.boxShadow, "DEFAULT", "theme.boxShadow.default");
maybe(extend.boxShadow, "card", "theme.boxShadow.default");

extend.borderWidth = {};
maybe(extend.borderWidth, "button", "theme.button.borderWidth");

// 6) card/button colors
maybe(extend.colors, "cardBg", "theme.card.background");
extend.borderRadius.card = toCssVar("theme.card.borderRadius");

const file = `// ⚠️ 자동 생성 파일. 수정하지 마세요.
// 생성 스크립트: scripts/generate-tailwind-from-tokens.js
module.exports = ${JSON.stringify(extend, null, 2)};
`;

fs.writeFileSync(OUTPUT, file);
console.log(`✅ Tailwind extend가 생성되었습니다 → ${OUTPUT}`);
