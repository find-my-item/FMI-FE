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
  replyCount: 0,
  nextReplyCursor: null,
  imageList: [],
  childrenCommentList: [],
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
