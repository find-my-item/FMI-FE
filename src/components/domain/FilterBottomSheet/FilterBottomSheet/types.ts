import { CategoryType, ItemStatus, PostType } from "@/types";

// 탭 타입
export type tabsType = "listsTabs" | "myPostsTabs" | "myFavoritesTabs";

// 필터 타입
export type FilterTab = "region" | "category" | "sort" | "status" | "findStatus";

export type CategoryFilterValue = CategoryType | undefined;

export type SortFilterValue = "LATEST" | "OLDEST" | "MOST_FAVORITED" | "MOST_VIEWED";

export type StatusFilterValue = PostType | undefined;

export type FindStatusFilterValue = ItemStatus | undefined;
