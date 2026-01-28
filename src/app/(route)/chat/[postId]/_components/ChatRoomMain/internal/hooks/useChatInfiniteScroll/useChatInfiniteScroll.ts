import { useEffect, useRef, RefObject } from "react";

interface UseChatInfiniteScrollOptions {
  scrollRef: RefObject<HTMLDivElement | null>;
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  chatMessagesLength: number;
}

export function useChatInfiniteScroll({
  scrollRef,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  chatMessagesLength,
}: UseChatInfiniteScrollOptions) {
  const prevScrollHeightRef = useRef<number>(0);
  const prevLengthRef = useRef<number>(chatMessagesLength);
  const shouldPreserveScrollRef = useRef(false);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const onScroll = () => {
      if (el.scrollTop <= 20 && hasNextPage && !isFetchingNextPage) {
        prevScrollHeightRef.current = el.scrollHeight;
        prevLengthRef.current = chatMessagesLength;
        shouldPreserveScrollRef.current = true;
        fetchNextPage();
      }
    };

    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [scrollRef, fetchNextPage, hasNextPage, isFetchingNextPage, chatMessagesLength]);

  // 데이터 로드 완료 후 스크롤 보정 (chatMessagesLength 변경 감지)
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !shouldPreserveScrollRef.current || isFetchingNextPage) return;

    // 메시지가 실제로 추가되었는지 확인
    if (chatMessagesLength <= prevLengthRef.current) return;

    // DOM 업데이트를 기다리기 위해 여러 프레임 사용
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        if (!el) return;
        const newScrollHeight = el.scrollHeight;
        const prevScrollHeight = prevScrollHeightRef.current;
        const scrollDiff = newScrollHeight - prevScrollHeight;

        if (scrollDiff > 0) {
          el.scrollTop = el.scrollTop + scrollDiff;
        }
        shouldPreserveScrollRef.current = false;
        prevLengthRef.current = chatMessagesLength;
      });
    });
  }, [isFetchingNextPage, chatMessagesLength, scrollRef]);
}
