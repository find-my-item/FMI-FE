/**
 * @author jikwon
 *
 * 신고와 관련된 타입 정의
 *
 * - 이 타입은 신고와 관련된 타입을 정리합니다.
 *
 * @description ReportStatus
 * - PENDING: 신고에 대한 답변이 접수 됨
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
 * - IRRELEVANT_CONTENT: "실제 분실/발견한 물건이 아닌 내용이에요."
 * - DUPLICATE: "동일한 내용이 여러 번 올라왔어요."
 * - SPAM: "분실물과 무관한 홍보성 게시글이에요."
 * - OFFENSIVE_LANGUAGE: "채팅 또는 댓글에 모욕적 표현이 있어요."
 * - EXTORTION: "물건 반환을 빌미로 금전 요구가 있어요."
 * - FALSE_CLAIM: "실제 주인이 아닌 사람이 소유를 주장해요."
 * - ETC: 위 항목 외의 다른 문제를 신고해요.
 *
 * @description ReportFilterStatus
 * - ALL: 모든 상태를 포함
 * - PENDING: 신고에 대한 답변이 접수 됨
 * - REVIEWED: 신고에 대한 답변이 진행 중
 * - RESOLVED: 신고에 대한 답변이 완료됨
 */

export type ReportStatus = "PENDING" | "REVIEWED" | "RESOLVED";

export type ReportTargetType = "POST" | "COMMENT" | "USER" | "CHAT";

export type ReportType =
  | "IRRELEVANT_CONTENT"
  | "DUPLICATE"
  | "SPAM"
  | "OFFENSIVE_LANGUAGE"
  | "EXTORTION"
  | "FALSE_CLAIM"
  | "ETC";

export type ReportFilterStatus = "ALL" | "PENDING" | "REVIEWED" | "RESOLVED";
