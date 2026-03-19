import useAppInfiniteQuery from "@/api/_base/query/useAppInfiniteQuery";
import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { CommentItem, MypageCommentsResponseType } from "../types/MypageCommentsResponseType";
import { SimpleSortType } from "@/types";
import { InfiniteData, keepPreviousData } from "@tanstack/react-query";
import { useAuthStore } from "@/store";

interface CommentsParams {
  startDate?: string | null;
  endDate?: string | null;
  keyword?: string;
  sort?: SimpleSortType;
  size?: number;
}
export const useGetUserComments = ({
  startDate,
  endDate,
  keyword,
  sort = "LATEST",
  size = 10,
}: CommentsParams) => {
  const isAuthInitialized = useAuthStore((state) => state.isAuthInitialized);

  const queryParams = new URLSearchParams();

  if (startDate && endDate) {
    queryParams.set("startDate", startDate);
    queryParams.set("endDate", endDate);
  }
  if (keyword) queryParams.set("keyword", keyword);
  if (sort) queryParams.set("sort", sort);
  queryParams.set("size", size.toString());

  return useAppInfiniteQuery<MypageCommentsResponseType, ApiBaseResponseType<null>, CommentItem[]>(
    "auth",
    ["/users/me/comments", startDate, endDate, sort, keyword],
    `/users/me/comments?${queryParams}`,
    {
      placeholderData: keepPreviousData,
      getNextPageParam: (lastPage) => lastPage.result.nextCursor ?? undefined,
      select: (data: InfiniteData<MypageCommentsResponseType>) =>
        data.pages.flatMap((page) => page.result.comments),
      enabled: isAuthInitialized,
    }
  );
};
