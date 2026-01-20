import useAppInfiniteQuery from "@/api/_base/query/useAppInfiniteQuery";
import { ChatMessageResponse, ChatMessage } from "../types/ChatMessageTypes";
import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";

interface UseChatMessagesOptions {
  enabled?: boolean;
}

const useChatMessages = (roomId: number, options?: UseChatMessagesOptions) => {
  return useAppInfiniteQuery<ApiBaseResponseType<ChatMessageResponse>, unknown, ChatMessage[]>(
    "auth",
    ["chatMessages", roomId],
    `/chats/${roomId}/messages`,
    {
      enabled: options?.enabled ?? true,
      select: (data) =>
        data.pages
          .slice()
          .reverse()
          .flatMap((page) => page.result.messages.slice().reverse()),
    }
  );
};

export default useChatMessages;
