import { Meta, StoryObj } from "@storybook/nextjs";
import PostDetail from "./PostDetail";

const meta: Meta<typeof PostDetail> = {
  title: "Components/Detail/PostDetail",
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

export const PostDetailStory: Story = {
  args: {
    type: "find",
    item: {
      id: 1,
      title: "여기에 게시글 제목이 들어갑니다",
      body: "서울시 노원구 00동 건물 화장실에서 핸드폰을 분실했어요. 혹시 습득하신 분이 계시면 채팅 부탁드려요.",
    },
  },
};
