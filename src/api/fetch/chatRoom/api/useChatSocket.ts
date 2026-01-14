"use client";

import { useEffect } from "react";
import { connectChatSocket, disconnectChatSocket, subscribeChatSocket } from "./chatSocket";

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
    connectChatSocket();

    if (onMessage) {
      subscribeChatSocket("/user/queue/messages", onMessage);
    }

    if (onListUpdate) {
      subscribeChatSocket("/user/queue/list-updates", onListUpdate);
    }

    if (onReadReceipt) {
      subscribeChatSocket("/user/queue/read-receipts", onReadReceipt);
    }

    return () => {
      disconnectChatSocket();
    };
  }, []);
};
