"use client";

import useAppInfiniteQuery from "@/api/_base/query/useAppInfiniteQuery";
import { GetNoticesResponse, NoticeItem } from "../types/NoticesType";
import { InfiniteData, keepPreviousData } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";

const DEFAULT_SIZE = 10;

export const useGetNotices = () => {
  const searchParams = useSearchParams();

  const category = searchParams.get("category") ?? undefined;
  const keyword = searchParams.get("keyword") ?? undefined;
  const sortType = searchParams.get("sortType") ?? undefined;
  const size = Number(searchParams.get("size")) || DEFAULT_SIZE;

  const params = new URLSearchParams();
  params.set("size", String(size));
  if (category) params.set("category", category);
  if (keyword) params.set("keyword", keyword);
  if (sortType) params.set("sortType", sortType);

  return useAppInfiniteQuery<GetNoticesResponse, unknown, NoticeItem[]>(
    "public",
    ["notices", category, keyword, sortType, size],
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
