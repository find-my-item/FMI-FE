import { useEffect, useMemo } from "react";
import { GetListResponse, PostPostsFilterRequestBody, usePostPostsFilter } from "@/api/fetch/post";
import {
  CategoryFilterValue,
  SortFilterValue,
  StatusFilterValue,
} from "../../_components/_internal/FilterBottomSheet/types";

type Params = {
  baseData: GetListResponse | undefined;
  region?: string | null;
  category?: CategoryFilterValue;
  sort?: SortFilterValue;
  status?: StatusFilterValue;
};

export const useListDataWithFilters = ({ baseData, region, category, sort, status }: Params) => {
  const { mutate: applyPostFilters, data: filterData } = usePostPostsFilter();

  const hasFilters = Boolean(region || category || sort || status);

  useEffect(() => {
    if (!hasFilters) return;

    const body: PostPostsFilterRequestBody = {
      address: region || undefined,
      category: category as CategoryFilterValue,
      sortType: sort as SortFilterValue,
      itemStatus: status as StatusFilterValue,
    };

    applyPostFilters(body);
  }, [hasFilters, applyPostFilters, region, category, sort, status]);

  const listData = useMemo(() => {
    if (hasFilters) return filterData ?? baseData;
    return baseData;
  }, [hasFilters, filterData, baseData]);

  return { listData, hasFilters };
};
