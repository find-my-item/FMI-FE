import useAppMutation from "@/api/_base/query/useAppMutation";
import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { GetUsersMeResponse } from "../types/UserMeType";

export interface patchUsersMeType {
  nickname?: string;
  profileImageUrl?: string | null;
}

export const usePatchUsersMe = () => {
  return useAppMutation<patchUsersMeType, GetUsersMeResponse, ApiBaseResponseType<null>>(
    "auth",
    "/users/me",
    "patch"
  );
};
