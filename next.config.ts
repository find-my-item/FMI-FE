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
            svgoConfig: {
              plugins: [
                {
                  name: "removeAttrs",
                  params: {
                    attrs: "(fill|stroke)",
                  },
                },
              ],
            },
            titleProp: true,
          },
        },
      ],
    });
    return config;
  },
  images: {
    domains: ["images.mypetlife.co.kr", "i.namu.wiki"],
  },
};

export default nextConfig;
