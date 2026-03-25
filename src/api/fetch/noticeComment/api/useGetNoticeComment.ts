import useAppInfiniteQuery from "@/api/_base/query/useAppInfiniteQuery";
import { InfiniteData, keepPreviousData } from "@tanstack/react-query";
import { GetNoticeCommentsData, GetNoticeCommentsResponse } from "../types/GetNoticeComments";

interface UseGetNoticeCommentParams {
  noticeId: number;
  enabled: boolean;
  size?: number;
}

const DEFAULT_NOTICE_COMMENT_SIZE = 10;

export const useGetNoticeComment = ({
  noticeId,
  enabled,
  size = DEFAULT_NOTICE_COMMENT_SIZE,
}: UseGetNoticeCommentParams) => {
  return useAppInfiniteQuery<GetNoticeCommentsResponse, unknown, GetNoticeCommentsData>(
    "auth",
    ["notice-comments", noticeId],
    `/notices/${noticeId}/comments?size=${size}`,
    {
      enabled: !!noticeId && enabled,
      pageParamName: "cursor",
      initialPageParam: 0,
      getNextPageParam: (lastPage) =>
        lastPage.result.hasNext ? lastPage.result.cursor : undefined,
      select: (data: InfiniteData<GetNoticeCommentsResponse>) => {
        const allRawComments = data.pages.flatMap((page) => page.result?.comments ?? []);
        const lastPage = data.pages[data.pages.length - 1];
        const lastResult = lastPage?.result;

        const comments = allRawComments.map(({ like, ...rest }) => ({
          ...rest,
          isLike: like,
        }));

        const hasNext = lastResult?.hasNext ?? false;
        const cursor = lastResult?.cursor ?? 0;

        return {
          comments,
          hasNext,
          nextPage: cursor,
          totalCommentCount: comments.length,
          remainingCount: hasNext ? size : 0,
          cursor,
        };
      },
      placeholderData: keepPreviousData,
    }
  );
};
