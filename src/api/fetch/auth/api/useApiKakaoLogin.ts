import useAppMutation from "@/api/_base/query/useAppMutation";
import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";

const useApiKakaoLogin = () => {
  return useAppMutation<
    { code: string; environment: string },
    ApiBaseResponseType<{ userId: number; isTemporaryPassword: boolean }>,
    ApiBaseResponseType<null>
  >("auth", "/auth/kakao", "post");
};

export default useApiKakaoLogin;
