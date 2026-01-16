"use client";

import { ChatBox } from "./internal";
import { useChatRoom } from "@/providers/ChatRoomProvider";
import { Ref, useRef } from "react";
import useChatScroll from "./useChatScroll";
import { ChatMessage } from "@/api/fetch/ChatMessage/types/ChatMessageTypes";
import useAppQuery from "@/api/_base/query/useAppQuery";
import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";

interface UserInfoResponse {
  userId: number;
  nickname: string;
  email: string;
  emailVerified: boolean;
  profileImg: string;
}

interface ChatRoomMainProps {
  chatMessages: ChatMessage[];
  chatMessagesRef: Ref<HTMLDivElement>;
}

const formatKoreanDate = (isoString: string) => {
  const date = new Date(isoString);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const weekdays = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  const weekday = weekdays[date.getDay()];

  return `${year}.${month}.${day} ${weekday}`;
};

const getDateKey = (isoString: string) => {
  const d = new Date(isoString);
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
};

const ChatRoomMain = ({ chatMessages, chatMessagesRef }: ChatRoomMainProps) => {
  const { chats } = useChatRoom();
  const scrollRef = useRef<HTMLDivElement>(null);
  useChatScroll(scrollRef, chatMessages);
  const { data: userInfo } = useAppQuery<ApiBaseResponseType<UserInfoResponse>>(
    "auth",
    ["userInfo"],
    `/users/me`
  );
  const reversedMessages = chatMessages.slice().reverse();

  return (
    <div
      ref={scrollRef}
      className="flex flex-1 flex-col overflow-y-scroll scroll-smooth bg-flatGray-25 px-[16px] py-[8px] no-scrollbar"
    >
      <h1 className="sr-only">채팅 표시 화면</h1>
      <div ref={chatMessagesRef} className="h-[1px] flex-shrink-0" />
      {reversedMessages.map((chat, i) => {
        const prevChat = reversedMessages[i - 1];

        const isNewDate = i === 0 || getDateKey(chat.createdAt) !== getDateKey(prevChat.createdAt);
        const nextSender = prevChat
          ? userInfo?.result.userId === prevChat.senderId
            ? "me"
            : "other"
          : undefined;
        return (
          <div key={chat.messageId}>
            {isNewDate && (
              <div className="mb-4 mt-4 flex w-full justify-center">
                <span className="rounded-3xl bg-toast px-[8px] py-[4px] text-caption2-semibold text-white">
                  {formatKoreanDate(chat.createdAt)}
                </span>
              </div>
            )}

            <ChatBox
              chat={chat}
              nextSender={nextSender}
              lastChat={i === reversedMessages.length - 1}
            />
          </div>
        );
      })}
    </div>
  );
};

export default ChatRoomMain;
