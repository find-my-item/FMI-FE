import { useEffect, RefObject } from "react";

interface UseChatScrollPreserveParams {
  scrollRef: RefObject<HTMLDivElement | null>;
  scrollHeightRef: RefObject<number>;
  isFetchingNextPage: boolean;
  chatMessagesLength: number;
}

export const useChatScrollPreserve = ({
  scrollRef,
  scrollHeightRef,
  isFetchingNextPage,
  chatMessagesLength,
}: UseChatScrollPreserveParams) => {
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || isFetchingNextPage) return;

    const prevScrollHeight = scrollHeightRef.current;
    if (el.scrollHeight !== prevScrollHeight && prevScrollHeight > 0) {
      const scrollDiff = el.scrollHeight - prevScrollHeight;
      el.scrollTop = el.scrollTop + scrollDiff;
    }
    scrollHeightRef.current = el.scrollHeight;
  }, [isFetchingNextPage, chatMessagesLength, scrollRef, scrollHeightRef]);
};
