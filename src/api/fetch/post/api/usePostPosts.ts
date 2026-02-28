"use client";

import useAppMutation from "@/api/_base/query/useAppMutation";
import { PostPostsWriteResponse } from "../types/PostWriteType";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";
import { useQueryClient } from "@tanstack/react-query";

export const usePostPosts = () => {
  const { addToast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useAppMutation<FormData, PostPostsWriteResponse>("auth", "/posts", "post", {
    onSuccess: (data, variables) => {
      if (variables.has("tempPostId")) {
        queryClient.invalidateQueries({ queryKey: ["temp-post"] });
      }
      addToast("게시글이 등록되었습니다.", "success");
      router.replace(`/list/${data.result.id}`);
    },
    onError: () => {
      addToast("게시글 등록에 실패했습니다.", "error");
    },
  });
};
