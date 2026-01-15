"use client";

import { ChatRoomHeader, EmptyChatRoom, ChatRoomMain } from "./_components";
import { InputChat } from "@/components/common";
import { FormProvider, useForm } from "react-hook-form";
import { ChatRoomProvider, useChatRoom } from "@/providers/ChatRoomProvider";
import { MOCK_CHAT_DATA } from "./_components/ChatRoomMain/constants/MOCK_CHAT_DATA";
import { use } from "react";
import useChatMessages from "@/api/fetch/ChatMessage/api/useChatMessages";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll/useInfiniteScroll";

interface ChatFormValues {
  content: string;
}

const ChatRoom = ({ roomId }: { roomId: number }) => {
  const methods = useForm<ChatFormValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      content: "",
    },
  });
  const { setChats } = useChatRoom();
  const isPostMode: "find" | "lost" = "find";
  const {
    data: chatMessages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useChatMessages(roomId);

  const { ref: chatMessagesRef } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });
  const onSubmit = ({ content }: ChatFormValues) => {
    if (content.trim() === "") return;
    setChats((prev) => [
      {
        sender: "me",
        text: content,
        time: "17:00",
      },
      ...prev,
    ]);
    methods.reset();
  };

  return (
    <>
      <ChatRoomHeader postMode={isPostMode} />
      <h1 className="sr-only">채팅 상세 페이지</h1>
      {chatMessages?.length === 0 ? <EmptyChatRoom postMode={isPostMode} /> : <ChatRoomMain />}
      <div ref={chatMessagesRef} className="h-[100px]" />
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="px-4 pb-6 pt-3">
          <InputChat name="content" aria-label="채팅 입력창" />
        </form>
      </FormProvider>
    </>
  );
};

const page = ({ params }: { params: Promise<{ roomId: string }> }) => {
  const { roomId } = use(params);
  return (
    <ChatRoomProvider initialChats={[...MOCK_CHAT_DATA].reverse()}>
      <ChatRoom roomId={Number(roomId)} />
    </ChatRoomProvider>
  );
};

export default page;
