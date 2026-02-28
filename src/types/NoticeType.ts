/**
 * @author jikwon
 *
 * 공지사항과 관련된 타입 정의
 *
 * - 이 타입은 공지사항과 관련된 타입을 정리합니다.
 *
 * @description NoticeCategory
 * - GENERAL: 일반
 * - EVENT: 이벤트
 * - MAINTENANCE: 점검
 * - IMPORTANT: 중요
 * - UPDATE: 업데이트
 *
 * @description NoticeSortType
 * - LATEST: 최신순
 * - OLDEST: 오래된순
 * - MOST_VIEWED: 조회순
 */

export type NoticeCategory = "GENERAL" | "EVENT" | "MAINTENANCE" | "IMPORTANT" | "UPDATE";

export type NoticeSortType = "LATEST" | "OLDEST" | "MOST_VIEWED";
