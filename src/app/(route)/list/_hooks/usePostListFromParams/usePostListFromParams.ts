"use client";

import { useMemo } from "react";
import { useSearchParams } from "next/navigation";

export const usePostListFiltersFromSearchParams = () => {
  const searchParams = useSearchParams();

  return useMemo(
    () => ({
      type: searchParams.get("type"),
      status: searchParams.get("status"),
      category: searchParams.get("category"),
      sort: searchParams.get("sort"),
      region: searchParams.get("region"),
    }),
    [searchParams]
  );
};
