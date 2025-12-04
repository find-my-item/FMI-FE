import useAppMutation from "@/api/query/useAppMutation";

type SignUpResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    id: number;
  };
};

export const useApiSignUp = () => {
  return useAppMutation<
    {
      email: string;
      password: string;
      nickname: string;
      termsOfServiceAgreed: boolean;
      privacyPolicyAgreed: boolean;
      marketingConsent: boolean;
    },
    SignUpResponse,
    SignUpResponse
  >("public", "auth/signup", "post");
};
