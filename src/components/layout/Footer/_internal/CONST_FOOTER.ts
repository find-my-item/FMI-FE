export const FOOTER_LINK = [
  { name: "홈", href: "/", icon: "Home" },
  { name: "게시글 목록", href: "/list", icon: "Luggage" },
  { name: "채팅", href: "/chat", icon: "Chat", alert: "top-[5px] right-[-4px]" },
  { name: "알림", href: "/alert", icon: "AlertBellFooter", alert: "top-[6px] right-[0.3px]" },
  { name: "마이페이지", href: "/mypage", adminHref: "/admin", icon: "UserProfileHome" },
] as const;

export type FooterLinkHref = (typeof FOOTER_LINK)[number]["href"];

export const FOOTER_ITEM_BASE_STYLE =
  "group min-w-0 flex-1 transition-colors flex-col-center hover:text-neutral-strong-focused";
