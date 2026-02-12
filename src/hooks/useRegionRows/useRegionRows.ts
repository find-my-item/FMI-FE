import { useQuery } from "@tanstack/react-query";
import { loadRegionRows } from "@/utils";

/**
 * @author jikwon
 *
 * @description
 * 지역 목록 데이터를 조회하는 React Query 기반 커스텀 훅입니다.
 *
 * @returns
 * React Query useQuery 결과 객체
 *
 * - data : 지역 목록 데이터 (RegionRow[] | undefined)
 * - isLoading : 로딩 상태 여부
 * - isError : 에러 발생 여부
 * - error : 발생한 에러 객체
 * - refetch : 지역 목록 재조회 함수
 *
 * @example
 * ```tsx
 * const { data: regions = [], isLoading } = useRegionRows();
 * ```
 */

const useRegionRows = () => {
  return useQuery({
    queryKey: ["regions"],
    queryFn: loadRegionRows,
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
  });
};

export default useRegionRows;
