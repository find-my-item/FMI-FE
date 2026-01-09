/**
 * @author jikwon
 *
 * 메타데이터 타입 정의
 *
 * - 이 타입은 메타데이터를 표시합니다.
 *
 * @description MetaDataType
 * - title: 메타데이터 제목
 * - summary: 메타데이터 요약
 * - thumbnailUrl: 메타데이터 썸네일 URL
 * - link: 메타데이터 링크
 *
 * @description ShareId
 * - kakao: 카카오
 * - native: 네이티브
 * - copy: 복사
 */
export type MetaDataType = {
  title: string;
  summary: string;
  thumbnailUrl: string;
  link: string;
};

export type ShareId = "kakao" | "native" | "copy";
