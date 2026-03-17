import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/mypage/"],
    },
    sitemap: "https://www.finditem.kr/sitemap.xml",
  };
}
