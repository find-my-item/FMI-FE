import { useEffect, useMemo } from "react";
import { GetListResponse, PostPostsFilterRequestBody, usePostPostsFilter } from "@/api/fetch/post";
import {
  CategoryFilterValue,
  SortFilterValue,
  StatusFilterValue,
} from "../../_components/_internal/FilterBottomSheet/types";
import { normalizeEnumValue } from "@/utils";

type useListDataWithFiltersProps = {
  baseData: GetListResponse | undefined;
  region?: string | null;
  category?: string | null;
  sort?: string | null;
  status?: string | null;
};

export const useListDataWithFilters = ({
  baseData,
  region,
  category,
  sort,
  status,
}: useListDataWithFiltersProps) => {
  const { mutate: applyPostFilters, data: filterData } = usePostPostsFilter();

  const hasFilters = Boolean(region || category || sort || status);

  useEffect(() => {
    if (!hasFilters) return;

    const body: PostPostsFilterRequestBody = {
      address: region || undefined,
      category: normalizeEnumValue<CategoryFilterValue>(category),
      itemStatus: normalizeEnumValue<StatusFilterValue>(status),
      sortType: normalizeEnumValue<SortFilterValue>(sort),
    };

    applyPostFilters(body);
  }, [hasFilters, applyPostFilters, region, category, sort, status]);

  const listData = useMemo(() => {
    if (hasFilters) return filterData ?? baseData;
    return baseData;
  }, [hasFilters, filterData, baseData]);

  return { listData, hasFilters };
};
