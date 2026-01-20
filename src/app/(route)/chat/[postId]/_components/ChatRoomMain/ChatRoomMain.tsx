"use client";

import { ChatBox } from "./internal";
import { Ref, useLayoutEffect, useRef, useState } from "react";
import useChatScroll from "./useChatScroll";
import { ChatMessage } from "@/api/fetch/ChatMessage/types/ChatMessageTypes";
import useAppQuery from "@/api/_base/query/useAppQuery";
import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { cn } from "@/utils";

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

// 한국 시간대(UTC+9) 기준으로 날짜를 계산하는 헬퍼 함수
const getKSTDateInfo = (isoString: string) => {
  // ISO 문자열을 파싱 (서버에서 UTC로 보내는 경우를 가정)
  const date = new Date(isoString);

  // formatDate 유틸리티와 동일한 방식으로 처리
  // ISO 문자열에 타임존 정보가 없으면 'Z'를 추가해서 UTC로 해석
  let targetDate: Date;
  if (isoString.includes("Z") || isoString.includes("+") || isoString.includes("-", 10)) {
    targetDate = new Date(isoString);
  } else {
    targetDate = new Date(`${isoString}Z`);
  }

  // 로컬 타임존 기준으로 날짜 계산 (한국이면 자동으로 KST 적용)
  // new Date()는 이미 로컬 타임존으로 변환하므로 추가 변환 불필요
  return {
    year: targetDate.getFullYear(),
    month: targetDate.getMonth(),
    date: targetDate.getDate(),
    day: targetDate.getDay(),
  };
};

const formatKoreanDate = (isoString: string) => {
  const { year, month, date, day } = getKSTDateInfo(isoString);

  const monthStr = String(month + 1).padStart(2, "0");
  const dateStr = String(date).padStart(2, "0");

  const weekdays = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
  const weekday = weekdays[day];

  return `${year}.${monthStr}.${dateStr} ${weekday}`;
};

const getDateKey = (isoString: string) => {
  const { year, month, date } = getKSTDateInfo(isoString);
  return `${year}-${month}-${date}`;
};

const ChatRoomMain = ({ chatMessages, chatMessagesRef }: ChatRoomMainProps) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [ready, setReady] = useState(false);
  const { data: userInfo } = useAppQuery<ApiBaseResponseType<UserInfoResponse>>(
    "auth",
    ["userInfo"],
    `/users/me`
  );
  useChatScroll(scrollRef, chatMessages, userInfo?.result.userId ?? 0);

  useLayoutEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    setReady(true);
  }, []);

  return (
    <div
      ref={scrollRef}
      className={cn(
        "flex flex-1 flex-col overflow-y-scroll bg-flatGray-25 px-[16px] py-[8px] no-scrollbar",
        !ready && "invisible"
      )}
    >
      <h1 className="sr-only">채팅 표시 화면</h1>
      <div ref={chatMessagesRef} className="h-[1px] flex-shrink-0" />
      {chatMessages.map((chat, i) => {
        const prevChat = chatMessages[i - 1];

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

            <ChatBox chat={chat} nextSender={nextSender} lastChat={i === chatMessages.length - 1} />
          </div>
        );
      })}
    </div>
  );
};

export default ChatRoomMain;
