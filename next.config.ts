import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    reactCompiler: true,
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: [
        {
          loader: require.resolve("@svgr/webpack"),
          options: {
            svgo: true,
            titleProp: true,
          },
        },
      ],
    });
    return config;
  },
};

export default nextConfig;
