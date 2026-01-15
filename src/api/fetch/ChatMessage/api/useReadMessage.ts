import useAppMutation from "@/api/_base/query/useAppMutation";

const useReadMessage = (roomId: number) => {
  return useAppMutation("auth", `/chats/${roomId}/read`, "patch");
};

export default useReadMessage;
