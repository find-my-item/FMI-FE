import type { StorybookConfig } from "@storybook/nextjs";
import path from "node:path";
import { fileURLToPath } from "node:url";

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
      "next/navigation": path.join(__dirname, "mock/next-navigation.ts"),
      "next/router": path.join(__dirname, "mock/next-navigation.ts"),
    };

    config.resolve.fallback = {
      ...(config.resolve.fallback || {}),
      fs: false,
      path: false,
      os: false,
    };

    return config;
  },
};
export default config;
