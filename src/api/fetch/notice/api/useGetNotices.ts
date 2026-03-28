"use client";

import useAppInfiniteQuery from "@/api/_base/query/useAppInfiniteQuery";
import { GetNoticesResponse, NoticeItem } from "../types/NoticesType";
import { InfiniteData, keepPreviousData } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

interface UseGetNoticesParams {
  keyword?: string;
  sortType?: string;
}

export const useGetNotices = ({ keyword, sortType }: UseGetNoticesParams = {}) => {
  const searchParams = useSearchParams();

  const category = searchParams.get("category") ?? undefined;
  const keywordParam = searchParams.get("keyword") ?? keyword;
  const sortTypeRaw = searchParams.get("sortType") ?? sortType;
  const sortTypeForApi =
    sortTypeRaw && sortTypeRaw.length > 0 ? sortTypeRaw.toUpperCase() : undefined;
  const size = Number(searchParams.get("size")) || 10;

  const params = new URLSearchParams();
  params.set("size", String(size));
  if (category) params.set("category", category);
  if (keywordParam) params.set("keyword", keywordParam);
  if (sortTypeForApi) params.set("sortType", sortTypeForApi);

  return useAppInfiniteQuery<GetNoticesResponse, unknown, NoticeItem[]>(
    "public",
    ["notices", category, keywordParam, sortTypeForApi, size],
    `/notices?${params.toString()}`,
    {
      placeholderData: keepPreviousData,
      getNextPageParam: (lastPage) =>
        lastPage.result.hasNext ? (lastPage.result.nextCursor ?? undefined) : undefined,
      select: (data: InfiniteData<GetNoticesResponse>) =>
        data.pages.flatMap((page) => page.result.content),
      throwOnError: true,
      suspense: true,
    }
  );
};
