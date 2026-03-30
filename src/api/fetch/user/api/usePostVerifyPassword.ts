import useAppMutation from "@/api/_base/query/useAppMutation";
import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { AxiosError } from "axios";

interface ApiPostVerifyPasswordType {
  currentPassword: string;
}

export const usePostVerifyPassword = () => {
  return useAppMutation<
    ApiPostVerifyPasswordType,
    ApiBaseResponseType<string>,
    AxiosError<ApiBaseResponseType<null>>
  >("auth", "/users/me/password/verify", "post");
};
