import { Client, IMessage, StompSubscription } from "@stomp/stompjs";
import getBaseURL from "@/api/_base/axios/getBaseURL";

type MessageHandler<T = any> = (message: T) => void;

// 채팅 소켓 클라이언트
let client: Client | null = null;
// 채팅 소켓 구독 목록
const subscriptions = new Map<string, StompSubscription>();

// 채팅 소켓 연결
export const connectChatSocket = () => {
  if (client?.connected) return;

  client = new Client({
    brokerURL: `${getBaseURL()}/ws`,
    reconnectDelay: 5000,
    debug: (msg) => {
      if (process.env.NODE_ENV === "development") {
        console.log("[STOMP]", msg);
      }
    },
  });

  client.activate();
};

export const disconnectChatSocket = () => {
  subscriptions.forEach((sub) => sub.unsubscribe());
  subscriptions.clear();

  client?.deactivate();
  client = null;
};

// 채팅 소켓 구독
export const subscribeChatSocket = <T>(destination: string, handler: MessageHandler<T>) => {
  if (!client?.connected) return;
  if (subscriptions.has(destination)) return;

  const sub = client.subscribe(destination, (message: IMessage) => {
    handler(JSON.parse(message.body));
  });

  subscriptions.set(destination, sub);
};

// 채팅 소켓 메시지 전송
export const sendChatSocketMessage = (destination: string, body: unknown) => {
  if (!client?.connected) return;

  client.publish({
    destination,
    body: JSON.stringify(body),
  });
};
