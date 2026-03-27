import useAppMutation from "@/api/_base/query/useAppMutation";
import { useToast } from "@/context/ToastContext";
import { useQueryClient } from "@tanstack/react-query";

const usePostNoticeCommentLike = (noticeId: number, commentId: number) => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useAppMutation("auth", `/notices/comments/${commentId}/like`, "post", {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notice-comments", noticeId] });
    },
    onError: () => {
      addToast("댓글 좋아요 등록에 실패했어요", "error");
    },
  });
};

export default usePostNoticeCommentLike;
