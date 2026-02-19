import useAppMutation from "@/api/_base/query/useAppMutation";
import { GetUsersMeResponse } from "../types/UserMeType";
import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";

export const usePatchUserProfileImg = () => {
  return useAppMutation<{ profileImageUrl: string }, GetUsersMeResponse, ApiBaseResponseType<null>>(
    "auth",
    "/users/me/profile-image",
    "patch"
  );
};
