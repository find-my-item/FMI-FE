import useAppMutation from "@/api/_base/query/useAppMutation";
import { useQueryClient } from "@tanstack/react-query";

const useNotificationDeleteAll = () => {
  const queryClient = useQueryClient();

  return useAppMutation("auth", "/notifications/all", "delete", {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notificationList"] });
    },
  });
};

export default useNotificationDeleteAll;
