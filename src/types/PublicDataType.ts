/**
 * @author jikwon
 *
 * @description 공공데이터 포털 습득물 조회 API 관련 타입 정의
 */

export interface PublicDataItem {
  /** 관리번호 */
  atcId: string;
  /** 보관장소 */
  depPlace: string;
  /** 습득물 사진 */
  fdFilePathImg: string;
  /** 물품명 */
  fdPrdtNm: string;
  /** 습득물 명칭 */
  fdSbjt: string;
  /** 습득일자 */
  fdYmd: string;
  /** 물품명 */
  prdtClNm: string;
  /** 순번 */
  rnum: string;
}

export interface PublicDataResponse {
  items: {
    item: PublicDataItem | PublicDataItem[];
  };
  numOfRows: number;
  pageNo: number;
  totalCount: number;
}
