import { MypageMenuType } from "../_types/MypageMenuType";

export const MYPAGE_MENU_LIST: Record<MypageMenuType, { pageName: string }[]> = {
  "내 활동": [
    { pageName: "내가 쓴 게시물" },
    { pageName: "내가 쓴 댓글" },
    { pageName: "즐겨찾기 목록" },
    { pageName: "내 활동 내역" },
  ],
  알림: [{ pageName: "알림 설정" }],
  "신고/문의": [{ pageName: "내 신고 내역" }, { pageName: "내 문의 내역" }],
  "계정 설정": [
    { pageName: "이메일 변경" },
    { pageName: "비밀번호 변경" },
    { pageName: "회원 탈퇴" },
  ],
};
