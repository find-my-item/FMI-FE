import { GetDetailPostResponse, PostItem } from "@/api/fetch/post";

export const MOCK_POST_ITEM: PostItem = {
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

export const MOCK_POST_ITEMS: PostItem[] = [MOCK_POST_ITEM];

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
