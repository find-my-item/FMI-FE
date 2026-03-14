/**
 * @author jikwon
 *
 * 읽기 전용 댓글 아이템의 타입입니다.
 * 관리자, 마이페이지 등 댓글 목록에서 사용됩니다.
 *
 * @description isAdmin
 * 관리자 여부
 *
 * @description userImageUrl
 * 작성자 프로필 이미지 URL
 *
 * @description userName
 * 작성자 이름
 *
 * @description content
 * 댓글 내용
 *
 * @description createdAt
 * 댓글 작성 시간
 */

export interface ReadOnlyCommentItemProps {
  isAdmin: boolean;
  userImageUrl: string;
  userName: string;
  content: string;
  createdAt: string;
}
