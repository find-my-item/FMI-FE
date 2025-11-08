"use client";

import { ChatRoomHeader, EmptyChatRoom, ChatRoomMain } from "./_components";
import { InputChat } from "@/components";
import { FormProvider, useForm } from "react-hook-form";
import { MOCK_CHAT_DATA } from "./_components/ChatRoomMain/_constants/MOCK_CHAT_DATA";
import { useState } from "react";

type ChatFormValues = {
  chatRoom: string;
};

const ChatRoom = () => {
  const methods = useForm<ChatFormValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      chatRoom: "",
    },
  });
  const [chats, setChats] = useState(() => [...MOCK_CHAT_DATA].reverse());
  const isEmpty = false;
  const isPostMode: "find" | "lost" = "find";

  const onSubmit = ({ chatRoom }: ChatFormValues) => {
    if (chatRoom.trim() === "") return;
    setChats((prev) => [{ sender: "me", text: chatRoom, time: "17:00" }, ...prev]);
    methods.reset();
  };

  return (
    <>
      <ChatRoomHeader postMode={isPostMode} />
      {isEmpty ? <EmptyChatRoom postMode={isPostMode} /> : <ChatRoomMain chats={chats} />}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="px-[16px] pb-[24px] pt-[12px]">
          <InputChat name="chatRoom" aria-label="채팅 입력창" />
        </form>
      </FormProvider>
    </>
  );
};

export default ChatRoom;
