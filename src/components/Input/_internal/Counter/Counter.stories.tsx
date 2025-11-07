import { Meta, StoryObj } from "@storybook/nextjs";
import Counter from "./Counter";

const meta: Meta<typeof Counter> = {
  title: "공통 컴포넌트/Input/_Internal/Counter",
  component: Counter,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    maxLength: 20,
    isLength: 0,
  },
};
