/**
 * @author jikwon
 *
 * @description
 * 기본 댓글 타입입니다.
 *
 */

// TODO(지권): 백엔드 필드 누락, 추후 변경 예정

export interface CommentItemType {
  id: number;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: string;
  likeCount: number;
  parentId: number | null;
  canEdit: boolean;
  canDelete: boolean;
  // authorImage?: string;
}
