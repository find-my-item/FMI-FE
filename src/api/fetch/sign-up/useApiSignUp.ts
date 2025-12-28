import useAppMutation from "@/api/_base/query/useAppMutation";
import { ApiSignUpType } from "@/app/(route)/sign-up/types/ApiSingUpType";
import { ApiBaseResponseType } from "@/types";

interface SignUpResponseType extends ApiBaseResponseType<{ id: string }> {}

export const useApiSignUp = () => {
  return useAppMutation<ApiSignUpType, SignUpResponseType, SignUpResponseType>(
    "public",
    "auth/signup",
    "post"
  );
};
