import useAppInfiniteQuery from "@/api/_base/query/useAppInfiniteQuery";
import { ChatMessageResponse } from "../types/ChatMessageTypes";
import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";

const useChatMessages = (roomId: number) => {
  return useAppInfiniteQuery<ApiBaseResponseType<ChatMessageResponse>>(
    "auth",
    ["chatMessages", roomId],
    `/chats/${roomId}/messages`
  );
};

export default useChatMessages;
