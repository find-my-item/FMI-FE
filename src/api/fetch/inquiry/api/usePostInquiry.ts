import useAppMutation from "@/api/_base/query/useAppMutation";
import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";

export const usePostInquiry = (isUserSuccess: boolean) => {
  const { addToast } = useToast();
  const router = useRouter();

  return useAppMutation<FormData, ApiBaseResponseType<number>>("auth", "/inquiries", "post", {
    onSuccess: ({ result }) => {
      addToast("1:1 문의를 등록했어요", "success");
      if (isUserSuccess) {
        // TODO(형준): 회원일 때 내 문의 내역 invalidate 필요(마이페이지/내 문의 내역 개발 후 적용)
        // 내 문의 내역/상세 페이지 라우팅 선 구현, 현재 문의 상세 페이지 구현 안됨
        router.replace(`/mypage/inquiries/${result}`);
        return;
      }
      router.replace("/support");
    },
    onError: () => {
      addToast("1:1 문의 등록에 실패했어요", "error");
    },
  });
};
