import useAppQuery from "@/api/_base/query/useAppQuery";
import { GetUserDataResponse } from "../types/UserDataType";

export const useGetUserProfileById = (userId: string | undefined) => {
  return useAppQuery<GetUserDataResponse>("auth", ["user-data", userId], `/users/${userId}/page`, {
    enabled: !!userId,
  });
};
