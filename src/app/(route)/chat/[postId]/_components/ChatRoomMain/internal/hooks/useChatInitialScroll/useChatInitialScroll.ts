import { useLayoutEffect, useState, RefObject } from "react";

export const useChatInitialScroll = (
  scrollRef: RefObject<HTMLDivElement | null>,
  scrollHeightRef: RefObject<number>
) => {
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    scrollHeightRef.current = scrollRef.current.scrollHeight;
    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return ready;
};
