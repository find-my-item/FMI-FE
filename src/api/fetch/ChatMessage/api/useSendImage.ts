import useAppMutation from "@/api/_base/query/useAppMutation";
import { SendImageRequestBody } from "../types/ChatMessageTypes";

const useSendImage = (roomId: number) => {
  return useAppMutation<SendImageRequestBody>("auth", `/chats/${roomId}/images`, "post");
};

export default useSendImage;
