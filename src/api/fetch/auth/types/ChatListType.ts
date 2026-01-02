export interface ChatRoom {
  roomId: number;
  contactUser: {
    userId: number;
    nickname: string;
    profileImageUrl: string;
  };
  postInfo: {
    postId: number;
    postType: "LOST" | "FOUND";
    title: string;
    address: string;
    thumbnailUrl: string;
  };
  messageType: "TEXT" | "IMAGE";
  lastMessage: string;
  lastMessageSentAt: string;
  unreadCount: number;
}

export interface ChatListType {
  chatRooms: ChatRoom[];
  nextCursor: string | null;
}
