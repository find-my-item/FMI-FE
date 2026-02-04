import { Client, IMessage, StompSubscription } from "@stomp/stompjs";
import authApi from "@/api/_base/axios/authApi";

type MessageHandler<T = any> = (message: T) => void;

let client: Client | null = null;
const subscriptions = new Map<string, StompSubscription>();
const handlers = new Map<string, Set<MessageHandler>>();

// 연결 전에 들어온 구독 요청을 임시로 저장
let pendingSubscriptions: Array<() => void> = [];

// 기존 구독 정보를 보존하기 위한 백업
const savedSubscriptions = new Map<string, Set<MessageHandler>>();

// 재연결 시도 중인지 추적 (중복 재연결 방지)
let isReconnecting = false;

// 재연결 쓰로틀: 마지막 시도 이후 이 시간(ms) 이내면 재연결 생략
const RECONNECT_THROTTLE_MS = 1000;
let lastReconnectAttempt = 0;

// 토큰 재발급 이벤트 핸들러 (정리용)
let tokenRefreshHandler: (() => void) | null = null;

// 웹소켓 재연결 함수
const reconnectChatSocket = async () => {
  if (isReconnecting) return;
  isReconnecting = true;

  try {
    // 현재 구독 정보 백업
    handlers.forEach((handlerSet, destination) => {
      savedSubscriptions.set(destination, new Set(handlerSet));
    });

    // 기존 연결 해제 (구독은 유지)
    subscriptions.forEach((sub) => sub.unsubscribe());
    subscriptions.clear();

    // 클라이언트 비활성화 완료까지 대기 후 재연결 (타이머 대신 Promise 활용)
    if (client) {
      await client.deactivate();
      client = null;
    }

    // 🔑 상황 1 해결: 웹소켓이 끊겼을 때 토큰 재발급 시도
    // 토큰이 만료되었을 가능성이 있으므로 재발급 시도
    try {
      await authApi.post("/auth/refresh");
      console.log("[STOMP] Token refreshed before reconnecting");
    } catch (refreshError) {
      // 재발급 실패 시에도 재연결은 시도 (토큰 문제가 아닐 수도 있음)
      console.warn("[STOMP] Token refresh failed, reconnecting anyway:", refreshError);
    }

    connectChatSocket();
    isReconnecting = false;
  } catch {
    isReconnecting = false;
  }
};

// 소켓 연결
export const connectChatSocket = () => {
  if (client?.connected) return;

  // 기존 클라이언트가 있지만 연결이 끊긴 경우 정리
  if (client && !client.connected) {
    client.deactivate();
    client = null;
  }

  client = new Client({
    brokerURL: `/api/ws`,
    reconnectDelay: 5000,

    debug: (msg) => {
      if (process.env.NODE_ENV === "development") {
        console.log("[STOMP]", msg);
      }
    },

    onConnect: () => {
      console.log("[STOMP] connected");
      isReconnecting = false;

      // 🔑 연결 완료 후 대기 중이던 구독 처리
      pendingSubscriptions.forEach((subscribe) => subscribe());
      pendingSubscriptions = [];

      // 🔑 백업된 구독 정보 복원
      savedSubscriptions.forEach((handlerSet, destination) => {
        handlerSet.forEach((handler) => {
          subscribeChatSocket(destination, handler);
        });
      });
      savedSubscriptions.clear();
    },

    onStompError: (frame) => {
      // 인증 관련 에러인 경우 재연결 시도
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
      // 🔑 상황 1 해결: 연결이 끊겼을 때 재연결 시도
      // 타임스탬프 기반 쓰로틀로 연속 재연결 방지 (타이머 대신)
      if (client && !client.connected && handlers.size > 0) {
        const now = Date.now();
        if (now - lastReconnectAttempt < RECONNECT_THROTTLE_MS) return;
        lastReconnectAttempt = now;
        reconnectChatSocket();
      }
    },

    onWebSocketError: () => {
      // 🔑 상황 1 해결: 웹소켓 에러 발생 시 재연결 시도
      if (client && !client.connected && handlers.size > 0) {
        reconnectChatSocket();
      }
    },
  });

  // 🔑 상황 2 해결: 토큰 재발급 이벤트 리스닝
  if (typeof window !== "undefined") {
    // 기존 핸들러가 있으면 제거
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

// 소켓 연결 해제
export const disconnectChatSocket = () => {
  subscriptions.forEach((sub) => sub.unsubscribe());
  subscriptions.clear();
  handlers.clear();
  savedSubscriptions.clear();

  pendingSubscriptions = [];
  isReconnecting = false;

  // 이벤트 리스너 제거
  if (typeof window !== "undefined" && tokenRefreshHandler) {
    window.removeEventListener("tokenRefreshed", tokenRefreshHandler);
    tokenRefreshHandler = null;
  }

  client?.deactivate();
  client = null;
};

// 소켓 구독
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
      console.log(`[STOMP] Received message on ${destination}:`, message.body);
      try {
        const parsed = JSON.parse(message.body);
        handlers.get(destination)?.forEach((h) => h(parsed));
      } catch {
        // 파싱 실패 시 무시
      }
    });

    subscriptions.set(destination, sub);
    console.log(`[STOMP] Subscribed to ${destination}`);
  };

  // 아직 연결 안 됐으면 대기열에 저장
  if (!client?.connected) {
    pendingSubscriptions.push(subscribe);
    return;
  }

  subscribe();
};

// 소켓 구독 해제
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
        console.log(`[STOMP] Unsubscribed from ${destination}`);
      }
    }
  } else {
    const subscription = subscriptions.get(destination);
    if (subscription) {
      subscription.unsubscribe();
      subscriptions.delete(destination);
      handlers.delete(destination);
      savedSubscriptions.delete(destination);
      console.log(`[STOMP] Unsubscribed from ${destination}`);
    }
  }
};

// 메시지 전송(텍스트)
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
