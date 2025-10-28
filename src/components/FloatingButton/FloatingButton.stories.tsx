import type { Meta, StoryObj } from "@storybook/react";
import FloatingButton from "./FloatingButton";

const meta = {
  title: "공통 컴포넌트/FloatingButton",
  component: FloatingButton,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof FloatingButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    ariaLabel: "메뉴 열기",
  },
};
