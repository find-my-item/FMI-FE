import useAppMutation from "@/api/query/useAppMutation";

export type CheckCodeResponseType = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    verified: boolean;
  };
};

export const useCheckCode = () => {
  return useAppMutation<
    { email: string; code: string },
    CheckCodeResponseType,
    CheckCodeResponseType
  >("public", "/auth/email/verify", "post");
};
