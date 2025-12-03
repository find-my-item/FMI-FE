import { Meta, StoryObj } from "@storybook/nextjs";
import page from "./page";
import { ChatRoomProvider } from "@/providers/ChatRoomProvider";
import { MOCK_CHAT_DATA } from "./_components/ChatRoomMain/constants/MOCK_CHAT_DATA";
import { ChatRoomHeader, EmptyChatRoom, ChatRoomMain } from "./_components";
import { InputChat } from "@/components";
import { FormProvider, useForm } from "react-hook-form";
import { useChatRoom } from "@/providers/ChatRoomProvider";

interface ChatFormValues {
  chatRoom: string;
}

const ChatRoom = ({
  isEmpty = false,
  postMode = "find" as "find" | "lost",
}: {
  isEmpty?: boolean;
  postMode?: "find" | "lost";
}) => {
  const methods = useForm<ChatFormValues>({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues: {
      chatRoom: "",
    },
  });
  const { setChats } = useChatRoom();

  const onSubmit = ({ chatRoom }: ChatFormValues) => {
    if (chatRoom.trim() === "") return;
    setChats((prev) => [
      {
        sender: "me",
        text: chatRoom,
        time: "17:00",
      },
      ...prev,
    ]);
    methods.reset();
  };

  return (
    <>
      <ChatRoomHeader postMode={postMode} />
      {isEmpty ? <EmptyChatRoom postMode={postMode} /> : <ChatRoomMain />}
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} className="px-[16px] pb-[24px] pt-[12px]">
          <InputChat name="chatRoom" aria-label="채팅 입력창" />
        </form>
      </FormProvider>
    </>
  );
};

const meta: Meta<typeof page> = {
  title: "페이지/채팅 상세 페이지/ChatRoomPage",
  component: page,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "채팅방 페이지입니다. 채팅 메시지를 확인하고 새로운 메시지를 보낼 수 있습니다.",
      },
    },
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/chat/123",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="flex h-[844px] w-[390px] flex-col overflow-hidden border border-gray-200">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof page>;

export const Default: Story = {
  render: () => (
    <ChatRoomProvider initialChats={[...MOCK_CHAT_DATA].reverse()}>
      <ChatRoom isEmpty={false} postMode="find" />
    </ChatRoomProvider>
  ),
};

export const Empty: Story = {
  render: () => (
    <ChatRoomProvider initialChats={[]}>
      <ChatRoom isEmpty={true} postMode="find" />
    </ChatRoomProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: "채팅 메시지가 없는 빈 채팅방 상태입니다.",
      },
    },
  },
};

export const LostMode: Story = {
  render: () => (
    <ChatRoomProvider initialChats={[...MOCK_CHAT_DATA].reverse()}>
      <ChatRoom isEmpty={false} postMode="lost" />
    </ChatRoomProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: "습득물 모드의 채팅방입니다.",
      },
    },
  },
};

export const EmptyLostMode: Story = {
  render: () => (
    <ChatRoomProvider initialChats={[]}>
      <ChatRoom isEmpty={true} postMode="lost" />
    </ChatRoomProvider>
  ),
  parameters: {
    docs: {
      description: {
        story: "습득물 모드의 빈 채팅방 상태입니다.",
      },
    },
  },
};
