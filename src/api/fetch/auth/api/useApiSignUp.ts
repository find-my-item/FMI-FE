import useAppMutation from "@/api/_base/query/useAppMutation";
import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { ApiSignUpType } from "@/api/fetch/auth/types/ApiSingUpType";

interface SignUpResponseType extends ApiBaseResponseType<{ id: string }> {}

const useApiSignUp = () => {
  return useAppMutation<ApiSignUpType, SignUpResponseType, SignUpResponseType>(
    "public",
    "auth/signup",
    "post"
  );
};

export default useApiSignUp;
