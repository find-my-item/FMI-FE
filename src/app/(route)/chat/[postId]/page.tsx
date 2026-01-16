"use client";

import { ChatRoomHeader, EmptyChatRoom, ChatRoomMain } from "./_components";
import { InputChat } from "@/components/common";
import { FormProvider, useForm } from "react-hook-form";
import { use } from "react";
import useChatMessages from "@/api/fetch/ChatMessage/api/useChatMessages";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll/useInfiniteScroll";
import { sendChatSocketMessage, useChatSocket } from "@/api/fetch/chatRoom";
import { useQueryClient, InfiniteData } from "@tanstack/react-query";
import { ChatMessage } from "@/api/fetch/ChatMessage/types/ChatMessageTypes";
import { ApiBaseResponseType } from "@/api/_base/types/ApiBaseResponseType";
import { ChatMessageResponse } from "@/api/fetch/ChatMessage/types/ChatMessageTypes";
import useChatRoom from "@/api/fetch/chatRoom/api/useChatRoom";

interface ChatFormValues {
  content: string;
}

const ChatRoom = ({ postId }: { postId: number }) => {
  const queryClient = useQueryClient();
  const methods = useForm<ChatFormValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      content: "",
    },
  });
  const { data: chatRoom } = useChatRoom({ postId });

  const roomId = chatRoom?.result.roomId;
  const isPostMode: "find" | "lost" =
    chatRoom?.result.postInfo.postType === "FOUND" ? "find" : "lost";

  const {
    data: chatMessages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useChatMessages(roomId ?? 0, { enabled: !!roomId });
  useChatSocket({
    onMessage: (message) => {
      if (!roomId) return;

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
    if (content.trim() === "" || !roomId) return;
    sendChatSocketMessage(`/app/chats/${roomId}/send`, {
      content,
    });
    methods.reset();
  };

  return (
    <div className="flex h-[calc(100dvh-48px)] flex-col overflow-hidden">
      <ChatRoomHeader chatRoom={chatRoom?.result} />
      <h1 className="sr-only">채팅 상세 페이지</h1>

      <div className="flex min-h-0 flex-1 flex-col">
        {chatMessages?.length !== 0 && chatMessages ? (
          <ChatRoomMain chatMessages={chatMessages} chatMessagesRef={chatMessagesRef} />
        ) : (
          <EmptyChatRoom postMode={isPostMode} />
        )}
      </div>
      {roomId && (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="px-4 pb-6 pt-3">
            <InputChat name="content" aria-label="채팅 입력창" roomId={roomId} />
          </form>
        </FormProvider>
      )}
    </div>
  );
};

const page = ({ params }: { params: Promise<{ postId: string }> }) => {
  const { postId } = use(params);
  return <ChatRoom postId={Number(postId)} />;
};

export default page;
