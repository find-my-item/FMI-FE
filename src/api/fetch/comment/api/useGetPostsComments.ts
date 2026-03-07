import useAppQuery from "@/api/_base/query/useAppQuery";
import { GetPostsCommentsResponse } from "../types/GetPostsComments";
import { keepPreviousData } from "@tanstack/react-query";

interface UseGetPostsCommentsParams {
  postId: number;
  page?: number;
}

export const useGetPostsComments = ({ postId, page = 0 }: UseGetPostsCommentsParams) => {
  const params = new URLSearchParams();
  params.set("postId", String(postId));
  params.set("page", String(page));

  return useAppQuery<GetPostsCommentsResponse>(
    "auth",
    ["post-comments", postId, page],
    `/comments/posts/${postId}?${params.toString()}`,
    {
      enabled: !!postId,
      placeholderData: keepPreviousData,
    }
  );
};
