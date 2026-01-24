import useAppQuery from "@/api/_base/query/useAppQuery";
import { GetUserProfileDataResponse } from "../types/UserProfileIdDataType";

export const useGetUserProfileById = (userId: string | undefined) => {
  return useAppQuery<GetUserProfileDataResponse>(
    "auth",
    ["user-data", userId],
    `/users/${userId}/page`,
    {
      enabled: !!userId,
    }
  );
};
