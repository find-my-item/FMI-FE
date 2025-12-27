import { CategoryType } from "@/types/CategoryType";

export const getItemCategoryLabel = (category: CategoryType): string => {
  const CATEGORY_LABEL: Record<CategoryType, string> = {
    ELECTRONIC: "전자기기",
    WALLET: "지갑",
    ID_CARD: "신분증",
    JEWELRY: "귀금속",
    BAG: "가방",
    CARD: "카드",
    ETC: "기타",
  };

  return CATEGORY_LABEL[category];
};
