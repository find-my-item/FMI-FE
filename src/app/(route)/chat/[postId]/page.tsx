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
import { WebSocketChatMessage } from "@/api/fetch/chatRoom/types/ChatRoomType";
import useAppQuery from "@/api/_base/query/useAppQuery";
import {
  addMessageToCache,
  replaceMessageInCache,
} from "@/utils/chatMessageCache/chatMessageCache";

interface ChatFormValues {
  content: string;
}

interface UserInfoResponse {
  userId: number;
  nickname: string;
  email: string;
  emailVerified: boolean;
  profileImg: string;
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
  const { data: userInfo } = useAppQuery<ApiBaseResponseType<UserInfoResponse>>(
    "auth",
    ["userInfo"],
    `/users/me`
  );

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

      const firstPage = oldData?.pages[0];
      if (!firstPage) return;

      const { roomId: _, ...chatMessageData } = message;
      const chatMessage: ChatMessage = {
        ...chatMessageData,
        imageUrls: message.imageUrls || [],
      };

      const optimisticMessage = firstPage.result.messages.find(
        (m) =>
          m.messageId < 0 &&
          ((m.messageType === "TEXT" &&
            m.content === message.content &&
            m.senderId === message.senderId) ||
            (m.messageType === "IMAGE" &&
              m.imageUrls.length === message.imageUrls?.length &&
              m.senderId === message.senderId))
      );

      if (optimisticMessage) {
        replaceMessageInCache(queryClient, roomId, optimisticMessage.messageId, chatMessage);
      } else {
        const messageExists = firstPage.result.messages.some(
          (m: ChatMessage) => m.messageId === message.messageId
        );
        if (!messageExists) {
          addMessageToCache(queryClient, roomId, chatMessage);
        }
      }
    },
  });
  const { ref: chatMessagesRef } = useInfiniteScroll({
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  });
  const onSubmit = ({ content }: ChatFormValues) => {
    if (content.trim() === "" || !roomId || !userInfo?.result.userId) return;

    const optimisticMessage: ChatMessage = {
      messageId: -Date.now(),
      messageType: "TEXT",
      senderId: userInfo.result.userId,
      content,
      imageUrls: [],
      createdAt: new Date().toISOString(),
    };

    addMessageToCache(queryClient, roomId, optimisticMessage);
    sendChatSocketMessage(`/app/chats/${roomId}/send`, { content });
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
      {roomId && userInfo?.result.userId && (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="px-4 pb-6 pt-3">
            <InputChat
              name="content"
              aria-label="채팅 입력창"
              roomId={roomId}
              userId={userInfo.result.userId}
            />
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
