"use client";

import { useEffect } from "react";
import {
  connectChatSocket,
  disconnectChatSocket,
  subscribeChatSocket,
  unsubscribeChatSocket,
} from "./chatSocket";
import type { MessageHandler } from "./chatSocket";
import { ChatListUpdateResponse, WebSocketChatMessage } from "../types/ChatRoomResponse";

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
  const subscriptions = [
    { destination: "/user/queue/messages", handler: onMessage },
    { destination: "/user/queue/list-updates", handler: onListUpdate },
    { destination: "/user/queue/read-receipts", handler: onReadReceipt },
  ];

  useEffect(() => {
    if (manageConnection) {
      connectChatSocket();
      return () => disconnectChatSocket();
    }

    subscriptions.forEach(({ destination, handler }) => {
      if (handler) {
        subscribeChatSocket(destination, handler as MessageHandler);
      }
    });

    return () => {
      subscriptions.forEach(({ destination, handler }) => {
        if (handler) {
          unsubscribeChatSocket(destination, handler as MessageHandler);
        }
      });
    };
  }, [onMessage, onListUpdate, onReadReceipt, manageConnection]);
};
