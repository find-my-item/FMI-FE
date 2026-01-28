"use client";

import { ChatRoomHeader, EmptyChatRoom, ChatRoomMain } from "./_components";
import { InputChat } from "@/components/common";
import { FormProvider, useForm } from "react-hook-form";
import { use } from "react";
import useChatMessages from "@/api/fetch/ChatMessage/api/useChatMessages";
import {
  useChatRoomData,
  useInitialChatPagination,
  useChatSocketMessage,
  useChatMessageSubmit,
} from "./_hooks";

interface ChatFormValues {
  content: string;
}

const ChatRoom = ({ params }: { params: Promise<{ postId: string }> }) => {
  const { postId: postIdString } = use(params);
  const postId = Number(postIdString);

  const methods = useForm<ChatFormValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      content: "",
    },
  });

  const { roomId, chatRoomData, userInfo, postMode } = useChatRoomData(postId);

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

  useChatSocketMessage(roomId);

  const { onSubmit } = useChatMessageSubmit({
    roomId,
    userId: Number(userInfo?.result.userId),
    reset: methods.reset,
  });

  return (
    <div className="flex h-[calc(100dvh-48px)] flex-col overflow-hidden">
      <ChatRoomHeader chatRoom={chatRoomData} />
      <h1 className="sr-only">채팅 상세 페이지</h1>

      <div className="flex min-h-0 flex-1 flex-col">
        {chatMessages?.length !== 0 && chatMessages ? (
          <ChatRoomMain
            chatMessages={chatMessages}
            fetchNextPage={fetchNextPage}
            hasNextPage={hasNextPage}
            isFetchingNextPage={isFetchingNextPage}
          />
        ) : (
          <EmptyChatRoom postMode={postMode} />
        )}
      </div>
      {roomId && userInfo?.result.userId && (
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)} className="px-4 pb-6 pt-3">
            <InputChat
              name="content"
              aria-label="채팅 입력창"
              roomId={roomId}
              userId={Number(userInfo.result.userId)}
            />
          </form>
        </FormProvider>
      )}
    </div>
  );
};

export default ChatRoom;
