import { ReportType } from "@/types";

export const REPORTS_LABEL_MAP: Record<ReportType, string> = {
  ALL: "전체",
  PENDING: "접수",
  REVIEWED: "검토 중",
  RESOLVED: "처리 완료",
};

export const REPORTS_KEBAB_OPTIONS = [
  { label: "전체", value: "ALL" },
  { label: "접수", value: "PENDING" },
  { label: "검토 중", value: "REVIEWED" },
  { label: "처리 완료", value: "RESOLVED" },
] as const;
