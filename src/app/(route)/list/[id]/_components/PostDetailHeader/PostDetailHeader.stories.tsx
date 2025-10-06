import { Meta, StoryObj } from "@storybook/nextjs";
import PostDetailHeader from "./PostDetailHeader";

const meta: Meta<typeof PostDetailHeader> = {
  title: "Components/Detail/PostDetailHeader",
  component: PostDetailHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-[450px] border border-gray-200">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {};
