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
  const isEmpty = true;
  const isPostMode: "find" | "lost" = "find";

  return (
    <>
      <ChatRoomHeader postMode={isPostMode} />
      {isEmpty ? <EmptyChatRoom postMode={isPostMode} /> : <ChatRoomMain />}
      <FormProvider {...methods}>
        <div className="px-[16px] pb-[24px] pt-[12px]">
          <InputChat name="chatRoom" />
        </div>
      </FormProvider>
    </>
  );
};

export default ChatRoom;
