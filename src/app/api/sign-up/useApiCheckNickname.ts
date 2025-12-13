import useAppQuery from "@/api/query/useAppQuery";
import { ApiBaseResponseType } from "@/types";

export const useCheckNickname = (nickname: string) => {
  return useAppQuery<ApiBaseResponseType<null>, ApiBaseResponseType<null>>(
    "public",
    ["/auth/check-nickname", nickname],
    `/auth/check-nickname?nickname=${nickname}`,
    {
      enabled: !!nickname,
      retry: false,
    }
  );
};
