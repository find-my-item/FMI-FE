import useAppQuery from "@/api/_base/query/useAppQuery";
import { ChatListType } from "../types/ChatListType";
import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";

const useChatList = (size = 10, sort: "LATEST" | "OLDEST" = "LATEST", enabled: boolean = true) => {
  return useAppQuery<ApiBaseResponseType<ChatListType>>(
    "auth",
    ["chatList"],
    `/users/me/chats?size=${size}&sort=${sort}`,
    {
      enabled,
    }
  );
};

export default useChatList;
