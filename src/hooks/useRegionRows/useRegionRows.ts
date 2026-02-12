import { useQuery } from "@tanstack/react-query";
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
  const {
    data: regions = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["regions"],
    queryFn: loadRegionRows,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });

  const handleRefetch = async () => {
    await refetch();
  };

  return {
    regions,
    isLoading,
    isError,
    error,
    refetch: handleRefetch,
  };
};

export default useRegionRows;
