import useAppInfiniteQuery from "@/api/_base/query/useAppInfiniteQuery";
import { SortFilterValue } from "@/app/(route)/list/_components/_internal/FilterBottomSheet/types";
import { ItemStatus, PostType } from "@/types";
import { InfiniteData } from "@tanstack/react-query";
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
      getNextPageParam: (lastPage) => lastPage.result.nextCursor ?? undefined,
      select: (data: InfiniteData<PostSearchResponse>) =>
        data.pages.flatMap((page) => page.result.postList),
    }
  );
};
