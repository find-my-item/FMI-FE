import useAppMutation from "@/api/query/useAppMutation";
import { ApiBaseResponseType } from "@/types";

const useApiSendEmail = () => {
  return useAppMutation<{ email: string }, ApiBaseResponseType<null>, ApiBaseResponseType<null>>(
    "public",
    "/auth/email/send-code",
    "post"
  );
};

export default useApiSendEmail;
