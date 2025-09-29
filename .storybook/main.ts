// .storybook/main.ts
import type { StorybookConfig } from "@storybook/nextjs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@chromatic-com/storybook", "@storybook/addon-docs", "@storybook/addon-a11y"],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  staticDirs: ["../public"],
  webpackFinal: async (config) => {
    // (1) 기존 svg 룰 수정
    (config.module!.rules as any[]).forEach((rule: any) => {
      if (rule?.test instanceof RegExp && rule.test.test(".svg")) {
        rule.exclude = [/\.svg$/].concat(rule.exclude || []);
      }
    });
    (config.module!.rules as any[]).push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    config.resolve ||= {};
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      "next/navigation": path.resolve(__dirname, "./mock/next-navigation.ts"),
    };

    return config;
  },
};
export default config;
