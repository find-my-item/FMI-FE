"use client";

import useAppMutation from "@/api/_base/query/useAppMutation";
import { useToast } from "@/context/ToastContext";
import { TempPostWriteRequestBody } from "../types/TempPostType";

export const usePostTempPost = () => {
  const { addToast } = useToast();

  return useAppMutation<TempPostWriteRequestBody>("auth", "/posts/temp", "post", {
    onSuccess: () => {
      addToast("임시 게시글이 저장되었어요", "success");
    },
    onError: () => {
      addToast("임시 게시글 저장에 실패했어요", "error");
    },
  });
};
