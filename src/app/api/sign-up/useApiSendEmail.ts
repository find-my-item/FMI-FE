import useAppMutation from "@/api/query/useAppMutation";
import { ApiBaseResponseType } from "@/types";

export const useSendEmail = () => {
  return useAppMutation<{ email: string }, ApiBaseResponseType<null>, ApiBaseResponseType<null>>(
    "public",
    "/auth/email/send-code",
    "post"
  );
};
