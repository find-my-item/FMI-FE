import { GetNoticeMetaDataResponse } from "@/api/fetch/notice";
import { PostMetaDataItem } from "@/api/fetch/post";

/**
 * @author jikwon
 *
 * 메타데이터 타입 정의
 *
 * - 이 타입은 메타데이터를 표시합니다.
 *
 * @description PostMetaDataItemWithLink
 * - PostMetaDataItem: 메타데이터 아이템
 * - link: 메타데이터 링크
 *
 * @description ShareId
 * - kakao: 카카오
 * - native: 네이티브
 * - copy: 복사
 */

// TODO(형준): 삭제될 타입
export type PostMetaDataItemWithLink = PostMetaDataItem & {
  link: string;
};

export type ShareId = "kakao" | "native" | "copy";

export interface MetaDataItem {
  title: string;
  summary: string;
  thumbnailUrl: string;
  address?: string;
  likeCount: number;
  commentCount: number;
  viewCount: number;
}

export type MetaDataItemWithLink = MetaDataItem & {
  link: string;
};
