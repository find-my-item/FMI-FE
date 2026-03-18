import useAppMutation from "@/api/_base/query/useAppMutation";
import { useToast } from "@/context/ToastContext";
import { useQueryClient } from "@tanstack/react-query";

const useNotificationRead = () => {
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useAppMutation("auth", "/notifications/read-batch", "put", {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notificationList"] });
    },
    onError: () => {
      addToast("알림을 읽지 못했어요", "error");
    },
  });
};

export default useNotificationRead;
