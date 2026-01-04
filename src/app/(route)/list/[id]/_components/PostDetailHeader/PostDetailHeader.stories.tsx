import { Meta, StoryObj } from "@storybook/nextjs";
import PostDetailHeader from "./PostDetailHeader";

const meta: Meta<typeof PostDetailHeader> = {
  title: "페이지/상세 페이지/PostDetailHeader",
  component: PostDetailHeader,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-[390px] border border-gray-200">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Single: Story = {
  args: {
    headerData: {
      imageUrls: ["https://picsum.photos/400/300?random=1"],
      postId: "1",
    },
  },
};
