import useAppMutation from "@/api/query/useAppMutation";

export type SendEmailResponseType = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: any;
};

export const useSendEmail = () => {
  return useAppMutation<{ email: string }, SendEmailResponseType, SendEmailResponseType>(
    "public",
    "/auth/email/send-code",
    "post"
  );
};
