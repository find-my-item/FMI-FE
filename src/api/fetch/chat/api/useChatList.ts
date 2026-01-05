import useAppInfiniteQuery from "@/api/_base/query/useAppInfiniteQuery";
import { ChatListType, ChatRoom } from "@/api/fetch/chat/types/ChatListType";
import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { useSearchParams } from "next/navigation";

interface useChatListOptions {
  size?: number;
  enabled?: boolean;
}

const useChatList = (options: useChatListOptions = {}) => {
  const searchParams = useSearchParams();
  const { size = 10, enabled = true } = options;

  const rawType = searchParams.get("type");
  const type = rawType === "all" ? "" : (rawType as "LOST" | "FOUND") || "";
  const address = searchParams.get("region") || "";
  const sort = (searchParams.get("sort") as "LATEST" | "OLDEST") || "LATEST";

  return useAppInfiniteQuery<ApiBaseResponseType<ChatListType>, unknown, ChatRoom[]>(
    "auth",
    ["chatList", size, type, address, sort],
    `/users/me/chats?size=${size}&type=${type.toUpperCase()}&address=${address}&sort=${sort.toUpperCase()}`,
    {
      enabled,
      select: (data) => data.pages.flatMap((page) => page.result.chatRooms),
    }
  );
};

export default useChatList;
