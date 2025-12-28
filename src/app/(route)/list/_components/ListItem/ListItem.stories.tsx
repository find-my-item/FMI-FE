import { Meta } from "@storybook/nextjs";
import ListItem from "./ListItem";
import { MOCK_POST_ITEM } from "@/mock/MOCK_DATA";

const meta: Meta<typeof ListItem> = {
  title: "페이지/목록 페이지/ListItem",
  component: ListItem,
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

export const ListItemStory = () => <ListItem post={MOCK_POST_ITEM} linkState="list" />;
