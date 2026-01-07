import {
  CategoryFilterValue,
  SortFilterValue,
  StatusFilterValue,
} from "@/app/(route)/list/_components/_internal/FilterBottomSheet/types";
import { GetListResponse } from "./PostItemType";

export type PostPostsFilterRequestBody = {
  category?: CategoryFilterValue;
  address?: string | undefined;
  itemStatus?: StatusFilterValue;
  sortType?: SortFilterValue;
};

export type PostPostsFilterResponse = GetListResponse;

export type PostPostsFilterQuery = {
  cursor?: number;
  pageable: {
    page: number;
    size: number;
    sort?: string[];
  };
};
