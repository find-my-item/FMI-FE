import useAppMutation from "@/api/query/useAppMutation";

type CheckCodeResponseType = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    verified: boolean;
  };
};

export const useCheckCode = () => {
  return useAppMutation<{ email: string; code: string }, CheckCodeResponseType>(
    "public",
    "/auth/email/verify",
    "post"
  );
};
