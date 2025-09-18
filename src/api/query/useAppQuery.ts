"use client";

import { useQuery, UseQueryOptions, UseQueryResult, QueryKey } from "@tanstack/react-query";
import useAxios from "../axios/useAxios";

// 제네릭
// TQueryData: axios 요청 후 서버에서 받아올 데이터 타입
// TError: 쿼리 요청 실패 시 에러 타입, 기본 unknown
// TData: useQuery훅이 실제 반환하는 데이터 타입, 기본 값은 TQueryData와 동일

// 파라미터
// apiType: 'auth' -> 토큰이 필요한 요청, 'public' -> 공개 API
// queryKey: tanstack query query key (ex: ["posts"], ["post", id])
// url: api 요청 엔드포인트
// option: 추가 useQuery option (ex: {staleTime: 1000 * 30, refetchInterval: 3000} (객체로 삽입))

const useAppQuery = <TQueryFnData, TError = unknown, TData = TQueryFnData>(
  apiType: "auth" | "public",
  queryKey: QueryKey,
  url: string,
  options?: Omit<UseQueryOptions<TQueryFnData, TError, TData>, "queryKey" | "queryFn">
): UseQueryResult<TData, TError> => {
  const axios = useAxios(apiType);

  return useQuery({
    queryKey,
    queryFn: async () => {
      const { data } = await axios.get<TQueryFnData>(url);
      return data;
    },
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60,
    ...options,
  });
};

export default useAppQuery;
