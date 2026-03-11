import useAppQuery from "@/api/_base/query/useAppQuery";
import { NoticeDetailResponse } from "../types/NoticeDetailType";

export const useGetNoticeDetail = ({ id }: { id: number }) => {
  return useAppQuery<NoticeDetailResponse>("public", ["notice-detail", id], `/notices/${id}`);
};
