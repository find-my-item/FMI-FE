import { Radius } from "@/types";

/**
 * @author jikwon
 *
 * 반경에 따른 지도 레벨을 반환하는 유틸리티 함수
 *
 * @param radius 반경 1000, 3000, 5000
 * @returns 지도 레벨
 */
export const getMapLevelByRadius = (radius: Radius): number => {
  if (radius <= 1000) return 6;
  if (radius <= 3000) return 7;
  if (radius <= 5000) return 8;
  return 6;
};
