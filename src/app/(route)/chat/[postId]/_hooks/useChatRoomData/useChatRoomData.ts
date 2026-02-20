import { useSearchParams } from "next/navigation";
import useChatRoom from "@/api/fetch/chatRoom/api/useChatRoom";
import useGetChatRoom from "@/api/fetch/chatRoom/api/useGetChatRoom";
import { useGetUserData } from "@/api/fetch/user";
import { getPostMode } from "../../_utils";
import { ChatRoomResponse } from "@/api/fetch/chatRoom/types/ChatRoomResponse";

const useChatRoomData = (postId: number) => {
  const searchParams = useSearchParams();
  const roomIdParam = searchParams.get("roomId");
  const roomId = roomIdParam ? Number(roomIdParam) : 0;
  const hasRoomId = !!roomId;

  const { data: chatRoom } = useChatRoom({ postId, enabled: !hasRoomId });
  const { data: chatRoomDetail } = useGetChatRoom({ roomId });
  const chatRoomData: ChatRoomResponse | undefined = chatRoomDetail?.result || chatRoom?.result;
  const { data: userInfo } = useGetUserData();
  const postMode = getPostMode(chatRoomData);

  const unreadCount = chatRoomData?.unreadCount || chatRoom?.result?.unreadCount;
  return {
    roomId: roomId || chatRoom?.result?.roomId || 0,
    hasRoomId,
    chatRoomData,
    userInfo,
    postMode,
    unreadCount,
  };
};

export default useChatRoomData;
