import { CategoryType, ItemStatus } from "@/types";

// 필터 타입
export type FilterTab = "region" | "category" | "sort" | "status";

export type CategoryFilterValue = "" | CategoryType;

export type SortFilterValue = "LATEST" | "OLDEST" | "MOST_FAVORITED" | "MOST_VIWED";

export type StatusFilterValue = "" | ItemStatus;
