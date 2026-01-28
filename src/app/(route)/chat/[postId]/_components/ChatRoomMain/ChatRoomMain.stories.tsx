import { Meta, StoryObj } from "@storybook/nextjs";
import ChatRoomMain from "./ChatRoomMain";
import { ChatMessage } from "@/api/fetch/ChatMessage/types/ChatMessageTypes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

const meta: Meta<typeof ChatRoomMain> = {
  title: "페이지/채팅 상세 페이지/ChatRoomMain",
  component: ChatRoomMain,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "채팅방의 메인 영역을 표시하는 컴포넌트입니다. 채팅 메시지 목록을 표시하고, 무한 스크롤·초기 스크롤·스크롤 보존 기능을 제공합니다.",
      },
    },
  },
  argTypes: {
    chatMessages: {
      control: "object",
      description: "채팅 메시지 목록",
    },
    hasNextPage: {
      control: "boolean",
      description: "다음 페이지 존재 여부",
    },
    isFetchingNextPage: {
      control: "boolean",
      description: "다음 페이지 로딩 중 여부",
    },
  },
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <div className="h-[600px] w-[430px] border border-gray-200">
          <Story />
        </div>
      </QueryClientProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ChatRoomMain>;

const mockChatMessages: ChatMessage[] = [
  {
    messageId: 1,
    senderId: 1,
    content: "안녕하세요!",
    messageType: "TEXT",
    createdAt: "2026-01-15T14:11:00.000Z",
    imageUrls: [],
  },
  {
    messageId: 2,
    senderId: 2,
    content: "네, 안녕하세요!",
    messageType: "TEXT",
    createdAt: "2026-01-15T14:12:00.000Z",
    imageUrls: [],
  },
];

const noop = () => {};

export const Default: Story = {
  args: {
    chatMessages: mockChatMessages,
    fetchNextPage: noop,
    hasNextPage: false,
    isFetchingNextPage: false,
  },
};

export const Empty: Story = {
  args: {
    chatMessages: [],
    fetchNextPage: noop,
    hasNextPage: false,
    isFetchingNextPage: false,
  },
};

export const WithNextPage: Story = {
  args: {
    chatMessages: mockChatMessages,
    fetchNextPage: noop,
    hasNextPage: true,
    isFetchingNextPage: false,
  },
};

export const FetchingNextPage: Story = {
  args: {
    chatMessages: mockChatMessages,
    fetchNextPage: noop,
    hasNextPage: true,
    isFetchingNextPage: true,
  },
};
