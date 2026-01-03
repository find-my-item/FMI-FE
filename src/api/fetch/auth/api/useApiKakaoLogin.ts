import useAppMutation from "@/api/_base/query/useAppMutation";
import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";

const useApiKakaoLogin = () => {
  return useAppMutation<{ code: string }, ApiBaseResponseType<null>, ApiBaseResponseType<null>>(
    "public",
    "/auth/kakao",
    "post"
  );
};

export default useApiKakaoLogin;
