import useAppMutation from "@/api/_base/query/useAppMutation";
import { ApiSignUpType } from "@/api/fetch/auth/types/ApiSingUpType";
import { SignUpResponseType } from "../types/SignUpResponseType";
import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";

const useApiSignUp = () => {
  return useAppMutation<ApiSignUpType, SignUpResponseType, ApiBaseResponseType<null>>(
    "auth",
    "auth/signup",
    "post"
  );
};

export default useApiSignUp;
