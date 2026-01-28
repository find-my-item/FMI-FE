import { ChatRoom, ChatRoomResponse } from "@/api/fetch/chatRoom/types/ChatRoomType";

const getPostMode = (chatRoomData?: ChatRoom | ChatRoomResponse): "find" | "lost" => {
  return chatRoomData?.postInfo.postType === "FOUND" ? "find" : "lost";
};

export default getPostMode;
