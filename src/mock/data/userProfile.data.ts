// 게시글 목업 데이터
export const MOCK_USER_PROFILE_POST_DATA = {
  postId: 1,
  title: "아이폰 15 분실",
  summary: "서울 노원구 상계동 근처에서 아이폰을 잃어버렸습니다.",
  thumbnailUrl: "https://picsum.photos/400/300?random=1",
  address: "서울시 노원구 상계동",
  itemStatus: "SEARCHING" as const,
  postType: "LOST" as const,
  category: "ELECTRONICS" as const,
  favoriteCount: 0,
  favoriteStatus: false,
  viewCount: 2,
  createdAt: "2025-12-26 10:22:58",
  new: false,
  hot: false,
};

// 댓글 목업 데이터
export const MOCK_USER_PROFILE_COMMENT_DATA = {
  commentId: 1,
  postId: 1,
  postTitle: "아이폰 15 분실",
  content: "서울 노원구 상계동 근처에서 아이폰을 잃어버렸습니다.",
  createdAt: "2025-12-26 10:22:58",
};

// 프로필 목업 데이터
export const MOCK_USER_PROFILE_DATA = {
  userId: 1,
  nickname: "짱구",
  profileImg: "",
  posts: [MOCK_USER_PROFILE_POST_DATA],
  comments: [MOCK_USER_PROFILE_COMMENT_DATA],
  favorites: [MOCK_USER_PROFILE_POST_DATA],
};

// 타인 프로필 게시글 목업 데이터
export const MOCK_USER_PROFILE_DATA_BY_POSTS = {
  profile: {
    userId: 1,
    nickname: "짱구",
    profileImg: "/test_list.JPG",
  },
  list: [MOCK_USER_PROFILE_POST_DATA],
};

// 타인 프로필 댓글 목업 데이터
export const MOCK_USER_PROFILE_DATA_BY_COMMENTS = {
  profile: {
    userId: 1,
    nickname: "짱구",
    profileImg: "/test_list.JPG",
  },
  list: [MOCK_USER_PROFILE_COMMENT_DATA],
};
