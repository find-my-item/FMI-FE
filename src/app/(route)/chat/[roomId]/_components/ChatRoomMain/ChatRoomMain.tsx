"use client";

import ChatBox from "./_internal/ChatBox";
import { MockChatDataType } from "../../_types/MockChatDataType";

const ChatRoomMain = ({ chats }: { chats: MockChatDataType[] }) => {
  return (
    <div className="flex flex-1 flex-col-reverse overflow-y-scroll bg-flatGray-25 px-[16px] py-[8px] no-scrollbar">
      <h1 className="sr-only">채팅 표시 화면</h1>
      {chats.map((chat, i) => (
        <ChatBox
          key={i}
          chat={chat}
          prevSender={chats[i - 1]?.sender}
          nextSender={chats[i + 1]?.sender}
        />
      ))}
      {/* TODO(형준): 목업 단계에서 순서 뒤집기로 인한 하단 배치 실 구현시 위치 변경예정 */}
      <div className="mb-4 flex w-full justify-center">
        <span className="rounded-3xl bg-toast px-[8px] py-[4px] text-caption2-semibold text-white">
          2025.11.07 금요일
        </span>
      </div>
    </div>
  );
};

export default ChatRoomMain;
