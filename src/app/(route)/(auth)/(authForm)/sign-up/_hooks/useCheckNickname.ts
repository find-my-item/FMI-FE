import useAppQuery from "@/api/query/useAppQuery";

export const useCheckNickname = (nickname: string) => {
  const { data, error } = useAppQuery<{
    isSuccess: boolean;
    code: string;
  }>("public", ["/auth/check-nickname", nickname], `/auth/check-nickname?nickname=${nickname}`, {
    enabled: !!nickname,
    retry: false,
  });
};
