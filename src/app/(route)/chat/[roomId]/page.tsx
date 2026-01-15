"use client";

import { ChatRoomHeader, EmptyChatRoom, ChatRoomMain } from "./_components";
import { InputChat } from "@/components/common";
import { FormProvider, useForm } from "react-hook-form";
import { ChatRoomProvider } from "@/providers/ChatRoomProvider";
import { MOCK_CHAT_DATA } from "./_components/ChatRoomMain/constants/MOCK_CHAT_DATA";
import { use } from "react";
import useChatMessages from "@/api/fetch/ChatMessage/api/useChatMessages";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll/useInfiniteScroll";
import { sendChatSocketMessage, useChatSocket } from "@/api/fetch/chatRoom";
import { useQueryClient, InfiniteData } from "@tanstack/react-query";
import { ChatMessage } from "@/api/fetch/ChatMessage/types/ChatMessageTypes";
import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { ChatMessageResponse } from "@/api/fetch/ChatMessage/types/ChatMessageTypes";

interface ChatFormValues {
  content: string;
}

const ChatRoom = ({ roomId }: { roomId: number }) => {
  const queryClient = useQueryClient();
  const methods = useForm<ChatFormValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      content: "",
    },
  });
  const isPostMode: "find" | "lost" = "find";
  const {
    data: chatMessages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useChatMessages(roomId);
  useChatSocket({
    onMessage: (message) => {
      const oldData = queryClient.getQueryData<
        InfiniteData<ApiBaseResponseType<ChatMessageResponse>>
      >(["chatMessages", roomId]);

      if (!oldData) return;

      const firstPage = oldData.pages[0];
      if (!firstPage) return;

      const existingMessages = firstPage.result.messages;
      const messageExists = existingMessages.some(
        (m: ChatMessage) => m.messageId === message.messageId
      );
      if (messageExists) return;

      const chatMessage: ChatMessage = {
        ...message,
        imageUrls: (message as any).imageUrls || [],
      };

      queryClient.setQueryData<InfiniteData<ApiBaseResponseType<ChatMessageResponse>>>(
        ["chatMessages", roomId],
        {
          ...oldData,
          pages: [
            {
              ...firstPage,
              result: {
                ...firstPage.result,
                messages: [chatMessage, ...firstPage.result.messages],
              },
            },
            ...oldData.pages.slice(1),
          ],
        }
      );
    },
  });
  const { ref: chatMessagesRef } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });
  const onSubmit = ({ content }: ChatFormValues) => {
    if (content.trim() === "") return;
    sendChatSocketMessage(`/app/chats/${roomId}/send`, {
      content,
    });
    methods.reset();
  };

  return (
    <div className="flex h-[calc(100dvh-48px)] flex-col overflow-hidden">
      <ChatRoomHeader postMode={isPostMode} />
      <h1 className="sr-only">채팅 상세 페이지</h1>

      <div className="flex min-h-0 flex-1 flex-col">
        {chatMessages?.length !== 0 && chatMessages ? (
          <ChatRoomMain chatMessages={chatMessages} />
        ) : (
          <EmptyChatRoom postMode={isPostMode} />
        )}
      </div>
      {/* <div ref={chatMessagesRef} className="h-[100px]" /> */}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="px-4 pb-6 pt-3">
          <InputChat name="content" aria-label="채팅 입력창" />
        </form>
      </FormProvider>
    </div>
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
