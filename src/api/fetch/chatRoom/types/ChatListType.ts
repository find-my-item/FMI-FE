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
    thumbnailUrl: string | null;
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

export interface ChatMessageResponse {
  messageId: number;
  roomId: number;
  senderId: number;
  content: string;
  messageType: "TEXT" | "IMAGE";
  createdAt: string;
}

export interface ChatListUpdateResponse {
  roomId: number;
  messageType: "IMAGE" | "TEXT";
  lastMessage: string | null;
  lastMessageSentAt: string;
  unreadCount: number;
}
