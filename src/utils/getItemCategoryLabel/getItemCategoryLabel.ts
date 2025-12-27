import { CategoryType } from "@/types/CategoryType";

/**
 * @author jikwon
 *
 * 카테고리 타입을 카테고리 라벨로 변환하는 유틸리티 함수
 *
 * @param category - 카테고리 타입
 * @returns 카테고리에 해당하는 라벨 문자열
 */
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
