export const REPORT_REASONS = [
  { id: "1", value: "IRRELEVANT_CONTENT", label: "실제 분실/발견한 물건이 아닌 내용이에요." },
  { id: "2", value: "DUPLICATE", label: "동일한 내용이 여러 번 올라왔어요." },
  { id: "3", value: "SPAM", label: "분실물과 무관한 홍보성 게시글이에요." },
  { id: "4", value: "OFFENSIVE_LANGUAGE", label: "채팅 또는 댓글에 모욕적 표현이 있어요." },
  { id: "5", value: "EXTORTION", label: "물건 반환을 빌미로 금전 요구가 있어요." },
  { id: "6", value: "FALSE_CLAIM", label: "실제 주인이 아닌 사람이 소유를 주장해요." },
  { id: "7", value: "ETC", label: "위 항목 외의 다른 문제를 신고해요." },
] as const;
