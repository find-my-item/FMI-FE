export const REPORT_STATUS_CHIP = {
  PENDING: { label: "접수", chipType: "brandSubtle" },
  REVIEWED: { label: "처리 중", chipType: "brandSubtle" },
  RESOLVED: { label: "처리 완료", chipType: "neutralStrong" },
} as const;

export const INQUIRY_STATUS_CHIP = {
  RECEIVED: { label: "접수", chipType: "brandSubtle" },
  PENDING: { label: "접수 중", chipType: "brandSubtle" },
  ANSWERED: { label: "답변 완료", chipType: "neutralStrong" },
} as const;
