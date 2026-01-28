import { useQueryClient, InfiniteData } from "@tanstack/react-query";
import { useChatSocket } from "@/api/fetch/chatRoom";
import { WebSocketChatMessage } from "@/api/fetch/chatRoom/types/ChatRoomType";
import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { ChatMessageResponse } from "@/api/fetch/ChatMessage/types/ChatMessageTypes";
import {
  addMessageToCache,
  replaceMessageInCache,
} from "@/utils/chatMessageCache/chatMessageCache";
import { transformWebSocketMessage } from "../../_utils/transformWebSocketMessage";
import { findOptimisticMessage } from "../../_utils/findOptimisticMessage";
import { ChatMessage } from "@/api/fetch/ChatMessage/types/ChatMessageTypes";

const useChatSocketMessage = (roomId: number) => {
  const queryClient = useQueryClient();

  useChatSocket({
    onListUpdate: () => {
      queryClient.invalidateQueries({ queryKey: ["chatList"] });
    },
    onMessage: (message: WebSocketChatMessage) => {
      if (!roomId) return;

      const oldData = queryClient.getQueryData<
        InfiniteData<ApiBaseResponseType<ChatMessageResponse>>
      >(["chatMessages", roomId]);

      const firstPage = oldData?.pages[0];
      if (!firstPage) return;

      const chatMessage = transformWebSocketMessage(message);
      const optimisticMessage = findOptimisticMessage(firstPage.result.messages, message);

      if (optimisticMessage) {
        replaceMessageInCache(queryClient, roomId, optimisticMessage.messageId, chatMessage);
      } else {
        const messageExists = firstPage.result.messages.some(
          (m: ChatMessage) => m.messageId === message.messageId
        );
        if (!messageExists) {
          addMessageToCache(queryClient, roomId, chatMessage);
        }
      }
    },
  });
};

export default useChatSocketMessage;
