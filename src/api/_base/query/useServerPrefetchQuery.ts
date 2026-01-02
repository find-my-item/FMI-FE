"server-only";

import { QueryClient } from "@tanstack/react-query";

interface PrefetchQueryOptions<TData> {
  queryClient: QueryClient;
  queryKey: readonly unknown[];
  fetcher: () => Promise<TData>;
}

// 서버 전용 prefetchQuery 훅
// SSR / SSG / ISR 대응 가능
// queryClient와 fetcher를 받아 데이터를 서버에서 미리 가져옴

const useServerPrefetchQuery = async <TData>({
  queryClient,
  queryKey,
  fetcher, // !경고: ISR을 사용하려면 무조건 fetch기반 작성 필요 (ex: fetch 설정 추가 {next: {revalidate: 60}})
}: PrefetchQueryOptions<TData>) => {
  // ISR 대응: fetch에 next.revalidate 옵션 전달
  const data = await queryClient.prefetchQuery<TData>({
    queryKey,
    queryFn: fetcher,
    staleTime: 1000 * 60, // 기본 staleTime 1분
    gcTime: 1000 * 60 * 5, // 기본 cacheTime 5분
  });

  return data;
};

export default useServerPrefetchQuery;
