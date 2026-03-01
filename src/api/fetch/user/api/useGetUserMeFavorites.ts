import { MypagePostsResponseType } from "../types/MypagePostsResponseType";
import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { ItemStatus, PostType } from "@/types";
import { SortFilterValue } from "@/components/domain/FilterSectionBottomSheet/_types/types";
import useAppInfiniteQuery from "@/api/_base/query/useAppInfiniteQuery";
import { PostItem } from "../../post";
import { InfiniteData, keepPreviousData } from "@tanstack/react-query";

interface useGetUserMeFavoritesProps {
  cursor?: number;
  size?: number;
  postType?: PostType;
  postStatus?: ItemStatus;
  sortType?: SortFilterValue;
  category?: string;
}

export const useGetUserMeFavorites = ({
  cursor,
  size = 10,
  postType,
  postStatus = "SEARCHING",
  category,
  sortType = "LATEST",
}: useGetUserMeFavoritesProps) => {
  const queryParams = new URLSearchParams();

  queryParams.set("size", String(size));
  queryParams.set("postStatus", postStatus);
  queryParams.set("sortType", sortType);

  if (postType) queryParams.set("postType", postType);
  if (category) queryParams.set("category", category);

  if (cursor !== undefined) queryParams.append("cursor", cursor.toString());
  if (size !== undefined) queryParams.append("size", size.toString());

  return useAppInfiniteQuery<MypagePostsResponseType, ApiBaseResponseType<null>, PostItem[]>(
    "auth",
    ["/users/me/favorites", postType, postStatus, category, sortType, size],
    `/users/me/favorites?${queryParams.toString()}`,
    {
      placeholderData: keepPreviousData,
      getNextPageParam: (lastPage) => lastPage.result.nextCursor ?? undefined,
      select: (data: InfiniteData<MypagePostsResponseType>) =>
        data.pages.flatMap((page) => page.result.posts),
      throwOnError: true,
      suspense: true,
    }
  );
};
