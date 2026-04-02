import { InfiniteData, keepPreviousData } from "@tanstack/react-query";
import useAppInfiniteQuery from "@/api/_base/query/useAppInfiniteQuery";
import { CategoryType, ItemStatus } from "@/types";
import { AdminMarketingPostItem, GetMarketingPostsResponse } from "../types/MarketingPostsType";

interface UseGetMarketingPostsParams {
  sort?: string;
  category?: CategoryType;
  postStatus?: ItemStatus;
  size?: number;
  keyword?: string;
}

interface UseGetMarketingPostsOptions {
  enabled?: boolean;
}

export const useGetMarketingPosts = (
  { sort = "LATEST", category, postStatus, size = 10, keyword }: UseGetMarketingPostsParams,
  { enabled = true }: UseGetMarketingPostsOptions = {}
) => {
  const params = new URLSearchParams();
  params.set("size", String(size));
  params.set("sortType", sort);

  if (category) params.set("category", category);
  if (postStatus) params.set("postStatus", postStatus);
  if (keyword) params.set("keyword", keyword);

  return useAppInfiniteQuery<GetMarketingPostsResponse, unknown, AdminMarketingPostItem[]>(
    "auth",
    ["marketing-posts", sort, category, postStatus, size, keyword],
    `/admin/marketing-consent/posts?${params.toString()}`,
    {
      enabled,
      placeholderData: keepPreviousData,
      getNextPageParam: (lastPage) =>
        lastPage.result.hasNext ? lastPage.result.nextCursor : undefined,
      select: (data: InfiniteData<GetMarketingPostsResponse>) =>
        data.pages.flatMap((page) => page.result.postList ?? []),
      pageParamName: "cursor",
    }
  );
};
