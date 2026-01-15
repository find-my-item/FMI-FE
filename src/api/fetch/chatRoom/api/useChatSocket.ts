"use client";

import { useEffect } from "react";
import { connectChatSocket, disconnectChatSocket, subscribeChatSocket } from "./chatSocket";
import { ChatListUpdateResponse, ChatMessageResponse } from "../types/ChatListType";

interface UseChatSocketOptions {
  onMessage?: (data: ChatMessageResponse) => void;
  onListUpdate?: (data: ChatListUpdateResponse) => void;
  onReadReceipt?: (data: any) => void;
}

export const useChatSocket = ({
  onMessage,
  onListUpdate,
  onReadReceipt,
}: UseChatSocketOptions = {}) => {
  useEffect(() => {
    // 소켓 연결
    connectChatSocket();

    // 메시지 구독
    if (onMessage) {
      subscribeChatSocket("/user/queue/messages", onMessage);
    }

    // 채팅 목록 업데이트 구독
    if (onListUpdate) {
      subscribeChatSocket("/user/queue/list-updates", onListUpdate);
    }

    // 읽음 확인 구독
    if (onReadReceipt) {
      subscribeChatSocket("/user/queue/read-receipts", onReadReceipt);
    }

    // 컴포넌트 unmount 시 정리
    return () => {
      disconnectChatSocket();
    };
  }, []);
};
