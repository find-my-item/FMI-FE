import fs from "fs";
import path from "path";

// Load the tokens file
const tokensPath = path.resolve("src/tokens/tokens.sd.json");
const tokens = JSON.parse(fs.readFileSync(tokensPath, "utf8"));

// Function to collect all token values with their paths and types
function collectTokens(obj, prefix = "") {
  const result = [];

  for (const [key, value] of Object.entries(obj)) {
    const currentPath = prefix ? `${prefix}.${key}` : key;

    if (value && typeof value === "object" && "$value" in value) {
      result.push({
        path: currentPath,
        originalValue: value.$value,
        value: value.$value,
        type: value.$type,
        resolved: false,
      });
    } else if (value && typeof value === "object") {
      result.push(...collectTokens(value, currentPath));
    }
  }

  return result;
}

// Collect all tokens
let allTokens = collectTokens(tokens);

// Create a map of token paths to token objects
const tokenMap = new Map();
for (const token of allTokens) {
  tokenMap.set(token.path, token);
}

// Function to safely evaluate mathematical expressions
function evaluateMath(expr) {
  if (typeof expr !== "string") return expr;

  // Handle multi-value expressions (like spacing)
  if (/\d+\s+\d+/.test(expr)) {
    return expr
      .split(/\s+/)
      .map((e) => {
        try {
          return new Function(`return ${e}`)();
        } catch (e) {
          return e;
        }
      })
      .join(" ");
  }

  // Handle simple math expressions
  if (/^[\d\s+\-*/.()]+$/.test(expr)) {
    try {
      return new Function(`return ${expr}`)();
    } catch (e) {
      console.warn(`Could not evaluate expression: ${expr}`, e);
    }
  }

  return expr;
}

// Function to resolve a single token reference
function resolveTokenValue(token, depth = 0, maxDepth = 10) {
  if (depth > maxDepth) {
    console.warn(`Maximum resolution depth (${maxDepth}) exceeded for token: ${token.path}`);
    return token.value;
  }

  // Skip if already resolved or resolving
  if (token.resolved) return token.value;
  if (token.resolving) {
    console.warn(`Circular reference detected for token: ${token.path}`);
    return token.value;
  }

  // Mark as resolving
  token.resolving = true;
  let resolvedValue = token.originalValue;

  // Handle array values (e.g., shadows arrays)
  if (Array.isArray(resolvedValue)) {
    const arr = resolvedValue.map((item) => {
      if (typeof item === "string" && /^\{/.test(item)) {
        const refToken = tokenMap.get(item.slice(1, -1));
        return refToken ? resolveTokenValue(refToken, depth + 1, maxDepth) : item;
      }
      if (item && typeof item === "object") {
        const out = {};
        for (const [k, v] of Object.entries(item)) {
          if (typeof v === "string" && /^\{/.test(v)) {
            const ref = tokenMap.get(v.slice(1, -1));
            out[k] = ref ? resolveTokenValue(ref, depth + 1, maxDepth) : v;
          } else {
            out[k] = v;
          }
        }
        return out;
      }
      return item;
    });
    token.value = arr;
    token.resolved = true;
    token.resolving = false;
    return token.value;
  }

  // Handle object values (like shadows, typography)
  if (resolvedValue && typeof resolvedValue === "object" && !Array.isArray(resolvedValue)) {
    const result = {};
    for (const [key, value] of Object.entries(resolvedValue)) {
      if (typeof value === "string" && /^\{/.test(value)) {
        const refToken = tokenMap.get(value.slice(1, -1));
        if (refToken) {
          result[key] = resolveTokenValue(refToken, depth + 1, maxDepth);
        } else {
          result[key] = value;
        }
      } else {
        result[key] = value;
      }
    }
    token.value = result;
    token.resolved = true;
    token.resolving = false;
    return token.value;
  }

  // Handle string values with references
  if (typeof resolvedValue === "string") {
    // Resolve token references
    resolvedValue = resolvedValue.replace(/\{([^}]+)\}/g, (match, refPath) => {
      const refToken = tokenMap.get(refPath);
      return refToken ? resolveTokenValue(refToken, depth + 1, maxDepth) : match;
    });

    // Evaluate math expressions
    if (typeof resolvedValue === "string" && /[\d+\-*/().]/.test(resolvedValue)) {
      const evaluated = evaluateMath(resolvedValue);
      if (evaluated !== resolvedValue) {
        resolvedValue = evaluated;
      }
    }
  }

  // Update the token
  token.value = resolvedValue;
  token.resolved = true;
  token.resolving = false;

  return resolvedValue;
}

// Resolve all tokens
function resolveAllTokens() {
  // First pass: resolve all simple values
  allTokens.forEach((token) => {
    if (token.resolved) return;
    resolveTokenValue(token);
  });

  // Second pass: try to resolve any remaining references
  let changed;
  let iterations = 0;
  const maxIterations = 5;

  do {
    changed = false;
    iterations++;

    for (const token of allTokens) {
      if (!token.resolved) {
        const oldValue = JSON.stringify(token.value);
        resolveTokenValue(token);
        if (token.resolved && JSON.stringify(token.value) !== oldValue) {
          changed = true;
        }
      }
    }

    if (iterations >= maxIterations) {
      console.warn(`Reached maximum number of resolution iterations (${maxIterations})`);
      break;
    }
  } while (changed);

  // Log any unresolved tokens
  const unresolved = allTokens.filter((t) => !t.resolved);
  if (unresolved.length > 0) {
    console.warn(`Warning: Could not resolve ${unresolved.length} tokens:`);
    unresolved.forEach((t) => console.warn(`  - ${t.path}: ${JSON.stringify(t.originalValue)}`));
  }
}

// Format a token value for CSS output
function formatTokenValue(value, type) {
  if (value === undefined || value === null) return "";

  // 1) Arrays (e.g., boxShadow arrays) → join as CSS box-shadow list
  if (Array.isArray(value)) {
    const parts = value.map((v) => formatTokenValue(v, type)).filter(Boolean);
    return parts.join(", ");
  }

  // 2) Objects
  if (value && typeof value === "object") {
    // Shadow object → x y blur [spread] color
    if (
      Object.prototype.hasOwnProperty.call(value, "x") &&
      Object.prototype.hasOwnProperty.call(value, "y") &&
      Object.prototype.hasOwnProperty.call(value, "blur")
    ) {
      const x = typeof value.x === "number" ? `${value.x}px` : `${value.x}`;
      const y = typeof value.y === "number" ? `${value.y}px` : `${value.y}`;
      const blur = typeof value.blur === "number" ? `${value.blur}px` : `${value.blur}`;
      const spread =
        value.spread !== undefined
          ? typeof value.spread === "number"
            ? `${value.spread}px`
            : `${value.spread}`
          : null;
      const color = value.color || "rgba(0,0,0,0.1)";
      return [x, y, blur, spread, color].filter(Boolean).join(" ");
    }

    // Typography object → create a usable shorthand-ish string
    if (value.fontFamily || value.fontSize || value.fontWeight || value.lineHeight) {
      const fontFamily = value.fontFamily ? String(value.fontFamily) : "sans-serif";
      const fontWeight = value.fontWeight ? String(value.fontWeight) : "normal";
      // fontSize: number→px, string 그대로
      let fontSize = value.fontSize;
      if (typeof fontSize === "number") fontSize = `${fontSize}px`;
      // lineHeight: keep as-is if %, unitless allowed; number → normal (unitless) or px? we keep unitless if number
      let lineHeight = value.lineHeight;
      if (typeof lineHeight === "number") lineHeight = String(lineHeight);
      const sizeLine = fontSize
        ? lineHeight
          ? `${fontSize}/${lineHeight}`
          : `${fontSize}`
        : "16px";
      return `${fontWeight} ${sizeLine} "${fontFamily}"`;
    }

    // Fallback: stringify (rare)
    return JSON.stringify(value);
  }

  // 3) Primitive strings: if looks like pure number, coerce to number for unit handling
  if (typeof value === "string" && /^-?\d+(\.\d+)?$/.test(value)) {
    const num = Number(value);
    return formatTokenValue(num, type);
  }

  // 4) Numbers: add units by type
  if (typeof value === "number") {
    if (
      type === "dimension" ||
      type === "spacing" ||
      type === "borderRadius" ||
      type === "borderWidth"
    ) {
      return `${value}px`;
    }
    if (type === "fontSizes") {
      return `${value / 16}rem`;
    }
    return String(value);
  }

  // 5) Otherwise return as-is (colors, etc.)
  return value;
}

// Generate CSS variables
function generateCSSVariables() {
  let output = `/**
 * Do not edit directly
 * Generated on ${new Date().toISOString()}
 */

:root {
`;

  // Sort tokens by path for consistent output
  const sortedTokens = [...allTokens].sort((a, b) => a.path.localeCompare(b.path));

  // Process each token and generate CSS variables
  for (const token of sortedTokens) {
    if (!token.resolved) continue;

    const cssVarName = `--${token.path.toLowerCase().replace(/\./g, "-")}`;
    const formattedValue = formatTokenValue(token.value, token.type);

    // Skip invalid values
    if (formattedValue === undefined || formattedValue === "") continue;

    output += `  ${cssVarName}: ${formattedValue};\n`;
  }

  output += "}\n";
  return output;
}

// Main function
function main() {
  console.log("Resolving token references...");
  resolveAllTokens();

  console.log("Generating CSS variables...");
  const cssOutput = generateCSSVariables();

  // Ensure output directory exists
  const outputDir = path.resolve("dist/css");
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Write the output file
  const outputPath = path.join(outputDir, "variables.css");
  fs.writeFileSync(outputPath, cssOutput);

  console.log("✅ CSS variables generated successfully!");
  console.log(`Output file: ${outputPath}`);
}

// Run the main function
main();
