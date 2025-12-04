import useAppQuery from "@/api/query/useAppQuery";

type CheckNicknameResponseType = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: any;
};

export const useCheckNickname = (nickname: string) => {
  return useAppQuery<CheckNicknameResponseType>(
    "public",
    ["/auth/check-nickname", nickname],
    `/auth/check-nickname?nickname=${nickname}`,
    {
      enabled: !!nickname,
      retry: false,
    }
  );
};
