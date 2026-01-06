"use client";

import { useSearchParams } from "next/navigation";
import {
  CategoryFilterValue,
  SortFilterValue,
  StatusFilterValue,
} from "../../_components/_internal/FilterBottomSheet/types";

export const useListParams = () => {
  const searchParams = useSearchParams();

  const sortParam = searchParams.get("sort");

  return {
    type: searchParams.get("type"),
    status: searchParams.get("status") as StatusFilterValue,
    category: searchParams.get("category") as CategoryFilterValue,
    sort: (sortParam as SortFilterValue) ?? "latest",
    region: searchParams.get("region"),
  };
};
