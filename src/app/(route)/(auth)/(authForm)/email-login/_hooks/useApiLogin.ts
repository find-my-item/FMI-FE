import useAppMutation from "@/api/query/useAppMutation";

type ApiLoginResType = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: {
    userId: number;
    accessToken: string;
    temporaryPassword: boolean;
  };
};

export const useApiLogin = () => {
  return useAppMutation<{ email: string; password: string }, ApiLoginResType, ApiLoginResType>(
    "auth",
    "/auth/login",
    "post"
  );
};
