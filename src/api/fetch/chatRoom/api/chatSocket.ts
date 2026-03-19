import { Client, IMessage, StompSubscription } from "@stomp/stompjs";
import authApi from "@/api/_base/axios/authApi";

export type MessageHandler<T = any> = (message: T) => void;

let client: Client | null = null;
const subscriptions = new Map<string, StompSubscription>();
const handlers = new Map<string, Set<MessageHandler>>();

let pendingSubscriptions: Array<() => void> = [];
const savedSubscriptions = new Map<string, Set<MessageHandler>>();

let isReconnecting = false;
const RECONNECT_BASE_DELAY_MS = 1000;
const RECONNECT_MAX_DELAY_MS = 30000;
const RECONNECT_JITTER_RATIO = 0.2;
let reconnectAttempt = 0;
let reconnectTimeoutId: ReturnType<typeof setTimeout> | null = null;

let tokenRefreshHandler: (() => void) | null = null;

const MAX_AUTH_REFRESH_FAILURES = 1;
let consecutiveAuthRefreshFailures = 0;
let isAuthInvalid = false;

const calcReconnectDelayMs = (attempt: number) => {
  const exponential = RECONNECT_BASE_DELAY_MS * 2 ** attempt;
  const capped = Math.min(exponential, RECONNECT_MAX_DELAY_MS);

  const jitter = capped * RECONNECT_JITTER_RATIO * (Math.random() * 2 - 1);
  return Math.max(0, Math.floor(capped + jitter));
};

const performReconnectChatSocket = async () => {
  reconnectTimeoutId = null;

  if (isReconnecting) return;
  if (isAuthInvalid) return;
  isReconnecting = true;

  try {
    handlers.forEach((handlerSet, destination) => {
      savedSubscriptions.set(destination, new Set(handlerSet));
    });

    subscriptions.forEach((sub) => sub.unsubscribe());
    subscriptions.clear();

    if (client) {
      await client.deactivate();
      client = null;
    }

    try {
      await authApi.post("/auth/refresh");
      console.log("[STOMP] Token refreshed before reconnecting");
      consecutiveAuthRefreshFailures = 0;
    } catch (refreshError) {
      consecutiveAuthRefreshFailures += 1;
      console.warn(
        "[STOMP] Token refresh failed. Stop reconnect attempts after session becomes invalid:",
        refreshError
      );

      if (consecutiveAuthRefreshFailures >= MAX_AUTH_REFRESH_FAILURES) {
        isAuthInvalid = true;
        disconnectChatSocket();
        return;
      }
    }

    connectChatSocket();
    isReconnecting = false;
  } catch {
    isReconnecting = false;
  }
};

const scheduleReconnectChatSocket = ({
  immediate = false,
  resetAttempt = false,
}: {
  immediate?: boolean;
  resetAttempt?: boolean;
} = {}) => {
  if (client?.connected) return;
  if (client?.active) return;
  if (handlers.size === 0) return;
  if (isAuthInvalid) return;
  if (isReconnecting) return;

  if (resetAttempt) {
    reconnectAttempt = 0;
  }

  if (reconnectTimeoutId && !immediate) return;

  if (reconnectTimeoutId) {
    clearTimeout(reconnectTimeoutId);
    reconnectTimeoutId = null;
  }

  const nextAttempt = resetAttempt ? 0 : reconnectAttempt + 1;
  reconnectAttempt = nextAttempt;
  const delayMs = immediate ? 0 : calcReconnectDelayMs(nextAttempt);

  reconnectTimeoutId = setTimeout(() => {
    void performReconnectChatSocket();
  }, delayMs);
};

export const connectChatSocket = () => {
  if (client?.connected) return;

  if (client && !client.connected) {
    client.deactivate();
    client = null;
  }

  client = new Client({
    brokerURL: process.env.NODE_ENV === "development" ? "/api/ws" : "wss://www.finditem.kr/ws",
    reconnectDelay: 0,

    debug: (msg) => {
      if (process.env.NODE_ENV === "development") {
        console.log("[STOMP]", msg);
      }
    },

    onConnect: () => {
      console.log("[STOMP] connected");
      isReconnecting = false;
      reconnectAttempt = 0;
      isAuthInvalid = false;
      consecutiveAuthRefreshFailures = 0;
      if (reconnectTimeoutId) {
        clearTimeout(reconnectTimeoutId);
        reconnectTimeoutId = null;
      }

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
        scheduleReconnectChatSocket({ immediate: true, resetAttempt: true });
      }
    },

    onDisconnect: () => {
      console.log("[STOMP] disconnected");
      if (client && !client.connected && handlers.size > 0) {
        scheduleReconnectChatSocket();
      }
    },

    onWebSocketError: () => {
      if (client && !client.connected && handlers.size > 0) {
        scheduleReconnectChatSocket();
      }
    },
  });

  if (typeof window !== "undefined") {
    if (tokenRefreshHandler) {
      window.removeEventListener("tokenRefreshed", tokenRefreshHandler);
    }

    tokenRefreshHandler = () => {
      console.log("[STOMP] Token refreshed event received, reconnecting...");
      scheduleReconnectChatSocket({ immediate: true, resetAttempt: true });
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
  reconnectAttempt = 0;
  if (reconnectTimeoutId) {
    clearTimeout(reconnectTimeoutId);
    reconnectTimeoutId = null;
  }

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
      } catch {}
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
