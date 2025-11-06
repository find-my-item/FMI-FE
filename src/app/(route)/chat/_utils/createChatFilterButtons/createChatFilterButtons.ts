export const createChatFilterButtons = (
  searchUpdateQuery: (key: string, value?: string) => void
) => [
  {
    text: "지역 선택",
    icon: "Location",
    iconPosition: "leading",
    iconSize: 16,
    onClick: () => searchUpdateQuery("search", "region"),
  },
  { text: "최신순", icon: "ArrowDown", iconPosition: "trailing", iconSize: 12 },
  { text: "습득/분실", icon: "ArrowDown", iconPosition: "trailing", iconSize: 12 },
];
