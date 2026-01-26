import { Meta } from "@storybook/nextjs";
import PostListItem from "./PostListItem";
import { MOCK_POST_ITEM } from "@/mock/data";

const meta: Meta<typeof PostListItem> = {
  title: "페이지/목록 페이지/PostListItem",
  component: PostListItem,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="w-[430px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;

export const PostListItemStory = () => <PostListItem post={MOCK_POST_ITEM} linkState="list" />;
