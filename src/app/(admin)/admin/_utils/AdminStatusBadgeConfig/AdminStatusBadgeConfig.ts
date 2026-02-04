import { ReplyStatus, ReportsType } from "@/types";

export const ProcessStatusBadgeConfig: Record<ReportsType, { label: string; className: string }> = {
  PENDING: {
    label: "접수",
    className: "text-neutral-strong-default bg-fill-neutral-strong-default",
  },
  RECEIVED: {
    label: "검토",
    className: "text-brand-normal-default bg-fill-brand-subtle-default",
  },
  ANSWERED: {
    label: "처리 완료",
    className: "text-white bg-toast",
  },
};

export const ReplyStatusBadgeConfig: Record<ReplyStatus, { label: string; className: string }> = {
  UNANSWERED: {
    label: "미답변",
    className: "text-neutral-strong-default bg-fill-neutral-strong-default",
  },
  ANSWERED: {
    label: "답변 완료",
    className: "text-white bg-toast",
  },
};
