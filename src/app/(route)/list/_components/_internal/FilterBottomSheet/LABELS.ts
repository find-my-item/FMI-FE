import { CategoryFilterValue, StatusFilterValue } from "@/types";

export const CATEGORY_LABEL_MAP: Partial<Record<CategoryFilterValue, string>> = {
  "": "카테고리",
  ELECTRONICS: "전자기기",
  WALLET: "지갑",
  ID_CARD: "신분증",
  JEWELRY: "귀금속",
  BAG: "가방",
  CARD: "카드",
  ETC: "기타",
};

export const SORT_LABEL_MAP: Record<string, string> = {
  latest: "최신순",
  oldest: "오래된 순",
  favorite: "즐겨찾기순",
  views: "조회수순",
};

export const STATUS_LABEL_MAP: Record<StatusFilterValue | "", string> = {
  "": "전체",
  SEARCHING: "찾는중",
  FOUND: "찾음",
};
