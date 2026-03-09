/**
 * @author jikwon
 *
 * 신고와 관련된 타입 정의
 *
 * - 이 타입은 신고와 관련된 타입을 정리합니다.
 *
 * @description ReportStatus
 * - PENDING: 신고에 대한 답변이 진행 중
 * - REVIEWED: 신고에 대한 답변이 진행 중
 * - RESOLVED: 신고에 대한 답변이 완료됨
 *
 * @description ReportTargetType
 * - POST: 게시글
 * - COMMENT: 댓글
 * - USER: 유저
 * - CHAT: 채팅
 *
 * @description ReportType
 * - FRAUD: 사기
 * - SPAM: 스팸
 * - INAPPROPRIATE: 부적절한 내용
 * - ABUSE: 욕설
 * - HARASSMENT: 괴롭힘
 * - VIOLENCE: 폭력
 * - ADULT: 성인
 * - PRIVACY: 개인정보
 * - COPYRIGHT: 저작권
 * - ETC: 기타
 *
 */

export type ReportStatus = "PENDING" | "REVIEWED" | "RESOLVED";

export type ReportTargetType = "POST" | "COMMENT" | "USER" | "CHAT";

export type ReportType =
  | "FRAUD"
  | "SPAM"
  | "INAPPROPRIATE"
  | "ABUSE"
  | "HARASSMENT"
  | "VIOLENCE"
  | "ADULT"
  | "PRIVACY"
  | "COPYRIGHT"
  | "ETC";
