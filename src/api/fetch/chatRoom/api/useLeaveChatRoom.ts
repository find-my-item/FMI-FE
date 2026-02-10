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
      router.replace(`/chat`);
    },
    onError: () => {
      addToast("채팅방 나가기에 실패했어요", "error");
    },
  });
};

export default useLeaveChatRoom;
