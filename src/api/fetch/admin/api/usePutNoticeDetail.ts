import useAppMutation from "@/api/_base/query/useAppMutation";
import { useToast } from "@/context/ToastContext";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const usePutNoticeDetail = (noticeId: number) => {
  const { addToast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useAppMutation("auth", `/admin/notices/${noticeId}`, "put", {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notice-detail", noticeId] });
      queryClient.invalidateQueries({ queryKey: ["notices"] });
      addToast("공지사항이 수정되었습니다.", "success");
      router.replace(`/notice/${noticeId}`);
    },
    onError: () => {
      addToast("공지사항 수정에 실패했어요", "error");
    },
  });
};
