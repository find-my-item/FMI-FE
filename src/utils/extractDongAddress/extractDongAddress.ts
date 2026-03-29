/**
 * 주소 문자열에서 `00동` 단위 토큰을 우선 추출합니다.
 * (카카오 좌표→주소와 동일 규칙 — RecentFoundItemSection 제목 등)
 */
export const extractDongAddress = (address: string): string => {
  if (!address) return "";
  const segments = address.split(" ").filter(Boolean);
  const dongSegment = segments.findLast((segment) => segment.endsWith("동"));
  return dongSegment ?? "";
};
