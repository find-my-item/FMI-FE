import { ItemStatus } from "@/api/list/types";

/**
 * @author jikwon
 *
 * 상태 타입을 상태 라벨로 변환하는 유틸리티 함수
 *
 * @param status - 상태 타입
 * @returns 상태에 해당하는 라벨 문자열
 */
export const getItemStatusLabel = (status: ItemStatus): string => {
  const STATUS_LABEL: Record<ItemStatus, string> = {
    SEARCHING: "찾는중",
    FOUND: "찾았음",
  };

  return STATUS_LABEL[status];
};
