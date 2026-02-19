import useAppMutation from "@/api/_base/query/useAppMutation";
import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { GetUsersMeResponse } from "../types/UserMeType";

export const usePatchUsersMe = () => {
  return useAppMutation<{ nickname: string }, GetUsersMeResponse, ApiBaseResponseType<null>>(
    "auth",
    "/users/me",
    "patch"
  );
};
