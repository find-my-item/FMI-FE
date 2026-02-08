"use client";

import { ChatBox, ChatDateDivider } from "./_internal";
import { useRef } from "react";
import {
  useChatScroll,
  useChatInfiniteScroll,
  useChatInitialScroll,
  useChatScrollPreserve,
} from "./_internal/hooks";
import { cn } from "@/utils";
import { useGetUserData } from "@/api/fetch/user";
import { enrichMessages } from "./utils/enrichMessages";
import { ChatMessage } from "@/api/fetch/chatMessage/types/ChatMessageTypes";

interface ChatRoomMainProps {
  chatMessages: ChatMessage[];
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
  opponentNickname?: string;
}

const ChatRoomMain = ({
  chatMessages,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  opponentNickname,
}: ChatRoomMainProps) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const scrollHeightRef = useRef<number>(0);
  const { data: userInfo } = useGetUserData();

  const userId = userInfo?.result.userId ? Number(userInfo.result.userId) : undefined;

  useChatScroll(scrollRef, chatMessages, userId ?? 0);
  useChatInfiniteScroll({
    scrollRef,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    chatMessagesLength: chatMessages.length,
  });

  const ready = useChatInitialScroll(scrollRef, scrollHeightRef);

  useChatScrollPreserve({
    scrollRef,
    scrollHeightRef,
    isFetchingNextPage,
    chatMessagesLength: chatMessages.length,
  });

  const chatMessagesWithMetadata = enrichMessages(chatMessages, userId);

  return (
    <div
      ref={scrollRef}
      className={cn(
        "flex flex-1 flex-col overflow-y-scroll bg-flatGray-25 px-4 py-2 no-scrollbar",
        !ready && "invisible"
      )}
    >
      {chatMessagesWithMetadata.map(({ chat, isNewDate, nextSender, lastChat }) => (
        <div key={chat.messageId}>
          {isNewDate && <ChatDateDivider createdAt={chat.createdAt} />}
          <ChatBox
            chat={chat}
            nextSender={nextSender}
            lastChat={lastChat}
            opponentNickname={opponentNickname}
          />
        </div>
      ))}
    </div>
  );
};

export default ChatRoomMain;
