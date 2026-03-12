import useAppMutation from "@/api/_base/query/useAppMutation";
import { useQueryClient } from "@tanstack/react-query";

const useNotificationRead = () => {
  const queryClient = useQueryClient();

  return useAppMutation("auth", "/notifications/read-batch", "put", {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notificationList"] });
    },
  });
};

export default useNotificationRead;
