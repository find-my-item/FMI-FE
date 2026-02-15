import type { Meta, StoryObj } from "@storybook/nextjs";
import AdminDetailSection from "./AdminDetailSection";

const meta: Meta<typeof AdminDetailSection> = {
  title: "관리자 공통 컴포넌트/AdminDetailSection",
  component: AdminDetailSection,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "상세 페이지 공통 헤더 컴포넌트",
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="w-[390px] border">
        <Story />
      </div>
    ),
  ],
  args: {
    data: {
      title: "비회원 문의 제목입니다.",
      userName: "닉네임",
      createdAt: "2026-01-01",
      content: "문의 내용입니다.",
      status: "RECEIVED",
      replyStatus: "UNANSWERED",
    },
  },
};

export default meta;
type Story = StoryObj<typeof AdminDetailSection>;

export const Default: Story = {};
