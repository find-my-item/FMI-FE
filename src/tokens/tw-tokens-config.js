import { makeSdTailwindConfig } from "sd-tailwindcss-transformer";
import StyleDictionary from "style-dictionary";

const sd = new StyleDictionary(
  makeSdTailwindConfig({
    type: "all",
    source: ["src/tokens/build/build-tokens.json"],
    buildPath: "src/tokens/build/",
  })
);

await sd.hasInitialized;
await sd.buildAllPlatforms();
