import { ChatRoom, ChatRoomResponse } from "@/api/fetch/chatRoom/types/ChatRoomResponse";
import { ChatMessage } from "@/api/fetch/chatMessage/types/ChatMessageResponse";

export const MOCK_CHAT_ITEM = {
  roomId: 1,
  contactUser: {
    userId: 1,
    nickname: "사용자 닉네임",
    profileImageUrl: "profile.jpg",
  },
  postInfo: {
    postId: 1,
    postType: "LOST",
    category: "WALLET",
    title: "테스트 게시글",
    address: "서울시 강남구 신사동",
    thumbnailUrl: "test-thumbnail.jpg",
  },
  messageType: "TEXT",
  lastMessage:
    "안녕하세요! 혹시 올리신 검정색 카드 지갑, 명동에서 습득하신 지갑이실까요? 혹시나 해서",
  lastMessageSentAt: "2026-01-01T10:00:00.000Z",
  unreadCount: 1,
} as ChatRoom;

export const MOCK_CHAT_ROOM_FOUND: ChatRoomResponse = {
  roomId: 1,
  unreadCount: 0,
  opponentUser: {
    opponentUserId: 2,
    nickname: "사용자 닉네임",
    profileImageUrl: "https://via.placeholder.com/40",
    emailVerified: true,
  },
  postInfo: {
    postId: 1,
    postType: "FOUND",
    category: "WALLET",
    title: "여기에 게시글명이 표기됩니다 여기에 게시글명이 표기됩니다. 여기에",
    address: "서울시 중구 회현동",
    thumbnailUrl: "https://via.placeholder.com/40",
  },
};

export const MOCK_CHAT_ROOM_LOST: ChatRoomResponse = {
  roomId: 2,
  unreadCount: 0,
  opponentUser: {
    opponentUserId: 3,
    nickname: "다른 사용자",
    profileImageUrl: "https://via.placeholder.com/40",
    emailVerified: true,
  },
  postInfo: {
    postId: 2,
    postType: "LOST",
    category: "ETC",
    title: "분실물 게시글 제목입니다",
    address: "서울시 강남구 역삼동",
    thumbnailUrl: "https://via.placeholder.com/40",
  },
};

export const MOCK_CHAT_MESSAGES: ChatMessage[] = [
  {
    messageId: 1,
    senderId: 1,
    content: "안녕하세요!",
    messageType: "TEXT",
    createdAt: "2026-01-15T14:11:00.000Z",
    imageUrls: [],
  },
  {
    messageId: 2,
    senderId: 2,
    content: "네, 안녕하세요!",
    messageType: "TEXT",
    createdAt: "2026-01-15T14:12:00.000Z",
    imageUrls: [],
  },
];
