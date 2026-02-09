import { PostType } from "@/types";

export type MessageType = "TEXT" | "IMAGE";

export interface ChatRoom {
  roomId: number;
  contactUser: {
    userId: number;
    nickname: string;
    profileImageUrl: string | null;
  };
  postInfo: {
    postId: number;
    postType: PostType;
    title: string;
    address: string;
    thumbnailUrl: string | null;
  };
  messageType: MessageType | null;
  lastMessage: string | null;
  lastMessageSentAt: string | null;
  unreadCount: number;
}

export interface ChatListType {
  chatRooms: ChatRoom[];
  nextCursor: string | null;
}

export interface WebSocketChatMessage {
  messageId: number;
  roomId: number;
  senderId: number;
  content: string;
  messageType: MessageType;
  imageUrls?: string[];
  createdAt: string;
}

export interface ChatListUpdateResponse {
  roomId: number;
  messageType: MessageType;
  lastMessage: string | null;
  lastMessageSentAt: string;
  unreadCount: number;
}

export interface ChatRoomResponse {
  roomId: number;
  unreadCount: number;
  opponentUser: {
    opponentUserId: number;
    nickname: string;
    profileImageUrl: string;
    emailVerified: boolean;
  };
  postInfo: {
    postId: number;
    postType: PostType;
    title: string;
    address: string;
    thumbnailUrl: string;
  };
}
