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

export const usePutInquiryStatus = ({ inquiryId, isGuest }: UsePutInquiryStatusParams) => {
  const { addToast } = useToast();
  const queryClient = useQueryClient();

  return useAppMutation<UpdateInquiryStatusRequest, ApiBaseResponseType<string>>(
    "auth",
    `/admin/inquiries/${inquiryId}/status`,
    "put",
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: [isGuest ? "guest-inquiries-detail" : "detail-inquiry", inquiryId],
        });

        queryClient.invalidateQueries({
          queryKey: [isGuest ? "guest-inquiries" : "inquiries"],
        });

        addToast("상태가 변경되었습니다.", "success");
      },
    }
  );
};
