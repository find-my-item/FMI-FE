/**
 * @author jikwon
 *
 * 카테고리 타입 정의
 *
 * - 이 타입은 분실 및 발견 게시글의 타입을 표시합니다.
 *
 * @description CategoryType
 * - "": 전체
 * - ELECTRONIC: 전자기기
 * - WALLET: 지갑
 * - ID_CARD: 신분증
 * - JEWELRY: 귀금속
 * - BAG: 가방
 * - CARD: 카드
 * - ETC: 기타
 *
 * - LOST: 분실
 * - FOUND: 제보
 *
 * - SEARCHING: 찾는중
 * - FOUND: 찾았음
 *
 * @description PostType
 * - LOST: 분실
 * - FOUND: 제보
 *
 * @description ItemStatus
 * - SEARCHING: 찾는중
 * - FOUND: 찾았음
 */

export type CategoryType =
  | "ELECTRONICS"
  | "WALLET"
  | "ID_CARD"
  | "JEWELRY"
  | "BAG"
  | "CARD"
  | "ETC";

export type PostType = "LOST" | "FOUND";

export type ItemStatus = "SEARCHING" | "FOUND";
