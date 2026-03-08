import { useMemo } from "react";
import { throttle } from "lodash";
import { useDeleteLikeComment, usePostLikeComment } from "@/api/fetch/comment";

interface ToggleCommentLikeProps {
  commentId: number;
  queryKey: unknown[];
}

export const useToggleCommentLike = ({ commentId, queryKey }: ToggleCommentLikeProps) => {
  const { mutate: postCommentLike, isPending: postPending } = usePostLikeComment({
    commentId,
    queryKey,
  });

  const { mutate: deleteCommentLike, isPending: deletePending } = useDeleteLikeComment({
    commentId,
    queryKey,
  });

  const handleToggleFavorite = useMemo(
    () =>
      throttle((isLike: boolean) => {
        if (isLike) {
          deleteCommentLike();
        } else {
          postCommentLike();
        }
      }, 300),
    [postCommentLike, deleteCommentLike]
  );

  return {
    handleToggleFavorite,
    isPending: postPending || deletePending,
  };
};
