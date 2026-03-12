import { Client, IMessage, StompSubscription } from "@stomp/stompjs";
import authApi from "@/api/_base/axios/authApi";

export type MessageHandler<T = any> = (message: T) => void;

let client: Client | null = null;
const subscriptions = new Map<string, StompSubscription>();
const handlers = new Map<string, Set<MessageHandler>>();

let pendingSubscriptions: Array<() => void> = [];
const savedSubscriptions = new Map<string, Set<MessageHandler>>();

// 중복 재연결 방지
let isReconnecting = false;

// 재연결 쓰로틀: 마지막 시도 이후 이 시간(ms) 이내면 재연결 생략
const RECONNECT_THROTTLE_MS = 1000;
let lastReconnectAttempt = 0;

let tokenRefreshHandler: (() => void) | null = null;

const reconnectChatSocket = async () => {
  if (isReconnecting) return;
  isReconnecting = true;

  try {
    handlers.forEach((handlerSet, destination) => {
      savedSubscriptions.set(destination, new Set(handlerSet));
    });

    subscriptions.forEach((sub) => sub.unsubscribe());
    subscriptions.clear();

    // deactivate 완료 후 재연결 (Promise로 순서 보장)
    if (client) {
      await client.deactivate();
      client = null;
    }

    // 끊김 시 토큰 만료 가능성 있으므로 재발급 시도
    try {
      await authApi.post("/auth/refresh");
      console.log("[STOMP] Token refreshed before reconnecting");
    } catch (refreshError) {
      console.warn("[STOMP] Token refresh failed, reconnecting anyway:", refreshError);
    }

    connectChatSocket();
    isReconnecting = false;
  } catch {
    isReconnecting = false;
  }
};

export const connectChatSocket = () => {
  if (client?.connected) return;

  if (client && !client.connected) {
    client.deactivate();
    client = null;
  }

  client = new Client({
    brokerURL: process.env.NODE_ENV === "development" ? "/api/ws" : "wss://www.finditem.kr/ws",
    reconnectDelay: 5000,

    debug: (msg) => {
      if (process.env.NODE_ENV === "development") {
        console.log("[STOMP]", msg);
      }
    },

    onConnect: () => {
      console.log("[STOMP] connected");
      isReconnecting = false;

      pendingSubscriptions.forEach((subscribe) => subscribe());
      pendingSubscriptions = [];

      savedSubscriptions.forEach((handlerSet, destination) => {
        handlerSet.forEach((handler) => {
          subscribeChatSocket(destination, handler);
        });
      });
      savedSubscriptions.clear();
    },

    onStompError: (frame) => {
      const errorMessage = frame.headers["message"] || "";
      if (
        errorMessage.includes("401") ||
        errorMessage.includes("403") ||
        errorMessage.includes("Unauthorized")
      ) {
        console.log("[STOMP] Authentication error detected, reconnecting...");
        reconnectChatSocket();
      }
    },

    onDisconnect: () => {
      console.log("[STOMP] disconnected");
      if (client && !client.connected && handlers.size > 0) {
        const now = Date.now();
        if (now - lastReconnectAttempt < RECONNECT_THROTTLE_MS) return;
        lastReconnectAttempt = now;
        reconnectChatSocket();
      }
    },

    onWebSocketError: () => {
      if (client && !client.connected && handlers.size > 0) {
        reconnectChatSocket();
      }
    },
  });

  if (typeof window !== "undefined") {
    if (tokenRefreshHandler) {
      window.removeEventListener("tokenRefreshed", tokenRefreshHandler);
    }

    tokenRefreshHandler = () => {
      console.log("[STOMP] Token refreshed event received, reconnecting...");
      reconnectChatSocket();
    };

    window.addEventListener("tokenRefreshed", tokenRefreshHandler);
  }

  client.activate();
};

export const disconnectChatSocket = () => {
  subscriptions.forEach((sub) => sub.unsubscribe());
  subscriptions.clear();
  handlers.clear();
  savedSubscriptions.clear();

  pendingSubscriptions = [];
  isReconnecting = false;

  if (typeof window !== "undefined" && tokenRefreshHandler) {
    window.removeEventListener("tokenRefreshed", tokenRefreshHandler);
    tokenRefreshHandler = null;
  }

  client?.deactivate();
  client = null;
};

export const subscribeChatSocket = <T>(destination: string, handler: MessageHandler<T>) => {
  const subscribe = () => {
    if (!client) return;

    if (!handlers.has(destination)) {
      handlers.set(destination, new Set());
    }
    handlers.get(destination)!.add(handler);

    if (subscriptions.has(destination)) {
      return;
    }

    const sub = client.subscribe(destination, (message: IMessage) => {
      try {
        const parsed = JSON.parse(message.body);
        handlers.get(destination)?.forEach((h) => h(parsed));
      } catch {
        // ignore parse error
      }
    });

    subscriptions.set(destination, sub);
  };

  if (!client?.connected) {
    pendingSubscriptions.push(subscribe);
    return;
  }

  subscribe();
};

export const unsubscribeChatSocket = (destination: string, handler?: MessageHandler) => {
  if (handler) {
    handlers.get(destination)?.delete(handler);
    savedSubscriptions.get(destination)?.delete(handler);
    if (handlers.get(destination)?.size === 0) {
      const subscription = subscriptions.get(destination);
      if (subscription) {
        subscription.unsubscribe();
        subscriptions.delete(destination);
        handlers.delete(destination);
        savedSubscriptions.delete(destination);
      }
    }
  } else {
    const subscription = subscriptions.get(destination);
    if (subscription) {
      subscription.unsubscribe();
      subscriptions.delete(destination);
      handlers.delete(destination);
      savedSubscriptions.delete(destination);
    }
  }
};

export const sendChatSocketMessage = (destination: string, body: unknown): boolean => {
  if (!client?.connected) {
    return false;
  }

  try {
    client.publish({
      destination,
      body: JSON.stringify(body),
    });
    return true;
  } catch {
    return false;
  }
};
