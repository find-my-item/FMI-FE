import type { Meta, StoryObj } from "@storybook/nextjs";
import ViewMoreReply from "./ViewMoreReply";

const meta = {
  title: "공통 컴포넌트/ViewMoreReply",
  component: ViewMoreReply,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ViewMoreReply>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "답글 더보기",
  },
};
