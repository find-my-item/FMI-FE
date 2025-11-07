"use client";

import { ChatRoomHeader, EmptyChatRoom } from "./_components";
import { InputChat } from "@/components";
import { FormProvider, useForm } from "react-hook-form";
import ChatRoomMain from "./_components/ChatRoomMain/ChatRoomMain";

const ChatRoom = () => {
  const methods = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });
  const isEmpty = false;

  return (
    <>
      <ChatRoomHeader />
      {isEmpty ? <EmptyChatRoom /> : <ChatRoomMain />}
      <FormProvider {...methods}>
        <div className="px-[16px] pb-[24px] pt-[12px]">
          <InputChat name="chatRoom" />
        </div>
      </FormProvider>
    </>
  );
};

export default ChatRoom;
