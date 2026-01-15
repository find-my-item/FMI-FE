import useAppInfiniteQuery from "@/api/_base/query/useAppInfiniteQuery";
import { ChatMessageResponse, ChatMessage } from "../types/ChatMessageTypes";
import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";

const useChatMessages = (roomId: number) => {
  return useAppInfiniteQuery<ApiBaseResponseType<ChatMessageResponse>, unknown, ChatMessage[]>(
    "auth",
    ["chatMessages", roomId],
    `/chats/${roomId}/messages`,
    { select: (data) => data.pages.flatMap((page) => page.result.messages) }
  );
};

export default useChatMessages;
