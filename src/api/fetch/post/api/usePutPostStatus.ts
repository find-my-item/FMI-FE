"use client";

import useAppMutation from "@/api/_base/query/useAppMutation";
import { useToast } from "@/context/ToastContext";
import { useQueryClient } from "@tanstack/react-query";
import { PutPostStatusRequestBody } from "../types/PutPostStatusType";

export const usePutPostStatus = (postId: number, isFound: boolean) => {
  const { addToast } = useToast();
  const queryClient = useQueryClient();

  return useAppMutation<PutPostStatusRequestBody>("auth", `/posts/${postId}/status`, "put", {
    onSuccess: () => {
      addToast(
        isFound ? "게시글을 찾아요 상태로 변경했어요" : "게시글을 찾았어요 상태로 변경했어요",
        "success"
      );
      queryClient.invalidateQueries({ queryKey: ["post-detail", postId] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
    onError: () => {
      addToast(
        isFound
          ? "게시글을 찾아요 상태로 변경하지 못했어요"
          : "게시글을 찾았어요 상태로 변경하지 못했어요",
        "error"
      );
    },
  });
};
