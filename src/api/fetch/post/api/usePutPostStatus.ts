"use client";

import useAppMutation from "@/api/_base/query/useAppMutation";
import { useToast } from "@/context/ToastContext";
import { useQueryClient } from "@tanstack/react-query";
import { PutPostStatusRequestBody } from "../types/PutPostStatusType";

export const usePutPostStatus = (postId: number) => {
  const { addToast } = useToast();
  const queryClient = useQueryClient();

  return useAppMutation<PutPostStatusRequestBody>("auth", `/posts/${postId}/status`, "put", {
    onSuccess: () => {
      addToast("게시글 상태가 변경되었어요.", "success");
      queryClient.invalidateQueries({ queryKey: ["post-detail", postId] });
    },
    onError: () => {
      addToast("게시글 상태 변경에 실패했어요.", "error");
    },
  });
};
