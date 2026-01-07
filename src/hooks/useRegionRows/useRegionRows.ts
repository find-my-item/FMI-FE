import { useCallback, useEffect, useState } from "react";
import { loadRegionRows } from "@/utils";
import { RegionRow } from "@/types";

/**
 *
 * @author jikwon
 *
 * 지역 정보를 가져오는 커스텀 훅
 *
 * @returns
 * - `regions` : 지역 목록 데이터
 * - `isLoading` : 로딩 상태 여부
 * - `isError` : 에러 발생 여부
 * - `error` : 발생한 에러 객체
 * - `refetch` : 지역 목록 재조회 함수
 *
 * @example
 * ```tsx
 * const { regions, isLoading, isError, error, refetch } = useRegionRows();
 * ```
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
