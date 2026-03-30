/**
 * 주소 문자열에서 `00동` 단위 토큰을 우선 추출합니다.
 * (카카오 좌표→주소와 동일 규칙 — RecentFoundItemSection 제목 등)
 *
 * @author hyungjun
 * @description
 * - 공백 기준으로 주소 토큰을 분리한 뒤,
 * - 뒤에서부터 `동`으로 끝나는 토큰을 찾아 반환합니다.
 * - 조건에 맞는 토큰이 없으면 빈 문자열을 반환합니다.
 *
 * @param address 원본 주소 문자열
 * @returns 추출된 `00동` 문자열(없으면 빈 문자열)
 *
 * @example
 * ```ts
 * extractDongAddress("서울특별시 강남구 역삼동 123-45");
 * // => "역삼동"
 * ```
 */
export const extractDongAddress = (address: string): string => {
  if (!address) return "";
  const segments = address.split(" ").filter(Boolean);
  const dongSegment = segments.findLast((segment) => segment.endsWith("동"));
  return dongSegment ?? "";
};
