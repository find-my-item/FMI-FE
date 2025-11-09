import { RefObject, useEffect } from "react";
import { MockChatDataType } from "../../../../MockChatDataType";

const useChatScroll = (scrollRef: RefObject<HTMLDivElement | null>, chats: MockChatDataType[]) => {
  useEffect(() => {
    if (!scrollRef.current) return;

    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [chats]);
};

export default useChatScroll;
