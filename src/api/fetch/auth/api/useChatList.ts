import useAppQuery from "@/api/_base/query/useAppQuery";

const useChatList = (size = 10, sort: "LATEST" | "OLDEST" = "LATEST", enabled: boolean = true) => {
  return useAppQuery("auth", ["chatList"], `/users/me/chats?size=${size}&sort=${sort}`, {
    enabled,
  });
};

export default useChatList;
