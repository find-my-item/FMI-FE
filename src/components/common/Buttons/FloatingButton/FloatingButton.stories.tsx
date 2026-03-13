import type { Meta, StoryObj } from "@storybook/nextjs";
import FloatingButton from "./FloatingButton";

const meta = {
  title: "공통 컴포넌트/FloatingButton",
  component: FloatingButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    mode: {
      control: "radio",
      options: ["post", "notice"],
      description: "post: 게시글 작성(플러스 아이콘), notice: 공지 작성(연필 아이콘)",
    },
    ariaLabel: {
      description: "접근성용 버튼 라벨",
    },
  },
} satisfies Meta<typeof FloatingButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ariaLabel: "플로팅 메뉴 버튼",
    mode: "post",
  },
};

export const PostMode: Story = {
  args: {
    ariaLabel: "게시글 작성",
    mode: "post",
  },
};

export const NoticeMode: Story = {
  args: {
    ariaLabel: "공지 작성",
    mode: "notice",
  },
};
