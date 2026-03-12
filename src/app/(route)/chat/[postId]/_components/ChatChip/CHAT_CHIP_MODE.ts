export const CHAT_CHIP_MODE = {
  FIND: { style: "text-accent-foundItem bg-fill-accent-foundItem", text: "발견" },
  LOST: { style: "text-accent-lostItem bg-fill-accent-lostItem", text: "분실" },
  FOUND_STATUS: {
    style: "bg-toast/70 text-white px-1 py-[2.5px]",
    text: "찾았어요",
  },
} as const;

export type ChatChipMode = keyof typeof CHAT_CHIP_MODE;
