/**
 * @author jikwon
 *
 * 신고 또는 문의 답변 상태에 대한 타입
 *
 * @description ReportsType
 * - RECEIVED: 신고 또는 문의가 접수됨
 * - PENDING: 신고 또는 문의에 대한 답변이 진행 중
 * - ANSWERED: 신고 또는 문의에 대한 답변이 완료됨
 */

export type ReportsType = "RECEIVED" | "PENDING" | "ANSWERED";
