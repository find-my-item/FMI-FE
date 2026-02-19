// TODO(지권): 분실/발견 텍스트 변경
export const TYPE_OPTIONS = [
  { label: "전체", value: "ALL" },
  { label: "습득물", value: "FOUND" },
  { label: "분실물", value: "LOST" },
] as const;

export const SORT_OPTIONS = [
  { label: "최신순", value: "LATEST" },
  { label: "오래된순", value: "OLDEST" },
] as const;

export const FilTER_DROPDOWN_OPTIONS = [
  {
    ariaLabel: "채팅 리스트 최신순",
    options: SORT_OPTIONS,
    buttonText: "최신순",
    keyName: "sort",
  },
  {
    ariaLabel: "채팅 리스트 분실/발견",
    options: TYPE_OPTIONS,
    buttonText: "분실/발견",
    keyName: "type",
  },
] as const;
