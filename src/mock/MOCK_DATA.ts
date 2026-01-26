import { ChatRoom } from "@/api/fetch/chatRoom/types/ChatListType";
import { GetDetailPostResponse } from "@/api/fetch/post";

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
  viewCount: 2,
  createdAt: "2025-12-26 10:22:58",
  new: false,
  hot: false,
};

export const MOCK_POST_DEFAULT_DETAIL: GetDetailPostResponse = {
  isSuccess: true,
  code: "COMMON200",
  message: "성공입니다.",
  result: {
    postId: 2,
    title: "홍대입구역 8번 출구 앞에서 검정 지갑 습득",
    content:
      "검정색 반지갑을 습득했습니다. 안에 카드/신분증이 일부 들어있습니다. 본인 확인 후 전달드릴게요.",
    address: "서울특별시 마포구 양화로 160",
    latitude: 37.5565,
    longitude: 126.9239,
    postType: "FOUND",
    itemStatus: "FOUND",
    imageUrls: ["https://picsum.photos/400/300?random=2"],
    radius: 0.1,
    category: "WALLET",
    favoriteCount: 0,
    favoriteStatus: false,
    viewCount: 0,
    profileUrl: null,
    nickName: "tester01",
    createdAt: "2025-12-26T10:22:58",
    chatRoomCount: 0,
    userPostCount: 4,
    new: false,
    hot: false,
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

export const MOCK_MYPAGE_COMMENTS_ITEM = [
  {
    commentId: 1,
    comment: "댓글 내용",
    mentionUser: "감자",
    date: "2026.01.15",
    like: 34,
  },
  {
    commentId: 2,
    comment: "댓글 내용이 길어진다아ㅏ아아ㅏ아아아아아ㅏ아아아아아아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ",
    date: "2026.01.15",
    like: 34,
  },
  {
    commentId: 3,
    comment: "댓글 내용이 길어진다아ㅏ아아ㅏ아아아아아ㅏ아아아아아아ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏ",
    date: "2026.01.15",
    like: 34,
    thumbnailUrl: "https://picsum.photos/400/300?random=1",
  },
];

export const MOCK_USER_PROFILE = {
  userId: 1,
  nickname: "tester01",
  profileImg: "test_list.JPG",
  posts: [
    {
      postId: 1,
      title: "강남역 2호선 개찰구 근처에서 에어팟(화이트) 분실",
      summary: "12/26 오전 9시쯤 강남역 2호선...",
      thumbnailUrl: "https://picsum.photos/400/300?random=1",
      address: "서울특별시 강남구 강남대로 396",
      itemStatus: "SEARCHING",
      postType: "LOST",
      category: "ELECTRONICS",
      favoriteCount: 2,
      favoriteStatus: false,
      viewCount: null,
      createdAt: "2025-12-26 10:22:58",
      hot: false,
      new: false,
    },
  ],
  comments: [],
};
