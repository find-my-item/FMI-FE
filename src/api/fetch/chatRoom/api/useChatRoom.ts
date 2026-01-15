import useAppMutation from "@/api/_base/query/useAppMutation";
import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { ChatRoomResponse } from "../types/ChatListType";

const useChatRoom = ({ postId }: { postId: number }) => {
  return useAppMutation<null, ApiBaseResponseType<ChatRoomResponse>>(
    "auth",
    `posts/${postId}/chats`,
    "post"
  );
};

export default useChatRoom;
