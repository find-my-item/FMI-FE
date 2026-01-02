"use client";

import { ChatRoomHeader, EmptyChatRoom, ChatRoomMain } from "./_components";
import { InputChat } from "@/components";
import { FormProvider, useForm } from "react-hook-form";
import { ChatRoomProvider, useChatRoom } from "@/providers/ChatRoomProvider";
import { MOCK_CHAT_DATA } from "./_components/ChatRoomMain/constants/MOCK_CHAT_DATA";
import { use } from "react";

interface ChatFormValues {
  chatRoom: string;
}

const ChatRoom = ({ postId }: { postId: number }) => {
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

const page = ({ params }: { params: Promise<{ roomId: string }> }) => {
  const { roomId } = use(params);
  return (
    <ChatRoomProvider initialChats={[...MOCK_CHAT_DATA].reverse()}>
      <ChatRoom postId={Number(roomId)} />
    </ChatRoomProvider>
  );
};

export default page;
