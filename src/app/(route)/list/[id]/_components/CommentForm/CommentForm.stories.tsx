import { Meta, StoryObj } from "@storybook/nextjs";
import CommentForm from "./CommentForm";

const meta: Meta<typeof CommentForm> = {
  title: "페이지/상세 페이지/CommentForm",
  component: CommentForm,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-[450px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
