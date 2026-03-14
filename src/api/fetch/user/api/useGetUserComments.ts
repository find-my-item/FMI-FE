import useAppInfiniteQuery from "@/api/_base/query/useAppInfiniteQuery";
import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { UserMeCommentsResponse } from "../types/UserMeCommentsType";
import { useSearchParams } from "next/navigation";

export const useGetUserComments = () => {
  const params = useSearchParams();

  return useAppInfiniteQuery<UserMeCommentsResponse, ApiBaseResponseType<null>>(
    "auth",
    ["/users/me/comments"],
    `/users/me/comments`,
    {}
  );
};
