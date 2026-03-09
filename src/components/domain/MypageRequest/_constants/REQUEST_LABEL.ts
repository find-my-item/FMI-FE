import { RequestType } from "@/types";

export const REPORTS_LABEL_MAP: Record<RequestType, string> = {
  ALL: "전체",
  PENDING: "접수",
  REVIEWED: "검토 중",
  RESOLVED: "처리 완료",
};

export const INQUIRIES_LABEL_MAP: Record<RequestType, string> = {
  ALL: "전체",
  PENDING: "접수",
  REVIEWED: "접수 중",
  RESOLVED: "처리 완료",
};
