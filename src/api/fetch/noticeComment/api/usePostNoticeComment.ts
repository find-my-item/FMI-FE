import { useQueryClient } from "@tanstack/react-query";
import useAppMutation from "@/api/_base/query/useAppMutation";
import { useToast } from "@/context/ToastContext";
import { PostNoticeCommentResponse } from "../types/PostNoticeComments";

export const usePostNoticeComment = (noticeId: number) => {
  const { addToast } = useToast();
  const queryClient = useQueryClient();

  return useAppMutation<FormData, PostNoticeCommentResponse>(
    "auth",
    `/notices/${noticeId}/comments`,
    "post",
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["notice-comments", noticeId] });
        addToast("댓글이 등록되었어요", "success");
      },
      onError: () => {
        addToast("댓글 등록에 실패했어요", "error");
      },
    }
  );
};
