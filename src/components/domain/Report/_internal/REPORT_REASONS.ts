// TODO(형준): reportType 파악 후 value를 실제 reportType으로 매칭
export const REPORT_REASONS = [
  { value: "SPAM", label: "실제 분실물/습득물이 아닌 내용이에요." },
  { value: "SPAM", label: "동일한 내용이 여러 번 올라왔어요." },
  { value: "SPAM", label: "분실물과 무관한 홍보성 게시글이에요." },
  { value: "ABUSE", label: "채팅 또는 댓글에 모욕적 표현이 있어요." },
  { value: "FRAUD", label: "물건 반환을 빌미로 금전 요구가 있어요." },
  { value: "FRAUD", label: "실제 주인이 아닌 사람이 소유를 주장해요." },
  { value: "ETC", label: "위 항목 외의 다른 문제를 신고해요." },
] as const;
