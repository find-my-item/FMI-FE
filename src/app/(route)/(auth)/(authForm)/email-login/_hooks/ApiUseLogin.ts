import useAppMutation from "@/api/query/useAppMutation";

type useLoginResType = {
  isSuccess: boolean;
  code: string;
  message: string;
  result: string;
};

export const ApiUseLogin = () => {
  return useAppMutation<{ email: string; password: string }, useLoginResType>(
    "public",
    "/auth/login",
    "post"
  );
};
