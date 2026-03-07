import useAppQuery from "@/api/_base/query/useAppQuery";
import { GetPostsCommentsResponse } from "../types/GetPostsComments";
import { keepPreviousData } from "@tanstack/react-query";

interface UseGetRepliesPostsCommentsParams {
  commentId: number;
  cursor?: number;
  size?: number;
  enabled?: boolean;
}

export const useGetRepliesPostsComments = ({
  commentId,
  cursor,
  size = 10,
  enabled = true,
}: UseGetRepliesPostsCommentsParams) => {
  const params = new URLSearchParams();
  params.set("size", String(size));

  return useAppQuery<GetPostsCommentsResponse>(
    "auth",
    ["replies-post-comments", commentId, cursor, size],
    `/comments/${commentId}/replies?${params.toString()}`,
    {
      enabled: !!commentId && enabled,
      placeholderData: keepPreviousData,
    }
  );
};
