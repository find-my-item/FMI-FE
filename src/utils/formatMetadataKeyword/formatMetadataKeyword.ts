/**
 * @author jikwon
 * @description 메타데이터에 사용할 키워드에서 일부 특수문자를 제거하고 길이를 제한하는 함수
 *
 * @param keyword - 정제할 키워드
 * @returns 특수문자가 제거되고 최대 20자로 제한된 키워드. 값이 없으면 "물건"을 반환합니다.
 *
 * @example
 * ```tsx
 * formatMetadataKeyword("<script>alert(1)</script>") // "scriptalert(1)/script"
 * formatMetadataKeyword("지갑") // "지갑"
 * formatMetadataKeyword() // "물건"
 * ```
 */
export const formatMetadataKeyword = (keyword?: string) => {
  if (!keyword) return "물건";
  return keyword.replace(/[<>]/g, "").slice(0, 20);
};
