import useAppQuery from "@/api/_base/query/useAppQuery";
import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { GetUsersMeResponse } from "../types/UserMeType";

export const useGetUsersMe = (hasToken: boolean) => {
  return useAppQuery<GetUsersMeResponse, ApiBaseResponseType<null>>(
    "auth",
    ["user-me"],
    "/users/me",
    {
      enabled: hasToken,
    }
  );
};
