import axios from "axios";
import { KakaoLocalAddressResponse } from "../types/KakaoLocalAddressResponse";

/**
 * @author jikwon
 *
 * @description
 * 카카오 로컬 주소 검색 API를 사용해 주소에 대한 위도(y)/경도(x) 정보를 가져옵니다.
 * 주소 > 좌표
 *
 * @param query 검색할 주소 문자열
 *
 * @example
 * ```ts
 * const data = await getKakaoLocalAddress("서울특별시 강남구 압구정동");
 * ```
 */
export const getKakaoLocalAddress = async (query: string): Promise<KakaoLocalAddressResponse> => {
  const { data } = await axios.get<KakaoLocalAddressResponse>(
    "https://dapi.kakao.com/v2/local/search/address.json",
    {
      params: { query },
      headers: {
        Authorization: `KakaoAK ${process.env.NEXT_PUBLIC_KAKAO_REST_API_KEY}`,
      },
    }
  );

  return data;
};
