import useAppMutation from "@/api/_base/query/useAppMutation";
import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";

interface ApiPostVerifyPasswordType {
  currentPassword: string;
}

export const usePostVerifyPassword = () => {
  return useAppMutation<ApiPostVerifyPasswordType, ApiBaseResponseType<string>>(
    "auth",
    "/users/me/password/verify",
    "post"
  );
};
