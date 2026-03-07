import type { Meta, StoryObj } from "@storybook/nextjs";
import GuestCommentUI from "./GuestCommentUI";

const meta = {
  title: "공통 컴포넌트/CommentList/GuestCommentUI",
  component: GuestCommentUI,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <ul className="w-[380px] border border-[#E5E5E5]">
        <Story />
      </ul>
    ),
  ],
} satisfies Meta<typeof GuestCommentUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
