import { useQueryClient } from "@tanstack/react-query";
import useAppMutation from "@/api/_base/query/useAppMutation";
import { useToast } from "@/context/ToastContext";
import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { InquiryStatus } from "@/types";

interface UpdateInquiryStatusRequest {
  status: InquiryStatus;
}

interface UsePutInquiryStatusParams {
  inquiryId: number;
  isGuest: boolean;
}

const STATUS_TOAST_MESSAGE: Record<InquiryStatus, string> = {
  PENDING: "접수 상태로 변경되었어요",
  RECEIVED: "검토 중 상태로 변경되었어요",
  ANSWERED: "처리 완료 상태로 변경되었어요",
};

export const usePutInquiryStatus = ({ inquiryId, isGuest }: UsePutInquiryStatusParams) => {
  const { addToast } = useToast();
  const queryClient = useQueryClient();

  return useAppMutation<UpdateInquiryStatusRequest, ApiBaseResponseType<string>>(
    "auth",
    `/admin/inquiries/${inquiryId}/status`,
    "put",
    {
      onSuccess: (_, variables) => {
        queryClient.invalidateQueries({
          queryKey: [isGuest ? "guest-inquiries-detail" : "detail-inquiry", inquiryId],
        });

        queryClient.invalidateQueries({
          queryKey: [isGuest ? "guest-inquiries" : "inquiries"],
        });

        addToast(STATUS_TOAST_MESSAGE[variables.status], "success");
      },
      onError: () => {
        addToast("게시글 상태 변경에 실패했어요", "error");
      },
    }
  );
};
