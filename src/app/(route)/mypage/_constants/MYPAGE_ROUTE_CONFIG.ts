export const MYPAGE_MENU_LIST = [
  {
    title: "내 활동",
    pages: [
      { pageName: "내가 쓴 게시물", pageLink: "/mypage/posts" },
      { pageName: "내가 쓴 댓글", pageLink: "/mypage/comments" },
      { pageName: "즐겨찾기 목록", pageLink: "/mypage/favorites" },
      { pageName: "내 활동 내역", pageLink: "/mypage/activity" },
    ],
  },
  {
    title: "알림",
    pages: [{ pageName: "알림 설정", pageLink: "/mypage/notifications" }],
  },
  {
    title: "신고/문의",
    pages: [
      { pageName: "내 신고 내역", pageLink: "/mypage/reports" },
      { pageName: "내 문의 내역", pageLink: "/mypage/inquiries" },
    ],
  },
  {
    title: "계정 설정",
    pages: [
      { pageName: "비밀번호 변경", pageLink: "/change-password" },
      { pageName: "회원 탈퇴", pageLink: "/mypage/delete-account" },
    ],
  },
] as const;

export const MYPAGE_TAP_CONFIG = [
  { pageName: "공지사항", iconName: "AnnotationAlert", pageLink: "/notice" },
  { pageName: "고객센터", iconName: "HeadPhone", pageLink: "/support" },
  { pageName: "채팅목록", iconName: "MessageTyping", pageLink: "/chat" },
] as const;
