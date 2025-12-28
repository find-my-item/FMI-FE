import useAppMutation from "@/api/query/useAppMutation";
import { ApiBaseResponseType } from "@/types";

export interface CheckCodeResponseType
  extends ApiBaseResponseType<{
    verified: boolean;
  }> {}

const useApiCheckCode = () => {
  return useAppMutation<
    { email: string; code: string },
    CheckCodeResponseType,
    CheckCodeResponseType
  >("public", "/auth/email/verify", "post");
};

export default useApiCheckCode;
