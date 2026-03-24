/**
 * @author jikwon
 *
 * 문의와 관련된 타입 정의
 *
 * - 이 타입은 문의와 관련된 타입을 정리합니다.
 *
 * @description InquiryStatus
 * - RECEIVED: 문의가 접수됨
 * - PENDING: 문의에 대한 답변이 진행 중
 * - ANSWERED: 문의에 대한 답변이 완료됨
 *
 * @description InquiryTargetType
 * - ACCOUNT_LOGIN: 계정/로그인
 * - USAGE: 서비스 이용
 * - BUG: 오류/버그
 * - SUGGESTION: 건의사항
 * - ETC: 기타
 *
 * @description InquiryType
 * - GENERAL: 일반
 * - TECHNICAL: 기술
 * - ACCOUNT: 계정
 * - PAYMENT: 결제
 * - REPORT_ISSUE: 신고
 * - SERVICE: 서비스
 * - ETC: 기타
 *
 * @description InquiryFilterStatus
 * - ALL: 모든 상태를 포함
 * - RECEIVED: 문의가 접수됨
 * - PENDING: 문의에 대한 답변이 진행 중
 * - ANSWERED: 문의에 대한 답변이 완료됨
 */

export type InquiryStatus = "RECEIVED" | "PENDING" | "ANSWERED";

export type InquiryTargetType = "ACCOUNT_LOGIN" | "USAGE" | "BUG" | "SUGGESTION" | "ETC";

export type InquiryType =
  | "GENERAL"
  | "TECHNICAL"
  | "ACCOUNT"
  | "PAYMENT"
  | "REPORT_ISSUE"
  | "SERVICE"
  | "ETC";

export type InquiryFilterStatus = "ALL" | "RECEIVED" | "PENDING" | "ANSWERED";
