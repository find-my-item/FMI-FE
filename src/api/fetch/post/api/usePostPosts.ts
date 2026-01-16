"use client";

import useAppMutation from "@/api/_base/query/useAppMutation";
import { PostPostsWriteRequestBody, PostPostsWriteResponse } from "../types/PostWriteType";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";

export const usePostPosts = () => {
  const { addToast } = useToast();
  const router = useRouter();

  return useAppMutation<PostPostsWriteRequestBody, PostPostsWriteResponse>(
    "auth",
    "/posts",
    "post",
    {
      onSuccess: (data) => {
        addToast("게시글이 등록되었습니다.", "success");
        router.replace(`/list/${data.result.postId}`);
      },
      onError: () => {
        addToast("게시글 등록에 실패했습니다.", "error");
      },
    }
  );
};
