import useAppMutation from "@/api/query/useAppMutation";
import { ApiBaseResponseType } from "@/api/ApiBaseResponseType";
import { ApiFindPwType } from "@/types";

export const useApiFindPw = () => {
  return useAppMutation<ApiFindPwType, ApiBaseResponseType<null>, ApiBaseResponseType<null>>(
    "public",
    "/auth/reset/request",
    "post"
  );
};
