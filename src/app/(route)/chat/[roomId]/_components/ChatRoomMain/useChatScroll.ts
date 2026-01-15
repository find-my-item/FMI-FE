import { RefObject, useEffect } from "react";
import { ChatMessage } from "@/api/fetch/ChatMessage/types/ChatMessageTypes";

const useChatScroll = (
  scrollRef: RefObject<HTMLDivElement | null>,
  chatMessages: ChatMessage[]
) => {
  useEffect(() => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [chatMessages]);
};

export default useChatScroll;
