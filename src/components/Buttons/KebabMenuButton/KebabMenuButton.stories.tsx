import type { Meta, StoryObj } from "@storybook/react";
import KebabMenuButton from "./KebabMenuButton";

const meta = {
  title: "공통 컴포넌트/KebabMenuButton",
  component: KebabMenuButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof KebabMenuButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    size: "small",
  },
};
