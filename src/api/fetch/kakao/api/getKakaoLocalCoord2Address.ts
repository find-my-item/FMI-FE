import axios from "axios";
import { KakaoLocalCoord2AddressResponse } from "../types/KakaoLocalCoord2AddressResponse";

/**
 * @author jikwon
 *
 * @description
 * 카카오 로컬 좌표로 주소 변환 API를 사용해 좌표(위도, 경도)에 대한 주소 정보를 가져옵니다.
 * 좌표 > 주소
 *
 * @param lat 위도(y)
 * @param lng 경도(x)
 *
 * @example
 * ```ts
 * const data = await getKakaoLocalCoord2Address(37.566370748, 126.977918341);
 * ```
 */
export const getKakaoLocalCoord2Address = async (
  lat: number,
  lng: number
): Promise<KakaoLocalCoord2AddressResponse> => {
  const { data } = await axios.get<KakaoLocalCoord2AddressResponse>(
    "https://dapi.kakao.com/v2/local/geo/coord2address.json",
    {
      params: {
        x: lng,
        y: lat,
      },
      headers: {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
      },
    }
  );

  return data;
};
