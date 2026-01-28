import { useQueryClient, InfiniteData } from "@tanstack/react-query";
import { useChatSocket } from "@/api/fetch/chatRoom";
import { WebSocketChatMessage } from "@/api/fetch/chatRoom/types/ChatRoomType";
import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { ChatMessageResponse } from "@/api/fetch/ChatMessage/types/ChatMessageTypes";
import {
  addMessageToCache,
  replaceMessageInCache,
} from "@/utils/chatMessageCache/chatMessageCache";
import { transformWebSocketMessage, findOptimisticMessage } from "../../_utils";
import { ChatMessage } from "@/api/fetch/ChatMessage/types/ChatMessageTypes";

const useChatSocketMessage = (roomId: number) => {
  const queryClient = useQueryClient();

  useChatSocket({
    onListUpdate: () => {
      queryClient.invalidateQueries({ queryKey: ["chatList"] });
    },
    onMessage: (message: WebSocketChatMessage) => {
      if (!roomId) return;

      // 메시지의 roomId와 현재 roomId가 일치하는지 확인
      if (message.roomId !== roomId) return;

      const oldData = queryClient.getQueryData<
        InfiniteData<ApiBaseResponseType<ChatMessageResponse>>
      >(["chatMessages", roomId]);

      const firstPage = oldData?.pages[0];

      // 쿼리 데이터가 아직 로드되지 않았을 때는 쿼리 무효화로 새로고침
      if (!firstPage) {
        queryClient.invalidateQueries({ queryKey: ["chatMessages", roomId] });
        return;
      }

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
