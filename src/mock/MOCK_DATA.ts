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
    imageUrls: ["https://picsum.photos/400/300?random=1"],
    radius: 0.5,
    category: "ELECTRONICS",
    favoriteCount: 1,
    favoriteStatus: false,
  },
};
