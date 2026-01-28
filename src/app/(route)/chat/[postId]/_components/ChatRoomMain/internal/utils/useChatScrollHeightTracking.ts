import { useEffect, RefObject } from "react";

interface UseChatScrollHeightTrackingParams {
  scrollRef: RefObject<HTMLDivElement | null>;
  scrollHeightRef: RefObject<number>;
  isFetchingNextPage: boolean;
}

export const useChatScrollHeightTracking = ({
  scrollRef,
  scrollHeightRef,
  isFetchingNextPage,
}: UseChatScrollHeightTrackingParams) => {
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || !isFetchingNextPage) return;

    scrollHeightRef.current = el.scrollHeight;
  }, [isFetchingNextPage, scrollRef, scrollHeightRef]);
};
