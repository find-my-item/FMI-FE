import type { StorybookConfig } from "@storybook/nextjs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import webpack from "webpack";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const MOCK_NAV = path.resolve(__dirname, "./mock/next-navigation.ts");

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: ["@chromatic-com/storybook", "@storybook/addon-docs", "@storybook/addon-a11y"],
  framework: { name: "@storybook/nextjs", options: {} },
  staticDirs: ["../public"],
  webpackFinal: async (cfg) => {
    (cfg.module!.rules as any[]).forEach((rule: any) => {
      if (rule?.test instanceof RegExp && rule.test.test(".svg")) {
        rule.exclude = [/\.svg$/].concat(rule.exclude || []);
      }
    });
    (cfg.module!.rules as any[]).push({
      test: /\.svg$/,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });

    cfg.resolve ||= {};
    cfg.resolve.alias = {
      ...(cfg.resolve.alias || {}),
      "next/navigation": MOCK_NAV,
      "next/router": MOCK_NAV,
      "@": path.resolve(__dirname, "../src"),
    };

    cfg.plugins ||= [];
    cfg.plugins.push(
      new webpack.NormalModuleReplacementPlugin(/^next\/navigation$/, MOCK_NAV),
      new webpack.NormalModuleReplacementPlugin(/^next\/router$/, MOCK_NAV)
    );

    cfg.resolve.extensions = Array.from(
      new Set([...(cfg.resolve.extensions || []), ".ts", ".tsx", ".js", ".jsx"])
    );

    return cfg;
  },
};

export default config;
