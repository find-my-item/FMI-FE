export const ADMIN_NAV_SECTIONS = [
  {
    id: "notice",
    label: "공지사항",
    items: [{ href: "/admin/notice", title: "공지사항" }],
  },
  {
    id: "support",
    label: "신고/문의",
    items: [
      { href: "/admin/report", title: "신고/문의 내역" },
      { href: "/admin/inquiry", title: "비로그인 문의 내역" },
    ],
  },
  {
    id: "user",
    label: "유저 관리",
    items: [{ href: "/admin/reason", title: "유저 탈퇴 사유" }],
  },
  {
    id: "account",
    label: "계정 설정",
    items: [{ href: "/admin/password", title: "비밀번호 변경" }],
  },
] as const;
