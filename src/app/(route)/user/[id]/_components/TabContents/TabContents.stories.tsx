import { Meta, StoryObj } from "@storybook/nextjs";
import TabContents from "./TabContents";

const meta: Meta<typeof TabContents> = {
  title: "페이지/타인 페이지/TabContents",
  component: TabContents,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
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

export const Default: Story = {};
