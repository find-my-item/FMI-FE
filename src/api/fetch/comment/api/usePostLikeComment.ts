import { useQueryClient } from "@tanstack/react-query";
import useAppMutation from "@/api/_base/query/useAppMutation";
import { PostCommentLikeResponse, ToggleCommentLikeVariables } from "../types/CommentType";
import { GetPostsCommentsResponse } from "../types/GetPostsComments";

type LikeOptimisticContext = {
  previous?: GetPostsCommentsResponse;
};

export const usePostLikeComment = () => {
  const queryClient = useQueryClient();

  return useAppMutation<ToggleCommentLikeVariables, PostCommentLikeResponse>(
    "auth",
    ({ commentId }) => `/comments/${commentId}/likes`,
    "post",
    {
      onMutate: async ({ commentId, queryKey }) => {
        await queryClient.cancelQueries({ queryKey });

        const previous = queryClient.getQueryData<GetPostsCommentsResponse>(queryKey);

        queryClient.setQueryData<GetPostsCommentsResponse | undefined>(queryKey, (old) => {
          if (!old?.result?.comments) return old;

          return {
            ...old,
            result: {
              ...old.result,
              comments: old.result.comments.map((comment) => {
                if (comment.id !== commentId) return comment;
                if (comment.isLike) return comment;

                return {
                  ...comment,
                  isLike: true,
                  likeCount: (comment.likeCount ?? 0) + 1,
                };
              }),
            },
          };
        });

        return { previous };
      },

      onError: (_error, { queryKey }, context) => {
        const typedContext = context as LikeOptimisticContext | undefined;

        if (typedContext?.previous) {
          queryClient.setQueryData(queryKey, typedContext.previous);
        }
      },

      onSettled: (_, __, { queryKey }) => {
        queryClient.invalidateQueries({ queryKey });
      },
    }
  );
};
