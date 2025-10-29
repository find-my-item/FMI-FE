import type { Meta, StoryObj } from "@storybook/react";
import Bookmark from "./Bookmark";

const meta = {
  title: "공통 컴포넌트/Bookmark",
  component: Bookmark,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Bookmark>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ariaLabel: "북마크 버튼",
    isActive: true,
    size: "large",
  },
};
