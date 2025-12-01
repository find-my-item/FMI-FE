import { MypageMenuType } from "../_types/MypageMenuType";

export const MYPAGE_MENU_LIST: Record<MypageMenuType, { label: string }[]> = {
  "내 활동": [
    { label: "내가 쓴 게시물" },
    { label: "내가 쓴 댓글" },
    { label: "즐겨찾기 목록" },
    { label: "내 활동 내역" },
  ],
  알림: [{ label: "알림 설정" }],
  "신고/문의": [{ label: "내 신고 내역" }, { label: "내 문의 내역" }],
  "계정 설정": [{ label: "이메일 변경" }, { label: "비밀번호 변경" }, { label: "회원 탈퇴" }],
};
