import useAppQuery from "@/api/query/useAppQuery";

export const useCheckNickname = (nickname: string) => {
  return useAppQuery<{
    isSuccess: boolean;
    code: string;
  }>("public", ["/auth/check-nickname", nickname], `/auth/check-nickname?nickname=${nickname}`, {
    enabled: !!nickname,
    retry: false,
  });
};
