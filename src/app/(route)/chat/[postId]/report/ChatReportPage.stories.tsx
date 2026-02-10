import { Meta, StoryObj } from "@storybook/nextjs";
import ChatReportPage from "./page";
import { ToastProvider } from "@/providers/ToastProviders";

const meta: Meta<typeof ChatReportPage> = {
  title: "페이지/채팅 신고 페이지/ChatReportPage",
  component: ChatReportPage,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "채팅방 신고 페이지입니다. 신고 사유를 선택하고 신고 내용을 입력할 수 있습니다.",
      },
    },
    nextjs: {
      appDirectory: true,
      navigation: {
        pathname: "/chat/123/report",
      },
    },
  },
  decorators: [
    (Story) => (
      <ToastProvider>
        <div className="relative h-[844px] w-[390px] overflow-hidden border border-gray-200">
          <Story />
        </div>
      </ToastProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ChatReportPage>;

export const Default: Story = {
  render: () => <ChatReportPage />,
};
