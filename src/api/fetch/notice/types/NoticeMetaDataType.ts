import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";

interface NoticeMetaData {
  title: string;
  description: string;
}

export interface GetNoticeMetaDataResponse extends ApiBaseResponseType<NoticeMetaData> {}
