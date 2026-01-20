"use client";

import { useEffect } from "react";
import {
  connectChatSocket,
  disconnectChatSocket,
  subscribeChatSocket,
  unsubscribeChatSocket,
} from "./chatSocket";
import { ChatListUpdateResponse, WebSocketChatMessage } from "../types/ChatRoomType";

interface UseChatSocketOptions {
  onMessage?: (data: WebSocketChatMessage) => void;
  onListUpdate?: (data: ChatListUpdateResponse) => void;
  onReadReceipt?: (data: any) => void;
  manageConnection?: boolean;
}

export const useChatSocket = ({
  onMessage,
  onListUpdate,
  onReadReceipt,
  manageConnection = false,
}: UseChatSocketOptions = {}) => {
  useEffect(() => {
    if (manageConnection) {
      connectChatSocket();
      return () => {
        disconnectChatSocket();
      };
    }

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
      if (onMessage) {
        unsubscribeChatSocket("/user/queue/messages");
      }
      if (onListUpdate) {
        unsubscribeChatSocket("/user/queue/list-updates");
      }
      if (onReadReceipt) {
        unsubscribeChatSocket("/user/queue/read-receipts");
      }
    };
  }, [onMessage, onListUpdate, onReadReceipt, manageConnection]);
};
