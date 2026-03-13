/**
 * @author jikwon
 *
 * 댓글 기본 타입입니다.
 *
 * @description CommentItemType
 * - id: 댓글 고유 아이디
 * - deleted: 댓글 삭제 여부
 * - depth: 댓글 깊이
 * - createdAt: 댓글 작성 시간
 * - authorResponse: 댓글 작성자 정보
 * - childCommentCount: 댓글 답글 개수
 * - imageList: 댓글 이미지 리스트
 * - likeCount: 댓글 좋아요 개수
 * - isLike: 댓글 좋아요 여부
 *
 * @description AuthorResponse
 * - userId: 작성자 고유 아이디
 * - nickname: 작성자 닉네임
 * - profileImageUrl: 작성자 프로필 이미지
 *
 * @description ImageList
 * - id: 이미지 고유 아이디
 * - imageUrl: 이미지 URL
 */

export interface CommentItemType {
  id: number;
  deleted: boolean;
  depth: number;
  content: string;
  createdAt: string;
  authorResponse: AuthorResponse;
  childCommentCount: number;
  imageList: ImageList[];
  likeCount: number;
  isLike: boolean;
  canEdit: boolean;
  canDelete: boolean;
}

export interface AuthorResponse {
  userId: number;
  nickName: string;
  profileImageUrl: string;
}

export interface ImageList {
  id: number;
  imageUrl: string;
}
