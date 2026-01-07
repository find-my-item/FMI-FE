import useAppMutation from "@/api/_base/query/useAppMutation";
import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";

const useApiTokenRefresh = () => {
  return useAppMutation<
    undefined,
    ApiBaseResponseType<{ userId: number; temporaryPassword: boolean }>,
    ApiBaseResponseType<null>
  >("auth", "/auth/refresh", "post");
};

export default useApiTokenRefresh;
