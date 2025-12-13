import useAppMutation from "@/api/query/useAppMutation";
import { ApiBaseResponseType } from "@/types/ApiBaseResponseType";

export const ApiFindPassword = () => {
  return useAppMutation<{ email: string }, ApiBaseResponseType<null>, ApiBaseResponseType<null>>(
    "auth",
    "/auth/reset/request",
    "post"
  );
};
