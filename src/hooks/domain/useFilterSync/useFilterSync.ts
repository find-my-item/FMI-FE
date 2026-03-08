import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { applyFiltersToUrl } from "@/utils";

/**
 * @author suhyeon
 *
 * URL 쿼리 파라미터와 React 필터 상태를 동기화하기 위한 커스텀 훅입니다.
 *
 * Next.js App Router의 `useRouter`, `usePathname`, `useSearchParams`를 이용하여
 * 필터 상태 변경 시 URL 쿼리스트링을 업데이트하고, URL이 변경되면
 * 내부 상태를 다시 동기화합니다.
 *
 * 주요 목적
 * - 필터 상태와 URL 쿼리 파라미터 동기화
 * - 필터 변경 시 자동으로 URL 업데이트
 * - 새로고침/뒤로가기 시 URL 기반 상태 복원
 *
 * 동작 방식
 * 1. `defaultFilters`와 `currentFiltersFromUrl`을 병합하여 초기 필터 상태 생성
 * 2. URL 쿼리가 변경되면 `useEffect`를 통해 필터 상태 동기화
 * 3. `updateFilters` 호출 시
 *    - 필터 상태 업데이트
 *    - `applyFiltersToUrl`을 통해 URL 쿼리스트링 생성
 *    - `router.replace`로 URL 업데이트
 *
 * @template T - 필터 상태 객체 타입
 *
 * @param defaultFilters - 기본 필터 상태
 * @param currentFiltersFromUrl - URL 쿼리에서 파싱된 현재 필터 값
 *
 * @returns {{
 *  filters: T
 *  setFilters: React.Dispatch<React.SetStateAction<T>>
 *  updateFilters: (nextFilters: Partial<T>) => void
 * }}
 *
 * 반환 값 설명
 *
 * - filters
 *   현재 필터 상태 객체
 *
 * - setFilters
 *   필터 상태를 직접 업데이트하기 위한 React state setter
 *
 * - updateFilters
 *   필터를 업데이트하고 동시에 URL 쿼리스트링을 갱신하는 함수
 *
 * @example
 *
 * ```ts
 * const { startDate, endDate, sort } = useFilterParams();
 *
 * const { filters, updateFilters } = useFilterSync({
 *   defaultFilters: DEFAULT_FILTERS,
 *   currentFiltersFromUrl: {
 *     startDate,
 *     endDate,
 *     sort,
 *   },
 * });
 *
 * updateFilters({ sort: "LATEST" });
 * ```
 */

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
