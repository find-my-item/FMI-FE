const REPORT_DETAIL_STATUS_OPTIONS = [
  { label: "접수", value: "pending" },
  { label: "처리 중", value: "reviewed" },
  { label: "처리 완료", value: "resolved" },
];

const INQUIRY_DETAIL_STATUS_OPTIONS = [
  { label: "접수", value: "received" },
  { label: "검토 중", value: "pending" },
  { label: "처리 완료", value: "answered" },
];

export const DETAIL_STATUS_CONFIG = {
  report: {
    statusOptions: REPORT_DETAIL_STATUS_OPTIONS,
  },
  inquiry: {
    statusOptions: INQUIRY_DETAIL_STATUS_OPTIONS,
  },
};
