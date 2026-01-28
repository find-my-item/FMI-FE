"use client";

import { ChatBox, ChatDateDivider } from "./internal";
import { useRef } from "react";
import {
  useChatScroll,
  useChatInfiniteScroll,
  useChatInitialScroll,
  useChatScrollPreserve,
} from "./internal/hooks";
import { ChatMessage } from "@/api/fetch/ChatMessage/types/ChatMessageTypes";
import { cn } from "@/utils";
import { useGetUserData } from "@/api/fetch/user";
import { getDateKey } from "./internal/ChatDateDivider";

interface ChatRoomMainProps {
  chatMessages: ChatMessage[];
  fetchNextPage: () => void;
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean;
}

const ChatRoomMain = ({
  chatMessages,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
}: ChatRoomMainProps) => {
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const scrollHeightRef = useRef<number>(0);
  const { data: userInfo } = useGetUserData();

  useChatScroll(scrollRef, chatMessages, Number(userInfo?.result.userId) ?? 0);
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

  return (
    <div
      ref={scrollRef}
      className={cn(
        "flex flex-1 flex-col overflow-y-scroll bg-flatGray-25 px-[16px] py-[8px] no-scrollbar",
        !ready && "invisible"
      )}
    >
      <h1 className="sr-only">채팅 표시 화면</h1>
      {chatMessages.map((chat, i) => {
        const prevChat = chatMessages[i - 1];

        const isNewDate = i === 0 || getDateKey(chat.createdAt) !== getDateKey(prevChat.createdAt);
        const nextSender = prevChat
          ? Number(userInfo?.result.userId) === prevChat.senderId
            ? "me"
            : "other"
          : undefined;
        return (
          <div key={chat.messageId}>
            {isNewDate && <ChatDateDivider createdAt={chat.createdAt} />}

            <ChatBox chat={chat} nextSender={nextSender} lastChat={i === chatMessages.length - 1} />
          </div>
        );
      })}
    </div>
  );
};

export default ChatRoomMain;
