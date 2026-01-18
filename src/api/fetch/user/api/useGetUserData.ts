import useAppQuery from "@/api/_base/query/useAppQuery";
import { GetUserDataResponse } from "../types/UserDataType";

export const useGetUserData = () => {
  return useAppQuery<GetUserDataResponse>("auth", ["my-data"], `/users/me`);
};
