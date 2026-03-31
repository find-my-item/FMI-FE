import useAppMutation from "@/api/_base/query/useAppMutation";
import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { DeleteAccountType } from "../types/DeleteAccountType";
import { useQueryClient } from "@tanstack/react-query";

export const useDeleteAccount = () => {
  const queryClient = useQueryClient();

  return useAppMutation<DeleteAccountType, ApiBaseResponseType<null>, ApiBaseResponseType<null>>(
    "auth",
    "/users/me",
    "delete",
    undefined,
    { sendDeleteBody: true }
  );
};
