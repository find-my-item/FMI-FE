import useAppMutation from "@/api/_base/query/useAppMutation";
import { useQueryClient } from "@tanstack/react-query";

const useReadMessage = (roomId: number) => {
  const queryClient = useQueryClient();

  return useAppMutation("auth", `/chats/${roomId}/read`, "patch", {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chatList"] });
      queryClient.invalidateQueries({ queryKey: ["chatRoomDetail", roomId] });
      queryClient.invalidateQueries({ queryKey: ["chatMessages", roomId] });
    },
  });
};

export default useReadMessage;
