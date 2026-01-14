// src/api/chatSocket.ts
import { Client, IMessage, StompSubscription } from "@stomp/stompjs";
import SockJS from "sockjs-client";

type MessageHandler<T = any> = (message: T) => void;

class ChatSocket {
  private client: Client | null = null;
  private subscriptions: Map<string, StompSubscription> = new Map();

  /** 연결 */
  connect() {
    if (this.client?.connected) return;

    this.client = new Client({
      webSocketFactory: () => new SockJS("/ws"),
      reconnectDelay: 5000,
      debug: (msg) => {
        if (process.env.NODE_ENV === "development") {
          console.log("[STOMP]", msg);
        }
      },
    });

    this.client.activate();
  }

  /** 연결 해제 */
  disconnect() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.subscriptions.clear();

    this.client?.deactivate();
    this.client = null;
  }

  /** 구독 */
  subscribe<T>(destination: string, handler: MessageHandler<T>) {
    if (!this.client || !this.client.connected) return;

    if (this.subscriptions.has(destination)) return;

    const subscription = this.client.subscribe(destination, (message: IMessage) => {
      handler(JSON.parse(message.body));
    });

    this.subscriptions.set(destination, subscription);
  }

  /** 구독 해제 */
  unsubscribe(destination: string) {
    this.subscriptions.get(destination)?.unsubscribe();
    this.subscriptions.delete(destination);
  }

  /** 메시지 전송 */
  send(destination: string, body: unknown) {
    if (!this.client || !this.client.connected) return;

    this.client.publish({
      destination,
      body: JSON.stringify(body),
    });
  }
}

export const chatSocket = new ChatSocket();
