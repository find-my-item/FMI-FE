import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { applyFiltersToUrl } from "@/utils";

interface UseFilterSyncProps<T extends object> {
  defaultFilters: T;
  currentFiltersFromUrl: Partial<T>;
}

export const useFilterSync = <T extends object>({
  defaultFilters,
  currentFiltersFromUrl,
}: UseFilterSyncProps<T>) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [filters, setFilters] = useState<T>({
    ...defaultFilters,
    ...currentFiltersFromUrl,
  });

  useEffect(() => {
    setFilters((prev) => ({
      ...prev,
      ...currentFiltersFromUrl,
    }));
  }, [currentFiltersFromUrl]);

  const updateFilters = useCallback(
    (nextFilters: Partial<T>) => {
      const updated = { ...filters, ...nextFilters };
      setFilters(updated);

      const qs = applyFiltersToUrl({
        filters: updated,
        searchParams: new URLSearchParams(searchParams.toString()),
      });

      router.replace(qs ? `${pathname}?${qs}` : pathname);
    },
    [filters, pathname, router, searchParams]
  );

  return { filters, setFilters, updateFilters };
};
