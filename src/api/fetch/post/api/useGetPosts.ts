import { GetListResponse } from "../types/PostItemType";
import useAppQuery from "@/api/_base/query/useAppQuery";

export const useGetPosts = ({
  page,
  size,
  type,
}: {
  page: number;
  size: number;
  type?: string;
}) => {
  return useAppQuery<GetListResponse>(
    "public",
    ["posts", page, size, type],
    `/posts?type=${type}&page=${page}&size=${size}`,
    { throwOnError: true }
    // TODO(지권): suspense 추가 필요
  );
};
