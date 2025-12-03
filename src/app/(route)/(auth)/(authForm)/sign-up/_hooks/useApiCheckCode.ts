// post

import useAppMutation from "@/api/query/useAppMutation";
import { ResponseType } from "../../types/ResponseType";

export const useCheckCode = () => {
  return useAppMutation<{ email: string; code: string }, ResponseType>(
    "public",
    "/auth/email/verify",
    "post"
  );
};
