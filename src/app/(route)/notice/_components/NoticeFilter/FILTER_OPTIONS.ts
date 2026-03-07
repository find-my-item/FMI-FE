export const FILTER_OPTIONS = [
  { label: "최신순", value: "LATEST" },
  { label: "오래된 순", value: "OLDEST" },
  { label: "조회 많은 순", value: "MOST_VIEWED" },
];

export type FilterOptionValue = (typeof FILTER_OPTIONS)[number]["value"];
