import useAppMutation from "@/api/_base/query/useAppMutation";
import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import {
  CategoryFilterValue,
  SortFilterValue,
  StatusFilterValue,
} from "@/app/(route)/list/_components/_internal/FilterBottomSheet/types";

type PostFilterSortType = {
  category: CategoryFilterValue;
  sortType: SortFilterValue;
  status: StatusFilterValue;
};

export type PostFilterRequestBody = {
  page: number;
  size: number;
  sort: PostFilterSortType[];
};

export type PostFilterResponse = ApiBaseResponseType<PostFilterSortType[]>;

export const usePostFilter = () => {
  return useAppMutation<PostFilterResponse, PostFilterRequestBody>(
    "public",
    "/post/filter",
    "post"
  );
};
