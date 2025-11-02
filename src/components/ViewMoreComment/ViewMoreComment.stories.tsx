import type { Meta, StoryObj } from "@storybook/react";
import ViewMoreComment from "./ViewMoreComment";

const meta = {
  title: "공통 컴포넌트/ViewMoreComment",
  component: ViewMoreComment,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ViewMoreComment>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    text: "댓글 더보기",
  },
};
