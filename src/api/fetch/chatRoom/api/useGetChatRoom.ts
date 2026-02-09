import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { ChatRoomResponse } from "../types/ChatRoomResponse";
import useAppQuery from "@/api/_base/query/useAppQuery";

const useGetChatRoom = ({ roomId }: { roomId: number }) => {
  return useAppQuery<ApiBaseResponseType<ChatRoomResponse>, ChatRoomResponse>(
    "auth",
    ["chatRoomDetail", roomId],
    `/chats/${roomId}`,
    { enabled: !!roomId }
  );
};

export default useGetChatRoom;
