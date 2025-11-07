export type Sender = "me" | "other";

export interface MockChatDataType {
  sender: Sender;
  text: string;
  time: string;
}
