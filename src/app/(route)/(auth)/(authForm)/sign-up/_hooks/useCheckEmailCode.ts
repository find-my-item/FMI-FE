// post

import useAppMutation from "@/api/query/useAppMutation";
import { ResponseType } from "../../types/ResponseType";

export const useCheckEmailcode = (email: string, code: string) => {
  return useAppMutation<{ email: string; code: string }, ResponseType>(
    "public",
    "/auth/email/verify",
    "post",
    {
      onSuccess: (data) => {
        console.log("data>>> ", data);
      },
      onError: (data) => {
        console.log("data>>> ", data);
      },
    }
  );
};
