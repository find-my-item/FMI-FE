import { GetMetaDataResponse } from "../types/PostMetaDataType";
import useAppQuery from "@/api/_base/query/useAppQuery";

export const useGetMetaData = ({ postId }: { postId: number }) => {
  return useAppQuery<GetMetaDataResponse>("public", ["postMeta", postId], `/post/${postId}/share`);
};
