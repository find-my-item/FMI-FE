import useAppInfiniteQuery from "@/api/_base/query/useAppInfiniteQuery";
import { GetPostsCommentsData, GetPostsCommentsResponse } from "../types/GetPostsComments";
import { InfiniteData, keepPreviousData } from "@tanstack/react-query";

interface UseGetPostsCommentsParams {
  postId: number;
  enabled: boolean;
}

export const useGetPostsComments = ({ postId, enabled }: UseGetPostsCommentsParams) => {
  return useAppInfiniteQuery<GetPostsCommentsResponse, unknown, GetPostsCommentsData>(
    "auth",
    ["post-comments", postId],
    `/comments/posts/${postId}?postId=${postId}`,
    {
      enabled: !!postId && enabled,
      pageParamName: "page",
      initialPageParam: 1,
      getNextPageParam: (lastPage) =>
        lastPage.result.hasNext ? lastPage.result.nextPage : undefined,
      select: (data: InfiniteData<GetPostsCommentsResponse>) => {
        const lastPage = data.pages[data.pages.length - 1];
        return {
          ...lastPage.result,
          comments: data.pages.flatMap((page) => page.result.comments),
        };
      },
      placeholderData: keepPreviousData,
    }
  );
};
