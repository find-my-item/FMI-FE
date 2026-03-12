"use client";

import { useQueryClient } from "@tanstack/react-query";
import useAppMutation from "@/api/_base/query/useAppMutation";
import { useToast } from "@/context/ToastContext";
import { CommentDeleteResponse, DeleteCommentVariables } from "../types/CommentDeleteType";

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useAppMutation<DeleteCommentVariables, CommentDeleteResponse>(
    "auth",
    ({ commentId }) => `/comments/${commentId}`,
    "delete",
    {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({ queryKey: variables.queryKey });
        addToast("댓글 삭제가 완료되었어요", "success");
      },
    }
  );
};
