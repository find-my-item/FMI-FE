import useAppQuery from "@/api/_base/query/useAppQuery";
import { GetUserProfileDataResponse } from "../types/UserProfileIdDataType";
import { UserTabType } from "../types/UserDataType";
import { keepPreviousData } from "@tanstack/react-query";

export const useGetUserProfileById = (userId: string | undefined, tab: UserTabType) => {
  return useAppQuery<GetUserProfileDataResponse>(
    "auth",
    ["user-data", userId, tab],
    `/users/${userId}/page?tab=${tab}`,
    {
      placeholderData: keepPreviousData,
      enabled: !!userId,
    }
  );
};
