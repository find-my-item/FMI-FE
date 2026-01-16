import { Meta, StoryObj } from "@storybook/nextjs";
import page from "./page";

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
  render: () => page({ params: Promise.resolve({ postId: "1" }) }),
};
