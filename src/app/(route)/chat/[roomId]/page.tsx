"use client";

import { ChatRoomHeader, EmptyChatRoom, ChatRoomMain } from "./_components";
import { InputChat } from "@/components";
import { FormProvider, useForm } from "react-hook-form";
import { ChatRoomProvider, useChatRoom } from "@/providers/ChatRoomProvider";
import { MOCK_CHAT_DATA } from "./_components/ChatRoomMain/constants/MOCK_CHAT_DATA";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ACCESS_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ6bnpudW5AZ21haWwuY29tIiwicm9sZSI6IlVTRVIiLCJ1c2VySWQiOjMsImlzcyI6ImZtaSIsImlhdCI6MTc2NjA1OTU1NCwiZXhwIjoxNzY2MDYwNDU0fQ.ekeux2B_87SKnvsHW323_0ZEJ9qeC8MeheGKkpvkx6I";

const fetchPostChats = async (postId: number) => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_URL}:8080/posts/${postId}/chats`,
    undefined,
    {
      headers: {
        Authorization: `Bearer ${ACCESS_TOKEN}`,
      },
    }
  );

  return response;
};
const useFetchPostChats = (postId: number) => {
  return useQuery({
    queryKey: ["postChats", postId],
    queryFn: () => fetchPostChats(postId),
  });
};

interface ChatFormValues {
  chatRoom: string;
}

const ChatRoom = ({ postId }: { postId: number }) => {
  const { data: postChats } = useFetchPostChats(postId);
  const methods = useForm<ChatFormValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      chatRoom: "",
    },
  });
  const { setChats } = useChatRoom();
  const isEmpty = false;
  const isPostMode: "find" | "lost" = "find";

  const onSubmit = ({ chatRoom }: ChatFormValues) => {
    if (chatRoom.trim() === "") return;
    setChats((prev) => [
      {
        sender: "me",
        text: chatRoom,
        time: "17:00",
      },
      ...prev,
    ]);
    methods.reset();
  };

  return (
    <>
      <ChatRoomHeader postMode={isPostMode} />
      {isEmpty ? <EmptyChatRoom postMode={isPostMode} /> : <ChatRoomMain />}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="px-[16px] pb-[24px] pt-[12px]">
          <InputChat name="chatRoom" aria-label="채팅 입력창" />
        </form>
      </FormProvider>
    </>
  );
};

const page = ({ params }: { params: { roomId: string } }) => {
  return (
    <ChatRoomProvider initialChats={[...MOCK_CHAT_DATA].reverse()}>
      <ChatRoom postId={Number(params.roomId)} />
    </ChatRoomProvider>
  );
};

export default page;
