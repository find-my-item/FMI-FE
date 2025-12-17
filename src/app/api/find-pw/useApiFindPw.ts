import useAppMutation from "@/api/query/useAppMutation";
import { ApiBaseResponseType } from "@/api/ApiBaseResponseType";

export const useApiFindPw = () => {
  return useAppMutation<{ email: string }, ApiBaseResponseType<null>, ApiBaseResponseType<null>>(
    "public",
    "/auth/reset/request",
    "post"
  );
};
