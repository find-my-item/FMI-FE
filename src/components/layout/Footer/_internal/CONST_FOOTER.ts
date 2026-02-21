import { cn } from "@/utils";

export const FOOTER_LINK = [
  { name: "홈", href: "/", icon: "Home" },
  { name: "게시글 목록", href: "/list", icon: "Luggage" },
  { name: "채팅", href: "/chat", icon: "Chat" },
  // TODO(형준): 즐겨찾기 페이지 추가 시 href 변경
  { name: "즐겨찾기", href: "#", icon: "Star" },
  { name: "마이페이지", href: "/mypage", icon: "UserProfileHome" },
] as const;

export type FooterLinkHref = (typeof FOOTER_LINK)[number]["href"];

export const FOOTER_ITEM_BASE_STYLE = cn(
  "min-w-0 flex-1 transition-colors flex-col-center",
  "hover:text-neutral-strong-focused"
);
