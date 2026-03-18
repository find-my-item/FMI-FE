import { PostMetaDataItem } from "@/api/fetch/post";

/**
 * @author jikwon
 * rewrite hyungjun
 *
 * 메타데이터 타입 정의
 *
 * - 이 타입은 메타데이터를 표시합니다.
 *   공지사항/게시글 메타데이터 호환 가능합니다.
 *
 * @description PostMetaDataItemWithLink
 * - PostMetaDataItem: 게시글 메타데이터 아이템
 * - link: 메타데이터 링크
 * - MetaDataItem: 공지사항/게시글 호환 타입
 * - objectType: 카카오 템플릿 타입
 *
 * @description ShareId
 * - kakao: 카카오
 * - native: 네이티브
 * - copy: 복사
 */

export type PostMetaDataItemWithLink = PostMetaDataItem & {
  link: string;
};

export type ShareId = "kakao" | "native" | "copy";

export interface MetaDataItem {
  title: string;
  summary: string;
  thumbnailUrl?: string;
  address?: string;
  likeCount: number;
  commentCount: number;
  viewCount: number;
}

export type MetaDataItemWithLink = MetaDataItem & {
  link: string;
};

export type ObjectType = "feed" | "location";
