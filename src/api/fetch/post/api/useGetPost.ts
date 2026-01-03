import { GetListResponse } from "../types/PostItemType";
import useAppQuery from "@/api/_base/query/useAppQuery";

export const useGetPost = ({ page, size, type }: { page: number; size: number; type?: string }) => {
  return useAppQuery<GetListResponse>(
    "public",
    ["post", page, size, type],
    `/post/?type=${type}&page=${page}&size=${size}`
  );
};
