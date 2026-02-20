import { InfiniteData, keepPreviousData } from "@tanstack/react-query";
import useAppInfiniteQuery from "@/api/_base/query/useAppInfiniteQuery";
import { PostItem } from "../types/PostItemType";
import { GetSearchKeywordResponse } from "../types/SearchKeywordType";

interface UseGetSearchKeywordParams {
  size?: number;
  keyword?: string;
}

export const useGetSearchKeyword = ({ size = 10, keyword }: UseGetSearchKeywordParams) => {
  const params = new URLSearchParams();
  params.set("size", String(size));
  params.set("keyword", keyword ?? "");

  return useAppInfiniteQuery<GetSearchKeywordResponse, unknown, PostItem[]>(
    "public",
    ["posts", keyword, size],
    `/posts/search/keyword?${params.toString()}`,
    {
      placeholderData: keepPreviousData,
      getNextPageParam: (lastPage) => lastPage.result.nextCursor ?? undefined,
      select: (data: InfiniteData<GetSearchKeywordResponse>) =>
        data.pages.flatMap((page) => page.result.postList),
      throwOnError: true,
      suspense: true,
    }
  );
};
