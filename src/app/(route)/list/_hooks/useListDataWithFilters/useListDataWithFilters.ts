import { useEffect, useMemo } from "react";
import { GetListResponse, PostPostsFilterRequestBody, usePostPostsFilter } from "@/api/fetch/post";
import {
  CategoryFilterValue,
  SortFilterValue,
  StatusFilterValue,
} from "../../_components/_internal/FilterBottomSheet/types";

const normalizeEnumParam = <T extends string>(value?: string | null): T | undefined => {
  if (!value) return undefined;

  return value.toUpperCase() as T;
};

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
      category: normalizeEnumParam<CategoryFilterValue>(category),
      itemStatus: normalizeEnumParam<StatusFilterValue>(status),
      sortType: normalizeEnumParam<SortFilterValue>(sort),
    };

    applyPostFilters(body);
  }, [hasFilters, applyPostFilters, region, category, sort, status]);

  const listData = useMemo(() => {
    if (hasFilters) return filterData ?? baseData;
    return baseData;
  }, [hasFilters, filterData, baseData]);

  return { listData, hasFilters };
};
