import { CategoryType, ItemStatus } from "@/types";

// 필터 타입
export type FilterTab = "region" | "category" | "sort" | "status";

export type CategoryFilterValue = "" | CategoryType;

export type SortFilterValue = "LATEST" | "OLDEST" | "MOST_FAVORITE" | "MOST_VIEWS"; // 임시 type API 수정 후 변경

export type StatusFilterValue = "" | ItemStatus;
