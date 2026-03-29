import { getKakaoLocalCoord2Address } from "@/api/fetch/kakao";
import { extractDongAddress } from "@/utils/extractDongAddress/extractDongAddress";

/**
 * 카카오 좌표→주소 변환 API를 이용해 지도 표시용 주소를 반환합니다.
 *
 * @author hyungjun
 * @description
 * - 좌표(lat, lng)를 카카오 API로 변환한 뒤,
 * - `address_name`에서 화면에 표시하기 적합하도록 `00동` 단위 문자열을 우선 추출하고,
 * - 실패 시 `road_address`/`address` 원문을 fallback으로 사용합니다.
 *
 * @param lat 위도(y)
 * @param lng 경도(x)
 * @param signal 요청 취소를 위한 AbortSignal(연속 좌표 변경 시 이전 요청을 취소하기 위해 사용)
 * @returns 지도 표시용 주소 문자열
 *
 * @example
 * ```ts
 * const text = await getAddressFromLatLng(37.566370748, 126.977918341);
 * // => "서울특별시 중구" 또는 "00동" 형태
 * ```
 */

export const getAddressFromLatLng = async (
  lat: number,
  lng: number,
  signal?: AbortSignal
): Promise<string> => {
  const data = await getKakaoLocalCoord2Address(lat, lng, signal);
  const firstDocument = data.documents?.[0];
  const roadAddress = firstDocument?.road_address?.address_name ?? "";
  const jibunAddress = firstDocument?.address?.address_name ?? "";
  const dongAddress = extractDongAddress(jibunAddress) || extractDongAddress(roadAddress);

  return dongAddress || roadAddress || jibunAddress || "";
};
