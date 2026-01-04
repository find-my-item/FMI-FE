import useAppMutation from "@/api/_base/query/useAppMutation";
import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";

interface ApiEmailLoginType {
  email: string;
  password: string;
}

interface EmailLoginResponseType
  extends ApiBaseResponseType<{
    userId: string;
    temporaryPassword: boolean;
  }> {}

const useApiEmailLogin = () => {
  return useAppMutation<
    ApiEmailLoginType,
    EmailLoginResponseType,
    { response: { data: { isSuccess: boolean; code: string; message: string } } }
  >("auth", "auth/login", "post");
};

export default useApiEmailLogin;
