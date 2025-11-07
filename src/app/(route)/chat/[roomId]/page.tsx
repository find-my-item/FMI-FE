"use client";

import EmptyChatRoom from "./_components/EmptyChatRoom/EmptyChatRoom";
import { InputChat } from "@/components";
import { FormProvider, useForm } from "react-hook-form";

const ChatRoom = () => {
  const methods = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
  });

  return (
    <>
      <EmptyChatRoom />
      <FormProvider {...methods}>
        <div className="px-[16px] pb-[24px] pt-[12px]">
          <InputChat name="chatRoom" />
        </div>
      </FormProvider>
    </>
  );
};

export default ChatRoom;
