import { Meta, StoryObj } from "@storybook/nextjs";
import TabContents from "./TabContents";

const meta: Meta<typeof TabContents> = {
  title: "페이지/타인 페이지/TabContents",
  component: TabContents,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
  args: {
    selectedTab: "post",
    isLoading: false,
  },
  decorators: [
    (Story) => (
      <div className="w-[400px]">
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Post: Story = {
  args: {
    selectedTab: "post",
    isLoading: false,
  },
};

export const Comment: Story = {
  args: {
    selectedTab: "comment",
    isLoading: false,
  },
};

export const Favorite: Story = {
  args: {
    selectedTab: "favorite",
    isLoading: false,
  },
};
