export interface SendImageRequestBody {
  images: string[];
}

export interface ChatMessageResponse {
  messages: [
    {
      messageId: number;
      messageType: "TEXT" | "IMAGE";
      senderId: number;
      content: string;
      imageUrls: string[];
      createdAt: string;
    },
  ];
  nextCursor: number | null;
}
