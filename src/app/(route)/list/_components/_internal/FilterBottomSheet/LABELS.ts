import { CategoryType, ItemStatus } from "@/types";
import { CategoryFilterValue, SortFilterValue, StatusFilterValue } from "./types";

export const CATEGORY_DEFAULT_LABEL = "카테고리";
export const CATEGORY_LABEL_MAP: Record<CategoryType, string> = {
  ELECTRONICS: "전자기기",
  WALLET: "지갑",
  ID_CARD: "신분증",
  JEWELRY: "귀금속",
  BAG: "가방",
  CARD: "카드",
  ETC: "기타",
};

export const SORT_LABEL_MAP: Record<SortFilterValue, string> = {
  LATEST: "최신순",
  OLDEST: "오래된 순",
  MOST_FAVORITED: "즐겨찾기 많은 순",
  MOST_VIEWED: "조회수 많은 순",
};

export const STATUS_DEFAULT_LABEL = "전체";
export const STATUS_LABEL_MAP: Record<ItemStatus, string> = {
  SEARCHING: "찾는중",
  FOUND: "찾았음",
};
