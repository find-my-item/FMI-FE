"use client";

import { useEffect } from "react";
import { chatSocket } from "./chatSocket";

interface UseChatSocketOptions {
  onMessage?: (data: any) => void;
  onListUpdate?: (data: any) => void;
  onReadReceipt?: (data: any) => void;
}

export const useChatSocket = ({
  onMessage,
  onListUpdate,
  onReadReceipt,
}: UseChatSocketOptions = {}) => {
  useEffect(() => {
    // 1. 연결
    chatSocket.connect();

    // 2. 구독
    if (onMessage) {
      chatSocket.subscribe("/user/queue/messages", onMessage);
    }

    if (onListUpdate) {
      chatSocket.subscribe("/user/queue/list-updates", onListUpdate);
    }

    if (onReadReceipt) {
      chatSocket.subscribe("/user/queue/read-receipts", onReadReceipt);
    }

    // 3. 페이지 이탈 시 정리
    return () => {
      chatSocket.disconnect();
    };
  }, []);
};
