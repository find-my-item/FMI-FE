import { useQueryClient } from "@tanstack/react-query";
import useAppMutation from "@/api/_base/query/useAppMutation";
import { useToast } from "@/context/ToastContext";
import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { InquiryStatus } from "@/types";

interface UpdateInquiryStatusRequest {
  status: InquiryStatus;
}

export const usePutInquiryStatus = (inquiryId: number) => {
  const { addToast } = useToast();
  const queryclient = useQueryClient();

  return useAppMutation<UpdateInquiryStatusRequest, ApiBaseResponseType<string>>(
    "auth",
    `/admin/inquiries/${inquiryId}/status`,
    "put",
    {
      onSuccess: () => {
        queryclient.invalidateQueries({
          queryKey: ["detail-inquiry", inquiryId],
        });
        queryclient.invalidateQueries({
          queryKey: ["inquiries"],
        });
        addToast("상태가 변경되었습니다.", "success");
      },
    }
  );
};
