import { WebSocketChatMessage } from "@/api/fetch/chatRoom/types/ChatRoomType";
import { ChatMessage } from "@/api/fetch/chatMessage/types/ChatMessageTypes";

const transformWebSocketMessage = (message: WebSocketChatMessage): ChatMessage => {
  const { roomId: _, ...chatMessageData } = message;
  return {
    ...chatMessageData,
    imageUrls: message.imageUrls || [],
  };
};

export default transformWebSocketMessage;
