export interface SendImageRequestBody {
  images: string[];
}

export interface ChatMessage {
  messageId: number;
  messageType: "TEXT" | "IMAGE";
  senderId: number;
  content: string;
  imageUrls: string[];
  createdAt: string;
}

export interface ChatMessageResponse {
  messages: ChatMessage[];
  nextCursor: number | null;
}
