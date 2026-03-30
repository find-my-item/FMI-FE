import useAppMutation from "@/api/_base/query/useAppMutation";
import { useToast } from "@/context/ToastContext";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useLeaveChatRoom = (roomId: number) => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  if (!roomId) return { mutate: () => {} };
  return useAppMutation("auth", `/chats/${roomId}/leave`, "post", {
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chatList"] });
      queryClient.invalidateQueries({ queryKey: ["chatRoomDetail", roomId] });
      queryClient.invalidateQueries({ queryKey: ["chatMessages", roomId] });
      queryClient.invalidateQueries({ queryKey: ["chatRoom"] });

      queryClient.removeQueries({ queryKey: ["chatRoomDetail", roomId], exact: true });
      queryClient.removeQueries({ queryKey: ["chatMessages", roomId], exact: true });
      router.replace(`/chat`);
    },
    onError: () => {
      addToast("채팅방 나가기에 실패했어요", "error");
    },
  });
};

export default useLeaveChatRoom;
