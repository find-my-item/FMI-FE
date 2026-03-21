"use client";

import useAppQuery from "@/api/_base/query/useAppQuery";
import { useMainKakaoMapStore } from "@/store";
import { useSearchParams } from "next/navigation";
import { POST_TYPE } from "@/app/(home)/_constants/QUERY_PARAMS";
import { MapPostSummaryResponse } from "../types/MapPostSummaryType";
import { PostType } from "@/types";
import { keepPreviousData } from "@tanstack/react-query";

export const mapPostTypeQueryToApiParam = (value: string | null): PostType | undefined => {
  const v = value?.trim().toLowerCase();
  if (v === "lost") return "LOST";
  if (v === "find") return "FOUND";
  return undefined;
};

// TODO(형준): API에 무한스크롤 추가되면 useInfiniteQuery로 변경
const useMapPostSummary = (postId: number) => {
  const { mapLevel } = useMainKakaoMapStore();
  const level = Math.min(mapLevel, 11);
  const searchParams = useSearchParams();
  const apiPostType = mapPostTypeQueryToApiParam(searchParams.get(POST_TYPE));

  const query = new URLSearchParams();
  query.set("level", String(level));
  if (apiPostType) {
    query.set("postType", apiPostType);
  }

  return useAppQuery<MapPostSummaryResponse>(
    "public",
    ["map-post-summary", postId, level, apiPostType ?? "all"],
    `/main/posts/${postId}/summary?${query.toString()}`,
    { enabled: !!postId, placeholderData: keepPreviousData }
  );
};

export default useMapPostSummary;
