import { ChatMessage } from "@/api/fetch/ChatMessage/types/ChatMessageTypes";
import { WebSocketChatMessage } from "@/api/fetch/chatRoom/types/ChatRoomType";

export const findOptimisticMessage = (
  messages: ChatMessage[],
  receivedMessage: WebSocketChatMessage
): ChatMessage | undefined => {
  return messages.find(
    (m) =>
      m.messageId < 0 &&
      ((m.messageType === "TEXT" &&
        m.content === receivedMessage.content &&
        m.senderId === receivedMessage.senderId) ||
        (m.messageType === "IMAGE" &&
          m.imageUrls.length === (receivedMessage.imageUrls?.length || 0) &&
          m.senderId === receivedMessage.senderId))
  );
};
