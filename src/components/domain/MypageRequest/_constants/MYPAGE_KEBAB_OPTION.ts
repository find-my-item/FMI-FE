export const MYPAGE_KEBAB_OPTIONS = {
  reports: [
    { label: "전체", value: "ALL" },
    { label: "접수", value: "PENDING" },
    { label: "검토 중", value: "REVIEWED" },
    { label: "처리 완료", value: "RESOLVED" },
  ],
  inquiries: [
    { label: "전체", value: "ALL" },
    { label: "접수", value: "PENDING" },
    { label: "접수 중", value: "REVIEWED" },
    { label: "처리 완료", value: "RESOLVED" },
  ],
} as const;
