"use client";

import { QueryKey, useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/context/ToastContext";
import useAppMutation from "@/api/_base/query/useAppMutation";
import { CommentDeleteResponse } from "../types/CommentDeleteType";

export const useDeleteComment = (commentId: number, queryKey: QueryKey) => {
  const { addToast } = useToast();
  const queryClient = useQueryClient();

  return useAppMutation<void, CommentDeleteResponse>("auth", `/comments/${commentId}`, "delete", {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      addToast("댓글 삭제가 완료되었어요", "success");
    },
    onError: () => {
      addToast("댓글 삭제에 실패했어요", "error");
    },
  });
};
