import { Meta, StoryObj } from "@storybook/nextjs";
import Toast from "./Toast";

const meta: Meta<typeof Toast> = {
  title: "토스트/Toast",
  component: Toast,
  tags: ["autodocs"],
  argTypes: {
    type: { control: { type: "select" }, options: ["success", "warning", "error"] },
  },
};
export default meta;

type Story = StoryObj<typeof Toast>;

export const Success: Story = {
  args: {
    type: "success",
    message: "Text",
  },
};

export const Warning: Story = {
  args: {
    type: "warning",
    message: "Text",
  },
};

export const Error: Story = {
  args: {
    type: "error",
    message: "Text",
  },
};
