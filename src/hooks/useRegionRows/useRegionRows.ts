import { useCallback, useEffect, useState } from "react";
import { loadRegionRows } from "@/utils";
import { RegionRow } from "@/types";

/**
 *
 * @author jikwon
 *
 * 지역 정보를 가져오는 hook
 *
 * @example
 * ```tsx
 * const { regions, isLoading, isError, error, refetch } = useRegionRows();
 * ```
 *
 */

type UseRegionRowsReturn = {
  regions: RegionRow[];
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
};

const useRegionRows = (): UseRegionRowsReturn => {
  const [regions, setRegions] = useState<RegionRow[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const refetch = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await loadRegionRows();
      setRegions(data);
    } catch (e) {
      setRegions([]);
      setError(e instanceof Error ? e : new Error("지역 정보를 불러오는데 실패했습니다."));
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void refetch();
  }, [refetch]);

  return {
    regions,
    isLoading,
    isError: Boolean(error),
    error,
    refetch,
  };
};

export default useRegionRows;
