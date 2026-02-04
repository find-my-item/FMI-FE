import { ReplyStatus, ReportStatus } from "@/types";
import { StatusBadgeConfig } from "./StatusBadgeConfig";

export const ReportStatusBadgeConfig: Record<ReportStatus, StatusBadgeConfig> = {
  PENDING: {
    label: "접수",
    className: "text-neutral-strong-default bg-fill-neutral-strong-default",
  },
  REVIEWED: {
    label: "검토",
    className: "text-brand-normal-default bg-fill-brand-subtle-default",
  },
  RESOLVED: {
    label: "처리 완료",
    className: "text-white bg-toast",
  },
};

export const ReplyStatusBadgeConfig: Record<ReplyStatus, StatusBadgeConfig> = {
  UNANSWERED: {
    label: "미답변",
    className: "text-neutral-strong-default bg-fill-neutral-strong-default",
  },
  ANSWERED: {
    label: "답변 완료",
    className: "text-white bg-toast",
  },
};
