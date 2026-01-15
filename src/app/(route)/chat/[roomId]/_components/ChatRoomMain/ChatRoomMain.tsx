"use client";

import { ChatBox } from "./internal";
import { useChatRoom } from "@/providers/ChatRoomProvider";
import { useRef } from "react";
import useChatScroll from "./useChatScroll";
import { ChatMessage } from "@/api/fetch/ChatMessage/types/ChatMessageTypes";

interface ChatRoomMainProps {
  chatMessages: ChatMessage[];
}

const ChatRoomMain = ({ chatMessages }: ChatRoomMainProps) => {
  const { chats } = useChatRoom();
  const scrollRef = useRef<HTMLDivElement>(null);
  useChatScroll(scrollRef, chatMessages);

  return (
    <div
      ref={scrollRef}
      className="flex flex-1 flex-col overflow-y-scroll scroll-smooth bg-flatGray-25 px-[16px] py-[8px] no-scrollbar"
    >
      <h1 className="sr-only">채팅 표시 화면</h1>

      <div className="mb-4 flex w-full justify-center">
        <span className="rounded-3xl bg-toast px-[8px] py-[4px] text-caption2-semibold text-white">
          2025.11.07 금요일
        </span>
      </div>

      {chatMessages
        .slice()
        .reverse()
        .map((chat, i) => (
          <ChatBox
            key={chat.messageId}
            chat={chat}
            nextSender={chats[i - 1]?.sender}
            lastChat={i === chatMessages.length - 1}
          />
        ))}
    </div>
  );
};

export default ChatRoomMain;
