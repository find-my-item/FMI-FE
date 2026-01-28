import { useEffect, RefObject } from "react";

interface UseChatInfiniteScrollOptions {
  scrollRef: RefObject<HTMLDivElement | null>;
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
}

export function useChatInfiniteScroll({
  scrollRef,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: UseChatInfiniteScrollOptions) {
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => {
      if (el.scrollTop <= 20 && hasNextPage && !isFetchingNextPage) {
        const prevScrollHeight = el.scrollHeight;

        fetchNextPage();

        requestAnimationFrame(() => {
          const newScrollHeight = el.scrollHeight;
          const scrollDiff = newScrollHeight - prevScrollHeight;
          el.scrollTop = el.scrollTop + scrollDiff;
        });
      }
    };

    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [scrollRef, fetchNextPage, hasNextPage, isFetchingNextPage]);
}
