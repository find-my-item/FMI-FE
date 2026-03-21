/**
 * @author jikwon
 * @description 공공데이터 포털(경찰청) 습득물 조회 API 응답 아이템 타입
 */

export interface PublicFoundPortalItem {
  /** 유실물 통합관리번호 */
  atcId?: string;
  /** 유실물 일련번호 */
  fdSn?: string;
  /** 물품분류명 */
  prdtClNm?: string;
  /** 색상명 */
  clrNm?: string;
  /** 물품명 */
  fdPrdtNm?: string;
  /** 습득물 제목 */
  fdSbjt?: string;
  /** 습득일 */
  fdYmd?: string;
  /** 습득장소 */
  fdPlace?: string;
  /** 인도장소 */
  depPlace?: string;
  /** 이미지 경로 */
  fdFilePathImg?: string;
  /** 결과 내 순번 */
  rnum?: string;
}
