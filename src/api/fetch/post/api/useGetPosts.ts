/**
 * [SUSPENSE 테스트용] 정상 작동 확인 후 롤백 예정
 */
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
    { suspense: true } // [SUSPENSE 테스트용] 롤백 시 제거
  );
};
