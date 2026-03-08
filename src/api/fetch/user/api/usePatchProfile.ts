import useAppMutation from "@/api/_base/query/useAppMutation";
import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { GetUsersMeResponse } from "../types/UserMeType";

export const usePatchProfile = (deleteProfileImage?: boolean) => {
  return useAppMutation<FormData, GetUsersMeResponse, ApiBaseResponseType<null>>(
    "auth",
    `/users/me?deleteProfileImage=${deleteProfileImage}`,
    "patch"
  );
};
