import { MypagePostsResponseType } from "../types/MypagePostsResponseType";
import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import useAppQuery from "@/api/_base/query/useAppQuery";

interface GetMypagePostsType {
  cursor?: number;
  size?: number;
}

export const useGetUsersMePosts = ({ cursor, size }: GetMypagePostsType) => {
  const queryParams = new URLSearchParams();

  if (cursor !== undefined) queryParams.append("cursor", cursor.toString());
  if (size !== undefined) queryParams.append("size", size.toString());

  const queryPath = `/users/me/posts?${queryParams.toString()}`;

  return useAppQuery<MypagePostsResponseType, ApiBaseResponseType<null>>(
    "auth",
    ["/users/me/posts", cursor, size],
    queryPath
  );
};
