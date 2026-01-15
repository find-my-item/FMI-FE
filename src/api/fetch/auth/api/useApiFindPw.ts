import useAppMutation from "@/api/_base/query/useAppMutation";
import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { ApiFindPwType } from "../types/ApiFindPwType";

const useApiFindPw = () => {
  return useAppMutation<ApiFindPwType, ApiBaseResponseType<null>, ApiBaseResponseType<null>>(
    "public",
    "/auth/reset/request",
    "post"
  );
};

export default useApiFindPw;
