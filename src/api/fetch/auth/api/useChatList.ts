import useAppQuery from "@/api/_base/query/useAppQuery";
import { ChatListType } from "../types/ChatListType";
import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { useSearchParams } from "next/navigation";

interface useChatListOptions {
  cursor?: number;
  size?: number;
  enabled?: boolean;
}

const useChatList = (options: useChatListOptions = {}) => {
  const searchParams = useSearchParams();
  const { cursor = 0, size = 10, enabled = true } = options;

  const rawType = searchParams.get("type");
  const type = rawType === "all" ? "" : (rawType as "LOST" | "FOUND") || "";
  const address = searchParams.get("region") || "";
  const sort = (searchParams.get("sort") as "LATEST" | "OLDEST") || "LATEST";

  return useAppQuery<ApiBaseResponseType<ChatListType>>(
    "auth",
    ["chatList", cursor, size, type, address, sort],
    `/users/me/chats?cursor=${cursor}&size=${size}&type=${type.toUpperCase()}&address=${address}&sort=${sort.toUpperCase()}`,
    {
      enabled,
      staleTime: 1000 * 60 * 15, // 15분
      gcTime: 1000 * 60 * 15, // 15분
    }
  );
};

export default useChatList;
