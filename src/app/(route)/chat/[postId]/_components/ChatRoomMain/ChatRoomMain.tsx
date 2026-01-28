"use client";

import { ChatBox, ChatDateDivider } from "./internal";
import { useRef } from "react";
import {
  useChatScroll,
  useChatInfiniteScroll,
  useChatInitialScroll,
  useChatScrollPreserve,
} from "./internal/hooks";
import { cn } from "@/utils";
import { useGetUserData } from "@/api/fetch/user";
import { enrichChatMessagesWithMetadata } from "./utils";
import { ChatMessage } from "@/api/fetch/ChatMessage/types/ChatMessageTypes";

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

  useChatScroll(
    scrollRef,
    chatMessages,
    userInfo?.result.userId ? Number(userInfo.result.userId) : 0
  );
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

  const userId = userInfo?.result.userId ? Number(userInfo.result.userId) : undefined;

  const chatMessagesWithMetadata = enrichChatMessagesWithMetadata(chatMessages, userId);

  return (
    <div
      ref={scrollRef}
      className={cn(
        "flex flex-1 flex-col overflow-y-scroll bg-flatGray-25 px-4 py-2 no-scrollbar",
        !ready && "invisible"
      )}
    >
      <h1 className="sr-only">채팅 표시 화면</h1>
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
