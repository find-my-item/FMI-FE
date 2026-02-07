import { Meta, StoryObj } from "@storybook/nextjs";
import ChatRoomMain from "./ChatRoomMain";
import { ComposeInputProvider } from "@/providers/ComposeInputProvider";
import { MOCK_CHAT_DATA } from "./constants/MOCK_CHAT_DATA";

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

export const Default: Story = {
  render: () => (
    <ComposeInputProvider initialChats={MOCK_CHAT_DATA}>
      <ChatRoomMain />
    </ComposeInputProvider>
  ),
};

export const Empty: Story = {
  render: () => (
    <ComposeInputProvider initialChats={[]}>
      <ChatRoomMain />
    </ComposeInputProvider>
  ),
};
