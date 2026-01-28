import { RefObject, useLayoutEffect, useRef } from "react";
import { ChatMessage } from "@/api/fetch/ChatMessage/types/ChatMessageTypes";

const useChatScroll = (
  scrollRef: RefObject<HTMLDivElement | null>,
  chatMessages: ChatMessage[],
  myId: number
) => {
  const prevLengthRef = useRef<number>(0);
  const isInitialRef = useRef(true);

  useLayoutEffect(() => {
    const el = scrollRef.current;
    if (!el || !myId || chatMessages.length === 0) return;

    const prevLength = prevLengthRef.current;
    const currentLength = chatMessages.length;

    // 초기 로드가 아니고, 메시지가 증가하지 않았으면 스킵 (무한스크롤 등)
    if (!isInitialRef.current && currentLength <= prevLength) {
      prevLengthRef.current = currentLength;
      return;
    }

    const last = chatMessages[currentLength - 1];

    if (isInitialRef.current) {
      el.scrollTop = el.scrollHeight;
      isInitialRef.current = false;
    } else if (currentLength === prevLength + 1 && last.senderId === myId) {
      // 내 메시지가 아래에 추가된 경우에만 자동 스크롤
      el.classList.add("scroll-smooth");
      el.scrollTop = el.scrollHeight;

      requestAnimationFrame(() => {
        el.classList.remove("scroll-smooth");
      });
    }

    prevLengthRef.current = currentLength;
  }, [chatMessages.length, myId, scrollRef, chatMessages]);
};

export default useChatScroll;
