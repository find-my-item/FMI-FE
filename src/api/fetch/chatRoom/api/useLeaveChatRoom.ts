import useAppMutation from "@/api/_base/query/useAppMutation";

const useLeaveChatRoom = (roomId: number) => {
  return useAppMutation("auth", `/chats/${roomId}/leave`, "post");
};

export default useLeaveChatRoom;
