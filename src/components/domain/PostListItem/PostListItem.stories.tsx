import { Meta } from "@storybook/nextjs";
import PostListItem from "./PostListItem";
import { MOCK_POST_ITEM } from "@/mock/MOCK_DATA";

const meta: Meta<typeof PostListItem> = {
  title: "공통 컴포넌트/PostListItem",
  component: PostListItem,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-[430px]">
        <ul>
          <Story />
        </ul>
      </div>
    ),
  ],
};

export default meta;

export const PostListItemStory = () => <PostListItem post={MOCK_POST_ITEM} linkState="list" />;
