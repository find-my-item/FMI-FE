import useAppMutation from "../query/useAppMutation";
import { ApiBaseResponseType } from "../ApiBaseResponseType";

export interface TokenRefreshResponseType
  extends ApiBaseResponseType<{
    userId: string;
    temporaryPassword: boolean;
  }> {}

const useApiTokenRefresh = () => {
  return useAppMutation<null, TokenRefreshResponseType, TokenRefreshResponseType>(
    "auth",
    "/auth/refresh",
    "post"
  );
};

export default useApiTokenRefresh;
