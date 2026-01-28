import { WebSocketChatMessage } from "@/api/fetch/chatRoom/types/ChatRoomType";
import { ChatMessage } from "@/api/fetch/ChatMessage/types/ChatMessageTypes";

export const transformWebSocketMessage = (message: WebSocketChatMessage): ChatMessage => {
  const { roomId: _, ...chatMessageData } = message;
  return {
    ...chatMessageData,
    imageUrls: message.imageUrls || [],
  };
};
