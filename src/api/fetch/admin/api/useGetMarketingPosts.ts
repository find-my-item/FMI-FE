import { InfiniteData, keepPreviousData } from "@tanstack/react-query";
import useAppInfiniteQuery from "@/api/_base/query/useAppInfiniteQuery";
import { CategoryType, ItemStatus } from "@/types";
import { AdminMarketingPostItem, GetMarketingPostsResponse } from "../types/MarketingPostsType";

interface UseGetMarketingPostsParams {
  sort?: string;
  category?: CategoryType;
  postStatus?: ItemStatus;
  size?: number;
}

interface UseGetMarketingPostsOptions {
  enabled?: boolean;
}

export const useGetMarketingPosts = (
  { sort = "LATEST", category, postStatus, size = 10 }: UseGetMarketingPostsParams,
  { enabled = true }: UseGetMarketingPostsOptions = {}
) => {
  const params = new URLSearchParams();
  params.set("size", String(size));

  const apiSort = sort === "MOST_FAVORITED" ? "popular" : "latest";
  params.set("sort", apiSort);

  if (category) params.set("category", category);
  if (postStatus) params.set("postStatus", postStatus);

  return useAppInfiniteQuery<GetMarketingPostsResponse, unknown, AdminMarketingPostItem[]>(
    "auth",
    ["marketing-posts", sort, category, postStatus, size],
    `/admin/posts/marketing?${params.toString()}`,
    {
      enabled,
      placeholderData: keepPreviousData,
      getNextPageParam: (lastPage) =>
        lastPage.result.hasNext ? lastPage.result.nextCursor : undefined,
      select: (data: InfiniteData<GetMarketingPostsResponse>) =>
        data.pages.flatMap((page) => page.result.content ?? []),
      pageParamName: sort === "MOST_FAVORITED" ? "cursorViewCount" : "cursor",
    }
  );
};
