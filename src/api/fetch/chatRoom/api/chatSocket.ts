import { Client, IMessage, StompSubscription } from "@stomp/stompjs";
import getBaseURL from "@/api/_base/axios/getBaseURL";

type MessageHandler<T = any> = (message: T) => void;

let client: Client | null = null;
const subscriptions = new Map<string, StompSubscription>();

// 연결 전에 들어온 구독 요청을 임시로 저장
let pendingSubscriptions: Array<() => void> = [];

// 소켓 연결
export const connectChatSocket = () => {
  if (client) return;

  client = new Client({
    brokerURL: `${getBaseURL()}/ws`,
    reconnectDelay: 5000,

    debug: (msg) => {
      if (process.env.NODE_ENV === "development") {
        console.log("[STOMP]", msg);
      }
    },

    onConnect: () => {
      console.log("[STOMP] connected");

      // 🔑 연결 완료 후 대기 중이던 구독 처리
      pendingSubscriptions.forEach((subscribe) => subscribe());
      pendingSubscriptions = [];
    },

    onStompError: (frame) => {
      console.error("[STOMP ERROR]", frame.headers["message"]);
      console.error(frame.body);
    },
  });

  client.activate();
};

// 소켓 연결 해제
export const disconnectChatSocket = () => {
  subscriptions.forEach((sub) => sub.unsubscribe());
  subscriptions.clear();

  pendingSubscriptions = [];

  client?.deactivate();
  client = null;
};

// 소켓 구독
export const subscribeChatSocket = <T>(destination: string, handler: MessageHandler<T>) => {
  const subscribe = () => {
    if (!client) return;

    if (subscriptions.has(destination)) {
      console.log(`[STOMP] Already subscribed to ${destination}`);
      return;
    }

    const sub = client.subscribe(destination, (message: IMessage) => {
      console.log(`[STOMP] Received message on ${destination}:`, message.body);
      try {
        const parsed = JSON.parse(message.body);
        handler(parsed);
      } catch (error) {
        console.error("[STOMP] Failed to parse message:", error);
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
export const unsubscribeChatSocket = (destination: string) => {
  const subscription = subscriptions.get(destination);
  if (subscription) {
    subscription.unsubscribe();
    subscriptions.delete(destination);
    console.log(`[STOMP] Unsubscribed from ${destination}`);
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
  } catch (error) {
    console.error("[STOMP] Failed to send message:", error);
    return false;
  }
};
