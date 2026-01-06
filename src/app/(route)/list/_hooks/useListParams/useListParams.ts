"use client";

import { useSearchParams } from "next/navigation";
import {
  CategoryFilterValue,
  SortFilterValue,
  StatusFilterValue,
} from "../../_components/_internal/FilterBottomSheet/types";

export const useListParams = () => {
  const searchParams = useSearchParams();

  return () => ({
    type: searchParams.get("type"),
    status: searchParams.get("status") as StatusFilterValue,
    category: searchParams.get("category") as CategoryFilterValue,
    sort: searchParams.get("sort") as SortFilterValue,
    region: searchParams.get("region"),
  });
};
