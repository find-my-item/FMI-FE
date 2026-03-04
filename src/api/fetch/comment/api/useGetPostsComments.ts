import useAppQuery from "@/api/_base/query/useAppQuery";
import { GetPostsCommentsResponse } from "../types/GetPostsComments";
import { keepPreviousData } from "@tanstack/react-query";

interface UseGetPostsCommentsParams {
  postId: number;
  cursor?: number;
  size?: number;
}

export const useGetPostsComments = ({ postId, cursor, size = 10 }: UseGetPostsCommentsParams) => {
  const params = new URLSearchParams();
  params.set("postId", String(postId));
  params.set("size", String(size));

  return useAppQuery<GetPostsCommentsResponse>(
    "auth",
    ["post-comments", postId, cursor, size],
    `/comments/posts/${postId}?${params.toString()}`,
    {
      enabled: !!postId,
      placeholderData: keepPreviousData,
    }
  );
};
