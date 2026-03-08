import useAppMutation from "@/api/_base/query/useAppMutation";
import { useToast } from "@/context/ToastContext";

export const usePostNotices = () => {
  const { addToast } = useToast();

  return useAppMutation("auth", "/admin/notices", "post", {
    onSuccess: () => {
      addToast("공지사항이 등록되었습니다.", "success");
    },
  });
};
