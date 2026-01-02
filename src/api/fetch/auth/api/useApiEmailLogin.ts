import useAppMutation from "@/api/_base/query/useAppMutation";
import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";

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
    "auth/login",
    "post"
  );
};

export default useApiEmailLogin;
