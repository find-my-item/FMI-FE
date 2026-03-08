import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/context/ToastContext";
import useAppMutation from "@/api/_base/query/useAppMutation";
import { PostCommentLikeResponse, PostLikeRequestBody } from "../types/CommentType";
import { GetPostsCommentsResponse } from "../types/GetPostsComments";

type LikeOptimisticContext = {
  previous?: GetPostsCommentsResponse;
};

export const usePostLikeComment = ({
  commentId,
  queryKey,
}: {
  commentId: number;
  queryKey: unknown[];
}) => {
  const { addToast } = useToast();
  const queryClient = useQueryClient();

  return useAppMutation<void, PostCommentLikeResponse>(
    "auth",
    `/comments/${commentId}/likes`,
    "post",
    {
      onMutate: async () => {
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

      onSuccess: () => {
        addToast("좋아요가 등록되었어요.", "success");
      },

      onError: (_error, _variables, context) => {
        const typedContext = context as LikeOptimisticContext | undefined;

        if (typedContext?.previous) {
          queryClient.setQueryData(queryKey, typedContext.previous);
        }

        addToast("좋아요 등록에 실패했어요.", "error");
      },

      onSettled: () => {
        queryClient.invalidateQueries({ queryKey });
      },
    }
  );
};
