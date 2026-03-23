import useAppMutation from "@/api/_base/query/useAppMutation";
import { useQueryClient } from "@tanstack/react-query";

const useNotificationDelete = () => {
  const queryClient = useQueryClient();

  return useAppMutation(
    "auth",
    "/notifications/batch",
    "delete",
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["notificationList"] });
      },
    },
    { sendDeleteBody: true }
  );
};

export default useNotificationDelete;
