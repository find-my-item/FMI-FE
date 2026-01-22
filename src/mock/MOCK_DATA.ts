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

export const MOCK_MYPAGE_REQUESTS = [
  {
    reportId: 1,
    status: "PENDING",
    targetTitle: "악성 댓글 신고합니다.",
    createdAt: "2024.01.22",
    reason: "지속적인 욕설과 비방을 일삼고 있어 신고합니다. 확인 부탁드립니다.",
  },
  {
    reportId: 2,
    status: "RECEIVED",
    targetTitle: "스팸 홍보 게시글",
    createdAt: "2024.01.15",
    reason: "커뮤니티 성격에 맞지 않는 불법 도박 사이트 홍보글입니다.",
  },
  {
    reportId: 3,
    status: "RESOLVED",
    targetTitle: "사용자 프로필 사진 부적절",
    createdAt: "2023.12.28",
    reason: "선정적인 이미지를 프로필로 사용하고 있습니다.",
  },
  {
    reportId: 4,
    status: "RESOLVED",
    targetTitle: "허위 사실 유포",
    createdAt: "2023.11.05",
    reason: "특정인에 대한 확인되지 않은 루머를 퍼뜨리고 있습니다.",
  },
] as const;

export const MOCK_MYPAGE_POSTS_LIST = [
  {
    postId: 1,
    title: "아이폰 15 프로 맥스 분실했습니다 ㅠㅠ",
    summary:
      "강남역 11번 출구 근처에서 떨어뜨린 것 같아요. 투명 젤리 케이스 씌워져 있습니다. 꼭 좀 찾아주세요 사례하겠습니다.",
    thumbnailUrl: "https://picsum.photos/400/300?random=1",
    address: "서울특별시 강남구 역삼동",
    itemStatus: "SEARCHING",
    postType: "LOST",
    category: "ELECTRONICS",
    favoriteCount: 15,
    viewCount: 230,
    createdAt: "방금 전",
    hot: true,
    new: true,
  },
  {
    postId: 2,
    title: "검은색 가죽 지갑 습득했습니다",
    summary:
      "홍대 놀이터 벤치 위에 올려져 있었습니다. 안에 현금이랑 영수증 몇 장 들어있네요. 보관하고 있으니 연락주세요.",
    thumbnailUrl: "https://picsum.photos/400/300?random=2",
    address: "서울특별시 마포구 서교동",
    itemStatus: "SEARCHING", // 주인을 찾는 중
    postType: "FOUND", // 습득
    category: "WALLET",
    favoriteCount: 8,
    viewCount: 45,
    createdAt: "1시간 전",
    hot: false,
    new: true,
  },
  {
    postId: 3,
    title: "신한 체크카드 주우신 분 계신가요?",
    summary:
      "오늘 아침 출근길에 버스 정류장에서 떨어뜨린 것 같습니다. 뒷면에 서명이 되어있지 않습니다.",
    thumbnailUrl: "https://picsum.photos/400/300?random=3",
    address: "경기도 성남시 분당구",
    itemStatus: "COMPLETED", // 해결됨 (예시)
    postType: "LOST",
    category: "CARD",
    favoriteCount: 2,
    viewCount: 12,
    createdAt: "2일 전",
    hot: false,
    new: false,
  },
  {
    postId: 4,
    title: "갈색 푸들 강아지 보호 중입니다",
    summary:
      "목줄은 하고 있는데 인식표가 없네요. 겁이 많아서 구석에 웅크리고 있습니다. 주인분 빨리 연락 주세요.",
    thumbnailUrl: "https://picsum.photos/400/300?random=4",
    address: "서울특별시 송파구 잠실동",
    itemStatus: "SEARCHING",
    postType: "FOUND",
    category: "ANIMAL",
    favoriteCount: 56,
    viewCount: 1200,
    createdAt: "30분 전",
    hot: true,
    new: false,
  },
];

export const MOCK_MYPAGE_REQUEST_COMMENTS = [
  {
    commentId: 1,
    status: "user",
    userNickname: "지갑찾는라이언",
    createdAt: "2024-02-10T10:00:00",
    content:
      "신고 접수한 지 3일이 지났는데 아직 처리가 안 된 것 같아서요. 혹시 진행 상황을 알 수 있을까요? 급해서 그렇습니다 ㅠㅠ",
  },
  {
    commentId: 2,
    status: "admin",
    createdAt: "2024-02-10T14:30:00",
    content:
      "안녕하세요, 회원님. 찾아줘 관리자입니다. \n현재 해당 게시글에 대한 신고 내용을 확인 중이며, 작성자에게 소명 요청을 보낸 상태입니다. 조금만 기다려주시면 감사하겠습니다.",
  },
  {
    commentId: 3,
    status: "user",
    userNickname: "지갑찾는라이언",
    createdAt: "2024-02-11T09:15:00",
    content: "아 그렇군요. 답변 감사합니다. 확인되면 알림 부탁드립니다.",
  },
  {
    commentId: 4,
    status: "admin",
    resolvedAt: "2024-02-12T11:00:00",
    content:
      "신고 처리가 완료되었습니다. \n해당 게시글은 규정 위반이 확인되어 블라인드 처리되었습니다. 이용에 불편을 드려 죄송합니다.",
  },
] as const;
