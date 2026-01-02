export const TYPE_OPTIONS = [
  { label: "전체", value: "all" },
  { label: "습득물", value: "found" },
  { label: "분실물", value: "lost" },
] as const;

export const SORT_OPTIONS = [
  { label: "최신순", value: "latest" },
  { label: "오래된순", value: "oldest" },
] as const;

export const FilTER_DROPDOWN_OPTIONS = [
  {
    ariaLabel: "채팅 리스트 최신순",
    options: SORT_OPTIONS,
    buttonText: "최신순",
    keyName: "sort",
  },
  {
    ariaLabel: "채팅 리스트 습득/분실",
    options: TYPE_OPTIONS,
    buttonText: "습득/분실",
    keyName: "type",
  },
] as const;
