import { ReportType } from "@/types";

export const REPORT_TYPE_TITLE: Record<ReportType, string> = {
  FRAUD: "사기",
  SPAM: "스팸",
  INAPPROPRIATE: "부적절한 콘텐츠",
  ABUSE: "욕설",
  HARASSMENT: "괴롭힘",
  VIOLENCE: "폭력",
  ADULT: "성인 콘텐츠",
  PRIVACY: "개인정보 침해",
  COPYRIGHT: "저작권 침해",
  ETC: "기타",
};
