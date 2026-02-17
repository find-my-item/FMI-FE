import type { Meta, StoryObj } from "@storybook/nextjs";
import WriteNoticeFloatingButton from "./WriteNoticeFloatingButton";

const meta: Meta<typeof WriteNoticeFloatingButton> = {
  title: "관리자 페이지/공지사항 관리/WriteNoticeFloatingButton",
  component: WriteNoticeFloatingButton,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "공지사항 작성 플로팅 버튼 컴포넌트",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="h-[400px] w-[390px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof WriteNoticeFloatingButton>;

export const Default: Story = {};
