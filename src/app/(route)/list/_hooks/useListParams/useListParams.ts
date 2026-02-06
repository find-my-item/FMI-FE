"use client";

import { useSearchParams } from "next/navigation";
import { normalizeEnumValue } from "@/utils";
import {
  CategoryFilterValue,
  SortFilterValue,
  StatusFilterValue,
} from "../../_components/_internal/FilterBottomSheet/types";

export const useListParams = () => {
  const searchParams = useSearchParams();

  return {
    type: normalizeEnumValue(searchParams.get("type")),
    status: normalizeEnumValue<Exclude<StatusFilterValue, undefined>>(searchParams.get("status")),
    category: normalizeEnumValue<Exclude<CategoryFilterValue, undefined>>(
      searchParams.get("category")
    ),
    sort: normalizeEnumValue<SortFilterValue>(searchParams.get("sort")),
    region: searchParams.get("region"),
  };
};
