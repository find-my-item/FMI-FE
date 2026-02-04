/**
 * @author jikwon
 *
 * 문의와 관련된 타입 정의
 *
 * - 이 타입은 문의와 관련된 타입을 정리합니다.
 *
 * @description InquiryType
 * - PRIVATE: 비공개
 *
 * @description InquiryCategory
 * - GENERAL: 일반
 * - TECHNICAL: 기술
 * - ACCOUNT: 계정
 * - PAYMENT: 결제
 * - REPORT_ISSUE: 신고
 * - SERVICE: 서비스
 * - ETC: 기타
 *
 * @description InquiryStatus
 * - RECEIVED: 접수
 * - PENDING: 검토
 * - ANSWERED: 완료
 */

export type InquiryType = "PRIVATE";

export type InquiryCategory =
  | "GENERAL"
  | "TECHNICAL"
  | "ACCOUNT"
  | "PAYMENT"
  | "REPORT_ISSUE"
  | "SERVICE"
  | "ETC";
