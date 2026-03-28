"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useToast } from "@/context/ToastContext";
import useAppMutation from "@/api/_base/query/useAppMutation";
import { useRouter } from "next/navigation";
import {
  PostDeleteDetailRequestBody,
  PostDeleteDetailResponse,
} from "../types/PostDeleteDetailType";

export const useDeleteDetailPost = (id: number) => {
  const { addToast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useAppMutation<PostDeleteDetailRequestBody, PostDeleteDetailResponse>(
    "auth",
    `/posts/${id}`,
    "delete",
    {
      onSuccess: async () => {
        await Promise.all([
          queryClient.invalidateQueries({ queryKey: ["posts"] }),
          queryClient.invalidateQueries({ queryKey: ["/users/me/posts"] }),
        ]);
        addToast("게시글 삭제가 완료되었어요", "success");
        router.replace("/list");
      },
      onError: () => {
        addToast("게시글 삭제에 실패했어요", "error");
      },
    },
    { sendDeleteBody: true }
  );
};
