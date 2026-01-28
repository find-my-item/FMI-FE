import { ChatRoom, ChatRoomResponse } from "@/api/fetch/chatRoom/types/ChatRoomType";

export const getPostMode = (chatRoomData?: ChatRoom | ChatRoomResponse): "find" | "lost" => {
  return chatRoomData?.postInfo.postType === "FOUND" ? "find" : "lost";
};
