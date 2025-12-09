import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "찾아줘! - 분실물 찾기 커뮤니티",
    short_name: "찾아줘",
    description:
      "분실물을 빠르게 찾기 위한 지도 기반 등록, 실시간 채팅, 실시간 알림 기능을 제공하는 커뮤니티 플랫폼입니다.",
    start_url: "/",
    scope: "/",
    display: "standalone",
    lang: "ko-KR",
    dir: "ltr",
    background_color: "#46C691",
    theme_color: "#6ED5A7",
    orientation: "portrait",
    categories: ["social", "productivity", "navigation"],
    // TODO: 아이콘 추가 필요 (디자인팀과 협의)
    icons: [
      {
        src: "/icons/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icons/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
