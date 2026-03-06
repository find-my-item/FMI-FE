"use client";

import useAppMutation from "@/api/_base/query/useAppMutation";
import { PostPostsWriteResponse } from "../types/PostWriteType";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export const usePutPost = (postId: number) => {
  const { addToast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useAppMutation<FormData, PostPostsWriteResponse>("auth", `/posts/${postId}`, "put", {
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["post-detail", postId] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      addToast("게시글이 수정되었어요", "success");
      router.replace(`/list/${data.result.id}`);
    },
    onError: () => {
      addToast("게시글 수정에 실패했어요", "error");
    },
  });
};
