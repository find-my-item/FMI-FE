"use client";

import useAppMutation from "@/api/_base/query/useAppMutation";
import { BlockUserResponse } from "../types/BlockUserResponse";
import { useQueryClient } from "@tanstack/react-query";

interface DeleteBlockUserParams {
  userId: number;
}

const useDeleteBlockUser = () => {
  const queryClient = useQueryClient();

  return useAppMutation<DeleteBlockUserParams>(
    "auth",
    ({ userId }) => `reports/${userId}/block`,
    "delete",
    {
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ["user-block-list"],
        });
      },
    }
  );
};

export default useDeleteBlockUser;
