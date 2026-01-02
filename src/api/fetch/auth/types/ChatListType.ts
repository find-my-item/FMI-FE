export interface ChatRoom {
  roomId: number;
  contactUser: {
    userId: number;
    nickname: string;
    profileImageUrl: string | null;
  };
  postInfo: {
    postId: number;
    postType: "LOST" | "FOUND";
    title: string;
    address: string;
    thumbnailUrl: string;
  };
  messageType: "TEXT" | "IMAGE" | null;
  lastMessage: string | null;
  lastMessageSentAt: string | null;
  unreadCount: number;
}

export interface ChatListType {
  chatRooms: ChatRoom[];
  nextCursor: string | null;
}
