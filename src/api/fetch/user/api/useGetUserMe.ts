import useAppQuery from "@/api/_base/query/useAppQuery";
import { GetUserMeResponse } from "../types/UserMeType";

export const useGetUserMe = () => {
  return useAppQuery<GetUserMeResponse>("auth", ["user", "me"], "/user/me");
};
