import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

interface UseInfiniteScrollOptions {
  /**
   * 다음 페이지를 가져오는 함수
   */
  fetchNextPage: () => void;
  /**
   * 다음 페이지가 있는지 여부
   */
  hasNextPage: boolean | undefined;
  /**
   * 현재 다음 페이지를 가져오는 중인지 여부
   */
  isFetchingNextPage: boolean;
  /**
   * useInView의 옵션 (threshold 등)
   */
  inViewOptions?: {
    threshold?: number;
  };
}

/**
 * 무한 스크롤을 구현하는 커스텀 훅입니다.
 *
 * 요소가 뷰포트에 들어오고, 다음 페이지가 있으며, 현재 로딩 중이 아닐 때
 * 자동으로 다음 페이지를 가져옵니다.
 *
 * @example
 * ```tsx
 * const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useInfiniteQuery(...);
 * const { ref } = useInfiniteScroll({
 *   fetchNextPage,
 *   hasNextPage,
 *   isFetchingNextPage,
 * });
 *
 * return (
 *   <>
 *     {data?.map((item) => <Item key={item.id} {...item} />)}
 *     <div ref={ref} className="h-[100px]" />
 *   </>
 * );
 * ```
 */
export function useInfiniteScroll({
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  inViewOptions = { threshold: 0 },
}: UseInfiniteScrollOptions) {
  const { ref, inView } = useInView(inViewOptions);

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  return { ref };
}
