import { ChatRoom } from "@/api/fetch/chatRoom/types/ChatListType";

export const MOCK_POST_ITEM = {
  postId: 1,
  title: "아이폰 15 분실",
  summary: "서울 노원구 상계동 근처에서 아이폰을 잃어버렸습니다.",
  thumbnailUrl: "https://picsum.photos/400/300?random=1",
  address: "서울시 노원구 상계동",
  itemStatus: "SEARCHING" as const,
  postType: "LOST" as const,
  category: "ELECTRONICS" as const,
  favoriteCount: 0,
  createdAt: "2025-12-26 10:22:58",
};

export const MOCK_POST_DEFAULT_DETAIL = {
  isSuccess: true,
  code: "COMMON200",
  message: "성공입니다.",
  result: {
    postId: 1,
    title: "강남역 2호선 개찰구 근처에서 에어팟(화이트) 분실",
    content:
      "12/26 오전 9시쯤 강남역 2호선 개찰구 근처에서 에어팟(2세대, 케이스 포함)을 분실했습니다. 습득하신 분 연락 부탁드립니다.",
    address: "서울특별시 강남구 강남대로 396",
    latitude: 37.4979,
    longitude: 127.0276,
    postType: "LOST",
    itemStatus: "SEARCHING",
    imageUrls: [
      "https://picsum.photos/400/300?random=1",
      "https://picsum.photos/400/300?random=5",
      "https://picsum.photos/400/300?random=6",
    ],
    radius: 0.5,
    category: "ELECTRONICS",
    favoriteCount: 1,
    favoriteStatus: false,
  },
};
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
