import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import {
  CategoryFilterValue,
  SortFilterValue,
  StatusFilterValue,
} from "@/app/(route)/list/_components/_internal/FilterBottomSheet/types";

export type PostPostsFilterSortType = {
  category: CategoryFilterValue;
  sortType: SortFilterValue;
  status: StatusFilterValue;
};

export type PostPostsFilterRequestBody = {
  page: number;
  size: number;
  sort: PostPostsFilterSortType[];
};

export type PostPostsFilterResponse = ApiBaseResponseType<PostPostsFilterSortType[]>;
