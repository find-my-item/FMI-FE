/**
 * @author jikwon
 * @description 메타데이터에 사용할 주소에서 '동/면/읍' 단위만 추출하여 반환하는 함수
 *
 * @param address - 정제할 주소
 * @returns '동/면/읍' 단위만 포함된 주소. 값이 없으면 "주소"를 반환합니다.
 *
 * @example
 * ```tsx
 * formatMetadataAddress("대구광역시 동구 동북로 306-13 (신암동)") // "신암동"
 * formatMetadataAddress("서울특별시 강남구 테헤란로 123") // "서울특별시 강남구"
 * formatMetadataAddress() // "주소"
 * ```
 */
export const formatMetadataAddress = (address: string) => {
  if (!address) return "주소";

  const addressParts = address.split(" ");

  const village = addressParts.find((part) => {
    const clean = part.replace(/[()]/g, "");
    return ["동", "면", "읍"].some((u) => clean.endsWith(u));
  });

  if (village) return village.replace(/[()]/g, "");

  if (addressParts.length >= 2) {
    return `${addressParts[0]} ${addressParts[1]}`;
  }

  return addressParts[0] || "주소";
};
