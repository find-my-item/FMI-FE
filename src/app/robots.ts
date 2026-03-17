import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/mypage/", "/chat", "/write"],
    },
    sitemap: "https://www.finditem.kr/sitemap.xml",
  };
}
