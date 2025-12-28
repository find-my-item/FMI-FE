import useAppMutation from "@/api/_base/query/useAppMutation";
import { CheckCodeResponseType } from "../types/CheckCodeResponseType";

const useApiCheckCode = () => {
  return useAppMutation<
    { email: string; code: string },
    CheckCodeResponseType,
    CheckCodeResponseType
  >("public", "/auth/email/verify", "post");
};

export default useApiCheckCode;
