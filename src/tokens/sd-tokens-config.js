import { register } from "@tokens-studio/sd-transforms";
import StyleDictionary from "style-dictionary";

register(StyleDictionary);

const sd = new StyleDictionary({
  source: ["src/tokens/sd-*.json"], // figma에서 추출한 원상태의 토큰
  preprocessors: ["tokens-studio"],
  platforms: {
    css: {
      transformGroup: "tokens-studio",
      transforms: ["name/kebab"], // 만들어질 token 이름 형태
      buildPath: "src/tokens/build/",
      files: [
        {
          destination: "build-tokens.json",
          format: "json",
        },
      ],
    },
  },
});

await sd.cleanAllPlatforms();
await sd.buildAllPlatforms();
