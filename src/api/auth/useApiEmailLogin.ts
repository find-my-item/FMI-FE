import { ApiBaseResponseType } from "../ApiBaseResponseType";
import useAppMutation from "../query/useAppMutation";

interface ApiEmailLoginType {
  email: string;
  password: string;
}

export interface EmailLoginResponseType
  extends ApiBaseResponseType<{
    userId: string;
    temporaryPassword: boolean;
  }> {}

const useApiEmailLogin = () => {
  return useAppMutation<ApiEmailLoginType, EmailLoginResponseType, EmailLoginResponseType>(
    "auth",
    "/auth/login",
    "post"
  );
};

export default useApiEmailLogin;
