/**
 * @author jikwon
 *
 * 전달된 문자열을 enum value로 사용하기 적합한 형태(대문자)로 정규화하는 유틸리티 함수입니다.
 *
 * @param value - search params로 전달된 문자열
 * @returns 정규화된 enum value (없을 경우 undefined)
 *
 * @example
 * normalizeEnumValue("most_viewed"); // "MOST_VIEWED"
 * normalizeEnumValue("latest");      // "LATEST"
 * normalizeEnumValue(null);          // undefined
 *
 * // enum과 함께 사용하는 예시
 * type SortType = "LATEST" | "MOST_VIEWED";
 * const sort = normalizeEnumValue<SortType>(searchParams.get("sort"));
 */
export const normalizeEnumValue = <T extends string>(value?: string | null): T | undefined => {
  if (!value) return undefined;

  return value.toUpperCase() as T;
};
