import { Meta, StoryObj } from "@storybook/nextjs";
import PostDetail from "./PostDetail";
import { MOCK_POST_DEFAULT_DETAIL } from "@/mock/MOCK_DATA";

const meta: Meta<typeof PostDetail> = {
  title: "페이지/상세 페이지/PostDetail",
  component: PostDetail,
  tags: ["autodocs"],
  decorators: [
    (Story) => (
      <div className="w-[400px] border border-gray-200">
        <Story />
      </div>
    ),
  ],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof PostDetail>;

export const Single: Story = {
  args: {
    type: "find",
    data: MOCK_POST_DEFAULT_DETAIL.result,
  },
};
