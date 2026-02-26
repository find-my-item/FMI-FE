import useAppQuery from "@/api/_base/query/useAppQuery";
import { GetTempPostResponse } from "../types/TempPostType";

export const useGetTempPost = () => {
  return useAppQuery<GetTempPostResponse>("public", ["temp-post"], `/posts/temp`);
};
