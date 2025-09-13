import StyleDictionary from "style-dictionary";

const config = {
  source: ["src/tokens/**/*.json"],
  platforms: {
    css: {
      buildPath: "dist/css/",
      transformGroup: "css",
      files: [
        {
          format: "css/variables",
          destination: "variables.css",
        },
      ],
    },
  },
};

const sd = StyleDictionary.extend(config);
console.log(sd);
sd.buildAllPlatforms();
