import { Client, IMessage, StompSubscription } from "@stomp/stompjs";
import getBaseURL from "@/api/_base/axios/getBaseURL";

type MessageHandler<T = any> = (message: T) => void;

class ChatSocket {
  private client: Client | null = null;
  private subscriptions = new Map<string, StompSubscription>();

  connect() {
    if (this.client?.connected) return;

    this.client = new Client({
      brokerURL: `${getBaseURL()}/ws`,
      reconnectDelay: 5000,
      debug: (msg) => {
        if (process.env.NODE_ENV === "development") {
          console.log("[STOMP]", msg);
        }
      },
    });

    this.client.activate();
  }

  disconnect() {
    this.subscriptions.forEach((sub) => sub.unsubscribe());
    this.subscriptions.clear();

    this.client?.deactivate();
    this.client = null;
  }

  subscribe<T>(destination: string, handler: MessageHandler<T>) {
    if (!this.client?.connected) return;
    if (this.subscriptions.has(destination)) return;

    const sub = this.client.subscribe(destination, (message: IMessage) => {
      handler(JSON.parse(message.body));
    });

    this.subscriptions.set(destination, sub);
  }

  send(destination: string, body: unknown) {
    if (!this.client?.connected) return;

    this.client.publish({
      destination,
      body: JSON.stringify(body),
    });
  }
}

export const chatSocket = new ChatSocket();
