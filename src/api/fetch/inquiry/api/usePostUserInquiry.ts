import useAppMutation from "@/api/_base/query/useAppMutation";
import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { useToast } from "@/context/ToastContext";
import { useQueryClient } from "@tanstack/react-query";
import { PostUserInquiryResponseType } from "../types/PostUserInquiryResponseType";

export const usePostUserInquiry = ({ inquiryId }: { inquiryId: number }) => {
  const { addToast } = useToast();

  const queryClient = useQueryClient();

  return useAppMutation<FormData, PostUserInquiryResponseType, ApiBaseResponseType<null>>(
    "auth",
    `/inquiries/${inquiryId}/comments`,
    "post",
    {
      onSuccess: () => {
        addToast("문의 댓글 작성에 성공했어요", "success");
        queryClient.invalidateQueries({ queryKey: ["/inquiries/id", inquiryId] });
      },
      onError: () => addToast("문의 댓글 작성에 실패했어요", "error"),
    }
  );
};
