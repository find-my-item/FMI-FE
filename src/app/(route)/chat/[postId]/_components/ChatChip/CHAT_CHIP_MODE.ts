export const CHAT_CHIP_MODE = {
  FIND: { style: "text-accent-foundItem bg-fill-accent-foundItem", text: "습득물" },
  LOST: { style: "text-accent-lostItem bg-fill-accent-lostItem", text: "분실물" },
} as const;

export type ChatChipMode = keyof typeof CHAT_CHIP_MODE;
