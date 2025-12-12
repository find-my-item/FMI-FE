import useAppMutation from "@/api/query/useAppMutation";
import { ApiSignUpType } from "@/app/(route)/(auth)/(authForm)/types/ApiSingUpType";

export type SignUpResponse = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    id: number;
  };
};

export const useApiSignUp = () => {
  return useAppMutation<ApiSignUpType, SignUpResponse, SignUpResponse>(
    "public",
    "auth/signup",
    "post"
  );
};
