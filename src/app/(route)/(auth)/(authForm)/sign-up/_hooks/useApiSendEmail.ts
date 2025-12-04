import useAppMutation from "@/api/query/useAppMutation";

type SendEmailResponseType = {
  isSuccess: boolean;
  code: string;
  message: string;
};

export const useSendEmail = () => {
  return useAppMutation<{ email: string }, SendEmailResponseType, SendEmailResponseType>(
    "public",
    "/auth/email/send-code",
    "post"
  );
};
