import { ChatRoom } from "@/api/fetch/chatRoom/types/ChatRoomType";

export const getPostMode = (chatRoomData?: ChatRoom): "find" | "lost" => {
  return chatRoomData?.postInfo.postType === "FOUND" ? "find" : "lost";
};
