import useAppQuery from "@/api/_base/query/useAppQuery";
import { GetNoticeMetaDataResponse } from "../types/NoticeMetaDataType";

export const useGetNoticeMetaData = ({ noticeId }: { noticeId: number }) => {
  return useAppQuery<GetNoticeMetaDataResponse>(
    "public",
    ["noticeMeta", noticeId],
    `/notices/${noticeId}/meta`
  );
};
