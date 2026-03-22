"use client";

import {
  useInfiniteQuery,
  UseInfiniteQueryOptions,
  UseInfiniteQueryResult,
  QueryKey,
} from "@tanstack/react-query";

/**
 * 단일 cursor(`pageParamName`)로 조립하기 어려운 무한 스크롤용 공통 훅입니다.
 *
 * - 복합 pageParam(예: `lastDistance` + `lastPostId`)을 쿼리에 직접 넣거나
 * - URL·쿼리스트링을 호출부에서 완전히 제어해야 할 때 사용합니다.
 *
 * `queryFn`·`initialPageParam`·`getNextPageParam`은 도메인 훅에서 정의하고,
 * 이 래퍼는 `retry`·`staleTime`·`refetchOnWindowFocus` 등 기본 정책만 맞춥니다.
 */
export type UseAppCompositeInfiniteQueryOptions<TQueryFnData, TError, TData, TPageParam> = Omit<
  UseInfiniteQueryOptions<TQueryFnData, TError, TData, QueryKey, TPageParam>,
  "queryKey"
> & {
  suspense?: boolean;
};

const useAppCompositeInfiniteQuery = <
  TQueryFnData,
  TError = unknown,
  TData = TQueryFnData,
  TPageParam = unknown,
>(
  queryKey: QueryKey,
  options: UseAppCompositeInfiniteQueryOptions<TQueryFnData, TError, TData, TPageParam>
): UseInfiniteQueryResult<TData, TError> => {
  return useInfiniteQuery<TQueryFnData, TError, TData, QueryKey, TPageParam>({
    queryKey,
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60,
    ...options,
  } as UseInfiniteQueryOptions<TQueryFnData, TError, TData, QueryKey, TPageParam>);
};

export default useAppCompositeInfiniteQuery;
