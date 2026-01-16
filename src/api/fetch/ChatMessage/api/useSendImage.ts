import useAppMutation from "@/api/_base/query/useAppMutation";
import { useQueryClient } from "@tanstack/react-query";

const useSendImage = (roomId: number) => {
  const queryClient = useQueryClient();
  return useAppMutation<FormData>("auth", `/chats/${roomId}/images`, "post", {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chatMessages", roomId] });
    },
  });
};

export default useSendImage;
