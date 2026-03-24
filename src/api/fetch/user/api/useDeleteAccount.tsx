import useAppMutation from "@/api/_base/query/useAppMutation";
import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { DeleteAccountType } from "../types/DeleteAccountType";

export const useDeleteAccount = () => {
  return useAppMutation<DeleteAccountType, ApiBaseResponseType<null>, ApiBaseResponseType<null>>(
    "auth",
    "/users/me",
    "delete",
    undefined,
    { sendDeleteBody: true }
  );
};
