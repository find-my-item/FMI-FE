import { CommentItemType } from "@/types";

export const MOCK_COMMENT_ITEM_DATA: CommentItemType = {
  id: 1,
  content:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Cupiditate ex omnis ullam maiores nihil consequuntur!",
  authorId: "1",
  authorName: "a1",
  createdAt: "2024-01-01T00:00:00",
  likeCount: 2,
  parentId: null,
  canEdit: false,
  canDelete: true,
};
