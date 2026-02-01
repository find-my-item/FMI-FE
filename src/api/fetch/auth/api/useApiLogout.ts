import useAppMutation from "@/api/_base/query/useAppMutation";
import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";

const useApiLogout = () => {
  return useAppMutation<void, ApiBaseResponseType<null>, ApiBaseResponseType<null>>(
    "auth",
    "/auth/logout",
    "post"
  );
};

export default useApiLogout;
