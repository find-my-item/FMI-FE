"use client";

import { useSearchParams } from "next/navigation";
import { normalizeEnumValue } from "@/utils";
import {
  CategoryFilterValue,
  FindStatusFilterValue,
  SortFilterValue,
  StatusFilterValue,
} from "../../../components/domain/FilterSectionBottomSheet/FilterBottomSheet/types";

export const useFilterParams = () => {
  const searchParams = useSearchParams();

  return {
    type: normalizeEnumValue(searchParams.get("type")),
    status: normalizeEnumValue<Exclude<StatusFilterValue, undefined>>(searchParams.get("status")),
    category: normalizeEnumValue<Exclude<CategoryFilterValue, undefined>>(
      searchParams.get("category")
    ),
    sort: normalizeEnumValue<SortFilterValue>(searchParams.get("sort")),
    region: searchParams.get("region"),
    findStatus: normalizeEnumValue<Exclude<FindStatusFilterValue, undefined>>(
      searchParams.get("findStatus")
    ),
  };
};
