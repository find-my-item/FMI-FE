import { MOCK_FAQ_ITEMS } from "./MOCK_FAQ_ITEMS";

export const getFaqAnchorId = (id: number) => `faq-${id}`;

export const getExpandedIndexFromHash = (): number | null => {
  const match = window.location.hash.match(/^#faq-(\d+)$/);
  if (!match) return null;
  const index = MOCK_FAQ_ITEMS.findIndex((item) => item.id === Number(match[1]));
  return index >= 0 ? index : null;
};
