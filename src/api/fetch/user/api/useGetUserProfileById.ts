import useAppQuery from "@/api/_base/query/useAppQuery";
import { GetUserProfileDataResponse } from "../types/UserProfileIdDataType";
import { UserTabType } from "../types/UserDataType";

export const useGetUserProfileById = (userId: string | undefined, tab: UserTabType) => {
  return useAppQuery<GetUserProfileDataResponse>(
    "auth",
    ["user-data", userId],
    `/users/${userId}/page?tab=${tab}`,
    {
      enabled: !!userId || !!tab,
    }
  );
};
