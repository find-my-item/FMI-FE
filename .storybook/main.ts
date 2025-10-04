import type { StorybookConfig } from "@storybook/nextjs";

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
      "next/navigation": "./.storybook/mock/next-navigation.ts",
    };

    return config;
  },
};
export default config;
