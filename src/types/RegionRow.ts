/**
 * 지역 정보를 표현하는 데이터 타입입니다.
 *
 * @author jikwon
 *
 * @property sido - 시/도 단위 지역명
 * @property sigungu - 시/군/구 단위 지역명
 * @property location - 지역 전체 식별 문자열
 * @property display - UI에 표시하기 위한 지역명 문자열
 */
export type RegionRow = {
  sido: string;
  sigungu: string;
  location: string;
  display: string;
};
