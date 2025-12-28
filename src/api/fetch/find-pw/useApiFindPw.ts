import useAppMutation from "@/api/_base/query/useAppMutation";
import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { ApiFindPwType } from "@/types";

export const useApiFindPw = () => {
  return useAppMutation<ApiFindPwType, ApiBaseResponseType<null>, ApiBaseResponseType<null>>(
    "public",
    "/auth/reset/request",
    "post"
  );
};
