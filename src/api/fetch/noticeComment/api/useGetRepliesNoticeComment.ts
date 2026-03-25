"use client";

import useAppInfiniteQuery from "@/api/_base/query/useAppInfiniteQuery";
import { InfiniteData, keepPreviousData } from "@tanstack/react-query";
import {
  GetRepliesNoticeCommentsData,
  GetRepliesNoticeCommentsResponse,
} from "../types/GetRepliesNoticeComments";

interface UseGetRepliesNoticeCommentParams {
  commentId: number;
  enabled?: boolean;
  size?: number;
}

export const useGetRepliesNoticeComment = ({
  commentId,
  enabled = true,
}: UseGetRepliesNoticeCommentParams) => {
  return useAppInfiniteQuery<
    GetRepliesNoticeCommentsResponse,
    unknown,
    GetRepliesNoticeCommentsData
  >("auth", ["replies-notice-comments", commentId], `/notices/comments/${commentId}/replies`, {
    enabled: !!commentId && enabled,
    pageParamName: "page",
    initialPageParam: 0,
    getNextPageParam: (lastPage) =>
      lastPage.result.hasNext ? lastPage.result.nextPage : undefined,
    select: (data: InfiniteData<GetRepliesNoticeCommentsResponse>) => {
      const lastPage = data.pages[data.pages.length - 1];
      const result = lastPage?.result;

      const comments = data.pages
        .flatMap((page) => page.result?.comments ?? [])
        .map(({ like, ...rest }) => ({
          ...rest,
          isLike: like,
        }));

      return {
        comments,
        hasNext: result?.hasNext ?? false,
        nextPage: result?.nextPage ?? 0,
        totalCommentCount: result?.totalCommentCount ?? 0,
        remainingCount: result?.remainingCount ?? 0,
      };
    },
    placeholderData: keepPreviousData,
  });
};

export default useGetRepliesNoticeComment;
