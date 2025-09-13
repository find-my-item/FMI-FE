import fs from "fs";

// 입력/출력 경로
const inputPath = "src/tokens/tokens.json"; // Figma Export 원본
const outputPath = "src/tokens/tokens.sd.json"; // Style Dictionary용 결과

// JSON 로드
const raw = JSON.parse(fs.readFileSync(inputPath, "utf8"));

// 짧은 참조 키들을 core. 접두사로 보정할 대상 목록
const CORE_GROUPS = [
  "dimension",
  "spacing",
  "borderRadius",
  "colors",
  "opacity",
  "fontFamilies",
  "lineHeights",
  "letterSpacing",
  "paragraphSpacing",
  "fontWeights",
  "fontSizes",
];

// roundTo 계열 계산을 위한 간단한 테이블 (body = 16 가정)
const BODY_BASE = 16;
const ROUND_TABLE = [
  { pat: /1\.25\^5/, value: "49" },
  { pat: /1\.25\^4/, value: "39" },
  { pat: /1\.25\^3/, value: "31" },
  { pat: /1\.25\^2/, value: "25" },
  { pat: /1\.25\^1/, value: "20" },
];

function fixReferences(str) {
  let v = str;

  // 1) core.* 접두사 보정 (이미 core.|light.|dark. 로 시작하는 경우는 제외)
  v = v.replace(new RegExp(`\\{(${CORE_GROUPS.join("|")})\\.`, "g"), "{core.$1.");

  // 2) 테마 별칭 보정 (accent/bg/shadows를 light.*로 고정)
  v = v.replace(/\{accent\./g, "{light.accent.");
  v = v.replace(/\{bg\./g, "{light.bg.");
  v = v.replace(/\{shadows\./g, "{light.shadows.");
  v = v.replace(/\{fontFamilies\./g, "{core.fontFamilies.");
  v = v.replace(/\{fontWeights\./g, "{core.fontWeights.");
  v = v.replace(/\{lineHeights\./g, "{core.lineHeights.");
  v = v.replace(/\{fontSizes\./g, "{core.fontSizes.");
  v = v.replace(/\{paragraphSpacing\./g, "{core.paragraphSpacing.");
  v = v.replace(/\{letterSpacing\./g, "{core.letterSpacing.");

  // 3) rgba 내부의 참조 치환
  // rgba({core.colors.black}, 0.3) -> rgba(0,0,0,$1)
  v = v.replace(/rgba\(\{core\.colors\.black\},\s*([0-9.]+)\)/g, "rgba(0,0,0,$1)");
  // rgba({light.shadows.default}, 0.15) -> rgba(26,32,44,$1)  // gray.900 기준
  v = v.replace(/rgba\(\{light\.shadows\.default\},\s*([0-9.]+)\)/g, "rgba(26,32,44,$1)");

  // 4) roundTo(...) 제거 -> 미리 정의한 테이블로 치환, 기본은 BODY_BASE
  if (/roundTo\(/.test(v)) {
    let replaced = false;
    for (const r of ROUND_TABLE) {
      if (r.pat.test(v)) {
        v = r.value;
        replaced = true;
        break;
      }
    }
    if (!replaced) v = String(BODY_BASE);
  }

  // 5) fontSizes.body 배수 계산 (prefix 보정 후 동작)
  v = v.replace(/\{core\.fontSizes\.body\} \* 0\.85/g, "13.6");
  v = v.replace(/\{core\.fontSizes\.body\} \* 0\.65/g, "10.4");

  return v;
}

function transform(node) {
  // 1) null or primitive
  if (node === null || node === undefined) return node;

  // 2) string anywhere → fix references directly
  if (typeof node === "string") {
    return fixReferences(node);
  }

  // 3) arrays → map recursively
  if (Array.isArray(node)) {
    return node.map(transform);
  }

  // 4) objects → handle $value and also any plain string fields
  if (typeof node === "object") {
    // DTCG "$value" field as string
    if (typeof node["$value"] === "string") {
      node["$value"] = fixReferences(node["$value"]);
    }

    // Iterate over all keys: if string → fix; else recurse
    for (const k of Object.keys(node)) {
      const val = node[k];
      if (typeof val === "string") {
        node[k] = fixReferences(val);
      } else {
        node[k] = transform(val);
      }
    }
    return node;
  }

  return node;
}

const converted = transform(raw);
fs.writeFileSync(outputPath, JSON.stringify(converted, null, 2));
console.log(`✅ Tokens converted and saved to ${outputPath}`);
