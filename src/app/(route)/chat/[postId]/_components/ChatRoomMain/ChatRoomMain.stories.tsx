import { Meta, StoryObj } from "@storybook/nextjs";
import ChatRoomMain from "./ChatRoomMain";
import { ChatMessage } from "@/api/fetch/ChatMessage/types/ChatMessageTypes";

const meta: Meta<typeof ChatRoomMain> = {
  title: "페이지/채팅 상세 페이지/ChatRoomMain",
  component: ChatRoomMain,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component:
          "채팅방의 메인 영역을 표시하는 컴포넌트입니다. 채팅 메시지 목록을 역순으로 표시하고, 자동 스크롤 기능을 제공합니다.",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="h-[600px] w-[430px] border border-gray-200">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ChatRoomMain>;

const mockChatMessages: ChatMessage[] = [
  {
    messageId: 1,
    roomId: 1,
    senderId: 1,
    content: "안녕하세요!",
    messageType: "TEXT",
    createdAt: "2026-01-15T14:11:00.000Z",
    imageUrls: [],
  },
  {
    messageId: 2,
    roomId: 1,
    senderId: 2,
    content: "네, 안녕하세요!",
    messageType: "TEXT",
    createdAt: "2026-01-15T14:12:00.000Z",
    imageUrls: [],
  },
];

const mockRef = { current: null };

export const Default: Story = {
  render: () => <ChatRoomMain chatMessages={mockChatMessages} chatMessagesRef={mockRef} />,
};

export const Empty: Story = {
  render: () => <ChatRoomMain chatMessages={[]} chatMessagesRef={mockRef} />,
};
