import useAppMutation from "@/api/_base/query/useAppMutation";
import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";

export const usePostNotices = () => {
  const { addToast } = useToast();
  const router = useRouter();

  return useAppMutation<unknown, ApiBaseResponseType<number>>("auth", "/admin/notices", "post", {
    onSuccess: ({ result }) => {
      addToast("공지사항이 등록되었습니다.", "success");
      router.replace(`/notice/${result}`);
    },
  });
};
