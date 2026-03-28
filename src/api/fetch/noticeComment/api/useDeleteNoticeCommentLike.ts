import useAppMutation from "@/api/_base/query/useAppMutation";
import { useToast } from "@/context/ToastContext";
import { useQueryClient } from "@tanstack/react-query";
import {
  PostCommentLikeResponse,
  ToggleCommentLikeVariables,
} from "@/api/fetch/comment/types/CommentType";
import { NoticeCommentsLikeCacheDataType } from "../types/NoticeCommentsLikeCacheDataType";

type LikeOptimisticContext = {
  previous?: NoticeCommentsLikeCacheDataType;
};

const useDeleteNoticeCommentLike = (noticeId: number) => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useAppMutation<ToggleCommentLikeVariables, PostCommentLikeResponse>(
    "auth",
    ({ commentId }) => `/notices/comments/${commentId}/like`,
    "delete",
    {
      onMutate: async ({ commentId, queryKey }) => {
        await queryClient.cancelQueries({ queryKey });

        const previous = queryClient.getQueryData<NoticeCommentsLikeCacheDataType>(queryKey);

        queryClient.setQueryData<NoticeCommentsLikeCacheDataType | undefined>(queryKey, (old) => {
          if (!old?.comments) return old;

          return {
            ...old,
            comments: old.comments.map((comment) => {
              if (comment.id !== commentId) return comment;
              if (!comment.isLike) return comment;

              return {
                ...comment,
                isLike: false,
                likeCount: Math.max(0, (comment.likeCount ?? 0) - 1),
              };
            }),
          };
        });

        return { previous };
      },
      onError: (_error, { queryKey }, context) => {
        const typedContext = context as LikeOptimisticContext | undefined;

        if (typedContext?.previous) {
          queryClient.setQueryData(queryKey, typedContext.previous);
        }

        queryClient.invalidateQueries({ queryKey: ["notice-comments", noticeId] });
        addToast("댓글 좋아요 삭제에 실패했어요", "error");
      },
      onSettled: (_, __, { queryKey }) => {
        queryClient.invalidateQueries({ queryKey });
        queryClient.invalidateQueries({ queryKey: ["notice-comments", noticeId] });
      },
    }
  );
};

export default useDeleteNoticeCommentLike;
