import { GetPostsCommentsData } from "@/api/fetch/comment";
import { CommentItemType } from "@/types";

export const MOCK_COMMENT_ITEM_DATA: CommentItemType = {
  id: 1,
  deleted: false,
  depth: 0,
  content:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate ex omnis ullam maiores nihil consequuntur!",
  createdAt: "2024-01-01T00:00:00",
  authorResponse: {
    id: 1,
    nickName: "짱구",
    profileImageUrl: "https://picsum.photos/200",
  },
  childCommentCount: 0,
  imageList: [],
  likeCount: 2,
  isLike: false,
};

export const MOCK_COMMENT_LIST_DATA: CommentItemType[] = [
  MOCK_COMMENT_ITEM_DATA,
  {
    ...MOCK_COMMENT_ITEM_DATA,
    id: 2,
    authorResponse: {
      id: 2,
      nickName: "철수",
      profileImageUrl: "https://picsum.photos/201",
    },
  },
];

export const MOCK_COMMENT_RESPONSE_DATA: GetPostsCommentsData = {
  comments: MOCK_COMMENT_LIST_DATA,
  hasNext: false,
  nextPage: 0,
  remainingCount: 0,
};
