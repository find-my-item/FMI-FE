"use client";

import { ChatRoomHeader, EmptyChatRoom, ChatRoomMain, InputChat } from "./_components";
import { FormProvider, useForm } from "react-hook-form";
import { use, useEffect } from "react";
import useChatMessages from "@/api/fetch/chatMessage/api/useChatMessages";
import {
  useChatRoomData,
  useInitialChatPagination,
  useChatSocketMessage,
  useChatMessageSubmit,
} from "./_hooks";
import useReadMessage from "@/api/fetch/chatMessage/api/useReadMessage";

interface ChatFormValues {
  content: string;
}

const ChatRoom = ({ params }: { params: Promise<{ postId: string }> }) => {
  const { postId: postIdString } = use(params);
  const postId = Number(postIdString);

  const { roomId, chatRoomData, userInfo, postMode, unreadCount } = useChatRoomData(postId);
  const userId = Number(userInfo?.result?.userId);
  const currentUserId = userId != null ? userId : undefined;

  useChatSocketMessage(roomId, currentUserId);

  const { mutate: readMessage } = useReadMessage(roomId);
  const {
    data: chatMessages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useChatMessages(roomId, { enabled: !!roomId });

  useInitialChatPagination({
    chatMessages,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  });

  useEffect(() => {
    if (unreadCount && unreadCount > 0 && roomId) {
      readMessage(roomId);
    }
  }, [unreadCount, roomId]);

  const methods = useForm<ChatFormValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      content: "",
    },
  });

  const { onSubmit } = useChatMessageSubmit({
    roomId,
    userId,
    reset: methods.reset,
  });

  return (
    <div className="flex h-dvh flex-col overflow-hidden">
      <ChatRoomHeader chatRoom={chatRoomData} roomId={roomId} />
      <h1 className="sr-only">채팅 상세 페이지</h1>

      <div className="flex min-h-0 flex-1 flex-col">
        {chatMessages?.length !== 0 && chatMessages ? (
          <ChatRoomMain
            chatMessages={chatMessages}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
            opponentNickname={chatRoomData?.opponentUser.nickname}
          />
        ) : (
          <EmptyChatRoom postMode={postMode} />
        )}
      </div>
      {roomId && userId ? (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="px-4 pb-6 pt-3">
            <InputChat name="content" aria-label="채팅 입력창" roomId={roomId} userId={userId} />
          </form>
        </FormProvider>
      ) : null}
    </div>
  );
};

export default ChatRoom;
