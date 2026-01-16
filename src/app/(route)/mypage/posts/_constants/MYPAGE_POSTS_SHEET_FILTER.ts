export const MYPAGE_POSTS_SHEET_FILTER = [
  {
    title: "분류",
    kind: ["전체", "분실", "습득"],
  },
  {
    title: "카테고리",
    kind: ["전체", "전자기기", "지갑", "신분증", "귀금속", "가방", "카드", "기타"],
  },
  {
    title: "정렬",
    kind: ["최신순", "오래된 순", "즐겨찾기 많은 순", "조회 많은 순"],
  },
  {
    title: "찾음 여부",
    kind: ["전체", "찾는중", "찾았음"],
  },
] as const;
