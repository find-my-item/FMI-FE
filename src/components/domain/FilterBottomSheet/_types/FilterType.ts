import { CategoryType, ItemStatus, PostType } from "@/types";

// 탭 타입
export type tabsType = "listsTabs" | "myPostsTabs" | "myFavoritesTabs";

// 필터 타입
export type FilterTab = "region" | "category" | "sort" | "status" | "findStatus";

export type CategoryFilterValue = "" | CategoryType;

export type SortFilterValue = "" | "OLDEST" | "MOST_FAVORITE" | "MOST_VIEWED";

export type StatusFilterValue = "" | PostType;

export type FindStatusFilterValue = "" | ItemStatus;
