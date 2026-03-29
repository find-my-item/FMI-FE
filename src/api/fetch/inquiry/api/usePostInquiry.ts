import useAppMutation from "@/api/_base/query/useAppMutation";
import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { useToast } from "@/context/ToastContext";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const usePostInquiry = (isUserSuccess: boolean) => {
  const { addToast } = useToast();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useAppMutation<FormData, ApiBaseResponseType<number>>("auth", "/inquiries", "post", {
    onSuccess: ({ result }) => {
      addToast("1:1 문의를 등록했어요", "success");
      if (isUserSuccess) {
        queryClient.invalidateQueries({ queryKey: ["/inquiries/me"] });
        router.replace(`/mypage/inquiries/${result}`);
        return;
      }
      router.replace("/mypage");
    },
    onError: () => {
      addToast("1:1 문의 등록에 실패했어요", "error");
    },
  });
};
