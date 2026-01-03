import useAppMutation from "@/api/_base/query/useAppMutation";
import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";

const useApiSendEmail = () => {
  return useAppMutation<{ email: string }, ApiBaseResponseType<null>, ApiBaseResponseType<null>>(
    "public",
    "/auth/email/send-code",
    "post"
  );
};

export default useApiSendEmail;
