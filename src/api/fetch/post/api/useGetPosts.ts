import { InfiniteData, keepPreviousData } from "@tanstack/react-query";
import useAppInfiniteQuery from "@/api/_base/query/useAppInfiniteQuery";
import { SortFilterValue } from "@/components/domain/FilterBottomSheet/FilterBottomSheet/types";
import { ItemStatus, PostType } from "@/types";
import { PostItem, PostSearchResponse } from "../types/PostItemType";

interface UseGetPostsParams {
  address?: string;
  size?: number;
  postType?: PostType;
  postStatus?: ItemStatus;
  category?: string;
  sortType?: SortFilterValue;
}

export const useGetPosts = ({
  address,
  size = 10,
  postType,
  postStatus = "SEARCHING",
  category,
  sortType = "LATEST",
}: UseGetPostsParams) => {
  const params = new URLSearchParams();
  params.set("address", address ?? "");
  params.set("size", String(size));
  params.set("postStatus", postStatus);
  params.set("sortType", sortType);

  if (postType) params.set("postType", postType);
  if (category) params.set("category", category);

  return useAppInfiniteQuery<PostSearchResponse, unknown, PostItem[]>(
    "public",
    ["posts", address, postType, postStatus, category, sortType, size],
    `/posts/search?${params.toString()}`,
    {
      placeholderData: keepPreviousData,
      getNextPageParam: (lastPage) => lastPage.result.nextCursor ?? undefined,
      select: (data: InfiniteData<PostSearchResponse>) =>
        data.pages.flatMap((page) => page.result.postList),
      throwOnError: true,
    }
  );
};
