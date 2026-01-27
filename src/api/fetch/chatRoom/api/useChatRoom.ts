import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { ChatRoomResponse } from "../types/ChatRoomType";
import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import useAxios from "@/api/_base/axios/useAxios";

const useChatRoom = ({ postId, enabled = true }: { postId: number; enabled?: boolean }) => {
  const axios = useAxios("auth");
  return useQuery<ApiBaseResponseType<ChatRoomResponse>, ChatRoomResponse>({
    queryKey: ["chatRoom", postId],
    queryFn: async () => {
      const { data } = await axios.post<ApiBaseResponseType<ChatRoomResponse>>(
        `/posts/${postId}/chats`
      );
      return data;
    },
    enabled,
    retry: 1,
    refetchOnWindowFocus: false,
    staleTime: 1000 * 60,
  });
};

export default useChatRoom;
