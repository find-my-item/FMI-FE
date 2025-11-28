import useAppMutation from "@/api/query/useAppMutation";

type SignUpResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    id: number;
  };
};

export const useSignUp = () => {
  return useAppMutation<
    {
      email: string;
      password: string;
      nickname: string;
      termsOfServiceAgreed: boolean;
      privacyPolicyAgreed: boolean;
      marketingConsent: boolean;
    },
    SignUpResponse
  >("public", "auth/signup", "post");
};
